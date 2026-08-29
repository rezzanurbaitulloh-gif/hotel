import Link from "next/link";
export const metadata={ title:"Wellness — AURA" };
export default function Wellness(){
  return (
    <div className="bg-[var(--espresso)] text-[var(--ivory)]">
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80" alt="Spa" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--espresso)] via-transparent to-black/20" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <div className="eyebrow text-[var(--champagne)]">The Spa</div>
          <h1 className="display text-[48px] lg:text-[72px] leading-[0.85]">RESTORE<br/><span className="italic font-light">YOURSELF.</span></h1>
          <p className="mt-4 text-white/60 text-sm font-light max-w-md">Treatments • Rituals • Movement • Wellness — gold accent, dark luxury palette</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-6 text-center">
        {["Treatments","Rituals","Movement","Wellness"].map(t=> <div key={t} className="border-t border-[var(--champagne)]/20 pt-4"><div className="text-xs tracking-[0.16em]">{t.toUpperCase()}</div></div>)}
      </section>
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 pb-12 text-center">
        <Link href="/booking" className="h-10 px-6 border border-[var(--champagne)]/30 text-[var(--champagne)] text-xs tracking-[0.16em] inline-flex items-center hover:bg-[var(--champagne)] hover:text-black">RESERVE WELLNESS</Link>
      </section>
    </div>
  );
}
