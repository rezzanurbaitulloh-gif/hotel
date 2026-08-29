import type { MetadataRoute } from "next";
import { stays, experiences, offers } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap{
  const base="https://hotel.example.com";
  const staticRoutes=["","/stay","/experiences","/dining","/offers","/gallery","/story","/location","/contact","/faq","/booking"].map(p=>({ url: base+p, lastModified:new Date()}));
  const dynamic=[...stays.map(s=>({url: base+`/stay/${s.slug}`, lastModified:new Date()})), ...experiences.map(e=>({url: base+`/experiences/${e.slug}`, lastModified:new Date()})), ...offers.map(o=>({url: base+`/offers/${o.slug}`, lastModified:new Date()}))];
  return [...staticRoutes, ...dynamic];
}
