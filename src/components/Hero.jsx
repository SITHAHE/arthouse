import LightField from './LightField.jsx'
import Spark from './Spark.jsx'
import { site } from '../data.js'

// =========================================================================
// Hero — парадигма №1 «типографический постер». В верхнем слое только имя
// бренда во всю ширину и живой свет (ход снят с HOBRO DIGITAL и с обложки
// сообщества). Подпись, оффер и CTA живут ниже, у нижней кромки экрана:
// канонического ИИ-hero (eyebrow → H1 → сабтайтл → две кнопки по центру)
// здесь нет, строка одна и кнопка одна.
//
// Имя набрано шрифтом Unbounded 800 капсом. Пробовали поставить вместо него
// хромированную надпись с обложки сообщества (вырезка живёт в
// _work/arthouse/wordmark.mjs) — заказчик забраковал: на вырезке из JPEG
// кромки мягкие и лезут зазубрины, вблизи выглядит хуже чистой типографики.
// Если появится исходник надписи с прозрачностью — можно вернуться к нему.
//
// Кегль: min(13.2vw, 190px). Потолок в пикселях обязателен. Контейнер зажат
// в 1400px, поэтому доступная под слово ширина перестаёт расти после
// ~1464px окна, а vw растёт дальше — на мониторе 1920 чистый vw давал слово
// в 1629px при доступных 1336px, и последняя буква уезжала за кромку.
// Натуральная ширина слова в Unbounded 800 с этим трекингом — 6.75em
// (замерено вживую на девяти ширинах, _work/arthouse/overflow.mjs), отсюда
// 190px × 6.75 ≈ 1283px при доступных 1336px, запас 53px.
//
// Кегль и line-height стоят НА h1, а не на вложенном span: иначе тег
// наследует размер тела, и любой аудит читает «H1 = 16px в 7 строк».
// =========================================================================
export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 pb-8 md:pb-12">
      <LightField />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-8">
        {/* На 375px строка с «с 2020 года» переносилась, и искра уезжала на
            вторую строку. Дату не теряем: она стоит в цифрах достижений. */}
        <p className="mono-label flex items-start gap-2.5 text-fg/70">
          <Spark size={10} className="mt-[.35em] shrink-0 text-accent" />
          Школа танцев · Колпино
        </p>
      </div>

      <h1 className="relative z-10 mx-auto block w-full max-w-[1400px] px-5 font-display text-[12.5vw] font-extrabold uppercase leading-[.8] tracking-[-.045em] sm:text-[min(13.2vw,190px)] md:px-8">
        Arthouse
      </h1>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-8 px-5 md:grid-cols-12 md:items-end md:px-8">
        <p className="text-lead max-w-[32ch] text-fg/85 md:col-span-5">
          Через полгода ребёнок выходит на сцену: свой костюм, свет, полный зал.
          Коллективы студии танцевали в Кремле и на Газпром Арене.
        </p>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 md:col-span-4 md:col-start-9 md:justify-end">
          <a
            href="#zapis"
            className="inline-flex h-[54px] items-center bg-accent px-8 text-[13px] font-semibold uppercase tracking-[.08em] text-accent-contrast transition-colors hover:bg-accent-hi"
          >
            Записаться на пробное
          </a>
          <a
            href={site.contacts.phoneHref}
            className="nums inline-flex h-11 items-center text-[15px] font-medium text-fg underline decoration-fg/30 underline-offset-[6px] transition-colors hover:text-accent"
          >
            {site.contacts.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
