import type { MouseEvent } from 'react'
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion'

export interface MagneticControls {
  /** Spring-smoothed horizontal offset — bind to a motion element's `x`. */
  x: MotionValue<number>
  /** Spring-smoothed vertical offset — bind to a motion element's `y`. */
  y: MotionValue<number>
  onMouseMove: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave: () => void
  /** True when reduced-motion is preferred — offsets stay at 0. */
  disabled: boolean
}

/**
 * Magnetic hover: the bound element drifts toward the cursor while hovered and
 * springs back to center on leave. Respects prefers-reduced-motion.
 *
 * @param strength fraction of the cursor offset applied (0.2–0.5 feels good)
 */
export function useMagnetic(strength = 0.35): MagneticControls {
  const reduced = useReducedMotion() ?? false
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const config = { stiffness: 300, damping: 20, mass: 0.5 }
  const springX = useSpring(x, config)
  const springY = useSpring(y, config)

  const onMouseMove = (e: MouseEvent<HTMLElement>): void => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * strength)
    y.set(offsetY * strength)
  }

  const onMouseLeave = (): void => {
    x.set(0)
    y.set(0)
  }

  return { x: springX, y: springY, onMouseMove, onMouseLeave, disabled: reduced }
}
