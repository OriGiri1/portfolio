import Lenis from 'lenis'
import { cancelFrame, frame, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'

let instance: Lenis | null = null

/** Smooth scroll driven by motion's frame loop, so the whole page shares one rAF. */
export function useLenis() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, wheelMultiplier: 1 })
    instance = lenis
    const tick = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp)
    frame.update(tick, true)
    return () => {
      cancelFrame(tick)
      lenis.destroy()
      instance = null
    }
  }, [reduce])
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'auto', block: 'start' })
}

export function stopScroll(stop: boolean) {
  if (!instance) return
  if (stop) instance.stop()
  else instance.start()
}
