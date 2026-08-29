"use client";
import { useState, useEffect } from "react";
export default function Lightbox({ images, start=0 }: { images: {src:string; alt:string}[]; start?:number }){
  const [open,setOpen]=useState(false);
  const [idx,setIdx]=useState(start);
  useEffect(()=>{
    if(!open) return;
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==="Escape") setOpen(false);
      if(e.key==="ArrowRight") setIdx(i=>(i+1)%images.length);
      if(e.key==="ArrowLeft") setIdx(i=>(i-1+images.length)%images.length);
    };
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[open,images.length]);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((im,i)=>(
          <button key={i} onClick={()=>{setIdx(i);setOpen(true)}} className="overflow-hidden bg-[var(--line)] text-left">
            <img src={im.src} alt={im.alt} className="w-full aspect-[4/3] object-cover hover:scale-[1.02] transition" loading="lazy" />
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col">
          <div className="flex justify-between items-center p-4 text-white">
            <span className="text-sm tracking-wide">{idx+1} / {images.length}</span>
            <button onClick={()=>setOpen(false)} className="w-9 h-9 rounded-full border border-white/20 grid place-items-center" aria-label="Close">✕</button>
          </div>
          <div className="flex-1 grid place-items-center p-6">
            <img src={images[idx].src} alt={images[idx].alt} className="max-h-[78vh] max-w-full object-contain" />
          </div>
          <div className="p-4 flex justify-center gap-3">
            <button onClick={()=>setIdx((idx-1+images.length)%images.length)} className="h-10 px-5 rounded-full bg-white text-black text-sm">Prev</button>
            <button onClick={()=>setIdx((idx+1)%images.length)} className="h-10 px-5 rounded-full bg-white text-black text-sm">Next</button>
          </div>
        </div>
      )}
    </>
  );
}
