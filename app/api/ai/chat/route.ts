export const runtime = "nodejs";
export async function POST(req: Request){
  try{
    const { message } = await req.json();
    if(!message) return Response.json({ error:"Missing message"},{status:400});
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if(!apiKey) return Response.json({ reply: "AI key not configured — please use WhatsApp concierge: +62 812 3456 7890" });
    // Try Gemini 1.5 flash
    const prompt = `You are AURA Balinese Cliff Retreat concierge. Answer concisely, warmly, premium tone. Villa info: Ocean Villa $890, Jungle Suite $420, Cliff Residence $1850, Garden Loft $290. Dining: SERA (wood fire, 18-23) and Bale Dauh (07-15). Transfer 40min airport, heli 12min. If asked to book, guide to /booking. User: ${message}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const r = await fetch(url, { method:"POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify({ contents:[{parts:[{text: prompt}]}] }) });
    if(!r.ok){
      const txt = await r.text();
      console.error("Gemini error", txt);
      return Response.json({ reply: "AI temporarily unavailable — please chat via WhatsApp." });
    }
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I can help with villa selection, pricing and transfers — what dates are you considering?";
    return Response.json({ reply });
  }catch(e){
    return Response.json({ reply: "AI error — try again or WhatsApp us." });
  }
}
