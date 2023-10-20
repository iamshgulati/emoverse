import { getWebsiteUrlForStage } from "@/sst.config"
import { Config, NextjsSite, StackContext, use } from "sst/constructs"

import { auth } from "./auth"
import { persistence } from "./persistence"

export function web({ app, stack }: StackContext) {
  const { COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, COGNITO_ISSUER } = use(auth)
  const { dataTable } = use(persistence)

  const NEXT_PUBLIC_APP_URL = new Config.Parameter(
    stack,
    "NEXT_PUBLIC_APP_URL",
    {
      value: getWebsiteUrlForStage(app.stage),
    }
  )
  //
  const NEXT_AUTH_AWS_ACCESS_KEY = new Config.Secret(
    stack,
    "NEXT_AUTH_AWS_ACCESS_KEY"
  )
  const NEXT_AUTH_AWS_SECRET_KEY = new Config.Secret(
    stack,
    "NEXT_AUTH_AWS_SECRET_KEY"
  )
  const NEXT_AUTH_AWS_REGION = new Config.Parameter(
    stack,
    "NEXT_AUTH_AWS_REGION",
    { value: dataTable.cdk.table.env.region }
  )
  //
  const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET")
  //
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID")
  const GOOGLE_CLIENT_SECRET = new Config.Secret(stack, "GOOGLE_CLIENT_SECRET")

  const website = new NextjsSite(stack, "website", {
    runtime: "nodejs18.x",
    warm: 1,
    environment: {
      NEXT_PUBLIC_APP_URL: NEXT_PUBLIC_APP_URL.value,
      NEXTAUTH_URL: NEXT_PUBLIC_APP_URL.value,
    },
    bind: [
      NEXT_PUBLIC_APP_URL,
      //
      dataTable,
      //
      NEXT_AUTH_AWS_ACCESS_KEY,
      NEXT_AUTH_AWS_SECRET_KEY,
      NEXT_AUTH_AWS_REGION,
      //
      NEXTAUTH_SECRET,
      //
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      //
      COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET,
      COGNITO_ISSUER,
    ],
  })

  stack.addOutputs({
    SiteUrl: website.url || "http://localhost:3000",
  })
}
