"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Profile(){
  const supabase=createClient();
  const [user,setUser]=useState<any>(null);
  useEffect(()=>{ supabase.auth.getUser().then(({data})=> setUser(data.user)); },[]);
  if(!user) return <div className="mx-auto max-w-2xl p-6 text-sm">Please <a href="/auth/login" className="underline">login</a> to view profile.</div>;
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <Card><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div>Name: {user.user_metadata?.name||"-"}</div><div>Email: {user.email}</div><div>Role: {user.user_metadata?.role||"-"}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Reservations</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">View your bookings at <a href="/dashboard/reservations" className="underline">My Reservations</a> (requires login).</CardContent></Card>
    </div>
  );
}
