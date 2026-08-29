import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
export async function middleware(request: NextRequest){
  let response = NextResponse.next({ request: { headers: request.headers } });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll(){ return request.cookies.getAll(); },
      setAll(cookiesToSet){ cookiesToSet.forEach(({name,value,options})=> { request.cookies.set(name,value); response.cookies.set(name,value,options); }); },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");
  // allow admin page to show even without auth but protect API; UI will handle redirect
  // For now, if accessing /admin and not logged in, let through but page will prompt login
  return response;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] };
