import Link from "next/link";
import { stays, experiences, offers, testimonials, dining } from "@/lib/data";
import StayCard from "@/components/property/StayCard";

export default function Home(){
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[86vh] min-h-[540px] overflow-hidden bg-black">
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80" alt="AURA cliff retreat" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8 h-full flex flex-col justify-end pb-12 lg:pb-16">
          <div className="max-w-3xl text-white">
            <div className="eyebrow text-white/80">Uluwatu • Bali</div>
            <h1 className="display text-[42px] sm:text-[56px] lg:text-[72px] mt-3">Your private escape,<br/>surrounded by nature.</h1>
            <p className="mt-4 text-white/80 max-w-xl text-[15px] leading-7">A cliff retreat of four villas, two suites and a residence — composed for horizon, quiet and lingering light. Direct booking, concierge on WhatsApp.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/booking" className="h-11 px-7 inline-flex items-center justify-center rounded-full bg-white text-black text-[12px] tracking-[0.14em] font-semibold">CHECK AVAILABILITY</Link>
              <Link href="/stay" className="h-11 px-7 inline-flex items-center justify-center rounded-full border border-white/40 text-white text-[12px] tracking-[0.14em] font-semibold">EXPLORE STAY</Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-white/70">
              <span>★ 4.9 — 320 reviews</span><span className="w-px h-3 bg-white/20" /><span>Direct booking benefits</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div>
          <div className="eyebrow">The property</div>
          <h2 className="display text-[32px] lg:text-[44px] mt-3 leading-none">Architecture that<br/>frames the horizon.</h2>
        </div>
        <div className="text-[15px] leading-7 text-[var(--muted)]">
          <p>AURA sits on a limestone cliff 80 metres above the Indian Ocean. Dark teak, hand-troweled stone and linen — nothing to distract from sea and sky. Each pavilion is placed for privacy, then connected by frangipani paths and night lanterns.</p>
          <Link href="/story" className="inline-flex mt-6 h-10 px-5 items-center rounded-full border border-[var(--line)] text-[12px] tracking-[0.14em] font-semibold">OUR STORY —</Link>
        </div>
      </section>

      {/* FEATURED STAY editorial */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-[28px] lg:text-[34px]">Stay</h2>
          <Link href="/stay" className="text-[12px] tracking-[0.14em] font-semibold underline underline-offset-8 decoration-[var(--accent)]">VIEW ALL STAY —</Link>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6 lg:gap-8">
          {stays.slice(0,3).map((s,i)=> <StayCard key={s.slug} s={s} featured={i===0} />)}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-20">
        <div className="eyebrow">Experiences</div>
        <h2 className="display text-[28px] lg:text-[36px] mt-2">What brings you here?</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experiences.map(e=>(
            <Link key={e.slug} href={`/experiences/${e.slug}`} className="group block">
              <div className="overflow-hidden bg-[var(--line)]"><img src={e.image} alt={e.title} className="w-full aspect-[3/4] object-cover group-hover:scale-[1.03] transition duration-700" loading="lazy" /></div>
              <div className="pt-3"><div className="eyebrow text-[10px]">{e.category} • {e.duration}</div><div className="font-medium mt-1">{e.title}</div><div className="text-xs text-[var(--muted)] mt-1">{e.price}</div></div>
            </Link>
          ))}
        </div>
      </section>

      {/* DINING */}
      <section className="bg-[var(--surface)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-2 gap-8">
          <div>
            <div className="eyebrow">Dining</div>
            <h2 className="display text-[28px] lg:text-[36px] mt-2">Wood fire, ocean, long breakfast.</h2>
            <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">Two venues — SERA on the cliff for fire and tasting menu, Bale Dauh for unhurried brunch under frangipani. Chef cooks from boats that land at dawn and gardens on the hill.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {dining.map(d=>(
                <div key={d.name} className="border border-[var(--line)] p-4 bg-white">
                  <img src={d.image} alt={d.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="mt-3 font-medium tracking-wide">{d.name}</div>
                  <div className="text-xs text-[var(--muted)]">{d.cuisine} • {d.hours}</div>
                </div>
              ))}
            </div>
            <Link href="/dining" className="inline-flex mt-6 h-11 px-6 items-center rounded-full bg-[var(--ink)] text-white text-[12px] tracking-[0.14em] font-semibold">DISCOVER DINING</Link>
          </div>
          <div className="overflow-hidden"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80" alt="Dining cliff" className="w-full h-full min-h-[420px] object-cover" /></div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-end justify-between"><h2 className="display text-[28px]">Offers</h2><Link href="/offers" className="text-xs tracking-[0.14em] font-semibold underline underline-offset-8">VIEW ALL —</Link></div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {offers.map(o=>(
            <Link key={o.slug} href={`/offers/${o.slug}`} className="group block border border-[var(--line)] bg-white overflow-hidden">
              <img src={o.image} alt={o.title} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.02] transition" loading="lazy" />
              <div className="p-5"><div className="eyebrow text-[10px]">{o.validity}</div><div className="font-medium mt-1">{o.title}</div><div className="text-xs text-[var(--muted)]">{o.subtitle} • {o.price}</div></div>
            </Link>
          ))}
        </div>
      </section>

      {/* GALLERY preview */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <div className="eyebrow">Gallery</div>
        <h2 className="display text-[28px] mt-2">Light, material, stillness.</h2>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
          ].map((src,i)=><img key={i} src={src} alt="gallery" className={`w-full object-cover ${i===0?"col-span-2 row-span-2 aspect-square":"aspect-[4/3]"}`} loading="lazy" />)}
        </div>
        <Link href="/gallery" className="inline-flex mt-6 h-10 px-5 items-center rounded-full border border-[var(--line)] text-xs tracking-[0.14em] font-semibold">OPEN GALLERY —</Link>
      </section>

      {/* LOCATION */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
        <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&q=80" alt="Bali cliff" className="w-full aspect-[4/3] object-cover" loading="lazy" />
        <div>
          <div className="eyebrow">Location</div>
          <h2 className="display text-[30px] mt-2">On the southernmost cliff<br/>of the island.</h2>
          <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">40 minutes from Ngurah Rai, 5 minutes from the temple. Nearest surf break — 7 minutes. Ubud — 90 minutes when you want it, far when you don't.</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div><div className="font-medium">Airport</div><div className="text-[var(--muted)]">NGU — 40 min</div></div>
            <div><div className="font-medium">Beach</div><div className="text-[var(--muted)]">Direct access</div></div>
          </div>
          <Link href="/location" className="inline-flex mt-6 h-11 px-6 items-center rounded-full bg-[var(--ink)] text-white text-xs tracking-[0.14em] font-semibold">EXPLORE LOCATION</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-16">
          <div className="eyebrow text-white/60">Guest notes</div>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {testimonials.map(t=>(
              <div key={t.name} className="border border-white/10 p-6">
                <div className="text-white/80 leading-7">“{t.text}”</div>
                <div className="mt-4 text-sm text-white/60">{t.name} — {t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Hotel","name":"AURA Balinese Cliff Retreat","description":"Private cliff retreat above Indian Ocean — villas, suites, residence, dining and curated experiences.","address":{"@type":"PostalAddress","addressLocality":"Uluwatu","addressRegion":"Bali","addressCountry":"ID"},"starRating":{"@type":"Rating","ratingValue":"5"},"priceRange":"$$$","url":"https://hotel.example.com"})}} />
      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12 lg:py-20 text-center">
        <div className="eyebrow">Begin</div>
        <h2 className="display text-[34px] lg:text-[44px] mt-2">Need help planning<br/>your stay?</h2>
        <p className="mt-3 text-[var(--muted)]">Concierge on WhatsApp — itinerary, transfers, celebrations, sorted before you arrive.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/booking" className="h-11 px-7 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs tracking-[0.14em] font-semibold">CHECK AVAILABILITY</Link>
          <a href="https://wa.me/6281234567890" className="h-11 px-7 inline-flex items-center rounded-full border border-[var(--line)] bg-white text-xs tracking-[0.14em] font-semibold">CHAT CONCIERGE</a>
        </div>
      </section>
    </div>
  );
}
