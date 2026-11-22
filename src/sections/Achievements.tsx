import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { EASE_EXPO } from '../lib/motion'
import { MaskLine } from '../components/MaskLine'
import { SpotlightCard } from '../components/SpotlightCard'
import { achievements, type Achievement } from '../data/profile'

// Asymmetric 12-col bento: ICPC dominates, stats sit as compact numerals.
const LAYOUT: Record<string, string> = {
  icpc: 'col-span-2 lg:col-span-7 lg:row-span-2 min-h-[340px] lg:min-h-[460px]',
  talent: 'col-span-2 lg:col-span-5 min-h-[220px]',
  ielts: 'col-span-1 lg:col-span-3 min-h-[200px]',
  thpt: 'col-span-1 lg:col-span-3 min-h-[200px]',
  hsg: 'col-span-2 lg:col-span-5 min-h-[200px]',
  gdgoc: 'col-span-2 lg:col-span-6 min-h-[200px]',
}

/** Score that counts up from 0 while a ring around it fills to value / max. */
function ScoreRing({ value, max, decimals = 0, suffix = '' }: NonNullable<Achievement['stat']>) {
  const ref = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)
  const pathLength = useTransform(progress, (v) => v / max)

  useEffect(
    () =>
      progress.on('change', (v) => {
        if (numRef.current) numRef.current.textContent = v.toFixed(decimals)
      }),
    [progress, decimals],
  )

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      progress.set(value)
      return
    }
    const controls = animate(progress, value, { duration: 1.4, ease: EASE_EXPO })
    return () => controls.stop()
  }, [inView, reduce, value, progress])

  return (
    <div ref={ref} className="relative grid size-28 place-items-center xl:size-36">
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r="46" fill="none" strokeWidth="4" className="stroke-line-strong" />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-red-600 dark:stroke-red-500"
          style={{ pathLength }}
        />
      </svg>
      <span className="font-display text-[1.75rem] leading-none font-extrabold tracking-[-0.05em] text-red-600 tabular-nums xl:text-[2.25rem] dark:text-red-500">
        <span ref={numRef}>{(0).toFixed(decimals)}</span>
        {suffix && <span className="text-[0.55em]">{suffix}</span>}
      </span>
    </div>
  )
}

function CardBody({ a }: { a: Achievement }) {
  const hero = a.id === 'icpc'
  return (
    <div className="flex h-full flex-col justify-between gap-8 p-5 md:p-7">
      <div className="font-telemetry flex items-start justify-between gap-3 text-muted">
        <span className="min-w-0">{a.kicker}</span>
        <span className="shrink-0 text-fg/30">{a.index}</span>
      </div>

      {a.stat ? (
        <div>
          <ScoreRing {...a.stat} />
          <p className="mt-3 text-sm font-medium text-fg">{a.title}</p>
          <p className="mt-1 text-[13px] text-muted">{a.detail}</p>
        </div>
      ) : (
        <div>
          {hero && (
            <p
              aria-hidden
              className="text-outline pointer-events-none absolute -right-3 -bottom-6 font-display text-[clamp(7rem,17vw,15rem)] leading-none font-extrabold tracking-[-0.05em] opacity-[0.07] select-none"
            >
              ICPC
            </p>
          )}
          <h3
            className={`relative font-display font-bold tracking-[-0.04em] text-fg ${
              hero ? 'text-[clamp(2.2rem,4.6vw,4.25rem)] leading-[0.95]' : 'text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.05]'
            }`}
          >
            {a.title}
          </h3>
          <p className={`relative mt-3 text-muted ${hero ? 'max-w-[46ch]' : 'max-w-[52ch] text-[15px]'}`}>
            {a.detail}
          </p>
          {hero && (
            <p className="font-telemetry relative mt-6 inline-flex items-center gap-2 rounded-full border border-acid/40 px-3 py-1.5 text-acid">
              <span className="h-1.5 w-1.5 rounded-full bg-acid" aria-hidden />
              NATIONAL QUALIFIER
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export function Achievements() {
  return (
    <section id="record" className="relative px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-telemetry mb-5 text-muted">
              <span className="text-acid">[ 03 ]</span> ENGINEERING CREDENTIALS
            </p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-fg uppercase">
              <MaskLine>On the</MaskLine>
              <MaskLine delay={0.08}>record.</MaskLine>
            </h2>
          </div>
          <p className="max-w-[40ch] self-end text-muted lg:col-span-4 lg:col-start-9">
            Contest results, selective programs and exams, the evidence behind the algorithmic instincts.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-12">
          {achievements.map((a, i) => (
            <SpotlightCard key={a.id} index={i} className={LAYOUT[a.id]}>
              <CardBody a={a} />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
