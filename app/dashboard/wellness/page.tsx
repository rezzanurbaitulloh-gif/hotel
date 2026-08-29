"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Wellness(){
  const [services,setServices]=useState<any[]>([]);
  useEffect(()=>{
    fetch("/api/admin/wellness").then(r=>r.json()).then(d=> setServices(d.services||[])).catch(()=>{});
  },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Wellness Services — Real</h1>
      <Card><CardHeader><CardTitle>Wellness Services — Real ({services.length})</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table><TableHeader><TableRow><TableHead>Service</TableHead><TableHead>Category</TableHead><TableHead>Duration</TableHead><TableHead>Price</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {services.map(s=> <TableRow key={s.id}><TableCell>{s.name}</TableCell><TableCell>{s.category}</TableCell><TableCell>{s.duration}</TableCell><TableCell>{s.price}</TableCell><TableCell><Badge variant={s.status==="published"?"success":"secondary"}>{s.status}</Badge></TableCell></TableRow>)}
              {services.length===0 && <TableRow><TableCell colSpan={5} className="p-6 text-center text-sm text-muted-foreground">No services — create via /dashboard/wellness (real data)</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
