'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { SocialLink } from '@/types'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { useMagnetic } from '@/hooks/useMagnetic'

/** Maps the social-link icon union to its lucide component. */
const SOCIAL_ICONS: Record<SocialLink['icon'], LucideIcon> = {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin: Mail,
  FileText: Mail,
  Twitter: Mail,
  Globe: Mail,
}

interface TypewriterOpts {
  /** ms between typed characters */
  typeSpeed?: number
  /** ms between erased characters */
  deleteSpeed?: number
  /** ms to hold the full string before erasing */
  pauseEnd?: number
  /** ms to wait (empty) before retyping */
  pauseStart?: number
}

/**
 * Reveals `text` one character at a time, then erases and retypes it forever
 * (a looping typewriter). Honors reduced-motion by rendering the full string
 * statically. Returns the currently-visible slice.
 */
function useTypewriter(text: string, opts: TypewriterOpts = {}): { text: string } {
  const { typeSpeed = 140, deleteSpeed = 55, pauseEnd = 1800, pauseStart = 650 } = opts
  const reduced = useReducedMotion() ?? false
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) {
      setCount(text.length)
      return
    }
    let i = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    const step = (): void => {
      if (!deleting) {
        i += 1
        setCount(i)
        if (i >= text.length) {
          deleting = true
          timer = setTimeout(step, pauseEnd)
          return
        }
      } else {
        i -= 1
        setCount(i)
        if (i <= 0) {
          deleting = false
          timer = setTimeout(step, pauseStart)
          return
        }
      }
      timer = setTimeout(step, deleting ? deleteSpeed : typeSpeed)
    }
    timer = setTimeout(step, pauseStart)
    return () => clearTimeout(timer)
  }, [text, typeSpeed, deleteSpeed, pauseEnd, pauseStart, reduced])

  return { text: text.slice(0, count) }
}

/** Blinking typewriter caret. Zero-width wrapper so it never affects text
 *  wrapping; the visible bar is drawn by an absolutely-positioned child. */
function TypeCaret() {
  return (
    <span className="relative inline-block w-0 align-baseline" aria-hidden>
      <span className="animate-blink absolute bottom-[0.1em] left-0 h-[0.72em] w-[3px] rounded-full bg-accent-cyan" />
    </span>
  )
}

/** A single magnetic, icon-only social link (own component so the hook is not
 *  called inside a loop). */
function MagneticSocial({ social }: { social: SocialLink }) {
  const m = useMagnetic(0.4)
  const Icon = SOCIAL_ICONS[social.icon]
  const external = social.href.startsWith('http')
  return (
    <motion.a
      href={social.href}
      aria-label={social.label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      style={{ x: m.x, y: m.y }}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.94 }}
      className="glass grid h-11 w-11 place-items-center rounded-full text-slate-300 transition-colors hover:text-accent-cyan hover:shadow-glow-cyan"
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  )
}

export default function Hero() {
  const reduced = useReducedMotion() ?? false
  const { profile, socials } = portfolio
  const cta = useMagnetic(0.35)

  // Typewriter for the headline. We type one continuous string ("Hi, I'm " +
  // name). To keep wrapping/height perfectly stable, every character is ALWAYS
  // rendered — typed chars are shown, the rest are visibility-hidden but still
  // occupy their space — so line breaks are fixed by the final text and never
  // reflow. The caret is zero-width, so it can't shift wrapping either.
  const prefix = "Hi, I'm "
  const fullHeading = `${prefix}${profile.name}`
  const { text: typed } = useTypewriter(fullHeading)
  const count = typed.length
  const nameStart = prefix.length
  const inName = count >= nameStart
  const visPrefix = fullHeading.slice(0, Math.min(count, nameStart))
  const hidPrefix = prefix.slice(Math.min(count, nameStart))
  const visName = inName ? profile.name.slice(0, count - nameStart) : ''
  const hidName = inName ? profile.name.slice(count - nameStart) : profile.name

  const float = reduced ? {} : { y: [0, -16, 0] }
  const floatTransition = reduced
    ? undefined
    : { duration: 6, repeat: Infinity, ease: 'easeInOut' as const }

  return (
    <section id="home" className="section flex min-h-screen items-center pt-28">
      {/* ambient glow backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow opacity-70" />

      <div className="grid w-full items-center gap-12 md:grid-cols-2">
        {/* LEFT — copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="order-2 md:order-1">
          <motion.p variants={fadeUp} className="eyebrow flex items-center gap-2 text-accent-cyan">
            <span className="relative flex h-2.5 w-2.5">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-cyan" />
            </span>
            Available for opportunities
          </motion.p>

          <motion.h1
            variants={fadeUp}
            aria-label={fullHeading}
            className="mt-5 font-display text-5xl font-bold leading-tight text-slate-50 sm:text-6xl lg:text-7xl"
          >
            {/* Every character is always in the flow (typed = visible, untyped =
                visibility:hidden) so wrapping is decided once by the full text
                and can't jump. The caret is a zero-width marker. */}
            <span aria-hidden>
              <span>{visPrefix}</span>
              {!inName && <TypeCaret />}
              {hidPrefix && <span className="invisible">{hidPrefix}</span>}
              {visName && <span className="gradient-text">{visName}</span>}
              {inName && <TypeCaret />}
              {hidName && <span className="invisible gradient-text">{hidName}</span>}
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 text-lg font-medium text-accent-cyan sm:text-xl">
            {profile.title}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              style={{ x: cta.x, y: cta.y }}
              onMouseMove={cta.onMouseMove}
              onMouseLeave={cta.onMouseLeave}
              className="btn-primary group inline-flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>

            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download className="btn-ghost inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                Resume
              </a>
            )}
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-3">
            {socials.map((social) => (
              <MagneticSocial key={social.label} social={social} />
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — floating portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative order-1 mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center md:order-2"
        >
          {/* blurred accent glow behind */}
          <div aria-hidden className="absolute h-[72%] w-[72%] rounded-full bg-accent-gradient opacity-30 blur-3xl" />

          {/* orbiting rings */}
          <div
            aria-hidden
            className={`absolute h-[96%] w-[96%] rounded-full border border-accent-violet/30 ${
              reduced ? '' : 'animate-spin-slow'
            }`}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-violet shadow-glow" />
          </div>
          <div
            aria-hidden
            className={`absolute h-[110%] w-[110%] rounded-full border border-accent-cyan/20 ${
              reduced ? '' : 'animate-spin-reverse'
            }`}
          >
            <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan shadow-glow-cyan" />
          </div>

          {/* portrait disc — its own dark→accent radial gradient (matching the
              site) shows through the cut-out photo, so the photo background is
              the website background. */}
          <motion.div animate={float} transition={floatTransition} className="glow-border relative h-[84%] w-[84%] rounded-full">
            <div
              className="relative h-full w-full overflow-hidden rounded-full shadow-glow-lg"
              style={{
                background:
                  'radial-gradient(115% 115% at 50% 32%, rgba(99,102,241,0.22), rgba(18,18,28,0.95) 52%, #06060a 100%)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo}
                alt={profile.name}
                className="absolute bottom-0 left-1/2 h-[112%] w-[112%] max-w-none -translate-x-1/2 object-contain object-bottom"
                style={{
                  // Feather the bottom edge so the torso melts into the disc.
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 86%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 86%, transparent 100%)',
                }}
              />

              {/* inner vignette to seat the subject on the disc */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{ boxShadow: 'inset 0 -40px 60px -30px rgba(6,6,10,0.9)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll-down indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 transition-colors hover:text-accent-cyan"
      >
        <motion.span
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  )
}
