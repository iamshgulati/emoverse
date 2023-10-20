import { PropsWithChildren } from "react"

export default function MdxLayout({ children }: PropsWithChildren) {
  return (
    <article className="container relative max-w-4xl py-6 lg:py-10">
      {children}
    </article>
  )
}
