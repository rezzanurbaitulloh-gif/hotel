"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
export default function Footer(){
  const { t }=useI18n();
  return (
    <footer className="bg-[var(--obsidian)] text-[var(--ivory)] border-t border-[var(--gold)]/20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full border border-[var(--gold)]/30 grid place-items-center text-[10px] tracking-[0.2em]">A</span><span className="text-xs tracking-[0.24em] font-light">AURA</span></div>
            <p className="mt-4 text-sm leading-6 text-[var(--stone)] max-w-xs font-light">A private cliff retreat above the Indian Ocean. Villas, suites and residences composed for light, quiet and horizon. Grand Luxury Hospitality.</p>
            <div className="mt-6 flex gap-3 text-[10px] tracking-[0.16em]"><a href="#" className="hover:text-[var(--champagne)]">Instagram</a><a href="#" className="hover:text-[var(--champagne)]">Facebook</a></div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] text-[var(--champagne)] mb-4">STAY</div>
            <ul className="space-y-2 text-sm font-light text-[var(--stone)]">
              <li><Link href="/rooms" className="hover:text-[var(--ivory)]">Suites & Villas</Link></li>
              <li><Link href="/experiences" className="hover:text-[var(--ivory)]">Experiences</Link></li>
              <li><Link href="/dining" className="hover:text-[var(--ivory)]">Dining</Link></li>
              <li><Link href="/offers" className="hover:text-[var(--ivory)]">Offers</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] text-[var(--champagne)] mb-4">JOURNEY</div>
            <ul className="space-y-2 text-sm font-light text-[var(--stone)]">
              <li><Link href="/about" className="hover:text-[var(--ivory)]">About</Link></li>
              <li><Link href="/gallery" className="hover:text-[var(--ivory)]">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--ivory)]">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--ivory)]">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] text-[var(--champagne)] mb-4">RESERVATIONS</div>
            <p className="text-sm leading-6 text-[var(--stone)] font-light">Jalan Cliff No.88, Uluwatu<br/>+62 361 846 6789<br/>hello@aura-bali.com</p>
            <div className="mt-4 flex gap-2">
              <a href="https://wa.me/6281234567890" className="h-8 px-4 inline-flex items-center border border-[var(--gold)]/30 text-xs tracking-wide hover:bg-white hover:text-black">WhatsApp</a>
              <a href="tel:+623618466789" className="h-8 px-4 inline-flex items-center bg-[var(--champagne)] text-[var(--obsidian)] text-xs">Call</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/40 font-light">
          <span>© {new Date().getFullYear()} AURA — Grand Luxury Hospitality</span>
          <span className="flex gap-4"><Link href="/dashboard" className="hover:text-white">Privacy</Link><Link href="/dashboard" className="hover:text-white">Terms</Link></span>
        </div>
      </div>
    </footer>
  );
}
