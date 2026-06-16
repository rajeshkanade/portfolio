'use client'

import { motion } from 'framer-motion'
import { ScrollText, GraduationCap, Calendar } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { fadeUp, fadeScale, staggerContainer, staggerFast, viewportOnce } from '@/lib/motion'

/**
 * Research & Publications — glass cards for co-authored papers. Each card leads
 * with a paper icon, then title, venue, abstract, technique tags, and a year
 * badge anchored to the corner.
 */
export default function Research() {
  const { research } = portfolio
  if (research.length === 0) return null

  return (
    <section id="research" className="section">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">
          Research &amp; Publications
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl"
        >
          Where curiosity meets <span className="gradient-text">rigor</span>
        </motion.h2>

        <motion.ul variants={staggerContainer} className="mt-12 grid list-none grid-cols-1 gap-6">
          {research.map((paper) => (
            <motion.li key={paper.title} variants={fadeScale}>
              <article className="glass glass-hover relative overflow-hidden rounded-2xl p-6 sm:p-8">
                {/* year badge */}
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {paper.year}
                </span>

                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-slate-50 shadow-glow">
                    <ScrollText className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 pr-16">
                    <h3 className="font-display text-lg font-semibold leading-snug text-slate-50 sm:text-xl">
                      {paper.title}
                    </h3>
                    <p className="mt-1.5 inline-flex items-start gap-1.5 text-sm text-slate-400">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent-violet" aria-hidden="true" />
                      <span>{paper.venue}</span>
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  {paper.description}
                </p>

                <motion.div variants={staggerFast} className="mt-5 flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <motion.span key={tag} variants={fadeUp} className="chip">
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
