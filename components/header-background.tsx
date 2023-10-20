"use client"

import { cn } from "@/lib/utils"
import { useOnScroll } from "@/hooks/useOnScroll"

interface HeaderBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollThreshold?: number
}

export function HeaderBackground({
  className,
  scrollThreshold = 0,
}: HeaderBackgroundProps) {
  const isScrolled = useOnScroll(scrollThreshold)

  return (
    <div
      className={cn(
        className,
        "fixed inset-x-0 top-0 z-40 h-[var(--header-height)]",
        {
          "border-b bg-background/80 backdrop-blur-lg backdrop-saturate-200":
            isScrolled === true,
        }
      )}
    />
  )
}
