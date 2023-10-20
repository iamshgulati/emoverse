import mdx from "@next/mdx"
import remarkGfm from "remark-gfm"
import { Config } from "sst/node/config"

/** @type {import('@next/mdx').NextMDXOptions} */
const mdxConfig = {
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["mdx", "ts", "tsx"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    NEXT_PUBLIC_APP_URL: Config.NEXT_PUBLIC_APP_URL,
    NEXTAUTH_SECRET: Config.NEXTAUTH_SECRET,
  },
  webpack: (config, { isServer, nextRuntime, webpack }) => {
    if (isServer && nextRuntime === "nodejs")
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      )
    return config
  },
}

export default mdx(mdxConfig)(nextConfig)
