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
    <div className="mx-auto max-w-md px-6 py-12">
      <div className="eyebrow">Create account</div><h1 className="display text-[30px] mt-1">Register</h1>
      <form onSubmit={submit} className="mt-6 border border-[var(--line)] bg-white p-6 space-y-3">
        <label className="block text-sm"><span className="text-xs font-medium">Name *</span><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 w-full h-10 px-3 border rounded-lg" /></label>
        <label className="block text-sm"><span className="text-xs font-medium">Email *</span><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1 w-full h-10 px-3 border rounded-lg" /></label>
        <label className="block text-sm"><span className="text-xs font-medium">Password *</span><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="mt-1 w-full h-10 px-3 border rounded-lg" /></label>
        <label className="block text-sm"><span className="text-xs font-medium">Confirm *</span><input type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} className="mt-1 w-full h-10 px-3 border rounded-lg" /></label>
        {msg&&<div className="text-sm text-red-600">{msg}</div>}
        <button disabled={loading} className="w-full h-11 rounded-full bg-[var(--ink)] text-white text-xs font-semibold">{loading?"Creating…":"Create account"}</button>
        <div className="text-xs text-center">Already have account? <Link href="/auth/login" className="underline">Login</Link></div>
      </form>
    </div>
  );
}
