'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Briefcase, Sparkles } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { Stat } from '@/types'
import { fadeUp, fadeInLeft, fadeInRight, staggerContainer, staggerFast, viewportOnce } from '@/lib/motion'
import { useCountUp } from '@/hooks/useCountUp'

/** Quick-fact rows shown in the right-hand glass panel. */
const QUICK_FACTS = [
  { icon: MapPin, label: 'Based in', value: portfolio.profile.location },
  { icon: Briefcase, label: 'Role', value: portfolio.profile.title },
  { icon: Sparkles, label: 'Focus', value: 'GenAI · LLMs · Full Stack' },
] as const

/** A single counting stat card (own component so `useCountUp` isn't in a loop). */
function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.value, { start, decimals: 0 })
  return (
    <motion.div variants={fadeUp} className="glass glass-hover rounded-2xl p-5 text-center sm:p-6">
      <div className="font-display text-4xl font-bold tracking-tight gradient-text sm:text-5xl">
        {stat.prefix}
        {value}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
    </motion.div>
  )
}

export default function About() {
  const reduced = useReducedMotion() ?? false
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-80px' })

  return (
    <section id="about" className="section">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">
          About Me
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-3 font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl"
        >
          The story <span className="gradient-text">behind the work</span>
        </motion.h2>

        <div className="mt-12 grid gap-8 md:grid-cols-5 md:gap-10">
          <motion.div variants={fadeInLeft} className="space-y-5 md:col-span-3">
            {portfolio.profile.bio.map((paragraph, i) => (
              <p key={i} className="max-w-prose text-base leading-relaxed text-slate-300 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.aside variants={fadeInRight} className="md:col-span-2" aria-label="Quick facts">
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-slate-400">
                At a glance
              </h3>
              <ul className="mt-5 space-y-5">
                {QUICK_FACTS.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10 text-accent-violet shadow-glow"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-slate-500">{label}</span>
                      <span className="block text-sm font-medium text-slate-200">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        ref={ref}
        variants={staggerFast}
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-12 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6"
      >
        {portfolio.stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} start={inView} />
        ))}
      </motion.div>
    </section>
  )
}
