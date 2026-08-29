"use client";
import { useState, useEffect, useMemo } from "react";
import Lightbox from "@/components/gallery/Lightbox";

export default function GalleryPage(){
  const [gallery,setGallery]=useState<any[]>([]);
  const [cat,setCat]=useState("All");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  
  useEffect(()=>{
    fetch("/api/gallery/list")
      .then(r=>{
        if(!r.ok) throw new Error("Failed to fetch gallery");
        return r.json();
      })
      .then(d=>{
        if(d.media && d.media.length>0) {
          setGallery(d.media.map((m:any)=>({src:m.image, cat:m.category, alt:m.alt_text})));
        } else {
          // fallback 12 images
          const fallback=[
            {src:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", cat:"Villas", alt:"Villa 1"},
            {src:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", cat:"Rooms", alt:"Room 1"},
            {src:"https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=1200&q=80", cat:"Architecture", alt:"Arch 1"},
            {src:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", cat:"Pool", alt:"Pool 1"},
            {src:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80", cat:"Nature", alt:"Nature 1"},
            {src:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80", cat:"Dining", alt:"Dining 1"},
            {src:"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=1200&q=80", cat:"Experiences", alt:"Exp 1"},
            {src:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80", cat:"Experiences", alt:"Exp 2"},
            {src:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", cat:"Villas", alt:"Villa 2"},
            {src:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", cat:"Rooms", alt:"Room 2"},
            {src:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", cat:"Nature", alt:"Nature 2"},
            {src:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", cat:"Wellness", alt:"Wellness 1"},
          ];
          setGallery(fallback);
        }
      })
      .catch(()=>setError("Failed to load gallery"))
      .finally(()=>setLoading(false));
  },[]);
  
  const cats = useMemo(() => ["All", ...Array.from(new Set(gallery.map((g:any)=>g.cat)))], [gallery]);
  const filtered = useMemo(() => cat==="All"? gallery : gallery.filter((g:any)=>g.cat===cat), [gallery, cat]);
  
  if(loading) return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Imagery — Live</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Gallery</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[...Array(6)].map((_,i)=><div key={i} className="aspect-[4/3] bg-[var(--stone)]/20 animate-pulse rounded-lg" />)}
      </div>
    </div>
  );
  
  if(error) return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8 text-center">
      <div className="text-[var(--champagne)]">Failed to load gallery</div>
      <button onClick={()=>window.location.reload()} className="mt-4 h-10 px-6 border rounded-full text-xs">Retry</button>
    </div>
  );
  
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Imagery — Live ({gallery.length} images)</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Gallery</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {["All", ...Array.from(new Set(gallery.map((g:any)=>g.cat)))].map(c=>(
          <button key={c} onClick={()=>setCat(c)} className={`h-8 px-4 rounded-full text-xs border ${cat===c?"bg-[var(--obsidian)] text-white border-[var(--obsidian)]":"bg-white border-[var(--line)]"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-6">
        <Lightbox images={gallery.filter((f:any)=> cat==="All" || f.cat===cat).map((f:any)=>({src:f.src, alt:f.alt}))} />
      </div>
    </div>
  );
}
