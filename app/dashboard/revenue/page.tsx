"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Revenue(){
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])); },[]);
  const total=bookings.reduce((s,b)=>s+b.total,0);
  const byProp=bookings.reduce((acc:any,b)=>{ acc[b.stay_slug]=(acc[b.stay_slug]||0)+b.total; return acc; },{});
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Revenue — Real</h1>
      <div className="grid md:grid-cols-3 gap-3">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total Revenue</div><div className="text-lg font-semibold">${total.toLocaleString()}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Bookings</div><div className="text-lg font-semibold">{bookings.length}</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg Stay</div><div className="text-lg font-semibold">${bookings.length? Math.round(total/bookings.length):0}</div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Revenue by Property (real)</CardTitle></CardHeader><CardContent className="space-y-2">{Object.entries(byProp).map(([k,v]:any)=> <div key={k} className="flex justify-between text-sm border-b py-2"><span>{k}</span><span>${v}</span></div>)}{Object.keys(byProp).length===0 && <div className="text-sm text-muted-foreground">No revenue — create bookings</div>}</CardContent></Card>
    </div>
  );
}
