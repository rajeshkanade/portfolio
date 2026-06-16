'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { SocialLink } from '@/types'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

/** Only the icons actually present in portfolio.socials are mapped. */
const SOCIAL_ICONS: Partial<Record<SocialLink['icon'], LucideIcon>> = {
  Github,
  Linkedin,
  Mail,
  Phone,
}

export default function Footer() {
  const { profile, nav, socials } = portfolio
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-ink-deep/40">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
      >
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* LEFT — brand */}
          <motion.div variants={fadeUp} className="max-w-sm">
            <a href="#home" className="gradient-text font-display text-3xl font-bold tracking-tight" aria-label="Back to top — Rajesh Kanade">
              RK
            </a>
            <p className="mt-4 font-display text-lg font-semibold text-slate-50">{profile.name}</p>
            <p className="mt-1 text-sm text-slate-400">{profile.title}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{profile.location}</p>
          </motion.div>

          {/* MIDDLE — quick links */}
          <motion.nav variants={fadeUp} aria-label="Footer" className="md:flex-1 md:px-8">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:max-w-xs">
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 transition-colors duration-200 hover:text-accent-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* RIGHT — socials + back to top */}
          <motion.div variants={fadeUp} className="flex flex-col items-start gap-6">
            <div>
              <p className="eyebrow mb-4">Connect</p>
              <ul className="flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.icon]
                  if (!Icon) return null
                  const isExternal = social.href.startsWith('http')
                  return (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        aria-label={social.label}
                        className="glass grid h-11 w-11 place-items-center rounded-full text-slate-300 transition-all duration-200 hover:scale-110 hover:text-accent-violet hover:shadow-glow"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <a
              href="#home"
              aria-label="Back to top"
              className="glass group grid h-11 w-11 place-items-center rounded-full text-slate-300 transition-all duration-200 hover:scale-110 hover:text-accent-cyan hover:shadow-glow-cyan"
            >
              <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript, Tailwind &amp; Framer Motion.</p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
