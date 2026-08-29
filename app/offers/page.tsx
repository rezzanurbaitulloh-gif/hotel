import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { offers as fallback } from "@/lib/data";
export const metadata={ title:"Offers" };
export default async function OffersPage(){
  let offs=fallback;
  try{
    const supabase=await createClient();
    const { data }=await supabase.from("offers").select("*").eq("active",true);
    if(data && data.length>0) offs=data.map((d:any)=>({ slug:d.slug, title:d.title, subtitle:d.subtitle, image:d.image, description:d.description, price:d.price, validity:d.validity, inclusions:d.inclusions||[], terms:d.terms, active:d.active }));
  }catch{}
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Promotions — Live</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Offers</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {offs.map(o=>(
          <Link key={o.slug} href={`/offers/${o.slug}`} className="border border-[var(--line)] bg-white overflow-hidden group">
            <img src={o.image} alt={o.title} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition" loading="lazy" />
            <div className="p-5">
              <div className="eyebrow text-[10px]">{o.validity} {o.active? "• Active":"• Expired"}</div>
              <div className="font-medium mt-1">{o.title}</div>
              <div className="text-xs text-[var(--muted)]">{o.subtitle}</div>
              <div className="text-sm mt-2 font-medium">{o.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
