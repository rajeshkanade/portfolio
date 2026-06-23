'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * A glowing custom cursor for precise-pointer devices, plus a finger-tracking
 * glow for touch screens.
 *
 * Desktop (hover + fine pointer): three stacked layers follow the pointer at
 * different lags for a liquid feel —
 *   1. a large, soft violet→cyan radial glow (slowest spring),
 *   2. a thin accent ring (medium spring) that swells over interactive targets,
 *   3. a crisp dot at the exact pointer position.
 * The native cursor is hidden (via the `.has-custom-cursor` class consumed in
 * globals.css).
 *
 * Touch (coarse pointer): there is no cursor to replace, so we render only the
 * soft glow + text spotlight and let them follow the finger while it touches
 * the screen, fading out shortly after release. The dot/ring are omitted so
 * nothing looks "stuck" once the finger lifts. The native cursor is left alone.
 *
 * Under prefers-reduced-motion it renders nothing.
 */
export default function CursorGlow() {
  const reduced = useReducedMotion() ?? false
  // 'fine' = desktop pointer, 'touch' = finger-tracking glow, null = disabled.
  const [mode, setMode] = useState<'fine' | 'touch' | null>(null)
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

    // ----- Desktop: custom cursor -----
    if (fine.matches) {
      setMode('fine')
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
    }

    // ----- Touch: finger-following glow -----
    setMode('touch')
    let hideTimer: ReturnType<typeof setTimeout>

    const place = (t: Touch): void => {
      x.set(t.clientX)
      y.set(t.clientY)
    }
    const onStart = (e: TouchEvent): void => {
      clearTimeout(hideTimer)
      if (e.touches[0]) place(e.touches[0])
      setVisible(true)
      setPressed(true)
    }
    const onMove = (e: TouchEvent): void => {
      if (e.touches[0]) place(e.touches[0])
      setVisible(true)
    }
    const onEnd = (): void => {
      setPressed(false)
      // Linger briefly so a tap still flashes the glow, then fade out.
      hideTimer = setTimeout(() => setVisible(false), 450)
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
    window.addEventListener('touchcancel', onEnd)

    return () => {
      clearTimeout(hideTimer)
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
    }
  }, [reduced, x, y])

  if (!mode) return null

  const touch = mode === 'touch'

  return (
    <>
      {/* 0 — text spotlight. A separate top-level layer (NOT inside the z-[100]
          cursor container) so its additive blend mode illuminates the page
          content beneath it: wherever it passes, the text inside the circle
          glows. z-[60] keeps it above page content + navbar but under the
          cursor ring/dot. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -ml-[80px] -mt-[80px] h-[160px] w-[160px] rounded-full"
        style={{
          left: 0,
          top: 0,
          x: glowX,
          y: glowY,
          zIndex: 60,
          background:
            'radial-gradient(circle, rgba(124,92,246,0.60) 0%, rgba(56,189,248,0.38) 36%, rgba(34,211,238,0) 64%)',
          mixBlendMode: 'plus-lighter',
          filter: 'blur(2px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 250ms ease',
        }}
        animate={{ scale: pressed ? (touch ? 1.15 : 0.85) : active ? 1.25 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />

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
        animate={{ scale: active ? 1.55 : pressed ? (touch ? 1.3 : 0.9) : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* 2 — ring (desktop pointer only) */}
      {!touch && (
        <motion.div
          className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border"
          style={{ x: ringX, y: ringY }}
          animate={{
            scale: pressed ? 0.8 : active ? 1.9 : 1,
            borderColor: active ? 'rgba(34,211,238,0.9)' : 'rgba(139,92,246,0.75)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        />
      )}

      {/* 3 — crisp dot (desktop pointer only) */}
      {!touch && (
        <motion.div
          className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent-cyan"
          style={{ x, y, boxShadow: '0 0 10px rgba(34,211,238,0.8)' }}
          animate={{ scale: active ? 0 : pressed ? 1.6 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
      )}
      </div>
    </>
  )
}
