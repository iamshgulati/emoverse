import { notFound, redirect } from "next/navigation"
import { Table } from "sst/node/table"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor"

async function getEntryForUser(entryId: string, userId: string) {
  const { Item } = await db.get({
    TableName: Table.data.tableName,
    Key: {
      pk: `USER#${userId}`,
      sk: `ENTRY#${entryId}`,
    },
  })

  return Item
}

interface EditorPageProps {
  params: { entryId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const entry = await getEntryForUser(params.entryId, user.id)

  if (!entry) {
    notFound()
  }

  return (
    <Editor
      entry={{
        id: entry.id,
        title: entry.title,
        content: entry.content,
      }}
    />
  )
}
