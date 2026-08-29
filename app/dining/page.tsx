import { dining } from "@/lib/data";
import Link from "next/link";
export const metadata={ title:"Dining" };
export default function Dining(){
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Culinary</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Dining</h1>
      <p className="text-[15px] leading-7 text-[var(--muted)] max-w-2xl mt-3">Fire, brine and garden. Two venues, one kitchen — ingredients landed at dawn, cooked over wood.</p>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        {dining.map(d=>(
          <div key={d.name} className="border border-[var(--line)] bg-white overflow-hidden">
            <img src={d.image} alt={d.name} className="w-full aspect-[16/10] object-cover" loading="lazy" />
            <div className="p-6">
              <div className="text-[18px] tracking-[0.12em] font-semibold">{d.name}</div>
              <div className="text-sm text-[var(--muted)]">{d.concept} • {d.cuisine}</div>
              <p className="text-sm leading-6 text-[var(--muted)] mt-3">{d.description}</p>
              <div className="text-xs mt-3 text-[var(--muted)]">{d.hours}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <a href="https://wa.me/6281234567890" className="h-11 px-6 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs tracking-wide">RESERVE TABLE</a>
        <Link href="/contact" className="h-11 px-6 inline-flex items-center rounded-full border border-[var(--line)] text-xs">Private Dining Inquiry</Link>
      </div>
    </div>
  );
}
