"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Reservations(){
  const [bookings,setBookings]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState("all");
  const [page,setPage]=useState(0);
  const pageSize=10;
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=>{ setBookings(d.bookings||[]); setLoading(false); }); },[]);
  const filtered=bookings.filter(b=>{
    const mSearch=!search || b.guest_name.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search) || b.guest_email.toLowerCase().includes(search.toLowerCase());
    const mStatus=status==="all" || b.status===status;
    return mSearch && mStatus;
  });
  const paged=filtered.slice(page*pageSize, (page+1)*pageSize);
  const csv=()=>{ const rows=filtered.map(b=>({id:b.id, guest:b.guest_name, room:b.stay_slug, check_in:b.check_in, check_out:b.check_out, guests:b.adults+b.children, amount:b.total, status:b.status})); const h=Object.keys(rows[0]||{id:"",guest:"",room:"",check_in:"",check_out:"",guests:"",amount:"",status:""}).join(","); const c=[h, ...rows.map(r=>Object.values(r).join(","))].join("\n"); const blob=new Blob([c],{type:"text/csv"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="reservations.csv"; a.click(); };
  if(loading) return <div className="p-6 text-sm">Loading real reservations…</div>;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Reservations — Real ({filtered.length})</h1>
        <div className="flex gap-2">
          <button onClick={csv} className="h-8 px-3 border rounded-md text-xs">Export CSV</button>
          <Link href="/dashboard/reservations/new" className="h-8 px-3 bg-primary text-primary-foreground rounded-md text-xs inline-flex items-center">+ New</Link>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <input placeholder="Search guest, ID, email" value={search} onChange={e=>setSearch(e.target.value)} className="h-8 px-2 border rounded-md text-xs w-48" />
        <select value={status} onChange={e=>setStatus(e.target.value)} className="h-8 px-2 border rounded-md text-xs bg-white"><option value="all">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select>
        <button onClick={()=>{setSearch(""); setStatus("all");}} className="h-8 px-3 border rounded-md text-xs">Clear Filters</button>
      </div>
      <Card><CardContent className="p-0">
        {filtered.length===0 ? <div className="p-8 text-center text-sm text-muted-foreground">No reservations found — try booking at <Link href="/booking" className="underline">/booking</Link> (real data)</div> : (
          <Table>
            <TableHeader><TableRow><TableHead>Reservation</TableHead><TableHead>Guest</TableHead><TableHead>Room</TableHead><TableHead>Stay</TableHead><TableHead>Guests</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {paged.map(b=>(
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id.slice(0,8)}</TableCell>
                  <TableCell><div className="text-sm">{b.guest_name}</div><div className="text-xs text-muted-foreground">{b.guest_email}</div></TableCell>
                  <TableCell>{b.stay_slug}</TableCell>
                  <TableCell>{b.check_in} → {b.check_out}</TableCell>
                  <TableCell>{b.adults+b.children}</TableCell>
                  <TableCell>${b.total}</TableCell>
                  <TableCell><Badge variant={b.status==="confirmed"?"success":b.status==="pending"?"warning":"secondary"}>{b.status}</Badge></TableCell>
                  <TableCell><Link href={`/dashboard/reservations/${b.id}`} className="text-xs underline">View</Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="flex justify-between items-center p-3 border-t">
          <span className="text-xs text-muted-foreground">Page {page+1} of {Math.max(1, Math.ceil(filtered.length/pageSize))}</span>
          <div className="flex gap-1">
            <button disabled={page===0} onClick={()=>setPage(p=>Math.max(0,p-1))} className="h-7 px-2 border rounded text-xs disabled:opacity-50">Prev</button>
            <button disabled={(page+1)*pageSize>=filtered.length} onClick={()=>setPage(p=>p+1)} className="h-7 px-2 border rounded text-xs disabled:opacity-50">Next</button>
          </div>
        </div>
      </CardContent></Card>
    </div>
  );
}
