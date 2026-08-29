import * as React from "react";
export function Badge({ variant="default", className="", ...props }: React.HTMLAttributes<HTMLSpanElement> & {variant?: "default"|"secondary"|"outline"|"success"|"warning"|"destructive"}){
  const variants={ default:"bg-primary text-primary-foreground", secondary:"bg-secondary text-secondary-foreground", outline:"border bg-transparent", success:"bg-green-50 text-green-700 border-green-200", warning:"bg-amber-50 text-amber-700 border-amber-200", destructive:"bg-destructive text-destructive-foreground" } as const;
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${variants[variant]} ${className}`} {...props} />
}
