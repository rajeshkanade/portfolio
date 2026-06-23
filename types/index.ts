/**
 * Centralized, fully-typed data model for the portfolio.
 * Every component reads its content from `data/portfolio.ts`, which is typed
 * against the `PortfolioData` shape below. No `any` anywhere.
 */

/** A single external/social profile link rendered as an icon button. */
export interface SocialLink {
  /** Human label, used for aria-label and tooltips. */
  label: string
  /** Fully-qualified URL (or mailto:/tel: scheme). */
  href: string
  /** lucide-react icon name; components map this string to the icon component. */
  icon: 'Github' | 'Linkedin' | 'Mail' | 'Phone' | 'MapPin' | 'FileText' | 'Twitter' | 'Globe'
}

/** Smooth-scroll navigation target. `href` is a same-page anchor (e.g. "#about"). */
export interface NavLink {
  label: string
  href: string
}

/** Animated counting statistic shown in the About section. */
export interface Stat {
  /** Numeric target the counter animates toward. */
  value: number
  /** Optional suffix appended after the number (e.g. "+", "%", "k"). */
  suffix?: string
  /** Optional prefix prepended before the number. */
  prefix?: string
  label: string
}

/** One role in the work-experience timeline. */
export interface ExperienceItem {
  role: string
  company: string
  location: string
  /** Display period, e.g. "June 2025 – Present". */
  period: string
  /** Optional one-line summary / focus tags shown under the role. */
  summary?: string
  /** Whether this is a current role (drives the "present" pulse accent). */
  current?: boolean
  /** Achievement bullet points. */
  highlights: string[]
}

/** A named group of skills (e.g. "GenAI / LLMs"). */
export interface SkillCategory {
  /** Category title. */
  title: string
  /** lucide-react icon name for the category header. */
  icon:
    | 'Brain'
    | 'Database'
    | 'Workflow'
    | 'ShieldCheck'
    | 'Server'
    | 'Cloud'
    | 'HardDrive'
    | 'LayoutDashboard'
    | 'Boxes'
    | 'SlidersHorizontal'
  /** Flat list of skill chips. */
  skills: string[]
}

/** A portfolio project card. */
export interface Project {
  title: string
  /** Optional short kind/label, e.g. "Chrome Extension". */
  kind?: string
  /** Technologies used, rendered as small tags. */
  stack: string[]
  /** Bullet highlights describing what was built and the impact. */
  highlights: string[]
  /** Optional external link (repo or live demo). */
  link?: string
}

/** A normalized public GitHub repository for the live "More on GitHub" grid. */
export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  url: string
  homepage: string | null
  language: string | null
  stars: number
  forks: number
  topics: string[]
  /** Pre-formatted "MMM YYYY" label (computed server-side to avoid hydration drift). */
  updatedLabel: string
  /** ISO timestamp of the last push, for client-side sorting if needed. */
  pushedAt: string
}

/** A research paper / publication entry. */
export interface ResearchItem {
  title: string
  /** Authorship / venue line, e.g. "Co-authored under Prof. … , Fergusson College". */
  venue: string
  /** Short abstract / outcome. */
  description: string
  /** Tag chips (techniques, topics). */
  tags: string[]
  year: string
}

/** A degree / formal education entry. */
export interface EducationItem {
  degree: string
  institution: string
  /** e.g. "CGPA: 9.10". */
  score?: string
  period: string
}

/** A certification credential. */
export interface Certification {
  name: string
  issuer: string
}

/** A spoken language with proficiency. */
export interface LanguageItem {
  name: string
  proficiency: string
}

/** The complete content model for the site. */
export interface PortfolioData {
  /** Person + contact basics. */
  profile: {
    name: string
    title: string
    /** Short punchy tagline for the hero. */
    tagline: string
    location: string
    email: string
    phone: string
    /** Path (under /public) to the headshot. */
    photo: string
    /** Path (under /public) to the downloadable resume, if present. */
    resumeUrl?: string
    /** Longer narrative paragraph(s) for the About section. */
    bio: string[]
  }
  /** GitHub config for the live "More on GitHub" projects grid. */
  github: {
    username: string
    /** Repo names to hide from the live grid (e.g. the profile README repo). */
    excludeRepos?: string[]
  }
  socials: SocialLink[]
  nav: NavLink[]
  stats: Stat[]
  experience: ExperienceItem[]
  skills: SkillCategory[]
  projects: Project[]
  research: ResearchItem[]
  education: EducationItem[]
  certifications: Certification[]
  languages: LanguageItem[]
}

/* ----------------------------- API contracts ----------------------------- */

/** Payload submitted by the contact form -> POST /api/contact. */
export interface ContactFormValues {
  name: string
  email: string
  message: string
}

/** Standard envelope returned by the backend. */
export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}

/** Persisted contact message as returned by the API. */
export interface SavedMessage {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
}
