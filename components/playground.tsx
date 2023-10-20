"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import TextareaAutosize from "react-textarea-autosize"

import "@/styles/editor.css"

import { Entry } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { entryPatchSchema } from "@/lib/validations/entry"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface PlaygroundProps {
  defaultEntry: Pick<Entry, "id" | "title" | "content">
}

type FormData = z.infer<typeof entryPatchSchema>

export function Playground({ defaultEntry }: PlaygroundProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(entryPatchSchema),
  })
  const router = useRouter()
  const ref = React.useRef<EditorJS>()
  const [isTitleChanged, setIsTitleChanged] = React.useState<boolean>(false)
  const [isContentChanged, setIsContentChanged] = React.useState<boolean>(false)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  const [entry, setEntry] =
    React.useState<Pick<Entry, "id" | "title" | "content">>(defaultEntry)

  React.useEffect(() => {
    const cachedEntry = localStorage.getItem("emoverse-playground")
    if (cachedEntry) {
      setEntry(JSON.parse(cachedEntry))
    }
  }, [])

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Underline = (await import("@editorjs/underline")).default
    const Embed = (await import("@editorjs/embed")).default
    const List = (await import("@editorjs/list")).default
    const LinkTool = (await import("@editorjs/link")).default
    const SimpleImage = (await import("@editorjs/simple-image")).default

    const body = entryPatchSchema.parse(entry)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        onChange() {
          setIsContentChanged(true)
        },
        placeholder: "Start writing...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          underline: Underline,
          linkTool: LinkTool,
          list: List,
          embed: Embed,
          image: SimpleImage,
        },
      })
    }
  }, [entry])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  if (!isMounted) {
    return null
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    setTimeout(async () => {
      const blocks = await ref.current?.save()

      localStorage.setItem(
        "emoverse-playground",
        JSON.stringify({
          id: "0",
          title: data.title,
          content: blocks,
        })
      )

      setIsSaving(false)
      setIsTitleChanged(false)
      setIsContentChanged(false)

      router.refresh()

      return toast({
        description: "Your entry has been saved in your browser.",
      })
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/#skip-navigation"
              className={cn("-ml-4", buttonVariants({ variant: "ghost" }))}
            >
              <>
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
          </div>
          <button
            type="submit"
            className={cn(
              isTitleChanged || isContentChanged
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "secondary" })
            )}
          >
            {isSaving && (
              <Icons.LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-slate mx-auto max-w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={entry.title}
            placeholder="Entry title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-5xl font-bold focus:outline-none"
            {...register("title")}
            onChange={() => setIsTitleChanged(true)}
          />
          <div id="editor" className="min-h-[500px] py-2" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  )
}
