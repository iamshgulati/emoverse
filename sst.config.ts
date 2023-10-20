import { auth } from "@/stacks/auth"
import { persistence } from "@/stacks/persistence"
import { web } from "@/stacks/web"
import { SSTConfig } from "sst"

export function getWebsiteUrlForStage(stage: string) {
  switch (stage) {
    case "prod":
      return "https://d34abq0dnwt19t.cloudfront.net"
    case "test":
      return "https://d2yqrshpx2r0as.cloudfront.net"
    default:
      return "http://localhost:3000"
  }
}

export default {
  config(_input) {
    return {
      name: "emoverse",
      region: "us-east-1",
    }
  },
  stacks(app) {
    app.stack(auth).stack(persistence).stack(web)
  },
} satisfies SSTConfig
