/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // mongoose is only used inside server-side API route handlers; keep it
    // external to the serverless bundle so Next doesn't try to bundle its
    // optional native deps.
    serverComponentsExternalPackages: ['mongoose'],
  },
}

export default nextConfig
