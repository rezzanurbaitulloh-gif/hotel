"use client";
import { createClient } from "@/lib/supabase/client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
function LoginInner(){
  const { t } = useI18n();
  const supabase = createClient();
  const router = useRouter();
  const searchParams=useSearchParams();
  const returnTo=searchParams.get("returnTo") || searchParams.get("next") || "/dashboard";
  const [email,setEmail]=useState("admin@aura.bali");
  const [password,setPassword]=useState("Admin123!");
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState("");
  const loginEmail=async(e:React.FormEvent)=>{
    e.preventDefault(); setLoading(true); setMsg("");
    if(!email || !password){ setMsg("Email and password required"); setLoading(false); return; }
    const { error } = await supabase.auth.signInWithPassword({email,password});
    setLoading(false);
    if(error) setMsg(error.message); else { router.push(returnTo); router.refresh(); }
  };
  const loginGoogle=async()=>{
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(returnTo)}` } });
    if(error) setMsg(error.message);
  };
  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      <div className="hidden md:block relative bg-black">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" alt="Hotel" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <div className="display text-3xl">AURA</div>
          <div className="text-xs tracking-[0.16em] mt-1">A WORLD BEYOND ORDINARY</div>
          <div className="mt-4 text-xs text-white/60">Grand Luxury Hospitality — cinematic, immersive, exclusive</div>
        </div>
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-12 bg-[var(--ivory)]">
        <div className="eyebrow">Welcome</div>
        <h1 className="display text-[32px] mt-2">WELCOME<br/>BACK</h1>
        <p className="text-sm text-[var(--stone)] mt-2 font-light">{t.auth.demo} — return to {returnTo}</p>
        <form onSubmit={loginEmail} className="mt-6 space-y-3 max-w-sm" noValidate>
          <label className="block text-sm"><span className="text-xs">Email *</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 border bg-white rounded" required /></label>
          <label className="block text-sm"><span className="text-xs">Password *</span><div className="mt-1 flex gap-2"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} className="flex-1 h-10 px-3 border bg-white rounded" required /><button type="button" onClick={()=>setShow(!show)} className="h-10 px-3 border bg-white rounded text-xs">{show?"Hide":"Show"}</button></div></label>
          {msg && <div role="alert" className="text-xs p-2 bg-red-50 border border-red-200 rounded">{msg}</div>}
          <button disabled={loading} className="w-full h-10 bg-[var(--obsidian)] text-white text-xs tracking-[0.16em] font-light disabled:opacity-60">{loading?"Signing in…":t.auth.signin}</button>
          <div className="text-xs text-center flex justify-between"><Link href="/forgot-password" className="underline">Forgot password?</Link><Link href="/register" className="underline">{t.auth.no_account} {t.auth.register}</Link></div>
        </form>
        <button onClick={loginGoogle} className="mt-4 w-full max-w-sm h-10 border bg-white text-xs flex items-center justify-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-500 text-white grid place-items-center text-[10px]">G</span> {t.auth.google}
        </button>
      </div>
    </div>
  );
}
export default function LoginPage(){
  return <Suspense fallback={<div className="p-6">Loading…</div>}><LoginInner /></Suspense>;
}
