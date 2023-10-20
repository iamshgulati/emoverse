import { setMetaThemeColor } from "@/scripts/theme-effect"

export function MetaThemeColorProvider() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!${setMetaThemeColor.toString()}();`,
      }}
    />
  )
}
