import { db } from "@/lib/db"
import { chunks } from "@/lib/utils"

export async function batchDelete(
  tableName: string,
  Items?: Record<string, any>[]
) {
  if (Items && Items.length > 0) {
    const batchCalls = chunks(Items, 25).map(
      async (chunk: { pk: string; sk: string }[]) => {
        const deleteRequests = chunk.map((item: { pk: string; sk: string }) => {
          return {
            DeleteRequest: {
              Key: {
                pk: item.pk,
                sk: item.sk,
              },
            },
          }
        })

        const batchWriteParams = {
          RequestItems: {
            [tableName]: deleteRequests,
          },
        }
        db.batchWrite(batchWriteParams)
      }
    )

    Promise.all(batchCalls)
  }
}
