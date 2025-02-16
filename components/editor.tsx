"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"

import { Entry } from "@/types"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { entryPatchSchema } from "@/lib/validations/entry"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface EditorProps {
  entry: Pick<Entry, "id" | "title" | "content">
}

type FormData = z.infer<typeof entryPatchSchema>

export function Editor({ entry }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(entryPatchSchema),
  })
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isTitleChanged, setIsTitleChanged] = React.useState<boolean>(false)
  const [isContentChanged, setIsContentChanged] = React.useState<boolean>(false)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
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

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const blocks = await ref.current?.save()

    const response = await fetch(`/api/journal/${entry.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    })

    setIsSaving(false)
    setIsTitleChanged(false)
    setIsContentChanged(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your entry was not saved. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()

    return toast({
      description: "Your entry has been saved.",
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/journal"
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
        <div className="prose prose-stone mx-auto max-w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={entry.title}
            placeholder="Entry title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent py-2 text-5xl font-bold focus:outline-none"
            {...register("title")}
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
