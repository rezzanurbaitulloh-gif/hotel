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
  const returnTo=searchParams.get("returnTo") || searchParams.get("next") || "/admin";
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
    <div className="mx-auto max-w-md px-6 py-12">
      <div className="eyebrow">AURA</div>
      <h1 className="display text-[30px] mt-1">{t.auth.welcome}</h1>
      <p className="text-sm text-[var(--muted)] mt-2">{t.auth.demo} — return to {returnTo}</p>
      <form onSubmit={loginEmail} className="mt-6 space-y-3 border border-[var(--line)] bg-white p-6" noValidate>
        <label className="block text-sm"><span className="text-xs font-medium">{t.auth.email} *</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" required /></label>
        <label className="block text-sm"><span className="text-xs font-medium">{t.auth.password} *</span><div className="mt-1 flex gap-2"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} className="flex-1 h-10 px-3 border border-[var(--line)] rounded-lg" required /><button type="button" onClick={()=>setShow(!show)} className="h-10 px-3 border rounded-lg text-xs">{show?"Hide":"Show"}</button></div></label>
        {msg && <div role="alert" className="text-sm text-red-600 border border-red-200 bg-red-50 p-2 rounded">{msg}</div>}
        <button disabled={loading} className="w-full h-11 rounded-full bg-[var(--ink)] text-white text-xs tracking-wide font-semibold disabled:opacity-60">{loading?"Signing in…":t.auth.signin}</button>
        <div className="text-xs text-center"><Link href="/register" className="underline">{t.auth.no_account} {t.auth.register}</Link> • <Link href="/faq" className="underline">Forgot password?</Link></div>
      </form>
      <button onClick={loginGoogle} className="mt-3 w-full h-11 rounded-full bg-white border border-[var(--line)] text-sm flex items-center justify-center gap-2">
        <span className="w-5 h-5 rounded-full bg-blue-500 text-white grid place-items-center text-[10px]">G</span> {t.auth.google}
      </button>
      <div className="mt-4 text-xs text-[var(--muted)]">Google OAuth requires enabling Google provider in Supabase Auth dashboard and adding authorized redirect: {typeof window!=="undefined"? window.location.origin+"/auth/callback" : "/auth/callback"}</div>
    </div>
  );
}
export default function LoginPage(){
  return <Suspense fallback={<div className="mx-auto max-w-md px-6 py-12">Loading…</div>}><LoginInner /></Suspense>;
}
