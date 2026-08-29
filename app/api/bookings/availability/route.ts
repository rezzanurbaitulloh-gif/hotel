import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";

export async function GET(req:Request){
  const { searchParams } = new URL(req.url);
  const stay_slug = searchParams.get("stay_slug");
  const check_in = searchParams.get("check_in");
  const check_out = searchParams.get("check_out");
  
  if(!stay_slug || !check_in || !check_out){
    return Response.json({error:"Missing parameters"},{status:400});
  }
  
  const supabase=createServiceClient();
  const { data, error } = await supabase.rpc("check_availability", { 
    p_stay_slug: stay_slug, 
    p_check_in: check_in, 
    p_check_out: check_out 
  });
  
  if(error) return Response.json({error:error.message},{status:500});
  return Response.json({available: data?.[0]?.available || false, conflicting: data?.[0]?.conflicting_bookings || 0});
}
