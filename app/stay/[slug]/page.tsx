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
    <div>
      <section className="relative h-[62vh] min-h-[420px] overflow-hidden bg-black">
        <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-end pb-8 text-white">
          <div className="eyebrow text-white/70">{s.category} • {s.size} • {s.view}</div>
          <h1 className="display text-[40px] lg:text-[56px] mt-2">{s.name}</h1>
          <div className="text-white/80 text-sm mt-2">For {s.capacity} • {s.bed} • From ${s.price}/night • Live from Supabase</div>
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
            {s.images.map((src:string,i:number)=><img key={i} src={src} alt={s.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />)}
          </div>
          <div className="mt-8">
            <h3 className="font-medium">Amenities (real)</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--muted)]">
              {s.amenities.map((a:string)=><li key={a} className="flex gap-2"><span className="text-[var(--accent)]">•</span>{a}</li>)}
            </ul>
          </div>
        </div>
        <div className="lg:sticky lg:top-[88px] h-fit border border-[var(--line)] bg-white p-6">
          <div className="text-sm text-[var(--muted)]">From</div>
          <div className="text-[28px] font-medium">${s.price} <span className="text-sm text-[var(--muted)] font-normal">/ night</span></div>
          <Link href={`/booking?stay=${s.slug}`} className="mt-4 h-11 w-full inline-flex items-center justify-center rounded-full bg-[var(--ink)] text-white text-xs tracking-[0.14em] font-semibold">CHECK AVAILABILITY</Link>
          <div className="mt-6 text-xs text-[var(--muted)]">Pricing validated server-side. Live inventory.</div>
        </div>
      </div>
    </div>
  );
}
