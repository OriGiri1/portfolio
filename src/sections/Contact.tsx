import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { BrandIcon, type Brand } from '../components/BrandIcon'
import { ExternalLink } from '../components/ExternalLink'
import { Magnetic } from '../components/Magnetic'
import { MaskLine } from '../components/MaskLine'
import { links, profile } from '../data/profile'
import { fadeUp, viewportOnce } from '../lib/motion'

// `tint` is the brand colour the logo takes on hover; GitHub follows the text colour.
const SOCIALS: { brand: Brand; label: string; href: string; tint: string }[] = [
  { brand: 'github', ...links.github, tint: 'var(--fg)' },
  { brand: 'codeforces', ...links.codeforces, tint: '#1F8ACB' },
  { brand: 'linkedin', ...links.linkedin, tint: '#0A66C2' },
  { brand: 'facebook', ...links.facebook, tint: '#0866FF' },
]

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for non-secure contexts / denied permission.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export function Contact() {
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(false), 2000)
    return () => window.clearTimeout(id)
  }, [toast])

  const onCopy = async () => {
    if (await copyText(profile.email)) setToast(true)
  }

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line px-4 pt-24 pb-8 md:px-8 md:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left: intro */}
          <div className="lg:col-span-5">
            <p className="font-telemetry mb-5 text-muted">
              <span className="text-acid">[ 04 ]</span> CONTACT // OPEN CHANNEL
            </p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-fg uppercase lg:text-[clamp(2.8rem,5vw,5.5rem)]">
              <MaskLine>Get in</MaskLine>
              <MaskLine delay={0.08}>
                touch<span className="text-acid">.</span>
              </MaskLine>
            </h2>
            <p className="mt-8 max-w-[38ch] text-muted">
              Based in {profile.location}. Email is the fastest way to reach me; code and contest history live on the
              profiles alongside.
            </p>
            <p className="mt-6 font-mono text-[13px] text-muted">OFF THE CLOCK // {profile.offTheClock}</p>
          </div>

          {/* Right: contact details + socials */}
          <div className="flex flex-col gap-12 lg:col-span-6 lg:col-start-7">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce}>
              <p className="font-telemetry mb-4 text-muted">EMAIL — CLICK TO COPY</p>
              <button
                type="button"
                data-cursor="COPY"
                onClick={onCopy}
                className="group flex max-w-full items-center gap-4 text-left"
                aria-label={`Copy email address ${profile.email}`}
              >
                <span className="min-w-0 font-display text-[clamp(1.15rem,5.2vw,2.5rem)] leading-none font-bold tracking-[-0.03em] break-all text-fg transition-colors duration-300 group-hover:text-acid lg:text-[clamp(1.5rem,2.4vw,2.5rem)]">
                  {profile.email}
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-colors duration-300 group-hover:border-acid group-hover:text-acid md:h-12 md:w-12">
                  <Copy size={16} strokeWidth={1.5} />
                </span>
              </button>

              <p className="font-telemetry mt-10 mb-2 text-muted">PHONE</p>
              <a
                href={profile.phone.href}
                className="font-mono text-lg text-fg transition-colors duration-300 hover:text-acid"
              >
                {profile.phone.display}
              </a>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} custom={1}>
              <p className="font-telemetry mb-4 text-muted">ELSEWHERE</p>
              <ul className="grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {SOCIALS.map((s) => (
                  <li key={s.href} className="border-b border-line">
                    <ExternalLink
                      href={s.href}
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="group flex items-center justify-between gap-4 py-5"
                      style={{ '--brand': s.tint } as CSSProperties}
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border border-line bg-surface text-fg transition-colors duration-300 group-hover:text-[var(--brand)]">
                          <BrandIcon brand={s.brand} />
                        </span>
                        <span className="font-display text-xl font-bold tracking-[-0.03em] text-fg md:text-2xl">
                          {s.label}
                        </span>
                      </span>
                      <Magnetic strength={0.45}>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg transition-colors duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-on-acid">
                          <ArrowUpRight size={16} strokeWidth={1.5} />
                        </span>
                      </Magnetic>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="font-telemetry mt-24 flex flex-col gap-2 border-t border-line pt-5 text-muted md:mt-32 md:flex-row md:justify-between">
          <span>© 2026 NGUYỄN MINH TÂN</span>
          <span>BUILT WITH REACT + MOTION // DA NANG</span>
        </div>
      </div>

      {/* Copy confirmation */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 520, damping: 30 }}
              className="font-telemetry flex max-w-full items-center gap-3 rounded-full border border-line-strong bg-surface px-4 py-3 text-fg"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-acid text-on-acid">
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span className="truncate">
                COPIED <span className="text-muted">→</span> {profile.email}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
