import type { MouseEvent } from 'react'
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'framer-motion'

export interface TiltControls {
  /** Spring-smoothed X rotation (deg) — bind to a motion element's `rotateX`. */
  rotateX: MotionValue<number>
  /** Spring-smoothed Y rotation (deg) — bind to a motion element's `rotateY`. */
  rotateY: MotionValue<number>
  onMouseMove: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave: () => void
  disabled: boolean
}

/**
 * 3D tilt: rotates the bound element around X/Y based on cursor position over
 * its surface. Apply the returned values to a motion element with
 * `transformPerspective` set and give children `transformStyle: preserve-3d`.
 * Respects reduced-motion.
 *
 * @param max maximum rotation in degrees at the card edges
 */
export function useTilt(max = 12): TiltControls {
  const reduced = useReducedMotion() ?? false
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const config = { stiffness: 200, damping: 18, mass: 0.6 }
  const springX = useSpring(rotateX, config)
  const springY = useSpring(rotateY, config)

  const onMouseMove = (e: MouseEvent<HTMLElement>): void => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 2 * max)
    rotateX.set((0.5 - py) * 2 * max)
  }

  const onMouseLeave = (): void => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { rotateX: springX, rotateY: springY, onMouseMove, onMouseLeave, disabled: reduced }
}
