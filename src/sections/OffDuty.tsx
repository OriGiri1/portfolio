import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import { MaskLine } from '../components/MaskLine'
import { afk } from '../data/profile'
import { EASE_EXPO, fadeUp, viewportOnce } from '../lib/motion'

export function OffDuty() {
  const [active, setActive] = useState(afk[0].id)
  const current = afk.find((a) => a.id === active) ?? afk[0]
  const currentIndex = afk.indexOf(current)
  const personal = current.personal.filter((f) => f.v.trim() !== '')

  return (
    <section id="afk" className="relative border-t border-line px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="font-telemetry mb-5 text-muted">
            <span className="text-acid">[ 05 ]</span> OFF-DUTY TELEMETRY
          </p>
          <h2 className="font-display text-[clamp(3.6rem,16vw,7rem)] leading-[0.85] whitespace-nowrap lg:text-[clamp(3rem,5.2vw,6rem)] font-extrabold tracking-[-0.04em] text-fg uppercase">
            <MaskLine>AFK</MaskLine>
            <MaskLine delay={0.08}>
              <span className="text-outline">mode</span>
            </MaskLine>
          </h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-6 max-w-[36ch] text-muted"
          >
            Same brain, lower stakes. Ranked queues and long arcs are where pattern-reading gets practised off
            the clock.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          custom={1}
          className="min-w-0 overflow-hidden rounded-[4px] border border-line bg-surface lg:col-span-8"
        >
          {/* HUD bar */}
          <div className="font-telemetry flex items-center justify-between border-b border-line px-4 py-3 text-muted md:px-6">
            <span className="flex items-center gap-2">
              <motion.span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-acid"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              AFK_MODE // STATUS: IDLE
            </span>
            <span className="tabular-nums">
              SLOT {String(currentIndex + 1).padStart(2, '0')}/{String(afk.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Tab rail */}
            <LayoutGroup id="afk">
              <div
                role="tablist"
                aria-label="Off-duty interests"
                className="no-scrollbar flex overflow-x-auto border-b border-line md:w-60 md:shrink-0 md:flex-col md:overflow-visible md:border-r md:border-b-0"
              >
                {afk.map((a, i) => {
                  const selected = a.id === active
                  return (
                    <button
                      key={a.id}
                      type="button"
                      role="tab"
                      id={`afk-tab-${a.id}`}
                      aria-selected={selected}
                      aria-controls="afk-panel"
                      data-cursor="EXPLORE"
                      onClick={() => setActive(a.id)}
                      className={`relative flex shrink-0 items-center gap-3 px-4 py-4 text-left transition-colors duration-300 md:px-6 md:py-5 ${
                        selected ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="afk-indicator"
                          aria-hidden
                          className="absolute inset-0 border-b border-acid bg-fg/[0.04] md:border-b-0 md:border-l"
                          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                        />
                      )}
                      <span className="font-telemetry relative text-fg/30">0{i + 1}</span>
                      <span className="font-telemetry relative whitespace-nowrap">{a.label}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>

            {/* Panel */}
            <div
              id="afk-panel"
              role="tabpanel"
              aria-labelledby={`afk-tab-${current.id}`}
              className="relative min-h-[360px] flex-1 overflow-hidden md:min-h-[400px]"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18, clipPath: 'inset(0% 0% 100% 0%)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: EASE_EXPO }}
                  className="flex h-full flex-col justify-between gap-10 p-5 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-telemetry text-muted">ACTIVE_SLOT</p>
                      <p className="mt-2 font-display text-[clamp(1.75rem,3.4vw,3rem)] leading-none font-bold tracking-[-0.04em] text-fg">
                        {current.label}
                      </p>
                    </div>
                    <p
                      aria-hidden
                      className="text-outline shrink-0 font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.8] font-extrabold tracking-[-0.05em] opacity-40"
                    >
                      {current.code}
                    </p>
                  </div>

                  <p className="max-w-[44ch] text-fg/85">{current.line}</p>

                  <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
                    {[...current.fields, ...personal].map((f) => (
                      <div key={f.k} className="border-b border-line py-3 sm:pr-4">
                        <dt className="font-telemetry text-fg/35">{f.k}</dt>
                        <dd className="font-telemetry mt-1 text-fg">{f.v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
