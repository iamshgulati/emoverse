"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { User } from "@/types"
import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons"
import { signOut } from "next-auth/react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

async function deleteUser(userId: string) {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE",
  })

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your account was not deleted. Please try again.",
      variant: "destructive",
    })
    return false
  }

  return true
}

interface UserOperationsProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "id">
}

export function UserOperations({ user, className }: UserOperationsProps) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Delete Your Account</CardTitle>
          <CardDescription>
            This operation cannot be reverted. Please understand that you will
            not be able to restore or access your data.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <button
            className={cn(
              buttonVariants({}),
              "inline-flex items-center gap-2",
              "bg-red-600 text-red-100 hover:bg-red-600/90  focus:ring-red-600"
            )}
            onClick={() => setShowDeleteAlert(true)}
          >
            {isDeleteLoading ? (
              <Icons.LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ExclamationTriangleIcon />
            )}
            <span>Delete Account</span>
          </button>
        </CardFooter>
      </Card>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete your account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-red-100 hover:bg-red-600/90  focus:ring-red-600"
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteUser(user.id)

                setIsDeleteLoading(false)
                setShowDeleteAlert(false)

                if (deleted) {
                  signOut({
                    callbackUrl: "/register",
                  })
                }
              }}
            >
              {isDeleteLoading ? (
                <Icons.LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
