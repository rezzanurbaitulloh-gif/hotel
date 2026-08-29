"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { stays as fallbackStays, experiences as fallbackExps, offers as fallbackOffers, dining as fallbackDining } from "@/lib/data";

export default function Home(){
  const { t }=useI18n();
  const [activeExp,setActiveExp]=useState(0);
  const [scrollY,setScrollY]=useState(0);
  useEffect(()=>{ const h=()=> setScrollY(window.scrollY); window.addEventListener("scroll", h, {passive:true}); return()=> window.removeEventListener("scroll", h); },[]);
  const exps=[
    { n:"01", title:"THE RESIDENCE", desc:"A private world\nof absolute comfort.", img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80" },
    { n:"02", title:"DINING", desc:"A table worth\ntravelling for.", img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80" },
    { n:"03", title:"WELLNESS", desc:"Restore\nyourself.", img:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80" },
    { n:"04", title:"JOURNEY", desc:"Beyond\nthe resort.", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80" },
  ];
  return (
    <div className="bg-[var(--ivory)]">
      {/* HERO — Cinematic Full Viewport */}
      <section className="relative h-[100vh] min-h-[600px] overflow-hidden bg-[var(--obsidian)] -mt-[72px] pt-[72px]">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80" alt="AURA" className="w-full h-full object-cover" style={{transform:`scale(${1 + scrollY*0.00015}) translateY(${scrollY*0.12}px)`}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-32" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center text-white pt-12">
          <div className="eyebrow text-[var(--champagne)] tracking-[0.28em]">DESTINATION · INDONESIA</div>
          <h1 className="display-heavy text-[48px] sm:text-[64px] lg:text-[88px] mt-4 leading-[0.85]">
            A WORLD<br/>BEYOND<br/><span className="italic font-light">ORDINARY.</span>
          </h1>
          <p className="mt-6 text-white/70 text-sm tracking-wide font-light">Discover the experience — Grand Luxury Hospitality on the Balinese cliff</p>
          <div className="mt-8 flex gap-3">
            <Link href="/rooms" className="h-11 px-8 inline-flex items-center justify-center bg-white text-[var(--obsidian)] text-[11px] tracking-[0.16em] font-light hover:bg-[var(--ivory)] transition">EXPLORE</Link>
            <Link href="/booking" className="h-11 px-8 inline-flex items-center justify-center border border-white/40 text-white text-[11px] tracking-[0.16em] font-light hover:bg-white hover:text-black transition">RESERVE</Link>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.2em] text-white/60">EXPLORE</span>
            <span className="w-[1px] h-8 bg-white/30"></span>
          </div>
        </div>
        {/* Floating Booking Bar — Grand Luxury */}
        <div className="absolute bottom-6 inset-x-4 lg:inset-x-8 hidden md:block">
          <div className="mx-auto max-w-[1100px] bg-[var(--obsidian)]/85 backdrop-blur-[12px] border border-[var(--champagne)]/20 rounded-sm px-6 py-4 flex items-center gap-6">
            <div className="flex-1 grid grid-cols-4 gap-6 text-white">
              <div><div className="text-[9px] tracking-[0.18em] text-[var(--champagne)]">CHECK IN</div><div className="text-sm font-light mt-1">30 AUG</div></div>
              <div><div className="text-[9px] tracking-[0.18em] text-[var(--champagne)]">CHECK OUT</div><div className="text-sm font-light mt-1">02 SEP</div></div>
              <div><div className="text-[9px] tracking-[0.18em] text-[var(--champagne)]">GUESTS</div><div className="text-sm font-light mt-1">2 Guests</div></div>
              <div><div className="text-[9px] tracking-[0.18em] text-[var(--champagne)]">ROOMS</div><div className="text-sm font-light mt-1">1 Room</div></div>
            </div>
            <Link href="/booking" className="h-11 px-8 bg-[var(--champagne)] text-[var(--obsidian)] text-[11px] tracking-[0.16em] font-light inline-flex items-center hover:bg-[var(--gold)] transition">CHECK AVAILABILITY</Link>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO — WOW #2 */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div>
            <h2 className="display text-[42px] lg:text-[64px] leading-[0.85]">
              A PLACE<br/>DESIGNED<br/>TO BE<br/><span className="italic font-light">REMEMBERED.</span>
            </h2>
            <div className="mt-6 w-12 h-[1px] bg-[var(--gold)]"></div>
            <p className="mt-6 text-sm leading-7 text-[var(--stone)] font-light max-w-md">AURA sits on limestone 80m above the Indian Ocean. Marble, stone, wood and brass — architectural lines that frame horizon, quiet and lingering light. Each pavilion placed for privacy, linked by frangipani paths.</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=800&q=80" alt="Architecture" className="w-full aspect-[4/5] object-cover hover:scale-[1.02] transition duration-1000" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-32 overflow-hidden border-4 border-[var(--ivory)] shadow-xl hidden lg:block">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" alt="Detail" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES — Interactive Editorial */}
      <section className="bg-[var(--obsidian)] text-[var(--ivory)] py-12 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <div className="flex justify-between items-end">
            <div><div className="eyebrow text-[var(--champagne)]">Signature</div><h2 className="display text-[32px] lg:text-[48px] mt-2">EXPERIENCES</h2></div>
            <div className="hidden sm:flex gap-2 text-[11px] tracking-[0.16em]">{exps.map((e,i)=> <button key={e.n} onClick={()=> setActiveExp(i)} className={`px-3 py-1 border ${i===activeExp?"border-[var(--champagne)] text-[var(--champagne)]":"border-white/20 text-white/60"}`}>{e.n}</button>)}</div>
          </div>
          <div className="mt-8 grid lg:grid-cols-[380px_1fr] gap-8">
            <div className="space-y-1">
              {exps.map((e,i)=>(
                <button key={e.n} onClick={()=> setActiveExp(i)} className={`w-full text-left py-6 border-b flex justify-between items-center group ${i===activeExp?"border-[var(--champagne)]":"border-white/10"}`}>
                  <div>
                    <div className={`text-xs tracking-[0.2em] ${i===activeExp?"text-[var(--champagne)]":"text-white/40"}`}>{e.n}</div>
                    <div className={`text-lg tracking-wide mt-1 ${i===activeExp?"text-white":"text-white/60"}`}>{e.title}</div>
                  </div>
                  <span className={`text-xs ${i===activeExp?"text-[var(--champagne)]":"text-white/20"}`}>→</span>
                </button>
              ))}
              <div className="pt-6">
                <div className="text-sm font-light whitespace-pre-line text-white/70">{exps[activeExp].desc}</div>
                <Link href="/experiences" className="inline-flex items-center gap-2 mt-4 text-xs tracking-[0.16em] text-[var(--champagne)] hover:gap-3 transition-all">Discover →</Link>
              </div>
            </div>
            <div className="overflow-hidden bg-black">
              <img key={activeExp} src={exps[activeExp].img} alt={exps[activeExp].title} className="w-full aspect-[16/10] lg:aspect-[16/9] object-cover transition duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* THE COLLECTION — Accommodation */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <div className="eyebrow">The Collection</div>
          <h2 className="display text-[36px] lg:text-[52px] mt-2">SUITES & VILLAS</h2>
          <div className="mt-4 w-12 h-[1px] bg-[var(--gold)] mx-auto"></div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {fallbackStays.slice(0,6).map((s:any)=>(
            <Link key={s.slug} href={`/stay/${s.slug}`} className="group">
              <div className="overflow-hidden bg-[var(--stone)]/20">
                <img src={s.image} alt={s.name} className="w-full aspect-[4/5] object-cover group-hover:scale-[1.03] transition duration-700" />
              </div>
              <div className="pt-4">
                <div className="text-[11px] tracking-[0.14em] text-[var(--gold)]">{s.category} • {s.size}</div>
                <h3 className="display text-[18px] mt-1">{s.name.toUpperCase()}</h3>
                <div className="text-xs text-[var(--stone)] mt-1">{s.view} • {s.capacity} Guests</div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs">From ${s.price} / night</span>
                  <span className="text-[11px] tracking-[0.14em] border-b border-[var(--gold)] pb-1 group-hover:tracking-wide transition-all">EXPLORE →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DINING — Dramatic */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black">
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80" alt="Dining" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-center">
          <div className="max-w-xl text-white">
            <div className="eyebrow text-[var(--champagne)]">Culinary Journeys</div>
            <h2 className="display text-[40px] lg:text-[56px] mt-2 leading-[0.85]">A TABLE<br/>WORTH<br/><span className="italic font-light">TRAVELLING FOR.</span></h2>
            <p className="mt-4 text-white/70 text-sm font-light">Wood fire, ocean, long breakfast — SERA on the cliff, Bale Dauh under frangipani.</p>
            <Link href="/dining" className="mt-6 inline-flex h-10 px-6 border border-white/30 text-white text-xs tracking-[0.16em] items-center hover:bg-white hover:text-black transition">DISCOVER DINING</Link>
          </div>
        </div>
      </section>

      {/* WELLNESS — Dark */}
      <section className="bg-[var(--espresso)] text-[var(--ivory)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow text-[var(--champagne)]">The Spa</div>
            <h2 className="display text-[40px] lg:text-[56px] mt-2 leading-[0.85]">RESTORE<br/><span className="italic font-light">YOURSELF.</span></h2>
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs tracking-wide font-light">
              <div className="border-t border-[var(--champagne)]/20 pt-3">Treatments</div>
              <div className="border-t border-[var(--champagne)]/20 pt-3">Rituals</div>
              <div className="border-t border-[var(--champagne)]/20 pt-3">Movement</div>
              <div className="border-t border-[var(--champagne)]/20 pt-3">Wellness</div>
            </div>
          </div>
          <div className="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" alt="Spa" className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>

      {/* BEYOND THE RESORT */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80" alt="Beyond" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
          <h2 className="display text-[36px] lg:text-[56px]">BEYOND<br/>THE RESORT</h2>
          <p className="mt-3 text-white/70 text-sm font-light">Yacht • Mountain • Culture • Nature</p>
          <Link href="/experiences" className="mt-6 h-10 px-6 border border-white text-xs tracking-[0.16em] inline-flex items-center hover:bg-white hover:text-black">EXPLORE EXPERIENCES</Link>
        </div>
      </section>

      {/* GALLERY — Horizontal */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end">
          <h2 className="display text-[28px]">GALLERY</h2>
          <Link href="/gallery" className="text-xs tracking-[0.16em] border-b border-[var(--gold)] pb-1">VIEW GALLERY →</Link>
        </div>
        <div className="mt-6 flex gap-3 overflow-auto pb-4">
          {[
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
          ].map((src,i)=> <img key={i} src={src} alt="gallery" className="w-72 h-48 object-cover flex-shrink-0 hover:scale-[1.02] transition" />)}
        </div>
      </section>

      {/* OFFERS — Campaign */}
      <section className="bg-[var(--obsidian)] text-white py-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {fallbackOffers.slice(0,3).map((o:any)=>(
            <Link key={o.slug} href={`/offers/${o.slug}`} className="group border border-white/10 p-6 hover:border-[var(--champagne)]/30 transition">
              <div className="text-[10px] tracking-[0.16em] text-[var(--champagne)]">{o.validity}</div>
              <div className="display text-lg mt-2">{o.title.toUpperCase()}</div>
              <div className="text-xs text-white/60 mt-1">{o.subtitle}</div>
              <div className="mt-4 text-xs border-t border-white/10 pt-3 flex justify-between"><span>{o.price}</span><span className="text-[var(--champagne)]">DISCOVER →</span></div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative py-20 bg-[var(--ivory)] text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-[40px] leading-none text-[var(--gold)]">“</div>
          <p className="display text-[24px] lg:text-[32px] leading-tight">A place that stays with you long after you leave.</p>
          <div className="mt-4 text-xs tracking-[0.16em] text-[var(--stone)]">— Guest Journal</div>
        </div>
      </section>
    </div>
  );
}
