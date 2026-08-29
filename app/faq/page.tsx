"use client";
import { faqs } from "@/lib/data";
import { useState } from "react";
const cats=["All",...Array.from(new Set(faqs.map(f=>f.cat)))];
export default function FAQ(){
  const [open,setOpen]=useState<number|null>(0);
  const [cat,setCat]=useState("All");
  const filtered = cat==="All"? faqs : faqs.filter(f=>f.cat===cat);
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Help</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">FAQ</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {cats.map(c=> <button key={c} onClick={()=>setCat(c)} className={`h-8 px-4 rounded-full text-xs border ${cat===c?"bg-[var(--ink)] text-white":"bg-white border-[var(--line)]"}`}>{c}</button>)}
      </div>
      <div className="mt-6 max-w-3xl divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {filtered.map((f,i)=>(
          <div key={f.q}>
            <button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} className="w-full flex justify-between items-center py-4 text-left">
              <span className="font-medium pr-6">{f.q}</span><span className="w-7 h-7 grid place-items-center rounded-full border border-[var(--line)] text-xs">{open===i?"−":"+"}</span>
            </button>
            {open===i && <div className="pb-4 text-sm leading-6 text-[var(--muted)]">{f.a}</div>}
          </div>
        ))}
        {filtered.length===0 && <div className="py-8 text-sm text-[var(--muted)]">No questions in this category.</div>}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity": faqs.map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))})}} />
    </div>
  );
}
