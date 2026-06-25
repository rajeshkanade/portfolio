import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { portfolio } from '@/data/portfolio'

// next/font self-hosts the fonts (no external request) and exposes them as CSS
// variables that the Tailwind `font-display` / `font-sans` families consume.
const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const { profile } = portfolio
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rajeshkanade.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — Generative AI Engineer`,
  description:
    'Rajesh Kanade — Generative AI Engineer & Full Stack Developer. LLM applications, RAG pipelines, and agentic AI systems with LangChain, LangGraph & FastAPI.',
  keywords: [
    'Generative AI Engineer',
    'LLM',
    'RAG',
    'LangChain',
    'LangGraph',
    'Agentic AI',
    'Full Stack Developer',
    'Rajesh Kanade',
  ],
  authors: [{ name: profile.name }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: `${profile.name} — Generative AI Engineer`,
    description:
      'Production-grade LLM applications, RAG pipelines, and agentic AI systems.',
    type: 'website',
    url: siteUrl,
    images: [{ url: '/profile.jpg', width: 1252, height: 1252, alt: profile.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Generative AI Engineer`,
    description:
      'Production-grade LLM applications, RAG pipelines, and agentic AI systems.',
    images: ['/profile.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  )
}
