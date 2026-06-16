'use client'

import { useScroll, useTransform, useReducedMotion, motion } from 'framer-motion'

/**
 * ParticleField — a fixed, full-viewport ambient background layer that sits
 * BEHIND the main content (z-0). Pointer events are disabled so it never
 * intercepts clicks.
 *
 *  1. Three large, soft, blurred aurora blobs drifting slowly.
 *  2. ~26 small orb particles continuously rising upward and looping.
 *  3. Subtle scroll parallax applied to the aurora layer.
 *
 * Reduced-motion users get only the static aurora blobs.
 */

interface Orb {
  size: number
  left: number
  duration: number
  delay: number
  color: string
}

const ORB_COLORS = [
  'rgba(139, 92, 246, 0.55)', // accent-violet
  'rgba(34, 211, 238, 0.5)', // accent-cyan
  'rgba(99, 102, 241, 0.5)', // accent-indigo
  'rgba(255, 255, 255, 0.4)', // soft white
]

const ORB_COUNT = 26

/** Deterministically derive every orb from its index (stable across renders). */
const ORBS: Orb[] = Array.from({ length: ORB_COUNT }, (_, i) => ({
  size: 2 + (i % 5),
  left: (i * 37 + 11) % 100,
  duration: 14 + ((i * 7) % 19),
  delay: (i * 13) % 12,
  color: ORB_COLORS[i % ORB_COLORS.length],
}))

export default function ParticleField() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1200], [0, -80])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora layer — parallaxes on scroll unless reduced motion is on. */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y }}>
        <div
          className={`absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent-violet/25 blur-3xl ${
            reduced ? '' : 'animate-aurora'
          }`}
        />
        <div
          className={`absolute -right-40 -top-24 h-[30rem] w-[30rem] rounded-full bg-accent-indigo/25 blur-3xl ${
            reduced ? '' : 'animate-float-slow'
          }`}
        />
        <div
          className={`absolute -bottom-48 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent-cyan/25 blur-3xl ${
            reduced ? '' : 'animate-aurora'
          }`}
        />
      </motion.div>

      {/* Rising orbs — skipped entirely for reduced-motion users. */}
      {!reduced &&
        ORBS.map((orb, i) => (
          <span
            key={i}
            className="animate-rise absolute rounded-full"
            style={{
              bottom: '-20px',
              left: `${orb.left}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              backgroundColor: orb.color,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}
    </div>
  )
}
