"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
export default function Payments(){
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])); },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Payments — Real</h1>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Payment ID</TableHead><TableHead>Guest</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
        <TableBody>
          {bookings.map(b=> <TableRow key={b.id}><TableCell className="font-mono text-xs">{b.id.slice(0,8)}</TableCell><TableCell>{b.guest_name}</TableCell><TableCell>${b.total}</TableCell><TableCell><Badge variant={b.status==="confirmed"?"success":"warning"}>{b.status==="confirmed"?"Paid":"Pending"}</Badge></TableCell><TableCell>{new Date(b.created_at).toLocaleDateString()}</TableCell></TableRow>)}
          {bookings.length===0 && <TableRow><TableCell colSpan={5} className="p-6 text-center text-sm text-muted-foreground">No payments — real data</TableCell></TableRow>}
        </TableBody>
      </Table></CardContent></Card>
    </div>
  );
}
