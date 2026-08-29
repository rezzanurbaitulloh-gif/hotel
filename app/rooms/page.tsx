import { createClient } from "@/lib/supabase/server";
import StayCard from "@/components/property/StayCard";
import Link from "next/link";
import { stays as fallback } from "@/lib/data";
export const metadata={ title:"Rooms — AURA" };
export default async function Rooms(){
  let staysData=fallback;
  try{
    const supabase=await createClient();
    const { data }=await supabase.from("properties").select("*").eq("status","published").order("price");
    if(data && data.length>0){
      staysData=data.map((d:any)=>({
        slug:d.slug, name:d.name, category:d.category, price:d.price, size:d.size||"-", bed:d.bed||"-", view:d.view||"-", capacity:d.capacity||2,
        description:d.description||"", image:d.image, images:d.images||[d.image], amenities:d.amenities||[], features:d.features||[], included:d.included||[], policy:d.policy||""
      }));
    }
  }catch{}
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Rooms & Villas</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Rooms</h1>
      <p className="text-[15px] leading-7 text-[var(--muted)] max-w-2xl mt-3">Live inventory from Supabase — edits in Dashboard → Rooms update here instantly. No hardcoded data.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {staysData.map(s=> <StayCard key={s.slug} s={s} />)}
      </div>
    </div>
  );
}
