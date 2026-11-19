import { craft } from '../data/portfolio'

export default function Craft() {
  return (
    <section className="shell py-16 md:py-24">
      <div className="flex items-baseline justify-between gap-4" data-reveal>
        <span className="mono-label">{craft.label}</span>
        <span className="mono-label">05 disciplines</span>
      </div>

      <ul className="mt-8 border-t border-white/10">
        {craft.items.map((item) => (
          <li
            key={item.index}
            data-reveal
            className="group grid grid-cols-1 gap-3 border-b border-white/10 py-8 transition-colors duration-300 md:grid-cols-[5rem_1fr_1.15fr] md:items-baseline md:gap-8 md:py-9"
          >
            <span className="mono-label">{item.index} /</span>

            <h3 className="display text-[clamp(1.5rem,4vw,2.25rem)] text-white transition-colors duration-300 group-hover:text-white">
              {item.title}
            </h3>

            <div>
              <p className="max-w-xl text-sm leading-relaxed text-white/50">{item.summary}</p>
              <p className="mono-label mt-4 text-white/35">{item.tags.join(' / ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
