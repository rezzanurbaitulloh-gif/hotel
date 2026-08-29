"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Admin(){
  const supabase=createClient();
  const router=useRouter();
  const [user,setUser]=useState<any>(null);
  const [loading,setLoading]=useState(true);
  const [bookings,setBookings]=useState<any[]>([]);
  useEffect(()=>{
    supabase.auth.getUser().then(({data})=>{
      setUser(data.user);
      setLoading(false);
      if(!data.user){
        router.push("/auth/login");
      } else {
        // fetch bookings via service? use anon with RLS - bookings table currently only service_role can read, so we fetch via API
        fetch("/api/bookings/list").then(r=>r.json()).then(d=> setBookings(d.bookings||[])).catch(()=>{});
      }
    });
  },[]);
  const logout=async()=>{ await supabase.auth.signOut(); router.push("/auth/login"); };
  if(loading) return <div className="mx-auto max-w-5xl px-6 py-12">Loading…</div>;
  if(!user) return null;
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center">
        <div><div className="eyebrow">Administration</div><h1 className="display text-[30px] mt-1">Dashboard</h1><div className="text-sm text-[var(--muted)]">Signed in as {user.email} — {user.user_metadata?.role||"admin"}</div></div>
        <button onClick={logout} className="h-9 px-4 rounded-full border border-[var(--line)] text-xs">Sign out</button>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="border border-[var(--line)] bg-white p-5"><div className="font-medium">Bookings</div><div className="text-2xl font-light mt-1">{bookings.length}</div><div className="text-xs text-[var(--muted)]">pending + confirmed</div></div>
        <div className="border border-[var(--line)] bg-white p-5"><div className="font-medium">Properties</div><div className="text-2xl font-light mt-1">4</div><div className="text-xs text-[var(--muted)]">Ocean Villa, Jungle Suite, Cliff Residence, Garden Loft</div></div>
      </div>
      <div className="mt-6 border border-[var(--line)] bg-white">
        <div className="px-4 py-3 border-b border-[var(--line)] font-medium text-sm">Recent bookings</div>
        {bookings.length===0 ? <div className="p-6 text-sm text-[var(--muted)]">No bookings yet — create one at <Link href="/booking" className="underline">/booking</Link>. Bookings are stored server-side with pricing validation.</div> : (
          <div className="divide-y divide-[var(--line)]">
            {bookings.slice(0,20).map((b:any)=>(
              <div key={b.id} className="px-4 py-3 text-sm flex justify-between gap-4">
                <div><div className="font-medium">{b.guest_name} — {b.stay_slug}</div><div className="text-xs text-[var(--muted)]">{b.check_in} → {b.check_out} • {b.adults} adults • ${b.total}</div></div>
                <span className={`h-6 px-2 rounded-full text-xs inline-flex items-center border ${b.status==="confirmed"?"bg-green-50 border-green-200 text-green-700":"bg-amber-50 border-amber-200"}`}>{b.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 text-xs text-amber-800">Midtrans: {process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ? "configured (production)" : "missing"} • Gemini AI: {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? "configured" : "missing"} • Google OAuth: enable in Supabase Auth dashboard (Google provider) and add redirect {typeof window!=="undefined"? window.location.origin: ""}/auth/callback</div>
    </div>
  );
}
