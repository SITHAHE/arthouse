import { useState } from 'react'
import Spark from './Spark.jsx'
import { site } from '../data.js'

// =========================================================================
// Quotes — облик «одна большая цитата» (section-alternatives, отзывы №1):
// кегль 2-3rem, листание стрелками, никакой сетки из трёх одинаковых карточек.
// Отзывы настоящие, из открытого топика ВК «Что о нас говорят», с именами
// и датами. Смешанные и негативные не публикуем.
// =========================================================================
export default function Quotes() {
  const list = site.reviews
  const [i, setI] = useState(0)
  const r = list[i]
  const go = (d) => setI((v) => (v + d + list.length) % list.length)

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-3">
        <p className="mono-label text-muted">Отзывы родителей</p>
        <p className="num-giant mt-4 text-fg" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
          {list.length}
        </p>
        <p className="mt-2 max-w-[22ch] text-sm text-muted">
          из 98 в открытом топике сообщества, публикуем дословно
        </p>
      </div>

      <figure className="md:col-span-9">
        <Spark size={14} className="text-accent" />
        <blockquote
          key={i}
          className="mt-6 font-display font-normal leading-[1.22] tracking-[-.015em] text-fg"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.1rem)' }}
        >
          {r.text}
        </blockquote>
        <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-5">
          <div>
            <p className="text-[15px] font-semibold text-fg">{r.name}</p>
            <p className="mono-label mt-1.5 text-muted">{r.meta}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Предыдущий отзыв"
              className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-fg/45"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Следующий отзыв"
              className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-fg/45"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  )
}
