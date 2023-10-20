import { PropsWithChildren } from "react"

interface JournalHeaderProps {
  heading: string
  text?: string
}

export function JournalHeader({
  heading,
  text,
  children,
}: PropsWithChildren<JournalHeaderProps>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && (
          <p className="hidden text-lg text-muted-foreground sm:block">
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
