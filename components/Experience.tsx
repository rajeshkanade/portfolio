'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react'
import type { ExperienceItem } from '@/types'
import { portfolio } from '@/data/portfolio'
import { fadeUp, fadeInRight, staggerContainer, staggerFast, spring, viewportOnce } from '@/lib/motion'

/** A single timeline entry: milestone node on the gradient spine + glass card. */
function TimelineEntry({ item, index }: { item: ExperienceItem; index: number }) {
  const reduced = useReducedMotion() ?? false
  const alignRight = index % 2 === 1

  return (
    <li className="relative pl-14 md:pl-0">
      {/* Milestone node — sits on the spine. */}
      <span className="absolute left-4 top-1.5 z-10 -translate-x-1/2 md:left-1/2" aria-hidden="true">
        <motion.span
          className={[
            'block h-4 w-4 rounded-full bg-accent-gradient shadow-glow',
            item.current ? 'animate-pulse-glow ring-4 ring-accent-violet/30' : '',
          ].join(' ')}
          variants={fadeUp}
        />
      </span>

      <div className={['md:w-1/2', alignRight ? 'md:ml-auto md:pl-12' : 'md:pr-12'].join(' ')}>
        <motion.article variants={alignRight ? fadeInRight : fadeUp} className="glass-hover rounded-2xl p-6 md:p-7">
          <header className="mb-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-xl font-semibold text-slate-50 md:text-2xl">{item.role}</h3>
              {item.current && (
                <span className="chip animate-pulse-glow bg-accent-gradient text-slate-50">Present</span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-accent-violet" aria-hidden="true" />
                <span className="text-slate-300">{item.company}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent-cyan" aria-hidden="true" />
                {item.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-accent-indigo" aria-hidden="true" />
                {item.period}
              </span>
            </div>

            {item.summary && (
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-accent-cyan/90">
                {item.summary}
              </p>
            )}
          </header>

          <motion.ul className="space-y-2.5" variants={reduced ? undefined : staggerFast}>
            {item.highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={reduced ? undefined : fadeUp}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-cyan" aria-hidden="true" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.article>
      </div>
    </li>
  )
}

export default function Experience() {
  const reduced = useReducedMotion() ?? false
  const { experience } = portfolio

  return (
    <section id="experience" className="section">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">
          Experience
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"
        >
          Where I&rsquo;ve <span className="gradient-text">made an impact</span>
        </motion.h2>

        <div className="relative mt-12">
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-accent-violet to-accent-cyan md:left-1/2 md:-translate-x-1/2"
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={reduced ? undefined : { scaleY: 1 }}
            viewport={viewportOnce}
            transition={spring}
          />

          <motion.ol
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {experience.map((item, index) => (
              <TimelineEntry key={`${item.company}-${item.role}`} item={item} index={index} />
            ))}
          </motion.ol>
        </div>
      </motion.div>
    </section>
  )
}
