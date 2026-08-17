import Spark from './Spark.jsx'
import { site } from '../data.js'

// =========================================================================
// CtaBand — повторяющееся действие по дороге вниз.
//
// Правка заказчицы: «я не увидела, что там нету этой истории — записаться на
// занятие. Хорошо бы, чтобы это были кнопки». И она права: до правки кнопка
// стояла в шапке, в первом экране и в подвале, а между ними восемь экранов
// прокрутки без единого действия — человек долистывал и упирался в подвал.
//
// Полоса намеренно тихая: хайрлайн сверху и снизу, ни заливки, ни рамки,
// ни коробки. Пять одинаковых цветных плашек по странице читались бы как
// баннерная реклама, а не как приглашение. Разной делает их только строка
// текста — она приходит из места, где полоса стоит, и подхватывает мысль
// предыдущей секции.
//
// Кнопка одна и она главная (design-ru запрещает контурную кнопку вместо
// главного действия). Телефон рядом строкой, табличными цифрами.
// =========================================================================
export default function CtaBand({ title, note }) {
  return (
    <section className="border-y border-line">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-10 gap-y-7 px-5 py-9 md:px-8 md:py-11">
        <div className="max-w-[46ch]">
          <p className="flex items-start gap-2.5 font-display text-lg font-bold uppercase leading-tight tracking-[-.01em] md:text-2xl">
            <Spark size={11} className="mt-[.5em] shrink-0 text-accent" />
            {title}
          </p>
          {note && <p className="mt-3 pl-[21px] text-[15px] leading-snug text-muted">{note}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
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
