import { SiteConfig } from "types"
import { getBaseUrl } from "@/lib/utils"

export const siteConfig: SiteConfig = {
  name: "Emoverse",
  description: "Your safe space for emotional well-being.",
  url: `${getBaseUrl()}`,
  links: {
    twitter: "https://twitter.com/iamshgulati",
    github: "https://github.com/iamshgulati",
  },
}
