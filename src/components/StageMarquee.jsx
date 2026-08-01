import Spark from './Spark.jsx'
import { site } from '../data.js'

// =========================================================================
// StageMarquee — фирменная бегущая строка (typography-moves №17, wow №8):
// настоящие площадки, на которых выступали коллективы. Разделитель — svg-искра,
// не эмодзи. 50s linear, пауза на ховер, дубль содержимого для бесшовности.
// =========================================================================
export default function StageMarquee() {
  const row = [...site.stages, ...site.stages]
  return (
    <div className="marquee-hold border-y border-line bg-surface py-4">
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-8">
          {row.map((s, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-display text-[13px] font-bold uppercase tracking-[.1em] text-fg/85 md:text-[15px]">
                {s}
              </span>
              <Spark size={9} className="text-accent" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
