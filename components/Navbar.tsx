'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { useMagnetic } from '@/hooks/useMagnetic'
import { springSnappy } from '@/lib/motion'

/**
 * Fixed top navigation:
 *  - transparent at the top, morphs into a frosted-glass bar after scroll;
 *  - desktop links with an IntersectionObserver-driven active indicator;
 *  - a magnetic "Resume" CTA;
 *  - a mobile hamburger that opens an animated glass drawer.
 */
export default function Navbar() {
  const reduced = useReducedMotion() ?? false
  const { nav, profile } = portfolio
  const sectionIds = nav.map((link) => link.href.replace(/^#/, ''))

  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')
  const [menuOpen, setMenuOpen] = useState(false)

  const resume = useMagnetic(0.4)

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join('|')])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  const drawerId = 'mobile-nav-drawer'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className={[
          'mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 transition-colors duration-300 sm:px-6',
          scrolled
            ? 'border-b border-white/10 bg-ink/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-baseline gap-2 font-display font-bold"
          aria-label={`${profile.name} — home`}
        >
          <span className="gradient-text text-2xl leading-none">RK</span>
          <span className="hidden text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-200 lg:inline">
            {profile.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((link) => {
            const id = link.href.replace(/^#/, '')
            const isActive = id === activeId
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'relative block rounded-full px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-slate-50' : 'text-slate-400 hover:text-slate-100',
                  ].join(' ')}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent-gradient"
                      transition={reduced ? { duration: 0 } : springSnappy}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {profile.resumeUrl && (
            <motion.a
              href={profile.resumeUrl}
              download
              style={{ x: resume.x, y: resume.y }}
              onMouseMove={resume.onMouseMove}
              onMouseLeave={resume.onMouseLeave}
              className="btn-primary hidden items-center gap-2 sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>Resume</span>
            </motion.a>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            className="glass glass-hover inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-200 md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id={drawerId}
            key="drawer"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={reduced ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
            className="glass mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((link) => {
                const id = link.href.replace(/^#/, '')
                const isActive = id === activeId
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-white/5 text-slate-50'
                          : 'text-slate-300 hover:bg-white/5 hover:text-slate-50',
                      ].join(' ')}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-3 inline-flex w-full items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume</span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
