import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const INTERACTIVE = 'a, button, [role="tab"], input, label'

/**
 * Spring-physics cursor: a lime dot, a trailing hairline ring, and a pre-sized pill that
 * scales in with a contextual label when hovering anything with `data-cursor`.
 * Mount only on fine pointers. Everything moves through transform/opacity.
 */
export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.15 })
  const dotY = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.15 })
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  const [label, setLabel] = useState<string | null>(null)
  const [lastLabel, setLastLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null
      const tagged = t?.closest<HTMLElement>('[data-cursor]')
      const next = tagged?.dataset.cursor || null
      setLabel(next)
      if (next) setLastLabel(next)
      setHovering(!next && !!t?.closest(INTERACTIVE))
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  const spring = { type: 'spring', stiffness: 380, damping: 26 } as const
  const press = pressed ? 0.85 : 1

  return (
    <div
      aria-hidden
      data-custom-cursor
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms' }}
    >
      {/* Ring */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-fg/35"
          animate={{ scale: label ? 0 : (hovering ? 1.55 : 1) * press, opacity: label ? 0 : 1 }}
          transition={spring}
        />
      </motion.div>
      {/* Pill */}
      <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          className="-ml-[56px] -mt-[18px] flex h-9 w-[112px] items-center justify-center rounded-full bg-acid font-telemetry text-on-acid"
          initial={false}
          animate={{ scale: label ? press : 0, opacity: label ? 1 : 0 }}
          transition={spring}
        >
          {lastLabel}
        </motion.div>
      </motion.div>
      {/* Dot */}
      <motion.div className="absolute left-0 top-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-acid"
          animate={{ scale: label ? 0 : 1 }}
          transition={spring}
        />
      </motion.div>
    </div>
  )
}
