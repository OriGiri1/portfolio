import { motion } from 'motion/react'
import { MaskLine } from '../components/MaskLine'
import { stackGroups, type StackGroup } from '../data/profile'
import { fadeUp, viewportOnce } from '../lib/motion'

function GroupRow({ group, index }: { group: StackGroup; index: number }) {
  return (
    <motion.li
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-6 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
    >
      <h3 className="font-telemetry text-muted md:col-span-4">
        <span className="text-acid">{String(index + 1).padStart(2, '0')}</span> / {group.title}
      </h3>
      <ul className="flex flex-col gap-6 md:col-span-8">
        {group.items.map((item) => (
          <li key={item.name}>
            <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.05] font-bold tracking-[-0.03em] text-fg">
              {item.name}
            </p>
            <p className="mt-2 max-w-[56ch] text-[15px] text-muted">{item.evidence}</p>
          </li>
        ))}
      </ul>
    </motion.li>
  )
}

export function TechStack() {
  return (
    <section id="stack" className="relative border-y border-line px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="font-telemetry mb-5 text-muted">
              <span className="text-acid">[ 01 ]</span> TECH STACK // PROOF OF WORK
            </p>
            <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-fg uppercase lg:text-[clamp(2.8rem,5vw,5.5rem)]">
              <MaskLine>Tech</MaskLine>
              <MaskLine delay={0.08}>stack.</MaskLine>
            </h2>
            <p className="mt-8 max-w-[36ch] text-muted">
              No self-scored bars. Every tool below is paired with where it was actually used: contests, shipped
              apps and coursework.
            </p>
          </div>
        </div>

        <ol className="border-t border-line lg:col-span-8">
          {stackGroups.map((group, i) => (
            <GroupRow key={group.id} group={group} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
