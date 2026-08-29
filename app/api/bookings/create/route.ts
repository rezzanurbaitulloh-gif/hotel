import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
export const runtime="nodejs";

export async function POST(req:Request){
  try{
    const body=await req.json();
    const supabase=createServiceClient();
    
    // Validate required fields
    const { stay_slug, check_in, check_out, adults, children, guest_name, guest_email, guest_phone, special_request, addons, addon_ids, total } = body;
    
    if(!stay_slug || !check_in || !check_out || !adults || !guest_name || !guest_email || !total){
      return Response.json({error:"Missing required fields"},{status:400});
    }
    
    // Verify stay exists
    const { data: property, error: propError } = await createServiceClient()
      .from("properties")
      .select("id, base_price")
      .eq("slug", stay_slug)
      .eq("status", "published")
      .single();
      
    if(propError || !property){
      return Response.json({error:"Invalid stay"},{status:400});
    }
    
    // Check availability
    const { data: availability } = await createServiceClient()
      .rpc("check_availability", { p_stay_slug: stay_slug, p_check_in: check_in, p_check_out: check_out });
      
    if(!availability || !availability[0]?.available){
      return Response.json({error:"Not available for selected dates"},{status:400});
    }
    
    // Calculate pricing
    const { data: pricing } = await createServiceClient()
      .rpc("calculate_booking_total", { 
        p_stay_id: property.id, 
        p_check_in: check_in, 
        p_check_out: check_out,
        p_addon_ids: []
      });
      
    const nights = Math.ceil((new Date(check_out).getTime() - new Date(check_in).getTime()) / (1000 * 60 * 60 * 24));
    const totalCalculated = pricing?.[0]?.total || 0;
    
    // Validate pricing (allow small difference for rounding)
    if(Math.abs(totalCalculated - total) > 5){
      return Response.json({error:"Pricing mismatch"},{status:400});
    }
    
    // Create booking
    const slug = `BK-${Date.now().toString(36).toUpperCase()}`;
    const { data: booking, error } = await createServiceClient()
      .from("bookings")
      .insert({
        slug,
        stay_slug,
        stay_id: property.id,
        check_in,
        check_out,
        adults,
        children: 0,
        guest_name: body.guest_name,
        guest_email: body.guest_email,
        guest_phone: body.guest_phone,
        special_request: body.special_request,
        addons: body.addons || [],
        addon_ids: body.addon_ids || [],
        nights,
        rate: property.base_price,
        addons_total: 0,
        taxes: 0,
        fees: 0,
        total: totalCalculated,
        status: "pending",
        payment_status: "pending",
      })
      .select()
      .single();
      
    if(error) return Response.json({error:error.message},{status:500});
    
    return Response.json({booking});
  }catch(e:any){
    return Response.json({error:e.message},{status:500});
  }
}
