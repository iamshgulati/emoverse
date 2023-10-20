import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL
}

export function absoluteUrl(path: string) {
  return `${getBaseUrl()}${path}`
}

export function chunks(inputArray: any[], chunkSize: number) {
  return inputArray.reduce((all, one, i) => {
    const ch = Math.floor(i / chunkSize)
    all[ch] = [].concat(all[ch] || [], one)
    return all
  }, [])
}
