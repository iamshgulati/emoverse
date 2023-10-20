import { Entry } from "@/types"

import { Playground } from "@/components/playground"

export default async function PlaygroundPage() {
  return (
    <Playground
      defaultEntry={{
        id: playgroundEntry.id,
        title: playgroundEntry.title,
        content: playgroundEntry.content,
      }}
    />
  )
}

const playgroundEntry: Pick<Entry, "id" | "title" | "content"> = {
  id: "0",
  title: "Untitled Entry",
  content: {},
}

const playgroundWarning: Pick<Entry, "id" | "title" | "content"> = {
  id: "0",
  title: "Untitled Entry",
  content: {
    blocks: [
      {
        data: {
          text: "⚠️ <em>Don't store private data on this page.</em> It is only meant to let our users explore the capabilities of our application. What you write on this page is <u>only stored on your computer in this browser</u>. Even though other users of this website cannot see what you write here, <u>other people who use your computer</u> can still visit this page and see what you have saved.",
        },
        type: "paragraph",
      },
    ],
  },
}

const playgroundMessageFromTeam: Pick<Entry, "id" | "title" | "content"> = {
  id: "0",
  title: "A Message from The Team",
  content: {
    blocks: [
      {
        data: {
          text: "<b>Dear Emoverse Explorer,</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "We are absolutely thrilled to welcome you to Emoverse, a new journaling app that promises to take your personal reflections to a entirely new dimension. As you embark on this exciting journey, I wanted to take a moment to celebrate the start of your journaling adventure with us.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "<b>Why Emoverse?</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "Emoverse isn't just any journaling app; it's a place where your thoughts and experiences come to life, where your daily musings transform into captivating narratives, and where your emotions are the guiding stars. This app is a space for you to craft your own universe, one entry at a time.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "<b>Unleash Your Creativity</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "Emoverse is more than just words on a screen. It's a canvas for your imagination. Explore our vast collection of themes, fonts, and backgrounds to make your journal truly unique. Add photos, sketches, or voice notes to your entries to bring them to life in ways you've never imagined.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "<b>The Power of Community</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "Emoverse isn't just about your personal journey; it's about the community of fellow explorers. You can choose to keep your entries private or share them with the world. Connect with like-minded individuals, find inspiration in others' stories, and support one another on this adventure of self-discovery.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "<b>Embrace the Future</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "As Emoverse evolves, we're committed to bringing you exciting new features, making your journaling experience even more immersive and rewarding. You'll soon discover features that help you track your progress, set and achieve personal goals, and unlock your full creative potential.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "<b>Getting Started</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "To get started, simply create your account and dive into the universe of Emoverse. The blank page is your canvas, and the possibilities are endless.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "So, what are you waiting for? Begin your journey today and let Emoverse help you explore the depths of your mind, document your adventures, and unleash your creativity.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "Thank you for choosing Emoverse to be a part of your journaling voyage. We can't wait to see the amazing stories and experiences you'll share.",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "Happy journaling, Emoverse Explorer!",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "Warmest regards,",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "<b>Team Emoverse</b>",
        },
        type: "paragraph",
      },
      {
        data: {
          text: "P.S. Don't forget to reach out to our support team if you have any questions along the way. We're here to make your journey as smooth as possible.",
        },
        type: "paragraph",
      },
    ],
  },
}
