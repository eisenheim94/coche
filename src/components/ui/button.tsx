import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/5 hover:border-white/40",
        ghost:
          "text-white/60 hover:text-white hover:bg-white/5",
        glass:
          "glass text-white hover:bg-white/10",
        link: "text-white/80 underline-offset-4 hover:underline hover:text-white",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-13 px-10 py-3 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
