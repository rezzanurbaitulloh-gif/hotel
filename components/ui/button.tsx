import * as React from "react";
type Variant="default"|"secondary"|"outline"|"ghost"|"destructive";
export function Button({ variant="default", size="default", className="", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:Variant; size?: "default"|"sm"|"lg"|"icon"}){
  const v={ default:"bg-primary text-primary-foreground hover:bg-black", secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80", outline:"border bg-transparent hover:bg-accent/10", ghost:"hover:bg-accent/10", destructive:"bg-destructive text-destructive-foreground" }[variant];
  const s={ default:"h-9 px-4 py-2", sm:"h-8 px-3", lg:"h-10 px-6", icon:"h-9 w-9" }[size];
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 ${v} ${s} ${className}`} {...props} />
}
