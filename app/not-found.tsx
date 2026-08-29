import Link from "next/link";
export default function NotFound(){
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 text-center">
      <div className="eyebrow">404</div>
      <h1 className="display text-[36px] mt-2">Page not found</h1>
      <p className="text-sm text-[var(--muted)] mt-3">The horizon is still there — this page isn&apos;t. Return home or ask concierge.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="h-10 px-5 inline-flex items-center rounded-full bg-[var(--ink)] text-white text-xs">HOME</Link>
        <a href="https://wa.me/6281234567890" className="h-10 px-5 inline-flex items-center rounded-full border border-[var(--line)] text-xs">CONCIERGE</a>
      </div>
    </div>
  );
}
