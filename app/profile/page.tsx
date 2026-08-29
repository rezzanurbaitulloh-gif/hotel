"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ProfileInner(){
  const supabase=createClient();
  const router=useRouter();
  const searchParams=useSearchParams();
  const tab=searchParams.get("tab")||"profile";
  const [user,setUser]=useState<any>(null);
  const [name,setName]=useState("");
  const [avatar,setAvatar]=useState("");
  const [msg,setMsg]=useState("");
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user);
      if(data.user){
        setName(data.user.user_metadata?.name||"");
        setAvatar(data.user.user_metadata?.avatar_url||"");
        fetch("/api/bookings/list").then(r=>r.json()).then(d=>{
          const all=d.bookings||[];
          // filter for current user
          setBookings(all.filter((b:any)=> b.guest_email===data.user.email));
        });
      }
    });
  },[]);
  const update=async()=>{
    setMsg("");
    const { error }=await supabase.auth.updateUser({ data:{ name, avatar_url: avatar }});
    if(error) setMsg(error.message); else setMsg("Profile updated — refresh header to see changes");
  };
  const del=async()=>{
    if(!confirm("Hapus akun permanen? Semua data booking tetap ada tapi akun tidak bisa login lagi.")) return;
    const res=await fetch("/api/profile/delete",{method:"DELETE"});
    const d=await res.json();
    if(!res.ok) setMsg(d.error||"Failed"); else { await supabase.auth.signOut(); router.push("/"); }
  };
  if(!user) return <div className="mx-auto max-w-2xl p-6 text-sm">Please <a href="/auth/login?returnTo=/profile" className="underline">login</a> to view profile.</div>;
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">Akun Saya</h1>
      <div className="flex gap-2 text-xs">
        <a href="/profile" className={`px-3 py-1.5 rounded-full border ${tab==="profile"?"bg-primary text-primary-foreground":"bg-white"}`}>Profile</a>
        <a href="/profile?tab=settings" className={`px-3 py-1.5 rounded-full border ${tab==="settings"?"bg-primary text-primary-foreground":"bg-white"}`}>Pengaturan</a>
        <a href="/my-reservations" className="px-3 py-1.5 rounded-full border bg-white">Pesanan</a>
      </div>

      {tab==="profile" && (
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full bg-secondary grid place-items-center overflow-hidden text-lg">
                {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> : (name?.[0]||user.email[0].toUpperCase())}
              </div>
              <div>
                <div className="font-medium">{name||user.email}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
                <div className="text-xs"><Badge>{user.user_metadata?.role||"guest"}</Badge></div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Email</div><div>{user.email}</div></div>
              <div><div className="text-xs text-muted-foreground">Display Name</div><div>{name||"-"}</div></div>
              <div><div className="text-xs text-muted-foreground">Terdaftar</div><div>{new Date(user.created_at).toLocaleDateString("id-ID")}</div></div>
              <div><div className="text-xs text-muted-foreground">Pesanan</div><div>{bookings.length} total • {bookings.filter(b=>b.status==="confirmed").length} selesai</div></div>
            </div>
            <a href="/profile?tab=settings" className="inline-flex h-8 px-3 border rounded-md text-xs items-center">Edit Pengaturan →</a>
          </CardContent>
        </Card>
      )}

      {tab==="settings" && (
        <Card>
          <CardHeader><CardTitle>Pengaturan Akun</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <label className="block text-sm"><span className="text-xs">Display Name</span><input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full h-9 px-2 border rounded-md" placeholder="Nama tampilan" /></label>
            <label className="block text-sm"><span className="text-xs">Foto Profile URL</span><input value={avatar} onChange={e=>setAvatar(e.target.value)} className="mt-1 w-full h-9 px-2 border rounded-md" placeholder="https://..." /><div className="text-[11px] text-muted-foreground mt-1">Tempel URL foto, atau gunakan avatar generator. Kosongkan untuk inisial.</div></label>
            {msg && <div className="text-xs p-2 bg-amber-50 border rounded">{msg}</div>}
            <div className="flex gap-2">
              <button onClick={update} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-xs">Simpan</button>
              <button onClick={del} className="h-9 px-4 border border-red-200 text-red-600 rounded-md text-xs">Hapus Akun</button>
            </div>
            <div className="text-xs text-muted-foreground">Hapus akun tidak menghapus booking history — data transaksi tetap untuk audit.</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default function Profile(){
  return <Suspense fallback={<div className="p-6">Loading…</div>}><ProfileInner /></Suspense>;
}
