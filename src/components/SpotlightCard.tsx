import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react'
import { useState, type PointerEvent, type ReactNode } from 'react'
import { fadeUp, viewportOnce } from '../lib/motion'

type Props = { children: ReactNode; className?: string; index?: number }

// Paints only the 1px padding ring of the overlay, so the gradient reads as a lit border.
const RING_MASK = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
} as const

/** Card whose hairline border lights up in a radial pool that follows the cursor. */
export function SpotlightCard({ children, className = '', index = 0 }: Props) {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const [hover, setHover] = useState(false)
  const reduce = useReducedMotion()
  const lit = hover && !reduce

  const ring = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, color-mix(in srgb, var(--accent) 80%, transparent), transparent 72%)`
  const wash = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in srgb, var(--fg) 4%, transparent), transparent 70%)`

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`relative overflow-hidden rounded-[4px] border border-line bg-surface ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: wash }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[4px] p-px"
        style={{ background: ring, ...RING_MASK }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <div className="relative h-full">{children}</div>
    </motion.article>
  )
}
