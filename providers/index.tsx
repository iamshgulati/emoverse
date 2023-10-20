import type { PropsWithChildren } from "react"
import { MetaThemeColorProvider } from "@/providers/meta-theme-color-provider"
import { ThemeProvider } from "@/providers/theme-provider"

import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster />
      <MetaThemeColorProvider />
    </>
  )
}
