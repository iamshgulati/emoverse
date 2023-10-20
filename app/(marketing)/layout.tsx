import { PropsWithChildren } from "react"

import { marketingConfig } from "@/config/marketing"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MainNav } from "@/components/main-nav"

export default async function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <MainNav items={marketingConfig.mainNav} />
      </Header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
