'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowUpRight, Github, Star, GitFork, Code2, ChevronDown } from 'lucide-react'
import { portfolio } from '@/data/portfolio'
import type { Project, GitHubRepo } from '@/types'
import { fadeUp, fadeScale, staggerContainer, staggerFast, viewportOnce } from '@/lib/motion'
import { useTilt } from '@/hooks/useTilt'

/** GitHub language → dot color (subset; everything else falls back to violet). */
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Vue: '#41b883',
}

const INITIAL_REPOS = 6

/* --------------------------- Featured project card -------------------------- */

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

/* ------------------------------ GitHub repo card ---------------------------- */

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = (repo.language && LANG_COLORS[repo.language]) || '#8b5cf6'

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      variants={fadeScale}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      whileHover={{ y: -4 }}
      className="glass-hover group flex h-full flex-col rounded-2xl p-5"
      aria-label={`Open ${repo.name} on GitHub`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-slate-300 transition-colors group-hover:text-accent-cyan">
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <h4 className="truncate font-display text-base font-semibold text-slate-100 transition-colors group-hover:text-accent-cyan">
            {repo.name}
          </h4>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-accent-cyan" aria-hidden="true" />
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-400">
        {repo.description ?? 'No description provided.'}
      </p>

      {repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-accent-violet/20 bg-accent-violet/10 px-2 py-0.5 text-[11px] text-accent-violet/90"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: langColor }} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
            {repo.forks}
          </span>
        )}
        {repo.updatedLabel && <span className="ml-auto">Updated {repo.updatedLabel}</span>}
      </div>
    </motion.a>
  )
}

/* --------------------------------- Section --------------------------------- */

export default function Projects({ repos, profileUrl }: { repos: GitHubRepo[]; profileUrl: string }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? repos : repos.slice(0, INITIAL_REPOS)
  const hasMore = repos.length > INITIAL_REPOS

  return (
    <section id="projects" className="section">
      {/* Featured */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.p variants={fadeUp} className="eyebrow">
          Selected Work
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-slate-50 sm:text-4xl">
          Featured projects that <span className="gradient-text">ship</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Flagship GenAI systems I have designed, built, and put in front of real users — from browser tooling
          to multi-agent, enterprise-scale platforms.
        </motion.p>

        <motion.div variants={staggerContainer} className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-2">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </motion.div>

      {/* More on GitHub — live from the GitHub API */}
      {repos.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <motion.p variants={fadeUp} className="eyebrow">
                Straight from GitHub
              </motion.p>
              <motion.h3 variants={fadeUp} className="font-display text-2xl font-bold text-slate-50 sm:text-3xl">
                More on <span className="gradient-text">GitHub</span>
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-2 text-sm text-slate-400">
                {repos.length} public repositories, pulled live and sorted by latest activity.
              </motion.p>
            </div>

            <motion.a
              variants={fadeUp}
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-2 text-sm"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View full profile
            </motion.a>
          </div>

          <motion.div
            variants={staggerFast}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </motion.div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className="btn-ghost inline-flex items-center gap-2"
              >
                {showAll ? 'Show less' : `Show all ${repos.length} repositories`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </section>
  )
}
