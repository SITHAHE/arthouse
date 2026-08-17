import Spark from './Spark.jsx'
import { site } from '../data.js'

// =========================================================================
// StageMarquee — фирменная бегущая строка (typography-moves №17, wow №8).
// Разделитель — svg-искра, не эмодзи. 50s linear, пауза на ховер, дубль
// содержимого для бесшовности.
//
// Правка заказчицы (17.08.2026): раньше здесь бежали площадки — Кремль,
// Газпром Арена, БКЗ. Её довод: «строка очень привлекает внимание, и там
// нужны не сцены. Те мамы, которые не сильно знают, не будут смотреть, какие
// там сцены. Там нужны названия танцев». То есть на самом заметном месте
// страницы должно стоять то, что человек ищет, а не то, чем мы гордимся.
// Список названий — из описания сообщества, он же в секции «Направления».
// =========================================================================
export default function StageMarquee() {
  const names = site.directions.map((d) => d.name)
  const row = [...names, ...names]
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
