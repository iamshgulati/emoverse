import { redirect } from "next/navigation"
import { Table } from "sst/node/table"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { EntryCreateButton } from "@/components/entry-create-button"
import { EntryItem } from "@/components/entry-item"
import { JournalHeader } from "@/components/journal-header"
import { JournalShell } from "@/components/journal-shell"

export const metadata = {
  title: "Journal",
}

export default async function JournalPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { Items } = await db.query({
    TableName: Table.data.tableName,
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
    ExpressionAttributeValues: {
      ":pk": `USER#${user.id}`,
      ":sk": `ENTRY#`,
    },
  })
  const entries = Items

  return (
    <JournalShell>
      <JournalHeader
        heading="Journal"
        text="Create and manage journal entries."
      >
        <EntryCreateButton />
      </JournalHeader>
      <div>
        {entries?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {entries.map((entry) => (
              // @ts-expect-error
              <EntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="EntryIcon" />
            <EmptyPlaceholder.Title>
              No journal entries created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any journal entries yet. Start by creating an
              entry today.
            </EmptyPlaceholder.Description>
            <EntryCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </JournalShell>
  )
}
