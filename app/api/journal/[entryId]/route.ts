import { getServerSession } from "next-auth"
import { Table } from "sst/node/table"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { entryPatchSchema } from "@/lib/validations/entry"

const routeContextSchema = z.object({
  params: z.object({
    entryId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this entry.
    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 })
    }

    const session = await getServerSession(authOptions)

    // Delete the entry.
    await db.delete({
      TableName: Table.data.tableName,
      Key: {
        pk: `USER#${session?.user.id}`,
        sk: `ENTRY#${params.entryId}`,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this entry.
    if (!(await verifyCurrentUserHasAccessToEntry(params.entryId))) {
      return new Response(null, { status: 403 })
    }

    const session = await getServerSession(authOptions)

    // Get the request body and validate it.
    const json = await req.json()
    const body = entryPatchSchema.parse(json)

    // Update the entry.
    // TODO: Implement sanitization for content.
    await db.update({
      TableName: Table.data.tableName,
      Key: {
        pk: `USER#${session?.user.id}`,
        sk: `ENTRY#${params.entryId}`,
      },
      UpdateExpression: `SET title = :title, content = :content`,
      ExpressionAttributeValues: {
        ":title": body.title,
        ":content": body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToEntry(entryId: string) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new Response("Unauthorized", { status: 403 })
  }
  const { user } = session
  const { Count } = await db.scan({
    TableName: Table.data.tableName,
    FilterExpression: "pk = :pk AND sk = :sk",
    ExpressionAttributeValues: {
      ":pk": `USER#${user.id}`,
      ":sk": `ENTRY#${entryId}`,
    },
    Select: "COUNT",
  })

  return Count ? Count > 0 : false
}
