import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps {
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  children?: React.ReactNode;
  [key: string]: any;
}

function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium font-mono transition-colors border",
        variant === "default" && "border-transparent bg-zinc-800 text-zinc-300",
        variant === "secondary" && "border-zinc-800 bg-zinc-900/50 text-zinc-400",
        variant === "outline" && "border-zinc-800 text-zinc-400 bg-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
