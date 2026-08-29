"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const nav=[
  { section:"Overview", items:[{href:"/dashboard", label:"Dashboard", icon:"◈"}]},
  { section:"Reservations", items:[{href:"/dashboard/reservations", label:"All Reservations", icon:"▭"}, {href:"/dashboard/calendar", label:"Calendar", icon:"▦"}, {href:"/dashboard/reservations/new", label:"New Reservation", icon:"+"}]},
  { section:"Hotel", items:[{href:"/dashboard/rooms", label:"Rooms", icon:"▭"}, {href:"/dashboard/rooms/types", label:"Room Types", icon:"⬢"}, {href:"/dashboard/housekeeping", label:"Housekeeping", icon:"✦"}, {href:"/dashboard/maintenance", label:"Maintenance", icon:"⚙"}]},
  { section:"Guests", items:[{href:"/dashboard/guests", label:"Guests", icon:"◎"}, {href:"/dashboard/guest-requests", label:"Guest Requests", icon:"✉"}]},
  { section:"Finance", items:[{href:"/dashboard/payments", label:"Payments", icon:"$"}, {href:"/dashboard/revenue", label:"Revenue", icon:"↗"}, {href:"/dashboard/reports", label:"Reports", icon:"▤"}]},
  { section:"Management", items:[{href:"/dashboard/staff", label:"Staff", icon:"◐"}, {href:"/dashboard/settings", label:"Settings", icon:"⚙"}]},
];

export default function DashboardLayout({ children }: { children: React.ReactNode }){
  const pathname=usePathname();
  const [collapsed,setCollapsed]=useState(false);
  const [mobile,setMobile]=useState(false);
  const router=useRouter();
  const supabase=createClient();
  return (
    <div className="min-h-screen bg-[#F8F8F7] flex">
      {/* Sidebar desktop */}
      <aside className={`${collapsed?"w-[64px]":"w-[240px]"} hidden md:flex flex-col border-r bg-white transition-all shrink-0 sticky top-0 h-screen`}>
        <div className="h-14 flex items-center px-4 border-b gap-2">
          <div className="w-7 h-7 rounded bg-primary text-primary-foreground grid place-items-center text-xs font-bold">A</div>
          {!collapsed && <span className="text-sm font-semibold tracking-wide">AURA PMS</span>}
          <button onClick={()=>setCollapsed(!collapsed)} className="ml-auto w-7 h-7 grid place-items-center border rounded text-xs">{collapsed?"»":"«"}</button>
        </div>
        <nav className="flex-1 overflow-auto py-3">
          {nav.map(sec=>(
            <div key={sec.section} className="px-2 py-2">
              {!collapsed && <div className="px-2 text-[10px] tracking-[0.14em] font-semibold text-muted-foreground mb-1">{sec.section}</div>}
              <div className="space-y-1">
                {sec.items.map(it=>{
                  const active=pathname===it.href;
                  return <Link key={it.href} href={it.href} className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm ${active?"bg-primary text-primary-foreground":"hover:bg-muted"}`} title={it.label}>
                    <span className="w-5 text-center text-xs">{it.icon}</span>
                    {!collapsed && <span className="truncate">{it.label}</span>}
                  </Link>
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t">
          {!collapsed && <button onClick={async()=>{await supabase.auth.signOut(); router.push("/auth/login");}} className="w-full h-8 border rounded-md text-xs">Logout</button>}
        </div>
      </aside>
      {/* Mobile */}
      {mobile && <div className="fixed inset-0 z-40 md:hidden bg-black/20" onClick={()=>setMobile(false)} />}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r md:hidden transition ${mobile?"translate-x-0":"-translate-x-full"}`}>
        <div className="h-14 flex items-center px-4 border-b"><span className="font-semibold">AURA PMS</span><button onClick={()=>setMobile(false)} className="ml-auto">✕</button></div>
        <nav className="p-3 space-y-4 overflow-auto h-[calc(100%-56px)]">
          {nav.map(sec=>(
            <div key={sec.section}><div className="text-[10px] font-semibold text-muted-foreground">{sec.section}</div>
              {sec.items.map(it=> <Link key={it.href} href={it.href} onClick={()=>setMobile(false)} className={`flex gap-2 py-2 px-2 rounded ${pathname===it.href?"bg-primary text-primary-foreground":""}`}><span>{it.icon}</span>{it.label}</Link>)}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 border-b bg-white flex items-center px-4 gap-3 sticky top-0 z-10">
          <button onClick={()=>setMobile(true)} className="md:hidden w-8 h-8 border rounded grid place-items-center">☰</button>
          <div className="text-sm font-medium hidden sm:block">Hotel Management</div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" className="hidden sm:inline-flex h-8 px-3 border rounded-md text-xs items-center">View Site</Link>
            <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
