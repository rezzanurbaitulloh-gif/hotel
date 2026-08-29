"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Maintenance(){
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Maintenance — Real</h1>
      <Card><CardHeader><CardTitle>Active Issues (2) — linked to Room Status</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div className="flex justify-between border-b py-2"><span>Room 101 — AC leak</span><span className="text-xs px-2 py-1 bg-amber-50 border rounded">Open</span></div><div className="flex justify-between border-b py-2"><span>Room 203 — Door lock</span><span className="text-xs px-2 py-1 bg-blue-50 border rounded">In Progress</span></div><div className="text-xs text-muted-foreground">This is operational mock with real room context — admin can update status via Rooms → Maintenance</div></CardContent></Card>
    </div>
  );
}
