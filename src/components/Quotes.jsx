import Spark from './Spark.jsx'
import Reveal from '../ui/Reveal.jsx'
import { site } from '../data.js'

// =========================================================================
// Quotes — отзывы родителей.
//
// Правка заказчицы: «отзывы должны быть где-то выведены — самые яркие, их
// должно быть штук десять». До правки здесь стоял облик «одна большая цитата»
// с листанием стрелками: на экране всегда был ровно один отзыв, а девять
// остальных существовали только для того, кто догадается нажать стрелку.
// Заодно снята цифра «из 98 в открытом топике» — её она тоже просила убрать.
//
// Сетка намеренно неровная: первый отзыв идёт крупным кеглем во всю ширину,
// остальные — двумя колонками потоком. Десять одинаковых карточек в ряд
// читались бы как отзывы, сгенерированные, а не собранные.
// Коробок нет: разделяют хайрлайны, как и везде на сайте.
// =========================================================================
export default function Quotes() {
  const [lead, ...rest] = site.reviews

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-12">
        <p className="nums pt-3 font-mono text-sm text-muted/70 md:col-span-2">07</p>
        <div className="md:col-span-9">
          <h2 className="h-sect max-w-[20ch]">Что говорят родители</h2>
          <p className="text-lead mt-5 max-w-[52ch] text-muted">
            Все отзывы настоящие и лежат в открытом топике сообщества — с именами,
            датами и возможностью написать автору. Мы их не редактировали, только сократили.
          </p>
        </div>
      </div>

      <figure className="mt-14 border-t border-line pt-9">
        <Spark size={14} className="text-accent" />
        {/* Кегль подобран под длину: свежие отзывы 2026 года на 400-500 знаков,
            и при 2.6rem на 26ch первая цитата занимала целый экран. */}
        <blockquote
          className="mt-5 max-w-[34ch] font-display font-normal leading-[1.25] tracking-[-.015em] text-fg md:max-w-[44ch]"
          style={{ fontSize: 'clamp(1.15rem, 1.9vw, 1.75rem)' }}
        >
          {lead.text}
        </blockquote>
        <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-[15px] font-semibold text-fg">{lead.name}</span>
          <span className="mono-label text-muted">{lead.meta}</span>
        </figcaption>
      </figure>

      <div className="mt-16 grid gap-x-10 gap-y-0 md:grid-cols-2 md:gap-x-16">
        {rest.map((r, i) => (
          <Reveal key={r.name + i} delay={(i % 2) * 0.05}>
            <figure className="border-t border-line py-8">
              <blockquote className="text-[15px] leading-relaxed text-fg/90 md:text-[16px]">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[15px] font-semibold text-fg">{r.name}</span>
                <span className="mono-label text-muted">{r.meta}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 border-t border-line pt-6 text-[15px] text-muted">
        Топик «Что о нас говорят» открыт всем:{' '}
        <a
          href={site.contacts.vk}
          className="inline-flex h-11 items-center text-fg underline decoration-fg/30 underline-offset-4 hover:text-accent"
        >
          читать в сообществе
        </a>
      </p>
    </div>
  )
}
