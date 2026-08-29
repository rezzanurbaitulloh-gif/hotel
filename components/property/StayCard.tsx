import Link from "next/link";
import { Stay } from "@/lib/data";
export default function StayCard({ s, featured }: { s: Stay; featured?: boolean }){
  return (
    <Link href={`/stay/${s.slug}`} className={`group block ${featured?"lg:col-span-2":""}`}>
      <div className="overflow-hidden bg-[var(--line)]">
        <img src={s.image} alt={s.name} loading="lazy" className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition duration-700" />
      </div>
      <div className="pt-4 flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="eyebrow">{s.category}</span>
            <span className="text-[11px] text-[var(--muted)]">• {s.size} • {s.view}</span>
          </div>
          <h3 className="display text-[22px] mt-1">{s.name}</h3>
          <p className="text-sm text-[var(--muted)] line-clamp-2 mt-1 leading-6">{s.description}</p>
        </div>
        <div className="text-right">
          <div className="text-[11px] tracking-[0.14em] text-[var(--muted)]">FROM</div>
          <div className="text-[18px] font-medium">${s.price}</div>
          <div className="text-[11px] text-[var(--muted)]">per night</div>
        </div>
      </div>
    </Link>
  );
}
