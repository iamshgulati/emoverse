import { randomUUID } from "crypto"
import { getServerSession } from "next-auth/next"
import { Table } from "sst/node/table"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const entryCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const { Items } = await db.query({
      TableName: Table.data.tableName,
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
      ExpressionAttributeValues: {
        ":pk": `USER#${user.id}`,
        ":sk": `ENTRY#`,
      },
    })
    const entries = Items

    return new Response(JSON.stringify(entries))
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const json = await req.json()
    const body = entryCreateSchema.parse(json)
    const entryId = randomUUID().toString()

    await db.put({
      TableName: Table.data.tableName,
      Item: {
        pk: `USER#${user.id}`,
        sk: `ENTRY#${entryId}`,
        id: entryId,
        title: body.title,
        content: body.content ? body.content : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    })

    return new Response(JSON.stringify({ id: entryId }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}
