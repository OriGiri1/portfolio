import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE_EXPO } from '../lib/motion'
import { scrollToId } from '../lib/useLenis'
import { ThemeToggle } from './ThemeToggle'

const SECTIONS = [
  { id: 'stack', label: 'STACK' },
  { id: 'work', label: 'WORK' },
  { id: 'record', label: 'RECORD' },
  { id: 'contact', label: 'CONTACT' },
] as const

const timeFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Ho_Chi_Minh',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function useDanangTime() {
  const [now, setNow] = useState(() => timeFmt.format(new Date()))
  useEffect(() => {
    const id = window.setInterval(() => setNow(timeFmt.format(new Date())), 15_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export function Nav({ ready }: { ready: boolean }) {
  const time = useDanangTime()

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.9, ease: EASE_EXPO, delay: ready ? 0.5 : 0 }}
    >
      <nav className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="font-display text-lg font-extrabold tracking-[-0.04em] text-fg"
          aria-label="Back to top"
        >
          MT<span className="text-acid">.</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                data-cursor="EXPLORE"
                onClick={() => scrollToId(s.id)}
                className="font-telemetry group text-muted transition-colors duration-300 hover:text-fg"
              >
                <span className="mr-1.5 text-fg/30 group-hover:text-acid">0{i + 1}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <p className="font-telemetry text-muted">
            DA NANG <span className="text-fg tabular-nums">{time}</span>
            <span className="hidden sm:inline"> GMT+7</span>
          </p>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  )
}
