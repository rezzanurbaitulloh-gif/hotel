import { experiences } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
export async function generateStaticParams(){ return experiences.map(e=>({slug:e.slug})); }
export default async function ExpDetail({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params;
  const e=experiences.find(x=>x.slug===slug);
  if(!e) return notFound();

  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-8">
      <img src={e.image} alt={e.title} className="w-full aspect-[4/3] object-cover" />
      <div>
        <div className="eyebrow">{e.category} • {e.duration}</div>
        <h1 className="display text-[32px] lg:text-[44px] mt-2">{e.title}</h1>
        <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">{e.description}</p>
        <div className="mt-6">
          <div className="font-medium">Inclusions</div>
          <ul className="mt-2 text-sm text-[var(--muted)] space-y-1">{e.inclusions.map(i=><li key={i}>— {i}</li>)}</ul>
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/booking" className="h-11 px-6 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs tracking-wide">BOOK EXPERIENCE</Link>
          <a href="https://wa.me/6281234567890" className="h-11 px-6 inline-flex items-center rounded-full border border-[var(--line)] text-xs">Ask Concierge</a>
        </div>
      </div>
    </div>
  );
}
