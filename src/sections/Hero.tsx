import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'
import { MaskLine } from '../components/MaskLine'
import { Magnetic } from '../components/Magnetic'
import { ScrambleText } from '../components/ScrambleText'
import { profile } from '../data/profile'
import { EASE_EXPO } from '../lib/motion'
import { usePointerFine } from '../lib/useMediaQuery'
import { scrollToId } from '../lib/useLenis'

const SPOT = 720

function Spotlight() {
  const fine = usePointerFine()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 })
  const y = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 })

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.jump(r.width * 0.68 - SPOT / 2)
    my.jump(r.height * 0.42 - SPOT / 2)
    x.jump(mx.get())
    y.jump(my.get())
    if (!fine || reduce) return
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      mx.set(e.clientX - b.left - SPOT / 2)
      my.set(e.clientY - b.top - SPOT / 2)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [fine, reduce, mx, my, x, y])

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 rounded-full"
      style={{
        x,
        y,
        width: SPOT,
        height: SPOT,
        background: 'radial-gradient(circle, var(--spot) 0%, color-mix(in srgb, var(--spot) 27%, transparent) 38%, transparent 66%)',
      }}
    />
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 1, ease: EASE_EXPO, delay: ready ? delay : 0 },
  })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pt-24 pb-6 md:px-8 md:pt-28 md:pb-8"
    >
      {/* Hairline grid, faded toward the edges */}
      <div
        aria-hidden
        className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_20%,transparent_75%)]"
      />
      <Spotlight />

      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <motion.div {...reveal(0.15)} className="font-telemetry flex flex-wrap justify-between gap-2 text-muted">
          <span>
            <span className="text-acid">[ 00 ]</span> 1ST-YEAR // DUT — TALENT ENGINEER PROGRAM / IT (DS &amp; AI)
          </span>
          <span className="hidden sm:inline">PORTFOLIO — 2026 EDITION</span>
        </motion.div>

        <div className="mt-[8vh] flex items-end justify-between gap-4 md:mt-[5vh] md:gap-8">
          {/* Sized so the longest line plus the avatar fits the row; looser leading leaves room for Ễ / Â. */}
          <h1 className="min-w-0 font-display text-[clamp(2rem,7.4vw,8rem)] leading-[0.95] font-extrabold tracking-[-0.04em] whitespace-nowrap text-fg uppercase">
            <span className="sr-only">{profile.name.full}</span>
            <span aria-hidden>
              <MaskLine show={ready} delay={0.05}>
                {profile.name.first}
              </MaskLine>
              <MaskLine show={ready} delay={0.13} className="md:pl-[6vw]">
                {profile.name.last}
              </MaskLine>
            </span>
          </h1>
          <motion.img
            {...reveal(0.3)}
            src={`${import.meta.env.BASE_URL}avatar-img.jpg`}
            alt={`Portrait of ${profile.name.full}`}
            width={960}
            height={1280}
            className="aspect-square w-[clamp(4.5rem,15vw,14rem)] shrink-0 rounded-full border border-line-strong object-cover object-top"
          />
        </div>

        <div className="mt-10 mb-10 grid grid-cols-1 gap-10 md:mt-auto md:grid-cols-12 md:gap-6 md:pt-12">
          <motion.div {...reveal(0.45)} className="md:col-span-5">
            <p className="font-telemetry mb-3 text-muted">CURRENT_FOCUS //</p>
            <p className="font-mono text-[clamp(0.95rem,1.6vw,1.375rem)] font-medium tracking-[0.02em] text-acid">
              <span className="text-muted">&gt; </span>
              <ScrambleText words={profile.roles} start={ready} />
            </p>
          </motion.div>

          <motion.div {...reveal(0.55)} className="md:col-span-5 md:col-start-8">
            <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted md:text-base">
              {profile.positioning}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <button
                  type="button"
                  data-cursor="EXPLORE"
                  onClick={() => scrollToId('work')}
                  className="font-telemetry inline-flex h-12 items-center gap-3 rounded-full bg-fg px-6 text-ink transition-colors duration-300 hover:bg-acid hover:text-on-acid"
                >
                  View work <span aria-hidden>↓</span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  data-cursor="EXPLORE"
                  onClick={() => scrollToId('contact')}
                  className="font-telemetry inline-flex h-12 items-center gap-3 rounded-full border border-line-strong px-6 text-fg transition-colors duration-300 hover:border-fg"
                >
                  Contact
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...reveal(0.7)}
          className="font-telemetry mt-auto flex items-center justify-between border-t border-line pt-4 text-muted md:mt-0"
        >
          <span>{profile.coords}</span>
          <span className="hidden md:inline">{profile.location.toUpperCase()}</span>
          <span className="flex items-center gap-2">
            SCROLL
            <motion.span
              aria-hidden
              className="inline-block"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
