import { PropsWithChildren } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { HeaderBackground } from "@/components/header-background"
import { Icons } from "@/components/icons"
import { UserAccountNav } from "@/components/user-account-nav"

export async function Header({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  return (
    <>
      <HeaderBackground />
      <header className="sticky top-0 z-40">
        <div className="container flex h-[var(--header-height)] items-center justify-between py-4">
          <div>
            <Link
              href="/#skip-navigation"
              className="inline-flex items-center space-x-2"
            >
              <Icons.SiteLogoIcon />
              <span className="pb-0.5 text-[20px] font-medium tracking-tight">
                {siteConfig.name.toLowerCase()}
              </span>
            </Link>
          </div>
          <nav className="flex gap-6 md:gap-10">
            {children}
            {user ? (
              <UserAccountNav
                user={{
                  name: user.name,
                  image: user.image,
                  email: user.email,
                }}
              />
            ) : (
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
