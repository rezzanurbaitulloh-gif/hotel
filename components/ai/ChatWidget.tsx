"use client";
import { useState, useRef, useEffect } from "react";
export default function ChatWidget(){
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [messages,setMessages]=useState<{role:"user"|"assistant"; content:string}[]>([
    { role:"assistant", content:"Hi — I'm AURA Concierge AI. Ask about villas, dining, transfers, or let me help you pick the perfect stay. (Powered by Gemini)" }
  ]);
  const listRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{ listRef.current?.scrollTo(0, listRef.current.scrollHeight); },[messages]);
  const send=async()=>{
    if(!input.trim()||loading) return;
    const userMsg=input.trim();
    setInput("");
    setMessages(m=>[...m,{role:"user", content:userMsg}]);
    setLoading(true);
    try{
      const res=await fetch("/api/ai/chat",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({message:userMsg})});
      const data=await res.json();
      setMessages(m=>[...m,{role:"assistant", content:data.reply || "Sorry, I could not answer."}]);
    }catch(e){ setMessages(m=>[...m,{role:"assistant", content:"Network error — please try WhatsApp."}]);}
    setLoading(false);
  };
  return (
    <>
      <button onClick={()=>setOpen(!open)} aria-label="AI Concierge" className="fixed bottom-20 right-4 sm:bottom-6 sm:right-28 z-30 w-12 h-12 rounded-full bg-[#0F0F0E] text-white grid place-items-center shadow-lg border border-white/10">
        {open ? "✕" : "AI"}
      </button>
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-4 z-30 w-[360px] max-w-[92vw] h-[480px] bg-white border border-[var(--line)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--line)] flex justify-between items-center bg-[var(--accent-soft)]">
            <div><div className="text-sm font-semibold">AURA AI Concierge</div><div className="text-[11px] text-[var(--muted)]">Gemini-powered • Replies in seconds</div></div>
            <button onClick={()=>setOpen(false)} className="w-7 h-7 grid place-items-center rounded-full bg-white border">✕</button>
          </div>
          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-3 bg-[#FCFBF7]">
            {messages.map((m,i)=>(
              <div key={i} className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-6 ${m.role==="user"?"ml-auto bg-[var(--ink)] text-white":"bg-white border border-[var(--line)]"}`}>{m.content}</div>
            ))}
            {loading && <div className="text-xs text-[var(--muted)]">Thinking…</div>}
          </div>
          <div className="p-3 border-t border-[var(--line)] flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about villas, dates, dining…" className="flex-1 h-10 px-3 border border-[var(--line)] rounded-full text-sm" />
            <button onClick={send} disabled={loading} className="h-10 px-4 rounded-full bg-[var(--ink)] text-white text-xs font-semibold disabled:opacity-50">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
