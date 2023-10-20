import { PropsWithChildren } from "react"
import { notFound } from "next/navigation"

import { journalConfig } from "@/config/journal"
import { getCurrentUser } from "@/lib/session"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { JournalSidebarNav } from "@/components/journal-sidebar-nav"
import { MainNav } from "@/components/main-nav"

export default async function JournalLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <MainNav items={journalConfig.mainNav} />
      </Header>
      <div className="container mt-6 grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <JournalSidebarNav items={journalConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <Footer className="border-t" />
    </div>
  )
}
