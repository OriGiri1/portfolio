import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowUpRight, Lock } from 'lucide-react'
import { useRef } from 'react'
import { ExternalLink } from '../components/ExternalLink'
import { Magnetic } from '../components/Magnetic'
import { MaskLine } from '../components/MaskLine'
import { links, vocabApp } from '../data/profile'
import { fadeUp, viewportOnce } from '../lib/motion'
import { useMediaQuery } from '../lib/useMediaQuery'
import { VocabMock } from './VocabMock'

const STAGE_SPRING = { stiffness: 110, damping: 26, mass: 0.5 }

function Badge({ label, y, className }: { label: string; y: MotionValue<number>; className: string }) {
  return (
    <motion.div
      style={{ y }}
      className={`font-telemetry absolute z-10 hidden items-center gap-2 rounded-full border border-line-strong bg-ink/90 px-4 py-2.5 text-fg lg:flex ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-acid" aria-hidden />
      {label}
    </motion.div>
  )
}

export function ProjectVocab() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')

  // Tilt resolves as the frame travels from viewport bottom to viewport centre.
  const { scrollYProgress: stageP } = useScroll({ target: stageRef, offset: ['start end', 'center center'] })
  const rotateX = useSpring(useTransform(stageP, [0, 1], [desktop ? 16 : 9, 0]), STAGE_SPRING)
  const scale = useSpring(useTransform(stageP, [0, 1], [0.92, 1]), STAGE_SPRING)
  const lift = useSpring(useTransform(stageP, [0, 1], [60, 0]), STAGE_SPRING)

  // Badges drift at different rates across the whole section for parallax depth.
  const { scrollYProgress: sectionP } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const b1 = useTransform(sectionP, [0, 1], [120, -120])
  const b2 = useTransform(sectionP, [0, 1], [200, -200])
  const b3 = useTransform(sectionP, [0, 1], [60, -60])

  return (
    <section id="work" ref={sectionRef} className="relative px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="font-telemetry mb-10 flex items-center justify-between border-b border-line pb-4 text-muted md:mb-16">
          <span>
            <span className="text-acid">[ 02 ]</span> FEATURED BUILD
          </span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-acid"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </span>
            LIVE // IN PRODUCTION
          </span>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Editorial column */}
          <div className="lg:col-span-4 lg:pt-10">
            <h2 className="font-display text-[clamp(2.4rem,10vw,4.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] whitespace-nowrap text-fg lg:text-[clamp(2rem,3.5vw,4.5rem)]">
              <MaskLine>{vocabApp.title}</MaskLine>
            </h2>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} custom={1}>
              <p className="mt-6 max-w-[42ch] text-fg/90">{vocabApp.summary}</p>
              <p className="mt-4 max-w-[42ch] text-[15px] text-muted">{vocabApp.detail}</p>

              <dl className="mt-8 grid grid-cols-2 border-t border-line">
                <div className="border-b border-r border-line py-4 pr-4">
                  <dt className="font-telemetry text-muted">USERS</dt>
                  <dd className="mt-1 font-display text-3xl font-bold tracking-[-0.04em] text-fg">
                    <span className="mr-0.5 font-mono text-2xl font-normal text-muted">~</span>500
                  </dd>
                </div>
                <div className="border-b border-line py-4 pl-4">
                  <dt className="font-telemetry text-muted">STATUS</dt>
                  <dd className="mt-1 font-display text-3xl font-bold tracking-[-0.04em] text-acid">Live</dd>
                </div>
              </dl>

              <ul className="mt-6 flex flex-wrap gap-2">
                {vocabApp.stack.map((s) => (
                  <li key={s} className="font-telemetry rounded-full border border-line px-3 py-1.5 text-muted">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.35}>
                  <ExternalLink
                    href={links.vocabApp}
                    className="font-telemetry group inline-flex h-14 items-center gap-3 rounded-full bg-acid px-7 text-[12px] font-medium text-on-acid"
                  >
                    Launch live app
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </ExternalLink>
                </Magnetic>
                <Magnetic strength={0.35}>
                  <ExternalLink
                    href={links.vocabAppSource}
                    className="font-telemetry group inline-flex h-14 items-center gap-3 rounded-full border border-line-strong px-7 text-[12px] font-medium text-fg transition-colors duration-300 hover:border-fg"
                  >
                    Source code
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </ExternalLink>
                </Magnetic>
              </div>
            </motion.div>
          </div>

          {/* 3D stage */}
          <div ref={stageRef} className="relative lg:col-span-8 [perspective:1600px]">
            <Badge label={vocabApp.badges[0]} y={b1} className="-left-6 top-[14%]" />
            <Badge label={vocabApp.badges[1]} y={b2} className="-right-4 top-[46%]" />
            <Badge label={vocabApp.badges[2]} y={b3} className="bottom-[8%] left-[18%]" />

            <motion.div
              style={{ rotateX, scale, y: lift, transformOrigin: '50% 100%' }}
              className="overflow-hidden rounded-[6px] border border-line-strong bg-surface will-change-transform"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-line px-3 py-2.5 md:px-4">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full border border-fg/25" />
                  <span className="h-2 w-2 rounded-full border border-fg/25" />
                  <span className="h-2 w-2 rounded-full border border-fg/25" />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-ink px-3 py-1">
                  <Lock size={11} strokeWidth={1.75} className="shrink-0 text-muted" />
                  <span className="truncate font-mono text-[11px] text-muted">{vocabApp.url}</span>
                </div>
                <span className="font-telemetry hidden text-muted sm:inline">PREVIEW</span>
              </div>
              <div className="h-[460px] md:h-[500px] lg:h-[540px]">
                <VocabMock />
              </div>
            </motion.div>

            <p className="font-telemetry mt-4 text-muted">
              ↑ INTERACTIVE PREVIEW: PICK AN ANSWER. THE REAL APP IS ONE CLICK AWAY.
            </p>

            {/* Badges inline on smaller screens */}
            <ul className="mt-6 flex flex-wrap gap-2 lg:hidden">
              {vocabApp.badges.map((b) => (
                <li
                  key={b}
                  className="font-telemetry flex items-center gap-2 rounded-full border border-line-strong px-3 py-2 text-fg"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-acid" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
