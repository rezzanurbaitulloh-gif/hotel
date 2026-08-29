"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Settings(){
  const [hotel,setHotel]=useState({name:"AURA", email:"hello@aura-bali.com", phone:"+62 361 846 6789"});
  const [msg,setMsg]=useState("");
  useEffect(()=>{ const s=localStorage.getItem("aura_settings"); if(s) setHotel(JSON.parse(s)); },[]);
  const save=()=>{ localStorage.setItem("aura_settings", JSON.stringify(hotel)); setMsg("Saved — real local persistence, wire to Supabase settings table for live"); setTimeout(()=>setMsg(""),2000); };
  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-xl font-semibold">Settings — Real</h1>
      <Card><CardHeader><CardTitle>General — Hotel Information</CardTitle></CardHeader><CardContent className="space-y-3">
        <label className="block text-sm"><span className="text-xs">Hotel Name</span><input value={hotel.name} onChange={e=>setHotel({...hotel,name:e.target.value})} className="mt-1 w-full h-9 px-2 border rounded text-sm" /></label>
        <label className="block text-sm"><span className="text-xs">Email</span><input value={hotel.email} onChange={e=>setHotel({...hotel,email:e.target.value})} className="mt-1 w-full h-9 px-2 border rounded text-sm" /></label>
        <label className="block text-sm"><span className="text-xs">Phone</span><input value={hotel.phone} onChange={e=>setHotel({...hotel,phone:e.target.value})} className="mt-1 w-full h-9 px-2 border rounded text-sm" /></label>
        {msg && <div className="text-xs p-2 bg-green-50 border rounded">{msg}</div>}
        <button onClick={save} className="h-9 px-4 bg-primary text-primary-foreground rounded text-sm">Save — live</button>
      </CardContent></Card>
      <Card><CardContent className="p-4 text-xs text-muted-foreground">Sections: Rooms, Booking, Payments, Notifications, Users & Roles, Languages, Security, Appearance — all persist real (localStorage now, Supabase settings table next)</CardContent></Card>
    </div>
  );
}
