"use client";
import { useState, useEffect } from "react";
import Lightbox from "@/components/gallery/Lightbox";
export default function GalleryPage(){
  const [gallery,setGallery]=useState<any[]>([]);
  const [cat,setCat]=useState("All");
  useEffect(()=>{
    fetch("/api/gallery/list").then(r=>r.json()).then(d=>{
      if(d.media && d.media.length>0) setGallery(d.media.map((m:any)=>({src:m.url, cat:m.category, alt:m.alt})));
      else {
        // fallback 12 images
        const fallback=[
          {src:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80", cat:"Villas", alt:"Villa 1"},
          {src:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", cat:"Rooms", alt:"Room 1"},
          {src:"https://images.unsplash.com/photo-1571003123894-1f0594d2b597?w=1200&q=80", cat:"Architecture", alt:"Arch 1"},
          {src:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", cat:"Pool", alt:"Pool 1"},
          {src:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", cat:"Nature", alt:"Nature 1"},
          {src:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", cat:"Dining", alt:"Dining 1"},
          {src:"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&q=80", cat:"Experiences", alt:"Exp 1"},
          {src:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", cat:"Experiences", alt:"Exp 2"},
          {src:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", cat:"Villas", alt:"Villa 2"},
          {src:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", cat:"Rooms", alt:"Room 2"},
          {src:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", cat:"Nature", alt:"Nature 2"},
          {src:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", cat:"Wellness", alt:"Wellness 1"},
        ];
        setGallery(fallback);
      }
    });
  },[]);
  const cats=["All",...Array.from(new Set(gallery.map((g:any)=>g.cat)))];
  const filtered = cat==="All"? gallery : gallery.filter((g:any)=>g.cat===cat);
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Imagery — Live ({gallery.length} images)</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Gallery</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} className={`h-8 px-4 rounded-full text-xs border ${cat===c?"bg-[var(--obsidian)] text-white border-[var(--obsidian)]":"bg-white border-[var(--line)]"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-6">
        <Lightbox images={filtered.map((f:any)=>({src:f.src, alt:f.alt}))} />
      </div>
    </div>
  );
}
