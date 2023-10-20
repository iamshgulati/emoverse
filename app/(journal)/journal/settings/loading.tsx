import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"
import { JournalHeader } from "@/components/journal-header"
import { JournalShell } from "@/components/journal-shell"

export default function JournalSettingsLoading() {
  return (
    <JournalShell>
      <JournalHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </JournalShell>
  )
}
