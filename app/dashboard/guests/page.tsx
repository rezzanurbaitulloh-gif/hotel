"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
export default function Guests(){
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])); },[]);
  const guests=Array.from(new Map(bookings.map(b=>[b.guest_email,b])).values());
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Guests — Real ({guests.length})</h1>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Guest</TableHead><TableHead>Email</TableHead><TableHead>Reservations</TableHead><TableHead>Total Spent</TableHead></TableRow></TableHeader>
        <TableBody>
          {guests.map((g:any)=> {
            const gb=bookings.filter(b=>b.guest_email===g.guest_email);
            return <TableRow key={g.guest_email}><TableCell>{g.guest_name}</TableCell><TableCell>{g.guest_email}</TableCell><TableCell>{gb.length}</TableCell><TableCell>${gb.reduce((s,b)=>s+b.total,0)}</TableCell></TableRow>
          })}
          {guests.length===0 && <TableRow><TableCell colSpan={4} className="p-6 text-center text-sm text-muted-foreground">No guests yet — real data from bookings</TableCell></TableRow>}
        </TableBody>
      </Table></CardContent></Card>
    </div>
  );
}
