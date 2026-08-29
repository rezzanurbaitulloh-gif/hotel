import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default function Detail({ params }: { params: Promise<{id:string}> }){
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Reservation #RES-2026-00124</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Guest Information</CardTitle></CardHeader><CardContent className="text-sm space-y-1"><div>Ahmad Wijaya</div><div className="text-muted-foreground">ahmad@email.com • +62 812…</div><div>Special: High floor</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Stay Information</CardTitle></CardHeader><CardContent className="text-sm space-y-1"><div>Deluxe King • 42 m²</div><div>Aug 30 — Sep 02 • 3 nights • 2 guests</div><Badge>Confirmed</Badge></CardContent></Card>
        <Card><CardHeader><CardTitle>Payment</CardTitle></CardHeader><CardContent className="text-sm space-y-1"><div>Room $540</div><div>Tax $54</div><div className="font-semibold">Total $594 • Paid</div></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent className="text-xs space-y-2"><div>✓ Reservation Created — Aug 28</div><div>✓ Payment Received</div><div>✓ Confirmation Sent</div><div>○ Check-in — Aug 30</div><div>○ Check-out — Sep 02</div></CardContent></Card>
    </div>
  );
}
