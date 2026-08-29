"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget(){
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [messages,setMessages]=useState<{role:"user"|"assistant"; content:string}[]>([
    { role:"assistant", content:"Hi — I'm AURA Concierge CS. Tanya soal villa, dining, transfer, atau biar saya bantu pilih stay. (Powered by Gemini)" }
  ]);
  const listRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{ listRef.current?.scrollTo(0, listRef.current.scrollHeight); },[messages]);
  const send=async() => {
    if(!input.trim()||loading) return;
    const userMsg=input.trim();
    setInput("");
    setMessages(m=>[...m,{role:"user", content:userMsg}]);
    setLoading(true);
    try{
      const res=await fetch("/api/ai/chat",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({message:userMsg})});
      const data=await res.json();
      setMessages(m=>[...m,{role:"assistant", content:data.reply || "Maaf, saya tidak bisa menjawab."}]);
    }catch(e){ setMessages(m=>[...m,{role:"assistant", content:"Network error — coba WhatsApp."}]);}
    setLoading(false);
  };

  // draggable CS button with snap to edge
  const btnRef=useRef<HTMLButtonElement>(null);
  const [pos,setPos]=useState<{x:number,y:number} | null>(null);
  const dragging=useRef(false);
  const offset=useRef({dx:0,dy:0});
  const moved=useRef(false);
  useEffect(()=>{
    const init=()=>{
      const margin=16;
      const w=48, h=48;
      setPos({x: window.innerWidth - w - margin, y: window.innerHeight - h - 84});
    };
    init();
    window.addEventListener("resize", init);
    return()=> window.removeEventListener("resize", init);
  },[]);
  const snapToEdge=(x:number,y:number)=>{
    const margin=12;
    const w=48, h=48;
    const vw=window.innerWidth, vh=window.innerHeight;
    // clamp
    x=Math.max(margin, Math.min(x, vw - w - margin));
    y=Math.max(margin, Math.min(y, vh - h - margin));
    const distLeft=x - margin;
    const distRight=(vw - w - margin) - x;
    const distTop=y - margin;
    const distBottom=(vh - h - margin) - y;
    const min=Math.min(distLeft,distRight,distTop,distBottom);
    if(min===distLeft) x=margin;
    else if(min===distRight) x=vw - w - margin;
    else if(min===distTop) y=margin;
    else y=vh - h - margin;
    return {x,y};
  };
  const onPointerDown=(e: React.PointerEvent)=>{
    if(!pos) return;
    dragging.current=true;
    moved.current=false;
    offset.current={dx: e.clientX - pos.x, dy: e.clientY - pos.y};
    (e.target as Element).setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onPointerMove=(e: React.PointerEvent)=>{
    if(!dragging.current || !pos) return;
    const nx=e.clientX - offset.current.dx;
    const ny=e.clientY - offset.current.dy;
    if(Math.abs(nx-pos.x)>3 || Math.abs(ny-pos.y)>3) moved.current=true;
    setPos({x:nx,y:ny});
  };
  const onPointerUp=(e: React.PointerEvent)=>{
    if(!dragging.current || !pos) return;
    dragging.current=false;
    const snapped=snapToEdge(pos.x, pos.y);
    setPos(snapped);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  // window follows button when open: anchor near button
  const [winPos,setWinPos]=useState<{left:number, top:number} | null>(null);
  useEffect(()=>{
    if(!pos || !open) return;
    const vw=window.innerWidth;
    const winW=360, winH=480;
    let left=pos.x - winW + 48;
    let top=pos.y - winH - 12;
    if(left < 8) left=8;
    if(left + winW > vw - 8) left=vw - winW - 8;
    if(top < 8) top= pos.y + 56;
    setWinPos({left, top});
  },[pos, open]);

  if(!pos) return null;
  return (
    <>
      <button
        ref={btnRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={()=>{ if(moved.current){ moved.current=false; return; } setOpen(!open); }}
        aria-label="CS Concierge"
        className="fixed z-40 w-12 h-12 rounded-full bg-[#0F0F0E] text-white grid place-items-center shadow-lg border border-white/10 select-none touch-none active:scale-95 transition-transform"
        style={{left: pos.x, top: pos.y}}
      >
        <span className="text-[11px] tracking-[0.14em] font-bold">{open ? "✕" : "CS"}</span>
      </button>
      {open && winPos && (
        <div className="fixed z-40 w-[360px] max-w-[92vw] h-[480px] bg-white border border-[var(--line)] rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{left: winPos.left, top: winPos.top}}>
          <div className="px-4 py-3 border-b border-[var(--line)] flex justify-between items-center bg-[var(--accent-soft)]">
            <div><div className="text-sm font-semibold">AURA CS</div><div className="text-[11px] text-[var(--muted)]">Gemini-powered • Geser tombol CS ke tepi manapun</div></div>
            <button onClick={()=>setOpen(false)} className="w-7 h-7 grid place-items-center rounded-full bg-white border">✕</button>
          </div>
          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-3 bg-[#FCFBF7]">
            {messages.map((m,i)=>(
              <div key={i} className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-6 ${m.role==="user"?"ml-auto bg-[var(--ink)] text-white":"bg-white border border-[var(--line)]"}`}>{m.content}</div>
            ))}
            {loading && <div className="text-xs text-[var(--muted)]">Thinking…</div>}
          </div>
          <div className="p-3 border-t border-[var(--line)] flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Tanya villa, tanggal, dining…" className="flex-1 h-10 px-3 border border-[var(--line)] rounded-full text-sm" />
            <button onClick={send} disabled={loading} className="h-10 px-4 rounded-full bg-[var(--ink)] text-white text-xs font-semibold disabled:opacity-50">Send</button>
          </div>
        </div>
      )}
    </>
  );
}
