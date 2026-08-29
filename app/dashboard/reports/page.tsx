"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Reports(){
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])); },[]);
  const total=bookings.reduce((s,b)=>s+b.total,0);
  const csv=()=>{ const rows=bookings.map(b=>({id:b.id, guest:b.guest_name, stay:b.stay_slug, total:b.total, status:b.status})); const header=Object.keys(rows[0]||{id:"",guest:"",stay:"",total:"",status:""}).join(","); const csv=[header, ...rows.map(r=>Object.values(r).join(","))].join("\n"); const blob=new Blob([csv],{type:"text/csv"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="report.csv"; a.click(); };
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Reports — Real</h1>
      <Card><CardHeader><CardTitle>Revenue Report</CardTitle></CardHeader><CardContent><div className="text-sm">Total Revenue (real): <span className="font-semibold">${total.toLocaleString()}</span> from {bookings.length} bookings</div><button onClick={csv} className="mt-3 h-8 px-3 border rounded text-xs">Export CSV (real)</button> <button onClick={()=> window.print()} className="h-8 px-3 border rounded text-xs">Export PDF</button></CardContent></Card>
    </div>
  );
}
