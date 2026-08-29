"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import LanguageSwitcher from "./LanguageSwitcher";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href:"/rooms", label:"STAY", sub:"Stay" },
  { href:"/experiences", label:"EXPERIENCE", sub:"Experience" },
  { href:"/dining", label:"DINING", sub:"Dining" },
  { href:"/offers", label:"JOURNEY", sub:"Journey" },
];

export default function Navigation(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const pathname=usePathname();
  const { t } = useI18n();
  const supabase=createClient();
  const router=useRouter();
  const [user,setUser]=useState<any>(null);
  const [openProfile,setOpenProfile]=useState(false);
  useEffect(()=>{ supabase.auth.getUser().then(({data})=> setUser(data.user)); const {data: sub}=supabase.auth.onAuthStateChange((_e,s)=> setUser(s?.user||null)); return()=> sub.subscription.unsubscribe(); },[]);
  const isHome=pathname==="/";
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>24);
    onScroll(); window.addEventListener("scroll",onScroll, {passive:true}); return()=>window.removeEventListener("scroll",onScroll);
  },[]);
  useEffect(()=>{ setOpen(false); },[pathname]);
  useEffect(()=>{ if(open) document.body.style.overflow="hidden"; else document.body.style.overflow=""; },[open]);
  useEffect(()=>{ const h=(e:MouseEvent)=>{ const el=document.getElementById("profile-dropdown"); if(el && !el.contains(e.target as Node)) setOpenProfile(false); }; if(openProfile) document.addEventListener("click", h); return()=> document.removeEventListener("click", h); },[openProfile]);
  const light = isHome && !scrolled && !open;
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${light? "bg-transparent text-white":"bg-[var(--ivory)]/96 backdrop-blur-[12px] text-[var(--obsidian)] border-b border-[var(--line)] shadow-[0_1px_0_rgba(201,179,138,0.15)]"} ${scrolled?"py-0":"py-1"}`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 h-[72px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className={`w-9 h-9 rounded-full border grid place-items-center text-[10px] tracking-[0.2em] font-light ${light?"border-white/30 text-white":"border-[var(--gold)]/40 text-[var(--obsidian)]"}`}>A</span>
            <span className={`text-[13px] tracking-[0.24em] font-light ${light?"text-white":"text-[var(--obsidian)]"}`}>AURA</span>
            <span className={`hidden sm:inline text-[9px] tracking-[0.18em] font-light ${light?"text-white/60":"text-[var(--stone)]"}`}>BALINESE CLIFF RETREAT</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.18em] font-light">
            {links.map(l=>(
              <Link key={l.href} href={l.href} className={`relative py-2 hover:opacity-60 transition-opacity ${pathname.startsWith(l.href)?"after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[var(--gold)]":""}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block"><LanguageSwitcher /></div>
            <span className={`hidden sm:inline text-[11px] ${light?"text-white/50":"text-[var(--stone)]"}`}>♡</span>
            {user ? (
              <div id="profile-dropdown" className="hidden sm:block relative">
                <button onClick={()=> setOpenProfile(!openProfile)} className={`h-9 px-3 flex items-center gap-2 rounded-full border text-xs font-light ${light?"border-white/20 text-white bg-white/5":"border-[var(--line)] bg-white"}`}>
                  <span className="w-6 h-6 rounded-full bg-[var(--obsidian)] text-[var(--ivory)] grid place-items-center text-[10px] overflow-hidden">
                    {user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : (user.user_metadata?.name?.[0] || user.email?.[0]?.toUpperCase())}
                  </span>
                  <span className="max-w-[90px] truncate hidden lg:inline">{user.user_metadata?.name || user.email?.split("@")[0]}</span>
                  <span className="text-[8px]">▾</span>
                </button>
                {openProfile && (
                  <div className="absolute right-0 mt-3 w-64 bg-[var(--ivory)] border border-[var(--line)] shadow-xl overflow-hidden">
                    <div className="p-4 border-b bg-white">
                      <div className="text-sm font-light">{user.user_metadata?.name || "Guest"}</div>
                      <div className="text-xs text-[var(--stone)] truncate">{user.email}</div>
                    </div>
                    <div className="py-2 bg-white">
                      <Link href="/profile" onClick={()=>setOpenProfile(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wide hover:bg-[var(--ivory)]">◎ Profile</Link>
                      <Link href="/profile?tab=settings" onClick={()=>setOpenProfile(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wide hover:bg-[var(--ivory)]">⚙ Pengaturan</Link>
                      <Link href="/my-reservations" onClick={()=>setOpenProfile(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wide hover:bg-[var(--ivory)]">▭ Pesanan Saya</Link>
                      <Link href="/dashboard" onClick={()=>setOpenProfile(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wide hover:bg-[var(--ivory)]">◈ Dashboard</Link>
                      <div className="border-t my-2"></div>
                      <button onClick={async()=>{ await supabase.auth.signOut(); setOpenProfile(false); router.refresh(); }} className="w-full text-left px-4 py-2.5 text-xs hover:bg-[var(--ivory)] text-red-700">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className={`hidden sm:inline-flex h-8 px-4 items-center text-[11px] tracking-[0.14em] font-light border ${light?"border-white/20 text-white hover:bg-white/10":"border-[var(--obsidian)]/20 hover:bg-[var(--obsidian)] hover:text-white"}`}>LOGIN</Link>
                <Link href="/register" className="hidden sm:inline-flex h-8 px-4 items-center text-[11px] tracking-[0.14em] font-light border border-transparent bg-transparent hidden">Register</Link>
              </>
            )}
            <Link href="/booking" className={`hidden sm:inline-flex h-9 px-6 items-center text-[11px] tracking-[0.16em] font-light border ${light?"bg-white text-[var(--obsidian)] border-white hover:bg-[var(--ivory)]":"bg-[var(--obsidian)] text-[var(--ivory)] border-[var(--obsidian)] hover:bg-black"}`}>RESERVE</Link>
            <button aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)} className={`lg:hidden w-9 h-9 grid place-items-center border ${light?"border-white/20 text-white":"border-[var(--line)]"}`}>
              <span className="w-4 h-[1px] bg-current block shadow-[0_5px_0_currentColor,0_-5px_0_currentColor]"></span>
            </button>
          </div>
        </div>
        {scrolled && <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent"></div>}
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--ivory)] flex flex-col lg:hidden">
          <div className="h-[72px] px-6 flex items-center justify-between border-b border-[var(--line)]">
            <span className="text-[13px] tracking-[0.24em] font-light">AURA</span>
            <button onClick={()=>setOpen(false)} aria-label="Close menu" className="w-9 h-9 grid place-items-center border border-[var(--line)]">✕</button>
          </div>
          <nav className="flex-1 px-6 py-8 space-y-1 overflow-auto">
            <div className="mb-6"><LanguageSwitcher /></div>
            {links.map(l=>(
              <Link key={l.href} href={l.href} className="flex justify-between items-center py-5 border-b border-[var(--line)]">
                <span className="text-[22px] font-light tracking-wide">{l.label}</span><span className="text-[10px] tracking-[0.2em] text-[var(--gold)]">—</span>
              </Link>
            ))}
            <Link href="/gallery" className="flex justify-between items-center py-5 border-b border-[var(--line)]"><span className="text-[22px] font-light">GALLERY</span></Link>
            <Link href="/contact" className="flex justify-between items-center py-5 border-b border-[var(--line)]"><span className="text-[22px] font-light">CONTACT</span></Link>
            <div className="pt-6 space-y-3">
              {user ? <><div className="flex items-center gap-3 mb-4"><span className="w-10 h-10 rounded-full bg-[var(--obsidian)] text-white grid place-items-center">{user.email[0].toUpperCase()}</span><div><div className="text-sm font-light">{user.user_metadata?.name || user.email.split("@")[0]}</div><div className="text-xs text-[var(--stone)]">{user.email}</div></div></div><Link href="/profile" onClick={()=>setOpen(false)} className="w-full h-11 border grid place-items-center text-sm font-light">Profile</Link><Link href="/my-reservations" onClick={()=>setOpen(false)} className="w-full h-11 border grid place-items-center text-sm font-light">Pesanan Saya</Link><button onClick={async()=>{await supabase.auth.signOut(); router.refresh(); setOpen(false);}} className="w-full h-11 border text-red-600">Logout</button></> : <><Link href="/auth/login" className="w-full h-11 border grid place-items-center font-light" onClick={()=>setOpen(false)}>LOGIN</Link><Link href="/register" className="w-full h-11 bg-[var(--obsidian)] text-white grid place-items-center font-light" onClick={()=>setOpen(false)}>REGISTER</Link></>}
            </div>
          </nav>
          <div className="p-6 border-t border-[var(--line)] space-y-3">
            <Link href="/booking" className="flex h-12 items-center justify-center bg-[var(--obsidian)] text-white tracking-[0.16em] text-xs font-light">RESERVE — CHECK AVAILABILITY</Link>
            <a href="https://wa.me/6281234567890" className="flex h-12 items-center justify-center border border-[var(--line)] text-xs font-light">Chat Concierge — WhatsApp</a>
          </div>
        </div>
      )}
      <div className="h-[72px] aria-hidden" />
    </>
  );
}
