
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
export const runtime="nodejs";
export async function GET(){
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("offers").select("*").order("created_at");
  if(error) return Response.json({error:error.message},{status:500});
  return Response.json({offers:data});
}
export async function POST(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("offers").insert(body).select().single();
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({offer:data});
}
