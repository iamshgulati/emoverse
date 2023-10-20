import { JournalConfig } from "types"

export const journalConfig: JournalConfig = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Journal",
      href: "/journal",
      icon: "EntryIcon",
    },
    {
      title: "Settings",
      href: "/journal/settings",
      icon: "SettingsIcon",
    },
    {
      title: "Bookmarks",
      href: "/journal/bookmarks",
      icon: "BookmarkIcon",
      disabled: true,
    },
    {
      title: "Tags",
      href: "/journal/tags",
      icon: "TagIcon",
      disabled: true,
    },
    {
      title: "Billing",
      href: "/journal/billing",
      icon: "CreditCardIcon",
      disabled: true,
    },
  ],
}
