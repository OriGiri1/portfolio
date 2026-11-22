import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'
const DECODE_MS = 650

type Props = { words: readonly string[]; interval?: number; start?: boolean; className?: string }

/** Monospace role cycler: each new word decodes through random glyphs, left to right. */
export function ScrambleText({ words, interval = 2800, start = true, className = '' }: Props) {
  const [index, setIndex] = useState(0)
  const liveRef = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!start) return
    const id = window.setInterval(() => setIndex((v) => (v + 1) % words.length), interval)
    return () => window.clearInterval(id)
  }, [start, interval, words.length])

  useEffect(() => {
    const el = liveRef.current
    if (!el) return
    const target = words[index]
    if (!start) {
      el.textContent = ''
      return
    }
    if (reduce) {
      el.textContent = target
      return
    }
    const from = el.textContent ?? ''
    const len = Math.max(from.length, target.length)
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DECODE_MS)
      let out = ''
      for (let k = 0; k < len; k++) {
        const settled = p >= 0.15 + (0.85 * (k + 1)) / len
        const ch = target[k] ?? ''
        if (settled) out += ch
        else if (ch === ' ') out += ' '
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      el.textContent = out
      if (p < 1) raf = requestAnimationFrame(tick)
      else el.textContent = target
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [index, start, reduce, words])

  return (
    <span className={`relative inline-grid ${className}`}>
      <span className="sr-only">{words.join(', ')}</span>
      {/* An invisible stack reserves the widest word so neighbours never jitter. */}
      {words.map((w) => (
        <span key={w} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <span ref={liveRef} aria-hidden className="col-start-1 row-start-1 whitespace-nowrap" />
    </span>
  )
}
