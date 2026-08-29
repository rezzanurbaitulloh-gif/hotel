import { Card, CardContent } from "@/components/ui/card";
export function StatCard({ title, value, trend, icon }: { title:string; value:string; trend?:string; icon?: React.ReactNode }){
  return (
    <Card className="border">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="text-xs font-medium text-muted-foreground">{title}</div>
          <div className="w-7 h-7 rounded-md bg-secondary grid place-items-center text-xs">{icon||"•"}</div>
        </div>
        <div className="text-xl font-semibold mt-2">{value}</div>
        {trend && <div className="text-xs text-green-600 mt-1">{trend}</div>}
      </CardContent>
    </Card>
  );
}
