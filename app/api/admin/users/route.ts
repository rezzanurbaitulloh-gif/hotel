import { createServiceClient } from "@/lib/supabase/server";
export const runtime="nodejs";
function isAuthorized(role:string){ return ["SUPER_ADMIN","ADMIN"].includes(role); }
export async function POST(req:Request){
  try{
    const { createClient } = await import("@/lib/supabase/server");
    const supabaseAuth = await createClient();
    const { data:{ user } } = await supabaseAuth.auth.getUser();
    if(!user) return Response.json({error:"Unauthorized"}, {status:401});
    const role = user.user_metadata?.role || "admin";
    // allow admin, super_admin to create; for demo allow any logged in
    // if(!isAuthorized(role) && role!=="admin") return Response.json({error:"Forbidden"}, {status:403});
    const body=await req.json();
    const { name, email, password, role: newRole } = body;
    if(!email || !password || !name) return Response.json({error:"Missing fields"}, {status:400});
    if(!["SUPER_ADMIN","ADMIN","MANAGER","CONTENT_EDITOR","FINANCE","BOOKING_STAFF"].includes(newRole)) return Response.json({error:"Invalid role"}, {status:400});
    const service=createServiceClient();
    const { data, error } = await service.auth.admin.createUser({
      email, password, email_confirm:true, user_metadata:{ name, role:newRole }
    });
    if(error) return Response.json({error:error.message}, {status:400});
    return Response.json({user:data.user});
  }catch(e:any){ return Response.json({error:e.message},{status:500}); }
}
export async function GET(){
  const service=createServiceClient();
  const { data, error } = await service.auth.admin.listUsers();
  if(error) return Response.json({error:error.message},{status:500});
  return Response.json({users: data.users.map(u=> ({id:u.id,email:u.email, role:u.user_metadata?.role, created_at:u.created_at}))});
}
