import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import Link from "next/link";

const kpis=[
  { title:"Today's Revenue", value:"$24,580", trend:"+12.5% vs yesterday", icon:"$" },
  { title:"Today's Reservations", value:"128", trend:"+8.2% vs yesterday", icon:"▭" },
  { title:"Occupancy Rate", value:"82.4%", trend:"+4.8% vs last week", icon:"%" },
  { title:"Guests Today", value:"342", trend:"+6.4% vs yesterday", icon:"◎" },
];

export default function Dashboard(){
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Good morning, Admin — Here&apos;s what&apos;s happening at the hotel today.</p>
        </div>
        <div className="flex gap-2">
          <select className="h-8 px-2 border rounded-md text-xs bg-white"><option>Today</option><option>Last 7 days</option><option>Last 30 days</option></select>
          <button className="h-8 px-3 border rounded-md text-xs bg-white">Export</button>
          <button className="h-8 px-3 bg-primary text-primary-foreground rounded-md text-xs">Refresh</button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {kpis.map(k=> <StatCard key={k.title} {...k} />)}
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Arrivals</div><div className="text-lg font-semibold mt-1">24</div><div className="text-xs text-muted-foreground">Arriving today</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Departures</div><div className="text-lg font-semibold mt-1">18</div><div className="text-xs text-muted-foreground">Departing today</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Rooms to Clean</div><div className="text-lg font-semibold mt-1">8</div><div className="text-xs text-muted-foreground">Need housekeeping</div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground">Maintenance</div><div className="text-lg font-semibold mt-1">2</div><div className="text-xs text-muted-foreground">Active issues</div></CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-[1.7fr_0.9fr] gap-4">
        <Card>
          <CardHeader className="flex-row justify-between items-center"><CardTitle>Revenue Overview</CardTitle><div className="flex gap-1 text-xs"><button className="px-2 py-1 bg-primary text-primary-foreground rounded">7 Days</button><button className="px-2 py-1 border rounded">30 Days</button><button className="px-2 py-1 border rounded">90 Days</button></div></CardHeader>
          <CardContent>
            <div className="h-[160px] flex items-end gap-1">
              {[12,18,14,22,16,24,20].map((v,i)=> <div key={i} className="flex-1 bg-primary rounded-t" style={{height: `${(v/24)*100}%`}} />)}
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4 text-xs">
              <div><div className="text-muted-foreground">Total Revenue</div><div className="font-semibold">$124,580</div></div>
              <div><div className="text-muted-foreground">ADR</div><div className="font-semibold">$192</div></div>
              <div><div className="text-muted-foreground">RevPAR</div><div className="font-semibold">$158</div></div>
              <div><div className="text-muted-foreground">Occupancy</div><div className="font-semibold">82%</div></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Room Status</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              ["Available",24,"bg-green-500"],
              ["Occupied",68,"bg-primary"],
              ["Reserved",16,"bg-amber-500"],
              ["Cleaning",8,"bg-blue-500"],
              ["Maintenance",2,"bg-red-500"],
              ["Out of Service",1,"bg-zinc-400"],
            ].map(([label,val,color])=>(
              <div key={label} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                <span className="flex-1 text-xs">{label}</span>
                <span className="text-xs font-medium">{val}</span>
                <div className="w-16 h-1.5 bg-muted rounded overflow-hidden"><div className={`h-full ${color}`} style={{width: `${Math.min(100, (Number(val)/68)*100)}%`}} /></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row justify-between items-center"><CardTitle>Recent Reservations</CardTitle><Link href="/dashboard/reservations" className="text-xs underline">View all</Link></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Guest</TableHead><TableHead>ID</TableHead><TableHead>Room</TableHead><TableHead>Check-in</TableHead><TableHead>Guests</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {[
                ["Ahmad Wijaya","RES-2026-00124","Deluxe King","Aug 30","2","$540","Confirmed"],
                ["Sarah Connor","RES-2026-00123","Ocean Villa","Sep 02","4","$1,780","Pending"],
                ["John Doe","RES-2026-00122","Jungle Suite","Sep 05","2","$420","Checked In"],
              ].map(([guest,id,room,checkin,guests,amount,status])=>(
                <TableRow key={id}>
                  <TableCell>{guest}</TableCell><TableCell className="font-mono text-xs">{id}</TableCell><TableCell>{room}</TableCell><TableCell>{checkin}</TableCell><TableCell>{guests}</TableCell><TableCell>{amount}</TableCell><TableCell><Badge variant={status==="Confirmed"?"success":status==="Pending"?"warning":"secondary"}>{status}</Badge></TableCell><TableCell><button className="text-xs underline">View</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link href="/dashboard/reservations/new" className="h-8 px-3 bg-primary text-primary-foreground rounded-md text-xs inline-flex items-center">+ New Reservation</Link>
          <Link href="/dashboard/guests" className="h-8 px-3 border rounded-md text-xs inline-flex items-center">+ Add Guest</Link>
          <button className="h-8 px-3 border rounded-md text-xs">→ Check-in Guest</button>
          <button className="h-8 px-3 border rounded-md text-xs">→ Check-out Guest</button>
          <Link href="/dashboard/rooms" className="h-8 px-3 border rounded-md text-xs inline-flex items-center">→ Manage Rooms</Link>
        </CardContent>
      </Card>
    </div>
  );
}
