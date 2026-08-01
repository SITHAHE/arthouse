import { useState, useEffect, useCallback, useRef } from 'react'
import { site } from '../data.js'

// Русское склонение по числу: «1 кадр / 2 кадра / 24 кадра / 11 кадров».
// Без этого счётчик писал «24 кадров».
function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m100 >= 11 && m100 <= 14) return many
  if (m10 === 1) return one
  if (m10 >= 2 && m10 <= 4) return few
  return many
}

// =========================================================================
// PhotoBand — полноширинная горизонтальная лента кадров разной ширины
// (composition-moves №13) + лайтбокс (wow №18). Кадры встык, radius 0,
// хвост-подсказка обязателен: ширины не кратны контейнеру, край следующего
// кадра всегда виден. Клавиши ←/→/Esc работают в лайтбоксе.
// =========================================================================
export default function PhotoBand() {
  const images = site.gallery
  const [idx, setIdx] = useState(null)
  const open = idx !== null

  // Прокрутка ленты кнопками: без них было непонятно, что кадры листаются.
  const band = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const scrollBand = (dir) => {
    const el = band.current
    if (!el) return
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
  }
  const onBandScroll = () => {
    const el = band.current
    if (!el) return
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    })
  }

  const close = useCallback(() => setIdx(null), [])
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, close, prev, next])

  return (
    <>
      {/* Кадры разной ширины И высоты, выровнены по нижней кромке: лента
          читается как контактная полоса, а не как ряд одинаковых плиток.
          Под каждым кадром метка события — облик «полноширинная лента» из
          section-alternatives требует подписи (что за съёмка и когда). */}
      <div
        ref={band}
        onScroll={onBandScroll}
        className="band no-scrollbar flex snap-x snap-mandatory items-end gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]"
      >
        {images.map((im, i) => (
          <figure key={im.src} className="shrink-0 snap-start">
            <button
              onClick={() => setIdx(i)}
              aria-label={`Открыть фото: ${im.alt}`}
              className={`group relative block cursor-pointer overflow-hidden ${
                im.w === 'tall'
                  ? 'h-[62vw] w-[46vw] md:h-[460px] md:w-[300px]'
                  : 'h-[52vw] w-[74vw] md:h-[380px] md:w-[610px]'
              }`}
            >
              <img
                src={im.src}
                alt={im.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                className="img-treat h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.52,.01,0,1)] group-hover:scale-[1.04]"
              />
            </button>
            <figcaption className="mono-label mt-3 max-w-[34ch] text-muted">{im.tag}</figcaption>
          </figure>
        ))}
      </div>

      {/* Управление лентой: стрелки + счётчик. Без них лента читалась как
          обрезанный ряд фото, а не как то, что можно листать. */}
      <div className="mt-6 flex items-center gap-3 pr-5 md:pr-8">
        <button
          onClick={() => scrollBand(-1)}
          disabled={edge.start}
          aria-label="Предыдущие кадры"
          className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-fg/45 disabled:cursor-default disabled:opacity-35"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => scrollBand(1)}
          disabled={edge.end}
          aria-label="Следующие кадры"
          className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-fg transition-colors hover:border-fg/45 disabled:cursor-default disabled:opacity-35"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="mono-label ml-2 text-muted">
          {images.length} {plural(images.length, 'кадр', 'кадра', 'кадров')} · листайте или нажмите на фото
        </p>
      </div>

      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0310]/94 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
        >
          <figure onClick={(e) => e.stopPropagation()} className="max-w-[92vw]">
            <img
              src={images[idx].src}
              alt={images[idx].alt}
              className="img-treat max-h-[82vh] max-w-[92vw] object-contain"
            />
            <figcaption className="mono-label mt-4 text-center text-muted">
              {idx + 1} / {images.length} · {images[idx].alt}
            </figcaption>
          </figure>

          <button
            onClick={close}
            aria-label="Закрыть"
            className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center border border-fg/25 text-fg transition-colors hover:border-fg/60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Предыдущее фото"
            className="absolute left-3 flex h-12 w-12 cursor-pointer items-center justify-center border border-fg/25 text-fg transition-colors hover:border-fg/60 md:left-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Следующее фото"
            className="absolute right-3 flex h-12 w-12 cursor-pointer items-center justify-center border border-fg/25 text-fg transition-colors hover:border-fg/60 md:right-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
