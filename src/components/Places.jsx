import { useState } from 'react'
import { site } from '../data.js'

// =========================================================================
// Places — облик «разворот с картой». Два зала переключаются кликом: мама
// выбирает тот, что ближе, и сразу видит его на карте. Под картой ссылка на
// Яндекс.Карты — блок остаётся полезным, даже если виджет не прогрузился
// (медленная сеть, блокировщик), и не читается как пустая рамка.
// =========================================================================
export default function Places() {
  const [active, setActive] = useState(0)
  const place = site.places[active]

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="border-t border-line">
          {site.places.map((p, i) => {
            const on = i === active
            return (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`row-lift block w-full border-b border-line py-6 text-left transition-colors ${
                  on ? 'border-l-2 border-l-accent pl-5' : 'pl-0 hover:pl-2'
                }`}
              >
                <h3 className={`font-display text-xl font-bold uppercase tracking-[-.01em] ${on ? 'text-fg' : 'text-fg/70'}`}>
                  {p.title}
                </h3>
                <p className="nums mt-2 text-[17px] text-fg/90">{p.address}</p>
                <p className="mono-label mt-2 text-accent">{p.floor}</p>
              </button>
            )
          })}
        </div>

        <p className="mt-6 max-w-[34ch] text-[15px] text-muted">{site.contacts.hours}</p>
        <p className="mt-4 max-w-[34ch] text-[15px] text-muted">
          Оба зала в торговых центрах: тепло, есть где подождать ребёнка и куда
          поставить машину.
        </p>
      </div>

      <div className="md:col-span-7">
        <div className="stage-fallback relative aspect-[16/12] w-full border border-line md:aspect-[16/11]">
          <iframe
            key={place.map}
            src={place.map}
            title={`ART HOUSE на карте: ${place.title}, ${place.address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-3 text-[15px]">
          <span className="text-muted">{place.title}, {place.address}, {place.floor}.</span>
          <a
            href={`https://yandex.ru/maps/?text=${encodeURIComponent(`Колпино ${place.address}`)}`}
            target="_blank"
            rel="noopener"
            className="inline-flex h-11 items-center text-fg underline decoration-fg/30 underline-offset-4 hover:text-accent"
          >
            Открыть в Яндекс.Картах
          </a>
        </p>
      </div>
    </div>
  )
}
