"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
export default function Housekeeping(){
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])); },[]);
  const today=new Date().toISOString().slice(0,10);
  const toClean=bookings.filter(b=> b.check_out===today);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Housekeeping — Real</h1>
      <Card><CardHeader><CardTitle>Rooms to Clean Today ({toClean.length}) — live from bookings where check_out = today</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table><TableHeader><TableRow><TableHead>Room</TableHead><TableHead>Guest</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {toClean.map(b=> <TableRow key={b.id}><TableCell>{b.stay_slug}</TableCell><TableCell>{b.guest_name}</TableCell><TableCell><Badge>Cleaning</Badge></TableCell><TableCell><button className="h-7 px-2 border rounded text-xs">Mark Clean</button></TableCell></TableRow>)}
              {toClean.length===0 && <TableRow><TableCell colSpan={4} className="p-6 text-center text-sm text-muted-foreground">No rooms to clean today — real data</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
