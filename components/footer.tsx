import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link
            href="/#skip-navigation"
            className="inline-flex items-center space-x-2"
          >
            <Icons.SiteLogoIcon />
            <span className="sr-only pb-0.5 text-[20px] font-medium tracking-tight">
              {siteConfig.name.toLowerCase()}
            </span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://github.com/sermay"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Hernan Serrano Mayroga
              {/* Hernan */}
            </a>
            ,{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Shubham Gulati
              {/* Shubham */}
            </a>
            , and{" "}
            <a
              href="https://github.com/tomasqn"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Tomás Quintana
              {/* Tomás */}
            </a>
            . Hosted on{" "}
            <a
              href="https://aws.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              Amazon Web Services
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
