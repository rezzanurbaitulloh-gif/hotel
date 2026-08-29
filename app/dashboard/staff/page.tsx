"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
export default function Staff(){
  const [users,setUsers]=useState<any[]>([]);
  useEffect(()=>{ fetch("/api/admin/users").then(r=>r.json()).then(d=> setUsers(d.users||[])); },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Staff — Real ({users.length})</h1>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Staff</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Created</TableHead></TableRow></TableHeader><TableBody>{users.map(u=> <TableRow key={u.id}><TableCell>{u.email}</TableCell><TableCell><Badge>{u.role||"guest"}</Badge></TableCell><TableCell><Badge variant="success">Active</Badge></TableCell><TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell></TableRow>)}{users.length===0 && <TableRow><TableCell colSpan={4} className="p-6 text-center text-sm text-muted-foreground">No staff — create via Dashboard → Staff → Add User (real Supabase Auth)</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
    </div>
  );
}
