import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'theme'
const META = { light: '#FAFAFB', dark: '#09090B' } as const

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'light'
  // index.html already applied the stored choice before paint; mirror it.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Light by default; the user's choice persists in localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[theme])
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // Storage blocked (private mode etc.): theme still applies for this visit.
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
