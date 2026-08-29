"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Register(){
  const supabase=createClient();
  const router=useRouter();
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [msg,setMsg]=useState(""); const [loading,setLoading]=useState(false);
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.name||!form.email||!form.password){ setMsg("All fields required"); return; }
    if(form.password!==form.confirm){ setMsg("Passwords do not match"); return; }
    if(form.password.length<6){ setMsg("Password too weak (min 6)"); return; }
    setLoading(true);
    const { error }=await supabase.auth.signUp({email:form.email,password:form.password, options:{data:{name:form.name}}});
    setLoading(false);
    if(error) setMsg(error.message); else { router.push("/auth/login?registered=1"); }
  };
  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      <div className="hidden md:block relative bg-black">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" alt="Hotel" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white"><div className="display text-3xl">AURA</div><div className="text-xs tracking-[0.16em]">CREATE YOUR JOURNEY</div></div>
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-12 bg-[var(--ivory)]">
        <div className="eyebrow">Join</div>
        <h1 className="display text-[32px] mt-2">CREATE<br/>YOUR ACCOUNT</h1>
        <form onSubmit={submit} className="mt-6 space-y-3 max-w-sm">
          <label className="block text-sm"><span className="text-xs">Full Name *</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 w-full h-10 px-3 border bg-white rounded" required /></label>
          <label className="block text-sm"><span className="text-xs">Email *</span><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1 w-full h-10 px-3 border bg-white rounded" required /></label>
          <label className="block text-sm"><span className="text-xs">Password *</span><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="mt-1 w-full h-10 px-3 border bg-white rounded" required /></label>
          <label className="block text-sm"><span className="text-xs">Confirm *</span><input type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} className="mt-1 w-full h-10 px-3 border bg-white rounded" required /></label>
          {msg&&<div className="text-xs p-2 bg-red-50 border rounded">{msg}</div>}
          <button disabled={loading} className="w-full h-10 bg-[var(--obsidian)] text-white text-xs tracking-[0.16em]">{loading?"Creating…":"CREATE ACCOUNT"}</button>
          <div className="text-xs text-center">Already have account? <Link href="/auth/login" className="underline">Login</Link></div>
        </form>
      </div>
    </div>
  );
}
