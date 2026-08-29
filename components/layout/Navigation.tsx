"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import LanguageSwitcher from "./LanguageSwitcher";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href:"/rooms", label:"Rooms" },
  { href:"/offers", label:"Offers" },
  { href:"/experiences", label:"Experiences" },
  { href:"/about", label:"About" },
  { href:"/gallery", label:"Gallery" },
  { href:"/contact", label:"Contact" },
];

export default function Navigation(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const pathname=usePathname();
  const { t, locale } = useI18n();
  const supabase=createClient();
  const router=useRouter();
  const [user,setUser]=useState<any>(null);
  const [openProfile,setOpenProfile]=useState(false);
  useEffect(()=>{ supabase.auth.getUser().then(({data})=> setUser(data.user)); const {data: sub}=supabase.auth.onAuthStateChange((_e,s)=> setUser(s?.user||null)); return()=> sub.subscription.unsubscribe(); },[]);
  const isHome=pathname==="/";
  useEffect(()=>{ const h=(e:MouseEvent)=>{ const el=document.getElementById("profile-dropdown"); if(el && !el.contains(e.target as Node)) setOpenProfile(false); }; if(openProfile) document.addEventListener("click", h); return()=> document.removeEventListener("click", h); },[openProfile]);
  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>16);
    onScroll(); window.addEventListener("scroll",onScroll); return()=>window.removeEventListener("scroll",onScroll);
  },[]);
  useEffect(()=>{ setOpen(false); },[pathname]);
  useEffect(()=>{
    if(open) document.body.style.overflow="hidden"; else document.body.style.overflow="";
  },[open]);
  const light = isHome && !scrolled && !open;
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all ${light? "bg-transparent text-white":"bg-[var(--bg)]/95 backdrop-blur text-[var(--ink)] border-b border-[var(--line)]"} ${scrolled||open?"shadow-sm":""}`}>
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 h-[72px] flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full border border-current grid place-items-center text-[11px] tracking-[0.18em]">A</span>
            <span className={`text-[13px] tracking-[0.22em] font-semibold ${light?"text-white":"text-[var(--ink)]"}`}>AURA</span>
            <span className={`hidden sm:inline text-[11px] tracking-[0.12em] ${light?"text-white/70":"text-[var(--muted)]"}`}>BALINESE CLIFF RETREAT</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.08em]">
            {links.map(l=>(
              <Link key={l.href} href={l.href} className={`hover:opacity-60 transition-opacity ${(pathname===l.href || (l.href==="/rooms" && pathname.startsWith("/stay")) || (l.href==="/about" && pathname.startsWith("/story")))?"underline underline-offset-8 decoration-[var(--accent)]":""}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><LanguageSwitcher /></div>
            {user ? (
              <div className="hidden sm:block relative">
                <button onClick={()=> setOpenProfile(!openProfile)} className={`h-9 px-3 flex items-center gap-2 rounded-full border text-xs ${light?"border-white/30 text-white":"border-[var(--line)] bg-white"}`}>
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-[10px] overflow-hidden">
                    {user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : (user.user_metadata?.name?.[0] || user.email?.[0]?.toUpperCase())}
                  </span>
                  <span className="max-w-[100px] truncate">{user.user_metadata?.name || user.email?.split("@")[0]}</span>
                  <span className="text-[10px]">▾</span>
                </button>
                {openProfile && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-3 border-b bg-secondary/50">
                      <div className="text-sm font-medium truncate">{user.user_metadata?.name || "Guest"}</div>
                      <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                    </div>
                    <div className="py-1">
                      <Link href="/profile" onClick={()=>setOpenProfile(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted">◎ Profile</Link>
                      <Link href="/profile?tab=settings" onClick={()=>setOpenProfile(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted">⚙ Pengaturan Akun</Link>
                      <Link href="/my-reservations" onClick={()=>setOpenProfile(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted">▭ Pesanan Saya</Link>
                      <Link href="/dashboard" onClick={()=>setOpenProfile(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted">◈ Dashboard</Link>
                      <div className="border-t my-1"></div>
                      <button onClick={async()=>{ await supabase.auth.signOut(); setOpenProfile(false); router.refresh(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted text-red-600">Logout</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className={`hidden sm:inline-flex h-9 px-4 items-center text-xs rounded-full border ${light?"border-white/30 text-white":"border-[var(--line)]"}`}>Login</Link>
                <Link href="/register" className={`hidden sm:inline-flex h-9 px-4 items-center text-xs rounded-full ${light?"bg-white text-black":"bg-[var(--ink)] text-white"}`}>Register</Link>
              </>
            )}
            <Link href="/booking" className={`hidden sm:inline-flex h-9 px-5 items-center text-[12px] tracking-[0.14em] font-semibold rounded-full transition ${light?"bg-white text-black hover:bg-white/90":"bg-[var(--ink)] text-white hover:bg-black"}`}>{t.common.book}</Link>
            <button aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)} className={`lg:hidden w-9 h-9 grid place-items-center rounded-full border ${light?"border-white/30 text-white":"border-[var(--line)]"}`}>
              <span className="w-4 h-[1.5px] bg-current block shadow-[0_5px_0_currentColor,0_-5px_0_currentColor]"></span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col lg:hidden">
          <div className="h-[72px] px-6 flex items-center justify-between border-b border-[var(--line)]">
            <span className="text-[13px] tracking-[0.22em] font-semibold">AURA</span>
            <button onClick={()=>setOpen(false)} aria-label="Close menu" className="w-9 h-9 grid place-items-center rounded-full border border-[var(--line)]">✕</button>
          </div>
          <nav className="flex-1 px-6 py-8 space-y-1 overflow-auto">
            <div className="mb-4"><LanguageSwitcher /></div>
            {links.map(l=>(
              <Link key={l.href} href={l.href} className="flex justify-between items-center py-4 border-b border-[var(--line)] text-[22px] font-light tracking-wide">
                <span className="display">{l.label}</span><span className="text-[11px] tracking-[0.2em] text-[var(--muted)]">—</span>
              </Link>
            ))}
            <Link href="/contact" className="flex justify-between items-center py-4 border-b border-[var(--line)] text-[22px] font-light"><span className="display">Contact</span></Link>
            <Link href="/faq" className="flex justify-between items-center py-4 border-b border-[var(--line)] text-[22px] font-light"><span className="display">FAQ</span></Link>
            <div className="pt-4 space-y-2">
              {user ? <><div className="flex items-center gap-2 mb-3"><span className="w-8 h-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs overflow-hidden">{user.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : user.email[0].toUpperCase()}</span><div><div className="text-sm font-medium">{user.user_metadata?.name || user.email.split("@")[0]}</div><div className="text-xs text-muted-foreground">{user.email}</div></div></div><Link href="/profile" onClick={()=>setOpen(false)} className="w-full h-10 rounded-full border grid place-items-center text-sm">◎ Profile</Link><Link href="/profile?tab=settings" onClick={()=>setOpen(false)} className="w-full h-10 rounded-full border grid place-items-center text-sm">⚙ Pengaturan</Link><Link href="/my-reservations" onClick={()=>setOpen(false)} className="w-full h-10 rounded-full border grid place-items-center text-sm">▭ Pesanan Saya</Link><Link href="/dashboard" onClick={()=>setOpen(false)} className="w-full h-10 rounded-full bg-secondary grid place-items-center text-sm">Dashboard</Link><button onClick={async()=>{await supabase.auth.signOut(); router.refresh(); setOpen(false);}} className="w-full h-10 rounded-full border text-red-600">Logout</button></> : <><Link href="/auth/login" className="w-full h-10 rounded-full border grid place-items-center" onClick={()=>setOpen(false)}>Login</Link><Link href="/register" className="w-full h-10 rounded-full bg-[var(--ink)] text-white grid place-items-center" onClick={()=>setOpen(false)}>Register</Link></>}
            </div>
          </nav>
          <div className="p-6 border-t border-[var(--line)] space-y-3">
            <Link href="/booking" className="flex h-12 items-center justify-center bg-[var(--ink)] text-white rounded-full tracking-[0.14em] text-[13px] font-semibold">CHECK AVAILABILITY</Link>
            <a href="https://wa.me/6281234567890" className="flex h-12 items-center justify-center rounded-full border border-[var(--line)] text-[13px]">Chat Concierge — WhatsApp</a>
          </div>
        </div>
      )}
      <div className="h-[72px] aria-hidden" />
    </>
  );
}
