import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";
export async function GET(){
  const supabase=createServiceClient();
  const { data }=await supabase.from("media").select("*").order("ordering");
  return Response.json({ media: data||[] });
}
