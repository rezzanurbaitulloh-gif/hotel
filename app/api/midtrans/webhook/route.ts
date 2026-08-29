export const runtime="nodejs";
export async function POST(req: Request){
  const body = await req.json();
  // Verify signature: sha512(order_id+status_code+gross_amount+serverKey)
  // For now log and ack
  console.log("Midtrans webhook", body);
  return Response.json({ status:"ok" });
}
