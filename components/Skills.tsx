'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Brain,
  Database,
  Workflow,
  ShieldCheck,
  Server,
  Cloud,
  HardDrive,
  LayoutDashboard,
  Boxes,
  SlidersHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { SkillCategory } from '@/types'
import { fadeUp, fadeScale, staggerContainer, staggerFast, springSnappy, viewportOnce } from '@/lib/motion'

/** Maps each `SkillCategory.icon` union member to its lucide component. */
const CATEGORY_ICONS: Record<SkillCategory['icon'], LucideIcon> = {
  Brain,
  Database,
  Workflow,
  ShieldCheck,
  Server,
  Cloud,
  HardDrive,
  LayoutDashboard,
  Boxes,
  SlidersHorizontal,
}

interface ChipProps {
  label: string
  index: number
}

/** A skill chip that playfully scatters on hover (deterministic, index-derived). */
function Chip({ label, index }: ChipProps) {
  const reduced = useReducedMotion()
  const nudgeX = ((index * 37) % 13) - 6
  const nudgeY = ((index * 53) % 13) - 6
  const motionHover = reduced ? undefined : { scale: 1.08, x: nudgeX, y: nudgeY, transition: springSnappy }

  return (
    <motion.span
      variants={fadeUp}
      whileHover={motionHover}
      className="chip cursor-default transition-colors duration-200 hover:border-accent-violet/60 hover:text-slate-50 hover:shadow-glow"
    >
      {label}
    </motion.span>
  )
}

export default function Skills() {
  const { skills } = portfolio

  return (
    <section id="skills" className="section">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p variants={fadeUp} className="eyebrow">
          Tech Stack
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl"
        >
          The <span className="gradient-text">tools</span> I build with
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base text-slate-300 sm:text-lg">
          From LLM orchestration, RAG pipelines, and fine-tuning to async backends and cloud delivery — a
          full-stack toolkit for shipping reliable, production-grade GenAI.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon]
          return (
            <motion.div key={category.title} variants={fadeScale} className="glass-hover flex flex-col gap-5 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-gradient text-slate-50 shadow-glow">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-slate-50">{category.title}</h3>
              </div>

              <motion.div variants={staggerFast} className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <Chip key={skill} label={skill} index={index} />
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
