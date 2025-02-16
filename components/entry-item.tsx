import Link from "next/link"
import { Entry } from "@/types"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { EntryOperations } from "@/components/entry-operations"

interface EntryItemProps {
  entry: Pick<Entry, "id" | "title" | "createdAt">
}

export function EntryItem({ entry }: EntryItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${entry.id}`}
          className="font-semibold hover:underline"
        >
          {entry.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(entry.createdAt)}
          </p>
        </div>
      </div>
      <EntryOperations entry={{ id: entry.id, title: entry.title }} />
    </div>
  )
}

EntryItem.Skeleton = function EntryItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
