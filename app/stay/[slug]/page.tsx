import { createClient } from "@/lib/supabase/server";
import { stays as fallback } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
export async function generateStaticParams(){
  try{
    const supabase=await createClient();
    const { data }=await supabase.from("properties").select("slug").eq("status","published");
    if(data && data.length>0) return data.map((d:any)=>({slug:d.slug}));
  }catch{}
  return fallback.map(s=>({slug:s.slug}));
}
export async function generateMetadata({ params }:{ params: Promise<{slug:string}> }){
  const { slug }=await params;
  try{
    const supabase=await createClient();
    const { data }=await supabase.from("properties").select("name").eq("slug",slug).single();
    if(data) return { title: `${data.name} — Stay` };
  }catch{}
  const s=fallback.find(x=>x.slug===slug);
  return { title: s? `${s.name} — Stay` : "Stay" };
}
export default async function StayDetail({ params }:{ params: Promise<{slug:string}> }){
  const { slug }=await params;
  let s:any=null;
  try{
    const supabase=await createClient();
    const { data }=await supabase.from("properties").select("*").eq("slug",slug).single();
    if(data) s={ slug:data.slug, name:data.name, category:data.category, price:data.price, size:data.size, bed:data.bed, view:data.view, capacity:data.capacity, description:data.description, image:data.image, images:data.images||[data.image], amenities:data.amenities||[], features:data.features||[], included:data.included||[], policy:data.policy };
  }catch{}
  if(!s) s=fallback.find(x=>x.slug===slug);
  if(!s) return notFound();
  return (
    <div className="bg-[var(--ivory)]">
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden bg-black">
        <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-end pb-12 text-white">
          <div className="eyebrow text-[var(--champagne)]">{s.category} • {s.view}</div>
          <h1 className="display text-[48px] lg:text-[72px] mt-2 leading-[0.85]">{s.name.toUpperCase()}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] tracking-[0.16em] font-light">
            <span>{s.size}</span><span className="w-px h-3 bg-white/20"></span><span>{s.capacity} GUESTS</span><span className="w-px h-3 bg-white/20"></span><span>PRIVATE POOL</span><span className="w-px h-3 bg-white/20"></span><span>From ${s.price} / night</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-auto pb-2">
          {s.images.map((src:string,i:number)=> <img key={i} src={src} alt={s.name} className="w-[320px] h-[220px] object-cover flex-shrink-0" />)}
          <div className="w-[320px] h-[220px] border border-dashed border-[var(--line)] grid place-items-center text-xs text-muted-foreground flex-shrink-0">Floorplan — available on request</div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 grid lg:grid-cols-[1.7fr_0.9fr] gap-8 pb-12">
        <div>
          <p className="text-[15px] leading-7 text-[var(--stone)] font-light">{s.description} — Grand Luxury hospitality, layered materials, cinematic light.</p>
          <div className="mt-8">
            <h3 className="text-xs tracking-[0.16em] text-[var(--gold)]">LUXURY AMENITIES</h3>
            <div className="mt-3 flex gap-3 overflow-auto pb-2">
              {s.amenities.map((a:string)=> <span key={a} className="px-4 py-2 border border-[var(--line)] bg-white text-xs whitespace-nowrap">{a.toUpperCase()}</span>)}
            </div>
            <div className="mt-2 overflow-hidden whitespace-nowrap border-y border-[var(--line)] py-2">
              <div className="animate-marquee flex gap-8 text-xs tracking-[0.16em] text-[var(--stone)]">
                <span>PRIVATE POOL</span><span>•</span><span>24-HOUR BUTLER</span><span>•</span><span>OCEAN VIEW</span><span>•</span><span>PRIVATE DINING</span><span>•</span><span>PERSONAL CONCIERGE</span><span>•</span><span>AIRPORT TRANSFER</span>
              </div>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div><h4 className="text-xs tracking-[0.16em]">Included</h4><ul className="mt-2 text-sm font-light space-y-1">{s.included.map((i:string)=><li key={i}>— {i}</li>)}</ul></div>
            <div><h4 className="text-xs tracking-[0.16em]">Policies</h4><p className="mt-2 text-sm font-light text-[var(--stone)]">{s.policy}</p></div>
          </div>
        </div>
        <div className="lg:sticky lg:top-[88px] h-fit border border-[var(--line)] bg-white p-6">
          <div className="text-xs tracking-[0.16em] text-[var(--gold)]">YOUR STAY</div>
          <div className="text-2xl font-light mt-2">${s.price} <span className="text-sm text-[var(--stone)] font-light">/ night</span></div>
          <Link href={`/booking?stay=${s.slug}`} className="mt-4 h-11 w-full inline-flex items-center justify-center bg-[var(--obsidian)] text-white text-xs tracking-[0.16em] font-light">RESERVE — CHECK AVAILABILITY</Link>
          <div className="mt-4 text-xs text-[var(--stone)] font-light">Live inventory — pricing validated server-side</div>
        </div>
      </section>
    </div>
  );
}
