import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
export const runtime="nodejs";

export async function GET(){
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("wellness_services").select("*").order("sort_order");
  if(error) return Response.json({error:error.message},{status:500});
  return Response.json({services:data});
}

export async function POST(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("wellness_services").insert(body).select().single();
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({service:data});
}

export async function PUT(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const { id, ...rest }=body;
  if(!id) return Response.json({error:"Missing id"},{status:400});
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("wellness_services").update(rest).eq("id",id).select().single();
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({service:data});
}

export async function DELETE(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const { searchParams }=new URL(req.url);
  const id=searchParams.get("id");
  if(!id) return Response.json({error:"Missing id"},{status:400});
  const supabase=createServiceClient();
  const { error }=await supabase.from("wellness_services").delete().eq("id",id);
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({ok:true});
}
