import { EntryCreateButton } from "@/components/entry-create-button"
import { EntryItem } from "@/components/entry-item"
import { JournalHeader } from "@/components/journal-header"
import { JournalShell } from "@/components/journal-shell"

export default function JournalLoading() {
  return (
    <JournalShell>
      <JournalHeader
        heading="Journal"
        text="Create and manage journal entries."
      >
        <EntryCreateButton />
      </JournalHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <EntryItem.Skeleton />
        <EntryItem.Skeleton />
        <EntryItem.Skeleton />
        <EntryItem.Skeleton />
        <EntryItem.Skeleton />
      </div>
    </JournalShell>
  )
}
