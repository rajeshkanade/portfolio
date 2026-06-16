import type { Variants, Transition } from 'framer-motion'

/**
 * Shared Framer Motion presets so every section animates with one consistent
 * "anti-gravity" language: things rise, settle on a spring, and stagger in.
 *
 * Components use these with `whileInView` + `viewport={{ once: true }}`.
 * Reduced-motion is handled at the component level via `useReducedMotion()`.
 */

/** Springy settle used for most reveal transitions. */
export const spring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 0.8,
}

/** Snappier spring for interactive (hover/tap) feedback. */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
}

/** Fade + rise from below. The core "anti-gravity" entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: spring },
}

/** Fade + rise with a tunable distance via custom prop. */
export const fadeUpCustom: Variants = {
  hidden: (distance: number = 40) => ({ opacity: 0, y: distance }),
  visible: { opacity: 1, y: 0, transition: spring },
}

/** Fade in with a gentle scale — good for cards and media. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: spring },
}

/** Slide in from the left. */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: spring },
}

/** Slide in from the right. */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: spring },
}

/** Container that staggers its children's entrances. Pair with an item variant. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

/** Faster stagger for dense lists (skill chips, tags). */
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
}

/** Standard viewport config: animate once, a little before fully in view. */
export const viewportOnce = { once: true, margin: '-80px' } as const
