import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { EASE_IN_OUT } from '../lib/motion'

const SEGMENTS = ['DANANG_VN', 'ICPC_NATL', 'READY'] as const
const DURATION = 1.1

type Props = { onDone: () => void }

/**
 * Boot curtain: a mono counter 00 → 100% with telemetry, then the parent unmounts it
 * and it exits through an upward clip-path wipe (opacity fade under reduced motion).
 */
export function Preloader({ onDone }: Props) {
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)
  const barScale = useTransform(progress, (v) => v / 100)
  const countRef = useRef<HTMLSpanElement>(null)
  const [segments, setSegments] = useState(0)

  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(2, '0')
      setSegments(v >= 92 ? 3 : v >= 55 ? 2 : v >= 18 ? 1 : 0)
    })
    let done: number | undefined
    const controls = animate(progress, 100, {
      duration: reduce ? 0.25 : DURATION,
      ease: EASE_IN_OUT,
      onComplete: () => {
        done = window.setTimeout(onDone, reduce ? 50 : 180)
      },
    })
    return () => {
      unsub()
      controls.stop()
      window.clearTimeout(done)
    }
  }, [progress, reduce, onDone])

  return (
    <motion.div
      data-preloader
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-4 py-6 md:px-8 md:py-8"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.3 } }
          : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.9, ease: EASE_IN_OUT } }
      }
    >
      <div className="flex items-start justify-between font-telemetry text-muted">
        <span>NMT // PORTFOLIO</span>
        <span>BOOT_SEQ v26.11</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="font-telemetry flex flex-wrap gap-x-2 text-muted">
          {SEGMENTS.map((s, i) => (
            <span key={s} className={i < segments ? (s === 'READY' ? 'text-acid' : 'text-fg') : 'opacity-25'}>
              {s}
              {i < SEGMENTS.length - 1 && <span className="ml-2 text-muted">//</span>}
            </span>
          ))}
        </div>
        <div className="font-mono text-[clamp(4.5rem,18vw,13rem)] leading-[0.8] font-medium tracking-[-0.06em] text-fg tabular-nums">
          <span ref={countRef}>00</span>
          <span className="text-[0.35em] text-muted">%</span>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-acid"
        style={{ scaleX: barScale }}
      />
    </motion.div>
  )
}
