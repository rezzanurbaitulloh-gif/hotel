export const runtime="nodejs";
export async function POST(req: Request){
  try{
    const body = await req.json();
    const { order_id, amount, stay, check_in, check_out, guest } = body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
    const base = isProduction ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com";
    if(!serverKey) return Response.json({ error:"Midtrans not configured"},{status:500});
    const payload = {
      transaction_details: { order_id: order_id || `AURA-${Date.now()}`, gross_amount: amount },
      item_details: [{ id: stay || "villa", price: amount, quantity: 1, name: stay||"Stay" }],
      customer_details: { first_name: guest?.name || "Guest", email: guest?.email || "guest@example.com", phone: guest?.phone || "" },
      callbacks: { finish: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hotel.example.com"}/booking?status=success` }
    };
    const auth = Buffer.from(`${serverKey}:`).toString("base64");
    const res = await fetch(`${base}/snap/v1/transactions`, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Accept":"application/json", "Authorization": `Basic ${auth}` },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(!res.ok) return Response.json({ error: data.error_messages || "Midtrans error", details: data },{status:400});
    return Response.json({ token: data.token, redirect_url: data.redirect_url });
  }catch(e:any){
    return Response.json({ error: e.message },{status:500});
  }
}
