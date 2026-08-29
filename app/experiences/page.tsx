import Link from "next/link";
import { experiences } from "@/lib/data";
export const metadata={ title:"Experiences" };
export default function ExpPage(){
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Curated</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Experiences</h1>
      <p className="text-[15px] leading-7 text-[var(--muted)] max-w-2xl mt-3">Wellness at dawn, surf with local guides, temple before opening, dinner on the cliff. Private, unhurried, arranged by concierge.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {experiences.map(e=>(
          <Link key={e.slug} href={`/experiences/${e.slug}`} className="group block border border-[var(--line)] bg-white overflow-hidden">
            <img src={e.image} alt={e.title} className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition" loading="lazy" />
            <div className="p-4"><div className="eyebrow text-[10px]">{e.category} • {e.duration}</div><div className="font-medium mt-1">{e.title}</div><div className="text-xs text-[var(--muted)] mt-1">{e.price}</div></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
