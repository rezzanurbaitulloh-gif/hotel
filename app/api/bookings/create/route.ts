import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";
export async function POST(req: Request){
  try{
    const data = await req.json();
    const supabase = createServiceClient();
    // server-side pricing validation
    const valid = ["ocean-villa","jungle-suite","cliff-residence","garden-loft"];
    if(!valid.includes(data.stay_slug)) return Response.json({ error:"Invalid stay"},{status:400});
    const nights = Math.round((new Date(data.check_out).getTime()-new Date(data.check_in).getTime())/86400000);
    if(nights<=0) return Response.json({ error:"Invalid dates"},{status:400});
    const prices:any={ "ocean-villa":890, "jungle-suite":420, "cliff-residence":1850, "garden-loft":290 };
    const expected = nights * prices[data.stay_slug] + (data.addons_total||0);
    if(Math.abs(expected - data.total)>1) return Response.json({ error:"Pricing mismatch"},{status:400});
    const { data: inserted, error } = await supabase.from("bookings").insert({
      stay_slug: data.stay_slug, check_in: data.check_in, check_out: data.check_out,
      adults: data.adults, children: data.children,
      guest_name: data.guest_name, guest_email: data.guest_email, guest_phone: data.guest_phone,
      special_request: data.special_request, addons: data.addons,
      nights, rate: prices[data.stay_slug], addons_total: data.addons_total||0, total: expected, status:"pending"
    }).select().single();
    if(error) return Response.json({ error: error.message },{status:500});
    return Response.json({ booking: inserted });
  }catch(e:any){ return Response.json({ error:e.message},{status:500}); }
}
