import { stays } from "@/lib/data";
import StayCard from "@/components/property/StayCard";
import Link from "next/link";
export const metadata = { title:"Stay — Villas & Suites" };
export default function StayPage(){
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Accommodation</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Stay</h1>
      <p className="text-[15px] leading-7 text-[var(--muted)] max-w-2xl mt-3">Four villas, two suites and a residence. Each placed for privacy, each framed for horizon. Choose by view, size or the way you want to live for a few days.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6 lg:gap-8">
        {stays.map(s=> <StayCard key={s.slug} s={s} />)}
      </div>
      <div className="mt-10 p-6 border border-[var(--line)] bg-white flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="text-sm text-[var(--muted)]">Not sure? Concierge will match you in 2 minutes.</div>
        <Link href="/booking" className="h-10 px-5 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs tracking-wide">CHECK DATES</Link>
      </div>
    </div>
  );
}
