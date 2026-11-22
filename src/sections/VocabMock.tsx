import { AnimatePresence, motion } from 'motion/react'
import { Check, RotateCcw, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EASE_EXPO } from '../lib/motion'

type Question = { word: string; ipa: string; pos: string; options: string[]; answer: number }

const QUESTIONS: Question[] = [
  {
    word: 'ubiquitous',
    ipa: '/juːˈbɪk.wɪ.təs/',
    pos: 'adj.',
    options: ['rarely seen', 'present everywhere', 'deeply confusing', 'extremely old'],
    answer: 1,
  },
  {
    word: 'meticulous',
    ipa: '/məˈtɪk.jə.ləs/',
    pos: 'adj.',
    options: ['careless and quick', 'very loud', 'very careful about detail', 'easily frightened'],
    answer: 2,
  },
  {
    word: 'ephemeral',
    ipa: '/ɪˈfem.ər.əl/',
    pos: 'adj.',
    options: ['lasting a very short time', 'heavy and solid', 'widely respected', 'hard to explain'],
    answer: 0,
  },
  {
    word: 'resilient',
    ipa: '/rɪˈzɪl.i.ənt/',
    pos: 'adj.',
    options: ['easily broken', 'slow to react', 'openly hostile', 'able to recover quickly'],
    answer: 3,
  },
  {
    word: 'pragmatic',
    ipa: '/præɡˈmæt.ɪk/',
    pos: 'adj.',
    options: ['purely theoretical', 'dealing with things sensibly', 'full of emotion', 'strictly traditional'],
    answer: 1,
  },
]

const LETTERS = ['A', 'B', 'C', 'D']

/** A working miniature of the vocabulary quiz flow, rendered inside the showcase frame. */
export function VocabMock() {
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const finished = qi >= QUESTIONS.length
  const q = QUESTIONS[Math.min(qi, QUESTIONS.length - 1)]
  const answered = qi + (picked !== null ? 1 : 0)

  useEffect(() => {
    if (picked === null) return
    const id = window.setTimeout(() => {
      setPicked(null)
      setQi((v) => v + 1)
    }, 1100)
    return () => window.clearTimeout(id)
  }, [picked])

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const restart = () => {
    setQi(0)
    setScore(0)
    setPicked(null)
  }

  return (
    <div className="flex h-full flex-col bg-ink text-left">
      {/* App bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-6">
        <span className="font-telemetry text-fg">
          VOCAB<span className="text-acid">.</span>
          <span className="ml-3 text-muted">ROUND 03</span>
        </span>
        <span className="font-telemetry text-muted tabular-nums">
          SCORE <span className="text-fg">{String(score).padStart(2, '0')}</span>/
          {String(QUESTIONS.length).padStart(2, '0')}
        </span>
      </div>
      {/* Progress */}
      <div className="h-px w-full bg-line">
        <motion.div
          className="h-px origin-left bg-acid"
          initial={false}
          animate={{ scaleX: answered / QUESTIONS.length }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
        />
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-4 py-6 md:px-8 md:py-8">
        <AnimatePresence mode="wait" initial={false}>
          {finished ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_EXPO }}
              className="flex flex-col items-start gap-4"
            >
              <p className="font-telemetry text-muted">ROUND COMPLETE</p>
              <p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-fg md:text-6xl">
                {score}/{QUESTIONS.length}
              </p>
              <button
                type="button"
                onClick={restart}
                className="font-telemetry inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-fg transition-colors hover:border-acid hover:text-acid"
              >
                <RotateCcw size={13} strokeWidth={1.5} /> Retry round
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={q.word}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE_EXPO }}
            >
              <p className="font-telemetry text-muted">
                Q{String(qi + 1).padStart(2, '0')} — CHOOSE THE MEANING
              </p>
              <p className="mt-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none font-extrabold tracking-[-0.04em] text-fg">
                {q.word}
              </p>
              <p className="mt-2 font-mono text-xs text-muted">
                {q.ipa} <span className="text-fg/40">·</span> {q.pos}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-7">
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answer
                  const state =
                    picked === null ? 'idle' : isAnswer ? 'correct' : i === picked ? 'wrong' : 'dim'
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => choose(i)}
                      disabled={picked !== null}
                      className={`flex items-center gap-3 rounded-[3px] border px-3 py-2.5 text-left text-sm transition-colors duration-300 ${
                        state === 'correct'
                          ? 'border-acid text-fg'
                          : state === 'wrong'
                            ? 'border-line text-muted line-through'
                            : state === 'dim'
                              ? 'border-line text-muted/60'
                              : 'border-line text-fg hover:border-fg/40'
                      }`}
                    >
                      <span
                        className={`font-telemetry flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] border ${
                          state === 'correct' ? 'border-acid bg-acid text-on-acid' : 'border-line text-muted'
                        }`}
                      >
                        {state === 'correct' ? (
                          <Check size={12} strokeWidth={2.5} />
                        ) : state === 'wrong' ? (
                          <X size={12} strokeWidth={2} />
                        ) : (
                          LETTERS[i]
                        )}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
