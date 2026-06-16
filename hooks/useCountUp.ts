import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

export interface CountUpOptions {
  /** Seconds the count animation runs. */
  duration?: number
  /** Gate the animation (e.g. start only when scrolled into view). */
  start?: boolean
  /** Decimal places to display (e.g. 2 for a CGPA). */
  decimals?: number
}

/**
 * Animates a number from 0 → target once `start` becomes true. Returns the
 * current value to render. Under prefers-reduced-motion it snaps to the target
 * immediately. Used by the About section's counting stats.
 */
export function useCountUp(target: number, options: CountUpOptions = {}): number {
  const { duration = 1.8, start = true, decimals = 0 } = options
  const reduced = useReducedMotion() ?? false
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (reduced) {
      setValue(target)
      return
    }
    const factor = 10 ** decimals
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest * factor) / factor),
    })
    return () => controls.stop()
  }, [target, start, duration, decimals, reduced])

  return value
}
