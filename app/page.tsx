import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleField from '@/components/ParticleField'
import CursorGlow from '@/components/CursorGlow'
import { portfolio } from '@/data/portfolio'
import { fetchGitHubRepos } from '@/lib/github'

/**
 * Root page. Each section component owns its own `<section id="...">` anchor so
 * the Navbar's smooth-scroll links resolve correctly. ParticleField is a fixed,
 * pointer-transparent background behind all content; CursorGlow paints the
 * glowing custom cursor above everything.
 */
export default async function Home() {
  const { github } = portfolio
  // Server-side, ISR-cached (revalidates ~hourly). Falls back to [] on failure,
  // in which case the "More on GitHub" grid simply hides.
  const repos = await fetchGitHubRepos(github.username, github.excludeRepos)
  const profileUrl = `https://github.com/${github.username}`

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CursorGlow />

      {/* Anti-gravity particle background + film-grain texture overlay */}
      <ParticleField />
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-soft-light"
      />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects repos={repos} profileUrl={profileUrl} />
        <Research />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
