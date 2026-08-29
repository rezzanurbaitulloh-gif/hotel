import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";

export async function DELETE(){
  const supabase=await createClient();
  const { data:{ user } }=await supabase.auth.getUser();
  if(!user) return Response.json({error:"Unauthorized"},{status:401});
  
  const service=createServiceClient();
  const { error }=await service.auth.admin.deleteUser(user.id);
  if(error) return Response.json({error:error.message},{status:400});
  return Response.json({ok:true});
}
