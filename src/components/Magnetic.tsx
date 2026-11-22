import { motion, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type PointerEvent, type ReactNode } from 'react'
import { usePointerFine } from '../lib/useMediaQuery'

type Props = { children: ReactNode; strength?: number; className?: string }

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 }

/** Pulls its child toward the pointer with spring physics. Inert on touch / reduced motion. */
export function Magnetic({ children, strength = 0.3, className = '' }: Props) {
  const fine = usePointerFine()
  const reduce = useReducedMotion()
  const active = fine && !reduce
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!active || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={active ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}
