'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight, Github } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { Project } from '@/types'
import { fadeUp, fadeScale, staggerContainer, viewportOnce } from '@/lib/motion'
import { useTilt } from '@/hooks/useTilt'

function ProjectCard({ project }: { project: Project }) {
  const t = useTilt(10)

  return (
    <motion.div variants={fadeScale} className="group h-full">
      <motion.div
        onMouseMove={t.onMouseMove}
        onMouseLeave={t.onMouseLeave}
        whileHover={{ y: -6 }}
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformPerspective: 1000 }}
        className="glass-hover preserve-3d relative flex h-full flex-col overflow-hidden rounded-3xl p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-accent-radial opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Header — lifted toward the viewer for a 3D pop */}
        <div style={{ transform: 'translateZ(40px)' }} className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {project.kind && <span className="chip mb-3">{project.kind}</span>}
            <h3 className="font-display text-xl font-semibold text-slate-50 transition-colors group-hover:gradient-text">
              {project.title}
            </h3>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line bg-ink-soft text-slate-300 transition-colors hover:text-accent-cyan hover:shadow-glow-cyan"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Body */}
        <div style={{ transform: 'translateZ(20px)' }} className="mt-5 flex flex-1 flex-col">
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-violet" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2 pt-6">
            {project.stack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan transition-colors hover:text-accent-violet"
            >
              View on GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">
          Selected Work
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-slate-50 sm:text-4xl">
          Projects that <span className="gradient-text">ship</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          A few GenAI systems I have designed, built, and put in front of real users — from browser tooling
          to multi-agent, enterprise-scale platforms.
        </motion.p>

        <motion.div variants={staggerContainer} className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
