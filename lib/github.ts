import type { GitHubRepo } from '@/types'

/** Raw subset of the GitHub REST repo object we consume. */
interface RawRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics?: string[]
  fork: boolean
  archived: boolean
  private: boolean
  pushed_at: string
  updated_at: string
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Format an ISO date to a stable "MMM YYYY" label (UTC, no locale drift). */
function monthLabel(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/**
 * Fetch a user's public repositories from the GitHub REST API, normalized for
 * the "More on GitHub" grid.
 *
 * - Runs server-side with ISR caching (`revalidate: 3600`), so the live grid
 *   refreshes about hourly on Vercel without a rebuild and never hits the
 *   unauthenticated rate limit (60/hr) in any meaningful way.
 * - Optionally authenticates with `GITHUB_TOKEN` (env) for a higher limit.
 * - Excludes forks, archived, private, and any names in `exclude`.
 * - Sorts by most-recently pushed.
 * - Never throws: returns `[]` on any failure so the page still renders.
 */
export async function fetchGitHubRepos(
  username: string,
  exclude: string[] = [],
): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: 3600 } },
    )
    if (!res.ok) return []

    const raw = (await res.json()) as unknown
    if (!Array.isArray(raw)) return []

    const excludeSet = new Set(exclude.map((s) => s.toLowerCase()))

    return (raw as RawRepo[])
      .filter(
        (r) =>
          !r.fork && !r.archived && !r.private && !excludeSet.has(r.name.toLowerCase()),
      )
      .map<GitHubRepo>((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count ?? 0,
        forks: r.forks_count ?? 0,
        topics: r.topics ?? [],
        updatedLabel: monthLabel(r.pushed_at ?? r.updated_at),
        pushedAt: r.pushed_at ?? r.updated_at,
      }))
      .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
  } catch {
    return []
  }
}
