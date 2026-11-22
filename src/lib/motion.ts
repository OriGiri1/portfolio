import type { Variants } from 'motion/react'

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_EXPO, delay: i * 0.07 },
  }),
}

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
