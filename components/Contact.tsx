'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, type LucideIcon } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { submitContact } from '@/lib/api'
import { fadeUp, fadeInLeft, fadeInRight, staggerContainer, viewportOnce } from '@/lib/motion'
import { useMagnetic } from '@/hooks/useMagnetic'
import type { ContactFormValues, SocialLink } from '@/types'

/** Map the (subset of) social icon names actually present to lucide components. */
const SOCIAL_ICONS: Partial<Record<SocialLink['icon'], LucideIcon>> = {
  Github,
  Linkedin,
  Mail,
  Phone,
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = Partial<Record<keyof ContactFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** A single magnetic social icon link. */
function MagneticSocial({ social }: { social: SocialLink }) {
  const m = useMagnetic(0.4)
  const Icon = SOCIAL_ICONS[social.icon] ?? Mail
  const isExternal = social.href.startsWith('http')

  return (
    <motion.a
      href={social.href}
      aria-label={social.label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{ x: m.x, y: m.y }}
      onMouseMove={m.onMouseMove}
      onMouseLeave={m.onMouseLeave}
      className="glass glass-hover flex h-12 w-12 items-center justify-center rounded-xl text-slate-200 transition-colors hover:text-accent-cyan"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </motion.a>
  )
}

export default function Contact() {
  const { profile, socials } = portfolio

  const [values, setValues] = useState<ContactFormValues>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [result, setResult] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = (v: ContactFormValues): FieldErrors => {
    const next: FieldErrors = {}
    if (v.name.trim().length < 2) next.name = 'Please enter your name (at least 2 characters).'
    if (!EMAIL_RE.test(v.email.trim())) next.email = 'Please enter a valid email address.'
    if (v.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
    return next
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setResult('Please fix the highlighted fields and try again.')
      return
    }

    setStatus('loading')
    setResult('')
    const res = await submitContact(values)
    if (res.ok) {
      setStatus('success')
      setResult(res.message)
      setValues({ name: '', email: '', message: '' })
    } else {
      setStatus('error')
      setResult(res.message)
    }
  }

  const isLoading = status === 'loading'

  return (
    <section id="contact" className="section">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.p variants={fadeUp} className="eyebrow">
          Get In Touch
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-slate-50 sm:text-4xl md:text-5xl">
          Let&rsquo;s <span className="gradient-text">build something</span> remarkable
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base text-slate-300 sm:text-lg">
          Have a project, a role, or an idea worth exploring? Drop a message and I&rsquo;ll get back to you soon.
        </motion.p>
      </motion.div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {/* LEFT — contact details */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-6"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <a href={`mailto:${profile.email}`} className="glass glass-hover group flex items-center gap-4 rounded-2xl p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-ink shadow-glow">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-slate-400">Email</span>
                  <span className="block truncate text-slate-100 transition-colors group-hover:text-accent-cyan">
                    {profile.email}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone}`} className="glass glass-hover group flex items-center gap-4 rounded-2xl p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-ink shadow-glow">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-slate-400">Phone</span>
                  <span className="block truncate text-slate-100 transition-colors group-hover:text-accent-cyan">
                    {profile.phone}
                  </span>
                </span>
              </a>
            </li>
            <li>
              <div className="glass flex items-center gap-4 rounded-2xl p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-ink shadow-glow">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-slate-400">Location</span>
                  <span className="block truncate text-slate-100">{profile.location}</span>
                </span>
              </div>
            </li>
          </ul>

          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-slate-400">Find me online</p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <MagneticSocial key={social.label} social={social} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT — form card */}
        <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <form onSubmit={handleSubmit} noValidate className="glass flex flex-col gap-5 rounded-2xl p-6 sm:p-8">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={values.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/60"
              />
              {errors.name && (
                <p id="contact-name-error" role="alert" className="mt-2 text-sm text-accent-pink">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/60"
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="mt-2 text-sm text-accent-pink">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-200">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={values.message}
                onChange={handleChange}
                placeholder="Tell me a little about what you have in mind…"
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/60"
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="mt-2 text-sm text-accent-pink">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </button>

            <p
              aria-live="polite"
              className={
                status === 'success'
                  ? 'min-h-[1.25rem] text-sm text-accent-cyan'
                  : status === 'error'
                    ? 'min-h-[1.25rem] text-sm text-accent-pink'
                    : 'min-h-[1.25rem] text-sm text-slate-400'
              }
            >
              {result}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
