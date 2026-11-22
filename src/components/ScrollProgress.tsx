import { motion, useScroll, useSpring } from 'motion/react'

/** 1px acid hairline across the top that tracks page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 34, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-acid"
      style={{ scaleX }}
    />
  )
}
