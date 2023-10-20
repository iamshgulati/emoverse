"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

interface JournalNavProps {
  items: SidebarNavItem[]
}

export function JournalSidebarNav({ items }: JournalNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "ArrowRightIcon"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "#" : item.href}>
              <span
                className={cn(
                  "group flex flex-wrap items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
                {item.disabled && <Badge variant="outline">future</Badge>}
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
