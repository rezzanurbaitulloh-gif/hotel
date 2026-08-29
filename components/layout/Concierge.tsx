"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Concierge(){
  const p=usePathname();
  if(p.startsWith("/booking")||p.startsWith("/admin")) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-30 flex items-center gap-3">
      <a href="https://wa.me/6281234567890" target="_blank" className="hidden sm:inline-flex h-10 px-4 items-center gap-2 rounded-full bg-white border border-[var(--line)] shadow text-xs tracking-wide">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Chat Concierge
      </a>
      <Link href="/booking" className="flex-1 sm:flex-none h-11 px-6 inline-flex items-center justify-center rounded-full bg-[var(--ink)] text-white text-[12px] tracking-[0.14em] font-semibold shadow-lg">CHECK AVAILABILITY</Link>
    </div>
  );
}
