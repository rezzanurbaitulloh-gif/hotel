"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function OffersAdmin(){
  const [offers,setOffers]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/admin/offers").then(r=>r.json()).then(d=> setOffers(d.offers||[])); },[]);
  const create=async(e:React.FormEvent)=>{
    e.preventDefault();
    const fd=new FormData(e.target as HTMLFormElement);
    const body={ slug:fd.get("slug"), title:fd.get("title"), subtitle:fd.get("subtitle"), price:fd.get("price"), validity:fd.get("validity"), description:fd.get("title"), image:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800", active:true, terms:"" };
    await fetch("/api/admin/offers",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)});
    location.reload();
  };
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Offers — Live</h1>
      <Card><CardContent className="p-4 grid gap-2">{offers.map(o=> <div key={o.id} className="flex justify-between border-b py-2 text-sm"><span>{o.title} • {o.price}</span><span className="text-xs text-muted-foreground">{o.validity}</span></div>)}{offers.length===0 && <div className="text-sm text-muted-foreground">No offers — create below (real data)</div>}</CardContent></Card>
      <Card><CardHeader><CardTitle>Add Offer (live)</CardTitle></CardHeader><CardContent><form onSubmit={create} className="grid sm:grid-cols-2 gap-2"><input name="slug" placeholder="slug" className="h-8 px-2 border rounded text-xs" required /><input name="title" placeholder="Title" className="h-8 px-2 border rounded text-xs" required /><input name="subtitle" placeholder="Subtitle" className="h-8 px-2 border rounded text-xs" /><input name="price" placeholder="From $..." className="h-8 px-2 border rounded text-xs" /><input name="validity" placeholder="Until ..." className="h-8 px-2 border rounded text-xs" /><button className="h-8 bg-primary text-primary-foreground rounded text-xs sm:col-span-2">Create</button></form></CardContent></Card>
    </div>
  );
}
