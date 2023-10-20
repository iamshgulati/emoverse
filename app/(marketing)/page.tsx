import Link from "next/link"
import { ArrowRightIcon, ChatBubbleIcon, MixIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default async function IndexPage() {
  return (
    <>
      <section className="cursor-default select-none space-y-6 py-24 md:py-32 lg:py-32 xl:py-44">
        <div className="container flex max-w-[72rem] flex-col items-center gap-4 text-center">
          <p className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium">
            🎉&nbsp;&nbsp;&nbsp;WE ARE LIVE&nbsp;&nbsp;&nbsp;🎉
          </p>
          <h1 className="pb-10 font-heading text-6xl sm:-mt-2 sm:text-7xl md:-mt-2 md:text-8xl">
            {siteConfig.name.toLowerCase()}
          </h1>
          <p className="-mt-12 font-heading text-3xl sm:text-4xl md:text-5xl">
            your safe space for emotional well-being
          </p>
          <p className="-mt-2 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 md:mt-0">
            Emoverse is your trusted partner to let out your thoughts, record
            your moods and emotional states. Let&apos;s begin feeling healthier
            together.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Link
              href="/login"
              className={cn(
                "group inline-flex items-center gap-1",
                buttonVariants({ size: "lg" })
              )}
            >
              Get Started
              <ArrowRightIcon className="group-hover:animate-bounce-x" />
            </Link>
            <Link
              href="/playground"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Try as Guest
            </Link>
          </div>
        </div>
      </section>
      <section
        id="technology"
        className="space-y-6 bg-slate-50 px-8 py-12 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Technology
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            This project is an experiment to see how a modern app, with features
            like authentication, database, and API routes can be hosted using
            fully-managed serverless cloud services.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.AWSLambdaIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">AWS Lambda</h3>
                <p className="text-sm text-muted-foreground">
                  Deployed on serverless infrastructure using AWS Lambda.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.AmazonDynamoDBIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Amazon DynamoDB</h3>
                <p className="text-sm text-muted-foreground">
                  On-demand unlimited serverless data capacity using Amazon
                  DynamoDB.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.AmazonCognitoIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Amazon Cognito</h3>
                <p className="text-sm text-muted-foreground">
                  Fully managed user authentication using Amazon Cognito.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex flex-row gap-8">
                <Icons.SSTIcon className="h-12 w-12 fill-background" />
                <Icons.AWSCloudDevelopmentKitIcon className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Infrastructure as Code</h3>
                <p className="text-sm text-muted-foreground">
                  Infrastructure built using SST and AWS Cloud Development Kit.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.AWSCloudFormationIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Infrastructure Provisioning</h3>
                <p className="text-sm text-muted-foreground">
                  Infrastructure provisioned using AWS CloudFormation Stacks.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex flex-row gap-8">
                <Icons.AWSCodeBuildIcon className="h-12 w-12" />
                <Icons.AWSCodePipelineIcon className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Integration & Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Continuous delivery using AWS CodeBuild, and CodePipeline.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Frontend and Backend is built using full-stack technologies such as
            Next.js, Typescript, React.js, and TailwindCSS.
          </p>
        </div>
      </section>
      <section
        id="future-work"
        className="space-y-6 bg-slate-50 px-8 py-12 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Future Work
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            In the future we will work hard to add more features to enhance the
            user experience and usability of Emoverse for our users.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <MixIcon className="h-12 w-12" />
              <div className="space-y-2">
                <div className="inline-flex flex-row items-center space-x-3">
                  <h3 className="font-bold">Flexible Content</h3>
                  <Badge variant="secondary" className="h-5">
                    paid
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  More content blocks like images using cloud storage services.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.MagicWandIcon className="h-12 w-12" />
              <div className="space-y-2">
                <div className="inline-flex flex-row items-center space-x-3">
                  <h3 className="font-bold">Writing Prompts</h3>
                  <Badge variant="secondary" className="h-5">
                    paid
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Prompts for easier writing using artificial intelligence
                  services.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.AmazonComprehendIcon className="h-12 w-12" />
              <div className="space-y-2">
                <div className="inline-flex flex-row items-center space-x-3">
                  <h3 className="font-bold">Emotional Insights</h3>
                  <Badge variant="secondary" className="h-5">
                    paid
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Valuable insights into emotional states using data analytics
                  services.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.StripeIcon className="h-12 w-12" />
              <div className="space-y-2">
                <div className="inline-flex flex-row items-center space-x-3">
                  <h3 className="font-bold">Subscriptions</h3>
                  <Badge variant="secondary" className="h-5">
                    paid
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paid subscriptions for users looking to upgrade their
                  experience.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Icons.TagIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Content Management</h3>
                <p className="text-sm text-muted-foreground">
                  Enhanced journal management with bookmarks and tags.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <ChatBubbleIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Improved UI/UX with suggestive choices for emotion and things.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
