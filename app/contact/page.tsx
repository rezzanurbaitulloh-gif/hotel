"use client";
import { useState } from "react";
export default function Contact(){
  const [state,setState]=useState<{loading:boolean; success:boolean; error:string}>({loading:false, success:false, error:""});
  const [form,setForm]=useState({name:"", email:"", phone:"", subject:"", message:""});
  const onSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.name || !form.email || !form.message){ setState(s=>({...s, error:"Please fill name, email and message."})); return; }
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)){ setState(s=>({...s, error:"Invalid email."})); return; }
    setState({loading:true, success:false, error:""});
    setTimeout(()=> setState({loading:false, success:true, error:""}), 900);
  };
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
      <div>
        <div className="eyebrow">Contact</div>
        <h1 className="display text-[36px] lg:text-[52px] mt-2">Concierge</h1>
        <p className="text-[15px] leading-7 text-[var(--muted)] mt-3">WhatsApp is fastest. Or leave a note — we reply within an hour, 07:00–23:00 WITA.</p>
        <div className="mt-6 space-y-3 text-sm">
          <div><span className="font-medium">Phone</span> <a href="tel:+623618466789" className="text-[var(--muted)] underline">+62 361 846 6789</a></div>
          <div><span className="font-medium">Email</span> <a href="mailto:hello@aura-bali.com" className="text-[var(--muted)] underline">hello@aura-bali.com</a></div>
          <div><span className="font-medium">WhatsApp</span> <a href="https://wa.me/6281234567890" className="text-[var(--muted)] underline">+62 812 3456 7890</a></div>
          <div className="pt-4 flex gap-2">
            <a href="https://wa.me/6281234567890" className="h-10 px-5 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs">CHAT WHATSAPP</a>
            <a href="tel:+623618466789" className="h-10 px-5 inline-flex items-center rounded-full border border-[var(--line)] text-xs">CALL</a>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className="border border-[var(--line)] bg-white p-6 space-y-4" noValidate>
        {state.success && <div role="status" className="p-3 bg-green-50 border border-green-200 text-sm text-green-800">Message sent — we will reply shortly. <button type="button" onClick={()=>setState({loading:false, success:false, error:""})} className="underline ml-2">Send another</button></div>}
        {state.error && <div role="alert" className="p-3 bg-red-50 border border-red-200 text-sm text-red-700">{state.error}</div>}
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm"><span className="block text-xs tracking-wide font-medium">Name *</span><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="Your name" required /></label>
          <label className="text-sm"><span className="block text-xs tracking-wide font-medium">Email *</span><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} type="email" className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="you@email.com" required /></label>
        </div>
        <label className="text-sm block"><span className="block text-xs tracking-wide font-medium">Phone</span><input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="+62 ..." /></label>
        <label className="text-sm block"><span className="block text-xs tracking-wide font-medium">Subject</span><input value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="mt-1 w-full h-10 px-3 border border-[var(--line)] rounded-lg" placeholder="Booking inquiry, celebration, transfer..." /></label>
        <label className="text-sm block"><span className="block text-xs tracking-wide font-medium">Message *</span><textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} rows={5} className="mt-1 w-full p-3 border border-[var(--line)] rounded-lg" placeholder="Tell us dates, guests and wishes..." required /></label>
        <button disabled={state.loading} className="h-11 px-6 rounded-full bg-[var(--ink)] text-white text-xs tracking-[0.14em] font-semibold disabled:opacity-60">{state.loading?"SENDING…":"SEND MESSAGE"}</button>
        <div className="text-xs text-[var(--muted)]">By sending you agree to be contacted about your stay. No marketing spam.</div>
      </form>
    </div>
  );
}
