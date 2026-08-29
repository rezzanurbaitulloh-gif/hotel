"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
export default function RoomTypes(){
  const [rooms,setRooms]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/admin/properties").then(r=>r.json()).then(d=> setRooms(d.properties||[])); },[]);
  const types=Array.from(new Set(rooms.map(r=>r.category))).map(cat=>({ category:cat, count:rooms.filter(r=>r.category===cat).length, avg: Math.round(rooms.filter(r=>r.category===cat).reduce((s,r)=>s+r.price,0)/Math.max(1, rooms.filter(r=>r.category===cat).length)) }));
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Room Types — Real ({types.length})</h1>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Category</TableHead><TableHead>Count</TableHead><TableHead>Avg Price</TableHead></TableRow></TableHeader><TableBody>{types.map(t=> <TableRow key={t.category}><TableCell>{t.category}</TableCell><TableCell>{t.count}</TableCell><TableCell>${t.avg}</TableCell></TableRow>)}{types.length===0 && <TableRow><TableCell colSpan={3} className="p-6 text-center text-sm text-muted-foreground">No types — create rooms first</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
    </div>
  );
}
