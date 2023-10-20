import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { JournalHeader } from "@/components/journal-header"
import { JournalShell } from "@/components/journal-shell"
import { UserNameForm } from "@/components/user-name-form"
import { UserOperations } from "@/components/user-operations"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <JournalShell>
      <JournalHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <UserOperations user={{ id: user.id }} />
      </div>
    </JournalShell>
  )
}
