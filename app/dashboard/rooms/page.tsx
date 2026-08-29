"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function RoomsAdmin(){
  const [rooms,setRooms]=useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  const [editing,setEditing]=useState<any>(null);
  const [form,setForm]=useState({name:"", category:"Villa", price:"", slug:"", description:"", image:""});
  const load=()=> fetch("/api/admin/properties").then(r=>r.json()).then(d=>{ setRooms(d.properties||[]); setLoading(false); });
  useEffect(()=>{ load(); },[]);
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const payload={ name:form.name, category:form.category, price:parseInt(form.price), slug:form.slug || form.name.toLowerCase().replace(/\s+/g,"-"), description:form.description, image:form.image||"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", status:"published", size:"42 m²", bed:"King", view:"Garden", capacity:2, amenities:[], features:[], included:[], policy:"" };
    const res=await fetch("/api/admin/properties",{method: editing?"PUT":"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(editing? {...payload, id:editing.id}:payload)});
    if(res.ok){ setForm({name:"", category:"Villa", price:"", slug:"", description:"", image:""}); setEditing(null); load(); }
    else alert("Failed: "+(await res.json()).error);
  };
  const del=async(id:string)=>{ if(!confirm("Delete?")) return; await fetch(`/api/admin/properties?id=${id}`,{method:"DELETE"}); load(); };
  const edit=(r:any)=>{ setEditing(r); setForm({name:r.name, category:r.category, price:String(r.price), slug:r.slug, description:r.description||"", image:r.image||""}); };
  if(loading) return <div className="p-6 text-sm">Loading real rooms from Supabase…</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Rooms — Live from Supabase</h1>
      <p className="text-xs text-muted-foreground">Edits here update public site /rooms and /stay instantly (real data, no hardcode). {rooms.length} rooms.</p>
      <Card>
        <CardHeader><CardTitle>{editing?"Edit Room":"Add Room"}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Name (Deluxe King)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="h-9 px-2 border rounded text-sm" required />
            <input placeholder="Slug (auto)" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} className="h-9 px-2 border rounded text-sm" />
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="h-9 px-2 border rounded text-sm"><option>Villa</option><option>Suite</option><option>Room</option><option>Residence</option></select>
            <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="h-9 px-2 border rounded text-sm" required />
            <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="h-9 px-2 border rounded text-sm sm:col-span-2" />
            <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="p-2 border rounded text-sm sm:col-span-2" rows={2} />
            <button className="h-9 px-4 bg-primary text-primary-foreground rounded text-xs sm:col-span-2">{editing?"Update":"Create"} — live</button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Room</TableHead><TableHead>Type</TableHead><TableHead>Price</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {rooms.map(r=>(
                <TableRow key={r.id}>
                  <TableCell><div className="font-medium">{r.name}</div><div className="text-xs text-muted-foreground">{r.slug}</div></TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell>${r.price}</TableCell>
                  <TableCell><Badge variant="success">{r.status}</Badge></TableCell>
                  <TableCell className="flex gap-1"><button onClick={()=>edit(r)} className="h-7 px-2 border rounded text-xs">Edit</button><button onClick={()=>del(r.id)} className="h-7 px-2 border rounded text-xs text-red-600">Delete</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
