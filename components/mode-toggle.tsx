"use client"

import * as React from "react"
import { useCallback, useEffect } from "react"
import { setMetaThemeColor } from "@/scripts/theme-effect"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, systemTheme, setTheme } = useTheme()

  const onMediaChange = useCallback(() => {
    setMetaThemeColor()
  }, [])

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")
    matchMedia.addEventListener("change", onMediaChange)
    return () => matchMedia.removeEventListener("change", onMediaChange)
  }, [onMediaChange])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() => {
        const resolvedTheme = theme === "system" ? systemTheme : theme
        const newTheme = resolvedTheme === "dark" ? "light" : "dark"
        const newThemeMatchesSystem = newTheme === systemTheme
        setTheme(newThemeMatchesSystem ? "system" : newTheme)
        setMetaThemeColor()
      }}
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
