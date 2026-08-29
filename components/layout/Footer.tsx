import Link from "next/link";
export default function Footer(){
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-[13px] tracking-[0.22em] font-semibold">AURA <span className="text-[10px] tracking-[0.12em] text-[var(--muted)] font-normal">BALINESE CLIFF RETREAT</span></div>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)] max-w-xs">A private cliff retreat above the Indian Ocean. Villas, suites and residences composed for light, quiet and horizon.</p>
          </div>
          <div>
            <div className="eyebrow mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/stay" className="hover:underline">Stay</Link></li>
              <li><Link href="/experiences" className="hover:underline">Experiences</Link></li>
              <li><Link href="/dining" className="hover:underline">Dining</Link></li>
              <li><Link href="/offers" className="hover:underline">Offers</Link></li>
              <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Information</div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/story" className="hover:underline">Our Story</Link></li>
              <li><Link href="/location" className="hover:underline">Location</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-4">Contact</div>
            <p className="text-sm leading-6">Jalan Cliff No.88, Uluwatu, Bali<br/>+62 361 846 6789<br/>hello@aura-bali.com</p>
            <div className="mt-4 flex gap-2">
              <a href="https://wa.me/6281234567890" className="h-9 px-4 inline-flex items-center rounded-full border border-[var(--line)] text-xs">WhatsApp</a>
              <a href="tel:+623618466789" className="h-9 px-4 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs">Call</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row gap-3 justify-between text-xs text-[var(--muted)]">
          <span>© {new Date().getFullYear()} AURA. All rights reserved.</span>
          <span className="flex gap-4"><Link href="/admin" className="hover:underline">Privacy</Link><Link href="/admin" className="hover:underline">Terms</Link><span>Admin</span></span>
        </div>
      </div>
    </footer>
  );
}
