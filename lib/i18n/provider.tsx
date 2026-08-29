"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, Locale, getDictionary } from "./dictionaries";
type Ctx={ locale:Locale; setLocale:(l:Locale)=>void; t:any };
const I18nContext=createContext<Ctx>({ locale:"en", setLocale:()=>{}, t:getDictionary("en") });
export function I18nProvider({children}:{children:React.ReactNode}){
  const [locale,setLocaleState]=useState<Locale>("en");
  useEffect(()=>{
    const saved=(localStorage.getItem("aura_locale") as Locale) || (document.cookie.match(/aura_locale=(en|id)/)?.[1] as Locale) || "en";
    if(saved) setLocaleState(saved);
  },[]);
  const setLocale=(l:Locale)=>{
    setLocaleState(l);
    localStorage.setItem("aura_locale", l);
    document.cookie=`aura_locale=${l}; path=/; max-age=31536000`;
    // also set html lang
    document.documentElement.lang=l;
  };
  const t=getDictionary(locale);
  return <I18nContext.Provider value={{locale,setLocale,t}}>{children}</I18nContext.Provider>;
}
export const useI18n=()=> useContext(I18nContext);
