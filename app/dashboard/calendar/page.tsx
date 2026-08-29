"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function Calendar(){
  const [bookings,setBookings]=useState<any[]>([]);
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])); },[]);
  const dayBookings=bookings.filter(b=> b.check_in===date || b.check_out===date || (b.check_in < date && b.check_out > date));
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Calendar — Real</h1>
      <Card><CardHeader><CardTitle>Select Date</CardTitle></CardHeader><CardContent><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="h-9 px-2 border rounded text-sm" /><div className="mt-4 text-sm">{dayBookings.length} reservations for {date} (real)</div><div className="mt-3 space-y-2">{dayBookings.map(b=> <div key={b.id} className="flex justify-between border p-2 rounded text-sm"><span>{b.guest_name} • {b.stay_slug}</span><Badge>{b.status}</Badge></div>)}{dayBookings.length===0 && <div className="text-sm text-muted-foreground">No reservations — empty state (real)</div>}</div></CardContent></Card>
    </div>
  );
}
