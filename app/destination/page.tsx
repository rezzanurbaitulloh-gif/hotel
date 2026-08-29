import Link from "next/link";
export const metadata={ title:"Destination — AURA" };
export default function Destination(){
  return (
    <div className="bg-[var(--ivory)]">
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black">
        <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80" alt="Destination" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-center text-white">
          <div className="eyebrow text-[var(--champagne)]">Discover Indonesia</div>
          <h1 className="display text-[48px] lg:text-[72px] mt-2 leading-[0.85]">ANCIENT<br/>LANDSCAPES.<br/><span className="italic font-light">LIVING CULTURE.</span></h1>
          <p className="mt-4 text-white/70 text-sm max-w-md font-light">Endless horizons — yacht, mountain, beach, culture. Beyond the resort.</p>
          <Link href="/experiences" className="mt-6 h-10 px-6 border border-white text-xs tracking-[0.16em] inline-flex items-center w-fit hover:bg-white hover:text-black">EXPLORE DESTINATION</Link>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-6">
        {["Uluwatu Temple — 5 min","Padang Padang — 7 min","Ubud — 90 min"].map(t=> <div key={t} className="border border-[var(--line)] p-6 bg-white text-sm">{t}</div>)}
      </section>
    </div>
  );
}
