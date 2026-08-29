"use client";
import { useState } from "react";
import { gallery } from "@/lib/data";
import Lightbox from "@/components/gallery/Lightbox";
const cats=["All",...Array.from(new Set(gallery.map(g=>g.cat)))];
export default function GalleryPage(){
  const [cat,setCat]=useState("All");
  const filtered = cat==="All"? gallery : gallery.filter(g=>g.cat===cat);
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Imagery</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Gallery</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {cats.map(c=>(
          <button key={c} onClick={()=>setCat(c)} className={`h-8 px-4 rounded-full text-xs border ${cat===c?"bg-[var(--ink)] text-white border-[var(--ink)]":"bg-white border-[var(--line)]"}`}>{c}</button>
        ))}
      </div>
      <div className="mt-6">
        <Lightbox images={filtered.map(f=>({src:f.src, alt:f.alt}))} />
      </div>
    </div>
  );
}
