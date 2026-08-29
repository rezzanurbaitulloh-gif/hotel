import { offers } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
export async function generateStaticParams(){ return offers.map(o=>({slug:o.slug})); }
export default function OfferDetail({ params }:{ params:{slug:string}}){
  const o=offers.find(x=>x.slug===params.slug);
  if(!o) return notFound();
  if(!o.active) return <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12"><div className="border border-amber-200 bg-amber-50 p-6">This offer has expired.</div></div>;
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-8">
      <img src={o.image} alt={o.title} className="w-full aspect-[4/3] object-cover" />
      <div>
        <div className="eyebrow">{o.validity}</div>
        <h1 className="display text-[32px] lg:text-[44px] mt-2">{o.title}</h1>
        <div className="text-sm text-[var(--muted)] mt-1">{o.subtitle} — {o.price}</div>
        <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">{o.description}</p>
        <div className="mt-6"><div className="font-medium">Inclusions</div><ul className="mt-2 text-sm text-[var(--muted)] space-y-1">{o.inclusions.map(i=><li key={i}>— {i}</li>)}</ul></div>
        <div className="mt-4 text-xs text-[var(--muted)]">Terms: {o.terms}</div>
        <Link href="/booking" className="mt-6 h-11 px-6 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs tracking-wide">BOOK THIS OFFER</Link>
      </div>
    </div>
  );
}
