import Link from "next/link";
export function Button({ children, variant="primary", ...props }: { children:React.ReactNode; variant?: "primary"|"ghost"|"outline"; } & React.ButtonHTMLAttributes<HTMLButtonElement>){
  const base="inline-flex items-center justify-center h-11 px-6 rounded-full text-[12px] tracking-[0.14em] font-semibold transition";
  const styles={ primary:"bg-[var(--ink)] text-white hover:bg-black", ghost:"bg-transparent border border-current", outline:"border border-[var(--line)] bg-white hover:bg-[var(--accent-soft)]" } as const;
  return <button className={`${base} ${styles[variant]}`} {...props}>{children}</button>;
}
export function PillLink({ href, children, variant="dark" }: { href:string; children:React.ReactNode; variant?: "dark"|"light" }){
  return <Link href={href} className={`inline-flex h-11 px-6 items-center justify-center rounded-full text-[12px] tracking-[0.14em] font-semibold ${variant==="dark"?"bg-[var(--ink)] text-white hover:bg-black":"bg-white text-[var(--ink)] border border-[var(--line)]"}`}>{children}</Link>;
}
