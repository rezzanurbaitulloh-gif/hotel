"use client";
import { useI18n } from "@/lib/i18n/provider";
export default function LanguageSwitcher(){
  const { locale, setLocale }=useI18n();
  return (
    <div className="inline-flex rounded-full border border-[var(--line)] overflow-hidden text-xs">
      <button onClick={()=>setLocale("id")} className={`px-3 py-1.5 ${locale==="id"?"bg-[var(--ink)] text-white":"bg-white"}`}>ID</button>
      <button onClick={()=>setLocale("en")} className={`px-3 py-1.5 ${locale==="en"?"bg-[var(--ink)] text-white":"bg-white"}`}>EN</button>
    </div>
  );
}
