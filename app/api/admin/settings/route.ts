import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
export const runtime="nodejs";

export async function GET(){
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("hotel_settings").select("*");
  if(error) return Response.json({error:error.message},{status:500});
  return Response.json({settings:data});
}

export async function POST(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("hotel_settings").upsert(body).select().single();
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({setting:data});
}

export async function PUT(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const { key, ...rest }=body;
  if(!key) return Response.json({error:"Missing key"},{status:400});
  const supabase=createServiceClient();
  const { data, error }=await supabase.from("hotel_settings").upsert({key,...rest}).select().single();
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({setting:data});
}

export async function DELETE(req:Request){
  const auth=await (await createClient()).auth.getUser();
  if(!auth.data.user) return Response.json({error:"Unauthorized"},{status:401});
  const { searchParams }=new URL(req.url);
  const key=searchParams.get("key");
  if(!key) return Response.json({error:"Missing key"},{status:400});
  const supabase=createServiceClient();
  const { error }=await supabase.from("hotel_settings").delete().eq("key",key);
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({ok:true});
}
