import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { EASE_EXPO } from '../lib/motion'

type Props = {
  children: ReactNode
  /** Controlled trigger. When omitted, the line reveals on scroll into view. */
  show?: boolean
  delay?: number
  className?: string
  innerClassName?: string
}

/** Overflow-masked line that slides up from beneath its own baseline. */
export function MaskLine({ children, show, delay = 0, className = '', innerClassName = '' }: Props) {
  // Observe the (unclipped) mask wrapper. The translated inner span is fully clipped
  // before reveal, so observing it directly would never intersect.
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const visible = show ?? inView

  return (
    // Syne stacks Vietnamese marks (Ễ = circumflex + tilde) ~0.45em above cap height. Extra top padding
    // keeps them inside the mask; the matching negative margin keeps line spacing unchanged.
    <span ref={ref} className={`-mt-[0.26em] block overflow-hidden pt-[0.4em] pb-[0.04em] ${className}`}>
      <motion.span
        className={`block will-change-transform ${innerClassName}`}
        initial={{ y: '112%' }}
        animate={{ y: visible ? '0%' : '112%' }}
        transition={{ duration: 1.1, ease: EASE_EXPO, delay: visible ? delay : 0 }}
      >
        {children}
      </motion.span>
    </span>
  )
}
