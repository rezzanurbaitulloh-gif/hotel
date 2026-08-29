import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";
export async function GET(){
  const supabase=createServiceClient();
  const { data, error } = await supabase.from("bookings").select("*").order("created_at",{ascending:false}).limit(50);
  if(error) return Response.json({ error: error.message },{status:500});
  return Response.json({ bookings: data });
}
