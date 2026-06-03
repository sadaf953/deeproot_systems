import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          // Variants
          variant === "default" && "bg-[#22c55e] text-zinc-950 hover:bg-[#4ade80] hover:shadow-[0_0_18px_rgba(34,197,94,0.35)] shadow-md font-bold border border-[#a7f3d0]",
          variant === "outline" && "border border-[#14321a] bg-[#0d170f]/40 text-[#edfcf1] hover:bg-[#112415] hover:text-white hover:border-[#1e4e29]",
          variant === "secondary" && "bg-[#0a140d] border border-[#14321a] text-green-50 hover:bg-[#112415]",
          variant === "ghost" && "text-green-100/70 hover:bg-[#112415]/50 hover:text-green-50",
          variant === "link" && "text-[#22c55e] underline-offset-4 hover:underline hover:text-[#4ade80]",
          // Sizes
          size === "default" && "h-10 px-5 py-2",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-11 px-8 py-3 text-base",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
