'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * A glowing custom cursor for precise-pointer devices.
 *
 * Three stacked layers follow the pointer at different lags for a liquid feel:
 *   1. a large, soft violet→cyan radial glow (slowest spring),
 *   2. a thin accent ring (medium spring) that swells over interactive targets,
 *   3. a crisp dot at the exact pointer position.
 *
 * It hides the native cursor (via the `.has-custom-cursor` class consumed in
 * globals.css) only when enabled. On touch / coarse-pointer devices and under
 * prefers-reduced-motion it renders nothing and leaves the OS cursor alone.
 */
export default function CursorGlow() {
  const reduced = useReducedMotion() ?? false
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Raw pointer position (dot tracks this exactly).
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Ring lags a touch; glow lags more.
  const ringX = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 })
  const glowX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (reduced) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]'

    const onMove = (e: MouseEvent): void => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as Element | null
      setActive(Boolean(target?.closest(INTERACTIVE)))
    }
    const onDown = (): void => setPressed(true)
    const onUp = (): void => setPressed(false)
    const onLeave = (): void => setVisible(false)
    const onEnter = (): void => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 250ms ease' }}
    >
      {/* 1 — large soft glow */}
      <motion.div
        className="absolute -ml-[70px] -mt-[70px] h-[140px] w-[140px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          background:
            'radial-gradient(circle, rgba(139,92,246,0.28), rgba(34,211,238,0.12) 45%, transparent 70%)',
          filter: 'blur(6px)',
        }}
        animate={{ scale: active ? 1.55 : pressed ? 0.9 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* 2 — ring */}
      <motion.div
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: pressed ? 0.8 : active ? 1.9 : 1,
          borderColor: active ? 'rgba(34,211,238,0.9)' : 'rgba(139,92,246,0.75)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      />

      {/* 3 — crisp dot */}
      <motion.div
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent-cyan"
        style={{ x, y, boxShadow: '0 0 10px rgba(34,211,238,0.8)' }}
        animate={{ scale: active ? 0 : pressed ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />
    </div>
  )
}
