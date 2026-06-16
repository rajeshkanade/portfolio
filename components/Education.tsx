'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, Languages } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import { fadeUp, fadeScale, staggerContainer, staggerFast, viewportOnce } from '@/lib/motion'

export default function Education() {
  const { education, certifications, languages } = portfolio

  return (
    <section id="education" className="section">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">
          Education &amp; Credentials
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-slate-50 sm:text-4xl md:text-5xl">
          Foundations &amp; <span className="gradient-text">Recognition</span>
        </motion.h2>

        {/* Education cards */}
        <motion.ul variants={staggerContainer} className="mt-12 grid list-none grid-cols-1 gap-6 md:grid-cols-2">
          {education.map((item) => (
            <motion.li key={`${item.degree}-${item.institution}`} variants={fadeUp}>
              <article className="glass glass-hover h-full rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-slate-50 shadow-glow">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold leading-snug text-slate-50">{item.degree}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.institution}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {item.score ? (
                    <span className="chip border-accent-violet/30 bg-accent-violet/10 text-accent-violet">
                      {item.score}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.period}
                  </span>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        {/* Certifications + Languages */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <motion.div variants={staggerContainer}>
            <motion.h3 variants={fadeUp} className="font-display text-xl font-semibold text-slate-50">
              Certifications
            </motion.h3>
            <motion.ul variants={staggerFast} className="mt-5 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
              {certifications.map((cert) => (
                <motion.li key={cert.name} variants={fadeScale}>
                  <article className="glass glass-hover flex h-full items-start gap-3 rounded-xl p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/10 text-accent-cyan">
                      <Award className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-100">{cert.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{cert.issuer}</p>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <motion.h3 variants={fadeUp} className="font-display text-xl font-semibold text-slate-50">
              Languages
            </motion.h3>
            <motion.ul variants={staggerFast} className="mt-5 grid list-none grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
              {languages.map((lang) => (
                <motion.li key={lang.name} variants={fadeScale}>
                  <article className="glass glass-hover flex h-full items-center justify-between gap-3 rounded-xl p-4">
                    <span className="inline-flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-violet/10 text-accent-violet">
                        <Languages className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-slate-100">{lang.name}</span>
                    </span>
                    <span className="chip border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan">
                      {lang.proficiency}
                    </span>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
