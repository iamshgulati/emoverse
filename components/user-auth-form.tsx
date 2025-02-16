"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isCognitoLoading, setIsCognitoLoading] = React.useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "default" }))}
        onClick={() => {
          setIsCognitoLoading(true)
          signIn("cognito", {
            redirect: true,
            callbackUrl: searchParams?.get("from") || "/journal",
          })
        }}
        disabled={isCognitoLoading || isGoogleLoading}
      >
        {isCognitoLoading ? (
          <Icons.LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.AmazonAWSIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Cognito
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with any of your social accounts
          </span>
        </div>
      </div>
      <div className="grid gap-4">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGoogleLoading(true)
            signIn("google", {
              redirect: true,
              callbackUrl: searchParams?.get("from") || "/journal",
            })
          }}
          disabled={isCognitoLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.GoogleIcon className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </button>
      </div>
    </div>
  )
}
