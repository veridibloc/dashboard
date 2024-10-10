import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { ChildrenProps } from '@/types/childrenProps';

const markerVariants = cva(
  "absolute -top-2 -right-2 items-center rounded-full w-[20px] h-[20px] px-[6px] py-[3px] text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        warning:
          "border-transparent bg-yellow-400 text-secondary-foreground hover:bg-yellow-400/80",
        error:
          "border-transparent bg-red-400 text-destructive-foreground hover:bg-red-400/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface MarkerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof markerVariants> {
  text?: string
  visible?: boolean
}

function Marker({ className, variant, children, text = "", visible=true, ...props }: MarkerProps) {

  return visible ? (
    <div className="relative w-full">
    <div className={cn(markerVariants({ variant }), className)} {...props}>
      {text}
    </div>
      {children}
    </div>
  ) : children
}

export { Marker, markerVariants }
