import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { CustomCursor } from './components/CustomCursor'
import { Grain } from './components/Grain'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { useLenis, stopScroll } from './lib/useLenis'
import { usePointerFine } from './lib/useMediaQuery'
import { Achievements } from './sections/Achievements'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { ProjectVocab } from './sections/ProjectVocab'
import { TechStack } from './sections/TechStack'

if (typeof history !== 'undefined') history.scrollRestoration = 'manual'

function App() {
  const [loading, setLoading] = useState(true)
  const fine = usePointerFine()
  useLenis()

  // Hold the page at the top while the boot curtain is up.
  useEffect(() => {
    const root = document.documentElement
    if (loading) {
      window.scrollTo(0, 0)
      root.style.overflow = 'hidden'
      stopScroll(true)
    } else {
      root.style.overflow = ''
      stopScroll(false)
    }
  }, [loading])

  const finish = useCallback(() => setLoading(false), [])
  const ready = !loading

  return (
    <>
      <ScrollProgress />
      <Grain />
      {fine && <CustomCursor />}
      <AnimatePresence>{loading && <Preloader key="preloader" onDone={finish} />}</AnimatePresence>

      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <TechStack />
        <ProjectVocab />
        <Achievements />
      </main>
      <Contact />
    </>
  )
}

export default App
