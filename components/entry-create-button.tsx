"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { PlusIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface EntryCreateButtonProps extends ButtonProps {}

export function EntryCreateButton({
  className,
  variant,
  ...props
}: EntryCreateButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Entry",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your entry was not created. Please try again.",
        variant: "destructive",
      })
    }

    const entry = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/editor/${entry.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <PlusIcon className="mr-2 h-4 w-4" />
      )}
      New entry
    </button>
  )
}
