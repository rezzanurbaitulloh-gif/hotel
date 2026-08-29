export const metadata={ title:"Our Story" };
export default function Story(){
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Our Story</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2 max-w-3xl">Built for horizon, not for lobby.</h1>
      <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80" alt="Story" className="w-full aspect-[4/3] object-cover" />
        <div className="text-[15px] leading-7 text-[var(--muted)] space-y-4">
          <p>AURA began as a family compound — four pavilions around a pool, no reception desk, no corridor. Guests arrived and were shown directly to a house where staff already knew their names.</p>
          <p>Architect retained that logic: each new pavilion placed for privacy, then linked by stone paths and lanterns. Teak weathers, limestone stays cool, glass dissolves at dusk.</p>
          <p>Hospitality is quiet by design. No uniformed line at check-in — your host meets you at the gate, walks you to your villa, leaves you to the sound of the ocean.</p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="border border-[var(--line)] p-4 bg-white"><div className="font-medium text-[var(--ink)]">Sustainability</div><div className="text-sm mt-1">Rain capture, solar pre-heat, reef-safe amenities.</div></div>
            <div className="border border-[var(--line)] p-4 bg-white"><div className="font-medium text-[var(--ink)]">Design</div><div className="text-sm mt-1">Local stone, reclaimed teak, linen — nothing synthetic.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
