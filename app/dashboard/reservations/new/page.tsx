"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
export default function NewReservation(){
  const router=useRouter();
  const [form,setForm]=useState({guest_name:"", guest_email:"", stay_slug:"ocean-villa", check_in:"", check_out:"", adults:"2", total:"890"});
  const [msg,setMsg]=useState("");
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const res=await fetch("/api/bookings/create",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ stay_slug:form.stay_slug, check_in:form.check_in, check_out:form.check_out, adults:parseInt(form.adults), children:0, guest_name:form.guest_name, guest_email:form.guest_email, guest_phone:"", addons:[], addons_total:0, total:parseInt(form.total) })});
    const d=await res.json();
    if(!res.ok) setMsg(d.error); else { router.push(`/dashboard/reservations/${d.booking.id}`); }
  };
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-xl font-semibold">New Reservation — Real</h1>
      <Card><CardHeader><CardTitle>Create Booking (live to Supabase)</CardTitle></CardHeader><CardContent>
        <form onSubmit={submit} className="space-y-3">
          <input placeholder="Guest Name" value={form.guest_name} onChange={e=>setForm({...form,guest_name:e.target.value})} className="w-full h-9 px-2 border rounded text-sm" required />
          <input placeholder="Guest Email" type="email" value={form.guest_email} onChange={e=>setForm({...form,guest_email:e.target.value})} className="w-full h-9 px-2 border rounded text-sm" required />
          <select value={form.stay_slug} onChange={e=>setForm({...form,stay_slug:e.target.value})} className="w-full h-9 px-2 border rounded text-sm"><option value="ocean-villa">Ocean Villa</option><option value="jungle-suite">Jungle Suite</option><option value="cliff-residence">Cliff Residence</option><option value="garden-loft">Garden Loft</option></select>
          <div className="grid grid-cols-2 gap-2"><input type="date" value={form.check_in} onChange={e=>setForm({...form,check_in:e.target.value})} className="h-9 px-2 border rounded text-sm" required /><input type="date" value={form.check_out} onChange={e=>setForm({...form,check_out:e.target.value})} className="h-9 px-2 border rounded text-sm" required /></div>
          <input placeholder="Adults" type="number" value={form.adults} onChange={e=>setForm({...form,adults:e.target.value})} className="w-full h-9 px-2 border rounded text-sm" />
          <input placeholder="Total" type="number" value={form.total} onChange={e=>setForm({...form,total:e.target.value})} className="w-full h-9 px-2 border rounded text-sm" />
          {msg && <div className="text-xs p-2 bg-red-50 border rounded">{msg}</div>}
          <button className="w-full h-9 bg-primary text-primary-foreground rounded text-sm">Create — live</button>
        </form>
      </CardContent></Card>
    </div>
  );
}
