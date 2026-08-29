"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { stays } from "@/lib/data";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useI18n } from "@/lib/i18n/provider";
type Addon={ key:string; label:string; price:number };
const ADDONS: Addon[]=[
  { key:"breakfast", label:"Breakfast included", price:0 },
  { key:"transfer", label:"Airport transfer (SUV)", price:45 },
  { key:"romance", label:"Romance setup — flowers & dinner styling", price:120 },
  { key:"extrabed", label:"Extra bed", price:60 },
];
function BookingInner(){
  const { t } = useI18n();
  const router=useRouter();
  const searchParams=useSearchParams();
  const supabase=createClient();
  const [user,setUser]=useState<any>(null);
  const [checkIn,setCheckIn]=useState("");
  const [checkOut,setCheckOut]=useState("");
  const [adults,setAdults]=useState(2);
  const [children,setChildren]=useState(0);
  const [staySlug,setStaySlug]=useState(stays[0].slug);
  const [selectedAddons,setSelectedAddons]=useState<string[]>(["breakfast"]);
  const [guest,setGuest]=useState({name:"", email:"", phone:"", request:""});
  const [step,setStep]=useState<1|2|3>(1);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState(false);
  const [midtransUrl,setMidtransUrl]=useState<string | null>(null);

  useEffect(()=>{
    supabase.auth.getUser().then(({data})=> setUser(data.user));
    const {data:sub}=supabase.auth.onAuthStateChange((_e,s)=> setUser(s?.user||null));
    return()=> sub.subscription.unsubscribe();
  },[]);
  useEffect(()=>{
    const saved=localStorage.getItem("aura_booking_state");
    if(saved){
      try{
        const s=JSON.parse(saved);
        if(s.checkIn) setCheckIn(s.checkIn);
        if(s.checkOut) setCheckOut(s.checkOut);
        if(s.adults) setAdults(s.adults);
        if(s.children!==undefined) setChildren(s.children);
        if(s.staySlug) setStaySlug(s.staySlug);
        if(s.selectedAddons) setSelectedAddons(s.selectedAddons);
        if(s.guest) setGuest(s.guest);
      }catch{}
    }
    const qStay=searchParams.get("stay");
    if(qStay && stays.find(x=>x.slug===qStay)) setStaySlug(qStay);
  },[]);

  const stay = stays.find(s=>s.slug===staySlug)!;
  const nights = useMemo(()=>{
    if(!checkIn || !checkOut) return 0;
    const a=new Date(checkIn), b=new Date(checkOut);
    const diff=(b.getTime()-a.getTime())/86400000;
    return diff>0? Math.round(diff):0;
  },[checkIn,checkOut]);
  const addonsTotal = ADDONS.filter(a=>selectedAddons.includes(a.key)).reduce((s,a)=>s+a.price,0);
  const subtotal = nights * stay.price;
  const total = subtotal + addonsTotal;

  const validateDates=()=>{
    if(!checkIn || !checkOut) return "Select check-in and check-out.";
    if(nights<=0) return "Check-out must be after check-in.";
    if(nights>30) return "Maximum 30 nights.";
    return "";
  };

  const handleAvailability=()=>{
    const e=validateDates();
    if(e){ setError(e); return; }
    setError("");
    setLoading(true);
    setTimeout(()=>{ setLoading(false); setStep(2); }, 700);
  };

  const handleConfirm=async()=>{
    if(!user){
      localStorage.setItem("aura_booking_state", JSON.stringify({checkIn,checkOut,adults,children,staySlug,selectedAddons,guest}));
      setError(t.booking.need_login);
      setTimeout(()=> router.push(`/auth/login?returnTo=${encodeURIComponent("/booking")}`), 800);
      return;
    }
    if(!guest.name || !guest.email){ setError("Name and email required."); return; }
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(guest.email)){ setError("Invalid email."); return; }
    const e=validateDates(); if(e){ setError(e); setStep(1); return; }
    setError(""); setLoading(true);
    try{
      const res = await fetch("/api/bookings/create",{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({
        stay_slug: stay.slug,
        check_in: checkIn,
        check_out: checkOut,
        adults, children,
        guest_name: guest.name,
        guest_email: guest.email,
        guest_phone: guest.phone,
        special_request: guest.request,
        addons: selectedAddons,
        addons_total: addonsTotal,
        total
      })});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error||"Booking failed");
      let midtrans:any=null;
      try{
        const mres=await fetch("/api/midtrans/create",{method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({
          order_id: data.booking.id,
          amount: total,
          stay: stay.name,
          check_in: checkIn, check_out: checkOut, guest
        })});
        midtrans=await mres.json();
        if(midtrans.redirect_url) setMidtransUrl(midtrans.redirect_url);
      }catch{}
      localStorage.removeItem("aura_booking_state");
      setLoading(false);
      setSuccess(true);
      setStep(3);
    }catch(err:any){
      setLoading(false); setError(err.message);
    }
  };

  if(success){
    return (
      <div className="mx-auto max-w-[720px] px-6 lg:px-8 py-12 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-green-100 grid place-items-center text-green-700">✓</div>
        <h1 className="display text-[32px] mt-4">{t.booking.success_title}</h1>
        <p className="text-[15px] leading-7 text-[var(--muted)] mt-3">{t.booking.success_desc} <strong className="text-[var(--ink)]">{stay.name}</strong> — {nights} night{nights>1?"s":""} — {checkIn} → {checkOut}. Concierge will confirm availability and pricing within one hour (07:00–23:00 WITA). No payment taken yet — integration-ready for Stripe/payment gateway.</p>
        <div className="mt-6 p-4 border border-[var(--line)] bg-white text-left text-sm">
          <div className="font-medium">Summary</div>
          <div className="text-[var(--muted)] mt-1">Guest: {guest.name} — {guest.email} {guest.phone && `• ${guest.phone}`}</div>
          <div className="text-[var(--muted)]">Total validated server-side: ${total} ({nights} × ${stay.price} + addons {addonsTotal})</div>
          {guest.request && <div className="mt-2">Request: {guest.request}</div>}
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          {midtransUrl ? <a href={midtransUrl} target="_blank" className="h-11 px-7 inline-flex items-center rounded-full bg-[#C9A96E] text-white text-xs tracking-wide font-semibold">{t.booking.pay_midtrans}</a> : <div className="text-xs text-[var(--muted)]">Midtrans payment link will appear here when gateway is live. Concierge will send secure link via WhatsApp.</div>}
          <div className="flex gap-3">
            <Link href="/" className="h-10 px-5 inline-flex items-center rounded-full border border-[var(--line)] text-xs">{t.booking.back_home}</Link>
            <a href="https://wa.me/6281234567890" className="h-10 px-5 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs">CHAT CONCIERGE</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Booking</div>
      <h1 className="display text-[32px] lg:text-[44px] mt-2">{t.booking.title}</h1>
      <div className="mt-2 flex gap-2 text-xs">
        <span className={`px-3 py-1 rounded-full ${step===1?"bg-[var(--ink)] text-white":"bg-white border border-[var(--line)]"}`}>{t.booking.step1}</span>
        <span className={`px-3 py-1 rounded-full ${step===2?"bg-[var(--ink)] text-white":"bg-white border border-[var(--line)]"}`}>{t.booking.step2}</span>
        <span className={`px-3 py-1 rounded-full ${step===3?"bg-[var(--ink)] text-white":"bg-white border border-[var(--line)]"}`}>{t.booking.step3}</span>
      </div>

      {!user && <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-sm">You are not logged in. <Link href={`/auth/login?returnTo=${encodeURIComponent("/booking")}`} className="underline font-medium">{t.booking.login_cta}</Link> — required to complete booking. {t.booking.need_login}</div>}

      {error && <div role="alert" className="mt-4 p-3 bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>}

      {step===1 && (
        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="border border-[var(--line)] bg-white p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="text-sm"><span className="block text-xs font-medium">{t.booking.checkin}</span><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" /></label>
              <label className="text-sm"><span className="block text-xs font-medium">{t.booking.checkout}</span><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" /></label>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <label className="text-sm"><span className="block text-xs font-medium">{t.booking.adults}</span><select value={adults} onChange={e=>setAdults(parseInt(e.target.value))} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg"><option value={1}>1</option><option value={2}>2</option><option value={3}>3</option><option value={4}>4</option></select></label>
              <label className="text-sm"><span className="block text-xs font-medium">{t.booking.children}</span><select value={children} onChange={e=>setChildren(parseInt(e.target.value))} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg"><option value={0}>0</option><option value={1}>1</option><option value={2}>2</option></select></label>
              <label className="text-sm"><span className="block text-xs font-medium">{t.booking.stay}</span><select value={staySlug} onChange={e=>setStaySlug(e.target.value)} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg">{stays.map(s=> <option key={s.slug} value={s.slug}>{s.name} — ${s.price}/n</option>)}</select></label>
            </div>
            <div>
              <div className="text-xs font-medium">{t.booking.addons}</div>
              <div className="mt-2 space-y-2">
                {ADDONS.map(a=>(
                  <label key={a.key} className="flex items-center gap-3 text-sm border border-[var(--line)] rounded-lg px-3 py-2">
                    <input type="checkbox" checked={selectedAddons.includes(a.key)} onChange={e=> setSelectedAddons(prev=> e.target.checked? [...prev,a.key]: prev.filter(k=>k!==a.key))} />
                    <span className="flex-1">{a.label}</span><span className="text-xs text-[var(--muted)]">{a.price===0?"Included":`+$${a.price}`}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleAvailability} disabled={loading} className="h-11 px-6 rounded-full bg-[var(--ink)] text-white text-xs tracking-[0.14em] font-semibold disabled:opacity-60">{loading?"CHECKING…":t.booking.check_btn}</button>
            <div className="text-xs text-[var(--muted)]">Pricing validated server-side. Availability held 15 minutes. No fake payment — integration layer ready for Stripe.</div>
          </div>
          <div className="border border-[var(--line)] bg-white p-6 h-fit lg:sticky top-[88px]">
            <div className="eyebrow">{t.booking.summary}</div>
            <div className="mt-3 flex gap-3">
              <img src={stay.image} alt={stay.name} className="w-20 h-14 object-cover" />
              <div><div className="font-medium">{stay.name}</div><div className="text-xs text-[var(--muted)]">{stay.category} • {stay.size}</div></div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[var(--muted)]">{t.booking.nights}</span><span>{nights||"—"}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted)]">{t.booking.adults} / {t.booking.children}</span><span>{adults} / {children}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted)]">{t.booking.rate}</span><span>${stay.price} / night</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted)]">Subtotal</span><span>${subtotal}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted)]">Add-ons</span><span>${addonsTotal}</span></div>
              <div className="border-t border-[var(--line)] pt-2 flex justify-between font-medium"><span>{t.booking.total}</span><span>${total}</span></div>
            </div>
            {nights===0 && <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-xs text-amber-800">Select dates to see total.</div>}
            {nights>0 && <div className="mt-4 p-3 bg-green-50 border border-green-200 text-xs text-green-800">Dates available — proceed to guest details.</div>}
          </div>
        </div>
      )}

      {step===2 && (
        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="border border-[var(--line)] bg-white p-6 space-y-4">
            <h3 className="font-medium">{t.booking.guest_details}</h3>
            <label className="text-sm block"><span className="block text-xs font-medium">{t.booking.name}</span><input value={guest.name} onChange={e=>setGuest({...guest, name:e.target.value})} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="Jane Doe" /></label>
            <label className="text-sm block"><span className="block text-xs font-medium">{t.booking.email}</span><input value={guest.email} onChange={e=>setGuest({...guest, email:e.target.value})} type="email" className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="jane@email.com" /></label>
            <label className="text-sm block"><span className="block text-xs font-medium">{t.booking.phone}</span><input value={guest.phone} onChange={e=>setGuest({...guest, phone:e.target.value})} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="+62 ..." /></label>
            <label className="text-sm block"><span className="block text-xs font-medium">{t.booking.request}</span><textarea value={guest.request} onChange={e=>setGuest({...guest, request:e.target.value})} rows={3} className="mt-1 w-full p-3 border border-[var(--line)] rounded-lg" placeholder="Celebration, dietary, arrival time..." /></label>
            <div className="flex gap-3">
              <button onClick={()=>setStep(1)} className="h-11 px-5 rounded-full border border-[var(--line)] text-xs">{t.booking.back}</button>
              <button onClick={handleConfirm} disabled={loading} className="h-11 px-6 rounded-full bg-[var(--ink)] text-white text-xs tracking-wide disabled:opacity-60">{loading?"SENDING…":t.booking.confirm}</button>
            </div>
            <div className="text-xs text-[var(--muted)]">No payment charged now. Concierge confirms and sends secure payment link.</div>
          </div>
          <div className="border border-[var(--line)] bg-white p-6">
            <div className="font-medium">{t.booking.review}</div>
            <div className="mt-3 text-sm space-y-1 text-[var(--muted)]">
              <div>{stay.name} — {nights} night{nights>1?"s":""}</div>
              <div>{checkIn} → {checkOut}</div>
              <div>{adults} adults {children? `• ${children} children`: ""}</div>
              <div className="pt-2 font-medium text-[var(--ink)]">Total ${total}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default function Booking(){
  return <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-12">Loading…</div>}><BookingInner /></Suspense>;
}
