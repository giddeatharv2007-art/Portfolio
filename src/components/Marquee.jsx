import { marqueeItems } from '../data/portfolio'

/**
 * Seamless infinite marquee.
 * The track renders the same sequence twice and animates to -50%, so the loop
 * is perfectly continuous with no visible seam on any viewport width.
 */
export default function Marquee() {
  return (
    <section aria-label="Engineering principles" className="relative border-y border-white/10 py-6 md:py-8">
      <div className="mask-x relative flex overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center">
                  <span className="display px-6 text-[clamp(1.1rem,3.2vw,2rem)] whitespace-nowrap text-white/80 md:px-8">
                    {item}
                  </span>
                  <span aria-hidden="true" className="text-white/25">
                    →
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
