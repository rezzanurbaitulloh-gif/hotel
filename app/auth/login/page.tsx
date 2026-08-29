"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage(){
  const supabase = createClient();
  const router = useRouter();
  const [email,setEmail]=useState("admin@aura.bali");
  const [password,setPassword]=useState("Admin123!");
  const [loading,setLoading]=useState(false);
  const [msg,setMsg]=useState("");
  const loginEmail=async(e:React.FormEvent)=>{
    e.preventDefault(); setLoading(true); setMsg("");
    const { error } = await supabase.auth.signInWithPassword({email,password});
    setLoading(false);
    if(error) setMsg(error.message); else { router.push("/admin"); router.refresh(); }
  };
  const loginGoogle=async()=>{
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: `${window.location.origin}/auth/callback` } });
    if(error) setMsg(error.message);
  };
  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="eyebrow">Admin Access</div>
      <h1 className="display text-[32px] mt-2">Welcome back</h1>
      <p className="text-sm text-[var(--muted)] mt-2">Demo: admin@aura.bali / Admin123! — or use Google login (requires Supabase Google provider enabled).</p>
      <form onSubmit={loginEmail} className="mt-6 space-y-3 border border-[var(--line)] bg-white p-6">
        <label className="block text-sm"><span className="text-xs font-medium">Email</span><input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" /></label>
        <label className="block text-sm"><span className="text-xs font-medium">Password</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" /></label>
        {msg && <div className="text-sm text-red-600">{msg}</div>}
        <button disabled={loading} className="w-full h-11 rounded-full bg-[var(--ink)] text-white text-xs tracking-wide font-semibold disabled:opacity-60">{loading?"Signing in…":"Sign in with Email"}</button>
      </form>
      <button onClick={loginGoogle} className="mt-3 w-full h-11 rounded-full bg-white border border-[var(--line)] text-sm flex items-center justify-center gap-2">
        <span className="w-5 h-5 rounded-full bg-blue-500 text-white grid place-items-center text-[10px]">G</span> Continue with Google
      </button>
      <div className="mt-4 text-xs text-[var(--muted)]">Google OAuth requires enabling Google provider in Supabase Auth dashboard and adding authorized redirect: {typeof window!=="undefined"? window.location.origin+"/auth/callback" : "/auth/callback"}</div>
    </div>
  );
}
