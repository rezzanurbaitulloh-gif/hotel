"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";

function MyReservationsInner(){
  const supabase=createClient();
  const [user,setUser]=useState<any>(null);
  const [bookings,setBookings]=useState<any[]>([]);
  const [tab,setTab]=useState<"all"|"upcoming"|"completed"|"cancelled"|"history">("all");
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user);
      if(data.user){
        fetch("/api/bookings/list").then(r=>r.json()).then(d=>{
          const all=(d.bookings||[]).filter((b:any)=> b.guest_email===data.user.email);
          setBookings(all);
        });
      }
    });
  },[]);
  if(!user) return <div className="mx-auto max-w-3xl p-6 text-sm">Silakan <a href="/auth/login?returnTo=/my-reservations" className="underline">login</a> untuk melihat pesanan.</div>;
  const filtered=bookings.filter(b=>{
    if(tab==="all") return true;
    if(tab==="upcoming") return b.status==="pending" || b.status==="confirmed";
    if(tab==="completed") return b.status==="confirmed";
    if(tab==="cancelled") return b.status==="cancelled";
    if(tab==="history") return true;
    return true;
  });
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">Pesanan Saya</h1>
      <div className="text-xs text-muted-foreground">{bookings.length} pesanan • Riwayat lengkap, termasuk yang sudah selesai dan dibatalkan</div>
      <div className="flex gap-2 flex-wrap">
        {[
          ["all","Semua"],
          ["upcoming","Akan Datang"],
          ["completed","Selesai"],
          ["cancelled","Dibatalkan"],
          ["history","Riwayat"],
        ].map(([k,l])=> <button key={k} onClick={()=>setTab(k as any)} className={`h-7 px-3 rounded-full border text-xs ${tab===k?"bg-primary text-primary-foreground":"bg-white"}`}>{l}</button>)}
      </div>
      {filtered.length===0 ? <Card><CardContent className="p-6 text-sm text-muted-foreground">Tidak ada pesanan di tab ini. <a href="/booking" className="underline">Buat pesanan baru</a></CardContent></Card> : (
        <div className="space-y-3">
          {filtered.map(b=>(
            <Card key={b.id}>
              <CardContent className="p-4">
                <div className="flex justify-between gap-2">
                  <div><div className="font-medium text-sm">{b.stay_slug} • {b.check_in} → {b.check_out}</div><div className="text-xs text-muted-foreground">{b.adults} dewasa {b.children? `+ ${b.children} anak`: ""} • ${b.total} • {new Date(b.created_at).toLocaleDateString("id-ID")}</div></div>
                  <Badge variant={b.status==="confirmed"?"success":b.status==="cancelled"?"destructive":"warning"}>{b.status}</Badge>
                </div>
                <div className="mt-2 text-xs flex gap-2">
                  <span className="px-2 py-1 bg-secondary rounded">ID {b.id.slice(0,8)}</span>
                  <span className="px-2 py-1 border rounded">{b.status==="confirmed"?"Selesai":"Diproses"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Card><CardHeader><CardTitle>Butuh bantuan?</CardTitle></CardHeader><CardContent className="text-xs text-muted-foreground">Hubungi concierge via WhatsApp untuk ubah tanggal atau minta invoice.</CardContent></Card>
    </div>
  );
}
export default function MyReservations(){
  return <Suspense fallback={<div className="p-6">Loading…</div>}><MyReservationsInner /></Suspense>;
}
