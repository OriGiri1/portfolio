import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/useTheme'

/** Light/Dark switch. Icon swaps via transform + opacity only. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line-strong text-fg transition-colors duration-300 hover:border-acid hover:text-acid"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={theme}
          className="flex"
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {dark ? <Moon size={15} strokeWidth={1.5} /> : <Sun size={15} strokeWidth={1.5} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
