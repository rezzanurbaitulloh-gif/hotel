import { stays } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
export async function generateStaticParams(){ return stays.map(s=>({slug:s.slug})); }
export async function generateMetadata({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params;
  const s=stays.find(x=>x.slug===slug);
  return { title: s? `${s.name} — Stay` : "Stay" };
}
export default async function StayDetail({ params }:{ params: Promise<{slug:string}> }){
  const { slug } = await params;
  const s=stays.find(x=>x.slug===slug);
  if(!s) return notFound();

  return (
    <div>
      <section className="relative h-[62vh] min-h-[420px] overflow-hidden bg-black">
        <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-end pb-8 text-white">
          <div className="eyebrow text-white/70">{s.category} • {s.size} • {s.view}</div>
          <h1 className="display text-[40px] lg:text-[56px] mt-2">{s.name}</h1>
          <div className="text-white/80 text-sm mt-2">For {s.capacity} • {s.bed} • From ${s.price}/night</div>
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8 grid lg:grid-cols-[1.1fr_0.7fr] gap-8">
        <div>
          <p className="text-[15px] leading-7 text-[var(--muted)]">{s.description}</p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="border border-[var(--line)] p-4 bg-white"><div className="eyebrow text-[10px]">Size</div><div className="font-medium mt-1">{s.size}</div></div>
            <div className="border border-[var(--line)] p-4 bg-white"><div className="eyebrow text-[10px]">Bed</div><div className="font-medium mt-1">{s.bed}</div></div>
            <div className="border border-[var(--line)] p-4 bg-white"><div className="eyebrow text-[10px]">View</div><div className="font-medium mt-1">{s.view}</div></div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {s.images.map((src,i)=><img key={i} src={src} alt={s.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />)}
          </div>
          <div className="mt-8">
            <h3 className="font-medium">Amenities</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--muted)]">
              {s.amenities.map(a=><li key={a} className="flex gap-2"><span className="text-[var(--accent)]">•</span>{a}</li>)}
            </ul>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div><h4 className="font-medium">What&apos;s Included</h4><ul className="mt-2 text-sm text-[var(--muted)] space-y-1">{s.included.map(i=><li key={i}>— {i}</li>)}</ul></div>
            <div><h4 className="font-medium">Policies</h4><p className="mt-2 text-sm text-[var(--muted)]">{s.policy}</p></div>
          </div>
        </div>
        <div className="lg:sticky lg:top-[88px] h-fit border border-[var(--line)] bg-white p-6">
          <div className="text-sm text-[var(--muted)]">From</div>
          <div className="text-[28px] font-medium">${s.price} <span className="text-sm text-[var(--muted)] font-normal">/ night</span></div>
          <Link href={`/booking?stay=${s.slug}`} className="mt-4 h-11 w-full inline-flex items-center justify-center rounded-full bg-[var(--ink)] text-white text-xs tracking-[0.14em] font-semibold">CHECK AVAILABILITY</Link>
          <a href="https://wa.me/6281234567890" className="mt-3 h-11 w-full inline-flex items-center justify-center rounded-full border border-[var(--line)] text-xs tracking-wide">Ask Concierge</a>
          <div className="mt-6 text-xs text-[var(--muted)]">Pricing validated server-side at booking. Availability held 15 minutes.</div>
          <div className="mt-6">
            <div className="eyebrow">Related</div>
            <div className="mt-3 space-y-3">
              {stays.filter(x=>x.slug!==s.slug).slice(0,2).map(r=>(
                <Link key={r.slug} href={`/stay/${r.slug}`} className="flex gap-3">
                  <img src={r.image} alt={r.name} className="w-20 h-14 object-cover" /><div><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-[var(--muted)]">From ${r.price}</div></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
