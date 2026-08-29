import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";

export async function GET(){
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("gallery_items").select("*").order("sort_order");
  if(error) return Response.json({error:error.message},{status:500});
  return Response.json({media:data||[]});
}
