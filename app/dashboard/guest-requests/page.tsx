"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
export default function GuestRequests(){
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings((d.bookings||[]).filter((b:any)=> b.special_request)) ); },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Guest Requests — Real ({bookings.length})</h1>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Guest</TableHead><TableHead>Request</TableHead><TableHead>Stay</TableHead></TableRow></TableHeader><TableBody>{bookings.map(b=> <TableRow key={b.id}><TableCell>{b.guest_name}</TableCell><TableCell>{b.special_request}</TableCell><TableCell>{b.stay_slug}</TableCell></TableRow>)}{bookings.length===0 && <TableRow><TableCell colSpan={3} className="p-6 text-center text-sm text-muted-foreground">No requests — real data from bookings.special_request</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
    </div>
  );
}
