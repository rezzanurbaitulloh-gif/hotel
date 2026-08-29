"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
export default function Forgot(){
  const supabase=createClient();
  const [email,setEmail]=useState("");
  const [msg,setMsg]=useState("");
  const [loading,setLoading]=useState(false);
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    const { error }=await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/callback` });
    setLoading(false);
    if(error) setMsg(error.message); else setMsg("Check your email for reset link — real Supabase flow");
  };
  return (
    <div className="min-h-[70vh] grid md:grid-cols-2">
      <div className="hidden md:block relative bg-black">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" alt="Hotel" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white"><div className="display text-2xl">AURA</div><div className="text-xs tracking-[0.16em]">GRAND LUXURY</div></div>
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-12 bg-[var(--ivory)]">
        <div className="eyebrow">Reset</div>
        <h1 className="display text-[32px] mt-2">FORGOT<br/>PASSWORD</h1>
        <form onSubmit={submit} className="mt-6 space-y-3 max-w-sm">
          <label className="block text-sm"><span className="text-xs">Email</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 border bg-white rounded" required /></label>
          {msg && <div className="text-xs p-2 bg-amber-50 border rounded">{msg}</div>}
          <button disabled={loading} className="w-full h-10 bg-[var(--obsidian)] text-white text-xs tracking-[0.16em]">{loading?"Sending…":"SEND RESET LINK"}</button>
          <div className="text-xs text-center"><Link href="/auth/login" className="underline">Back to login</Link></div>
        </form>
      </div>
    </div>
  );
}
