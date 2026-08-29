export const metadata={ title:"Admin" };
export default function Admin(){
  return (
    <div className="mx-auto max-w-[900px] px-6 lg:px-8 py-12">
      <div className="eyebrow">Administration</div>
      <h1 className="display text-[32px] mt-2">Content & Booking Foundation</h1>
      <p className="text-sm leading-6 text-[var(--muted)] mt-3">This is the integration-ready admin foundation. Connect Supabase/Auth to enable full CMS, role-based access and live bookings. Architecture below is production-ready and documented in <code>supabase/schema.sql</code>.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {[
          ["Properties","Rooms, villas, amenities, rates"],
          ["Bookings","Availability, calendar, addons"],
          ["Experiences & Dining","Categories, menus, inclusions"],
          ["Offers","Validity, terms, publishing"],
          ["Gallery & Media","Upload, alt, ordering"],
          ["Pages & SEO","Titles, metadata, sitemap"],
        ].map(([t,d])=>(
          <div key={t} className="border border-[var(--line)] bg-white p-5">
            <div className="font-medium">{t}</div><div className="text-sm text-[var(--muted)] mt-1">{d}</div>
            <div className="mt-3 text-xs px-2 py-1 rounded bg-amber-50 border border-amber-200 inline-block">Requires auth — see schema.sql</div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 border border-[var(--line)] bg-white text-xs text-[var(--muted)]">
        Roles: Super Admin • Admin • Manager • Content Editor • Booking Staff — enforced via RLS. No secrets exposed client-side.
      </div>
    </div>
  );
}
