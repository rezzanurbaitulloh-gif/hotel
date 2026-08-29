export const metadata={ title:"Location" };
export default function LocationPage(){
  return (
    <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-8">
      <div className="eyebrow">Bali • Uluwatu</div>
      <h1 className="display text-[36px] lg:text-[52px] mt-2">Location</h1>
      <div className="mt-6 grid lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-[4/3] bg-[var(--line)] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80" alt="Map cliff" className="w-full h-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div><div className="font-medium">Address</div><div className="text-[var(--muted)]">Jalan Cliff No.88, Uluwatu, Bali 80361</div></div>
            <div><div className="font-medium">Coordinates</div><div className="text-[var(--muted)]">-8.829, 115.084</div></div>
            <div><div className="font-medium">Airport</div><div className="text-[var(--muted)]">NGU — 40 min (12 min heli)</div></div>
            <div><div className="font-medium">City</div><div className="text-[var(--muted)]">Seminyak 45 min • Ubud 90 min</div></div>
          </div>
          <div className="mt-6">
            <h3 className="font-medium">Nearby</h3>
            <ul className="mt-2 text-sm text-[var(--muted)] space-y-1">
              <li>• Uluwatu Temple — 5 min</li>
              <li>• Padang Padang Beach — 7 min</li>
              <li>• Single Fin — 10 min</li>
            </ul>
          </div>
          <div className="mt-6 flex gap-3">
            <a href="https://maps.google.com/?q=Uluwatu+Bali" target="_blank" className="h-10 px-5 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs">OPEN IN MAPS</a>
            <a href="https://wa.me/6281234567890" className="h-10 px-5 inline-flex items-center rounded-full border border-[var(--line)] text-xs">Request Transfer</a>
          </div>
        </div>
        <div className="border border-[var(--line)] bg-white p-6">
          <div className="font-medium">Getting here</div>
          <p className="text-sm leading-6 text-[var(--muted)] mt-2">Private SUV included for stays 3 nights+. Fast-track immigration and heli transfer on request. Your host tracks flight and meets at arrival hall.</p>
          <div className="mt-4 text-sm">
            <div className="font-medium">Transfers</div>
            <ul className="text-[var(--muted)] space-y-1 mt-1">
              <li>• SUV — complimentary (3n+)</li>
              <li>• Helicopter — 12 min, on request</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
