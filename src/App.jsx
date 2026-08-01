import SmoothScroll from './lib/SmoothScroll.jsx'
import Reveal from './ui/Reveal.jsx'
import LeadForm from './blocks/LeadForm.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import StageMarquee from './components/StageMarquee.jsx'
import PhotoBand from './components/PhotoBand.jsx'
import Quotes from './components/Quotes.jsx'
import Places from './components/Places.jsx'
import Faq from './components/Faq.jsx'
import LightField from './components/LightField.jsx'
import Spark from './components/Spark.jsx'
import { site } from './data.js'

// =========================================================================
// ART HOUSE — архетип «запись» (_factory/archetypes/zapis.md), стиль
// stage-violet. Все решения зафиксированы в BRIEF.md ДО кода.
//
// Ритм секций (composition-moves №7): постер → лента → плотный editorial →
// воздушный зиг-заг → цифры на всю ширину → фото-лента full-bleed →
// тренер разворотом → прайс на линейках → цитата → шаги → плакат-CTA →
// адреса с картой → FAQ → подпись. Двух соседних секций с одинаковой
// композицией нет. Секций-карточек — ноль.
// =========================================================================

// Шапка секции: смещение со 2-й колонки (composition-moves №6) + тихая
// нумерация (typography-moves №11): цифра стоит отдельно и молчит.
// Формат «01 / УСЛУГИ» капсом — оранжевый маркер design-ru §2, не берём.
function Head({ n, title, lead, className = '' }) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 ${className}`}>
      <p className="nums pt-3 font-mono text-sm text-muted/70 md:col-span-2">{n}</p>
      <div className="md:col-span-9">
        <h2 className="h-sect max-w-[20ch]">{title}</h2>
        {lead && <p className="text-lead mt-5 max-w-[54ch] text-muted">{lead}</p>}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />

        {/* Полноширинный разрыв №8: бегущая строка настоящих площадок */}
        <StageMarquee />

        {/* НАПРАВЛЕНИЯ — «нумерованный editorial»: цифры-порядковые, строки,
            ни одной рамки. Плотная секция после воздушного постера. */}
        <section id="napravleniya" className="section-y-sm">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Head
              n="01"
              title="Восемь направлений для детей, подростков и взрослых"
              lead="Начинают почти все с детского или сценического танца, а дальше уходят туда, где нравится больше. Переходить между направлениями можно в любой момент."
            />
            <div className="mt-14 border-t border-line">
              {site.directions.map((d, i) => (
                <Reveal key={d.n} delay={i * 0.03}>
                  <div className="row-lift grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-line px-1 py-5 md:gap-x-6 md:py-6">
                    <span className="nums col-span-2 font-mono text-sm text-muted/70 md:col-span-1">{d.n}</span>
                    <h3 className="col-span-10 font-display text-[17px] font-bold uppercase tracking-[-.01em] md:col-span-4 md:text-xl">
                      {d.name}
                    </h3>
                    <p className="col-span-10 col-start-3 text-[15px] leading-snug text-muted md:col-span-7 md:col-start-6">
                      {d.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ВОЗРАСТНЫЕ СТУПЕНИ — зиг-заг 2 колонки с крупным фото, ряды
            чередуют сторону. Воздушная секция после плотного списка. */}
        <section id="vozrast" className="section-y-lg bg-surface">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Head
              n="02"
              title="С 4 лет и до взрослых групп"
              lead="У малышей всё через игру. Школьники попадают в команду, которая вместе едет на конкурсы. Подростки берут хип-хоп и вог. Группы собираем по возрасту и опыту, а не «всех вместе»."
            />
            <div className="mt-16 space-y-16 md:space-y-24">
              {site.ages.map((a, i) => (
                <Reveal key={a.title}>
                  <div className="grid items-end gap-7 md:grid-cols-12 md:gap-10">
                    <figure className={`md:col-span-7 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                      <img
                        src={a.photo}
                        alt={a.alt}
                        loading="lazy"
                        className="img-treat aspect-[4/3] w-full object-cover"
                      />
                    </figure>
                    <div className={`md:col-span-4 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                      <p className="num-giant text-accent" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
                        {a.title}
                      </p>
                      <h3 className="mt-5 font-display text-lg font-bold uppercase leading-tight tracking-[-.01em]">
                        {a.lead}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-muted">{a.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ДОСТИЖЕНИЯ — гигантские цифры (typography-moves №10).
            Несимметрично: первая цифра втрое крупнее и занимает половину
            ряда, три остальные — тихой колонкой справа на хайрлайнах.
            Четыре равных близнеца в ряд читались бы как ИИ-сетка. */}
        <section className="section-y">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="grid items-end gap-10 border-y border-line py-12 md:grid-cols-12 md:gap-8">
              <Reveal className="md:col-span-5">
                <p className="num-giant text-fg">{site.facts[0].value}</p>
                <p className="mt-4 max-w-[26ch] text-lg leading-snug text-fg/90">{site.facts[0].label}</p>
              </Reveal>
              <div className="md:col-span-6 md:col-start-7">
                {site.facts.slice(1).map((f, i) => (
                  <Reveal key={f.label} delay={i * 0.06}>
                    <div className="flex items-baseline gap-5 border-t border-line py-4">
                      <span className="nums shrink-0 font-display text-3xl font-bold tracking-[-.02em] text-accent">{f.value}</span>
                      <span className="text-[15px] leading-snug text-muted">{f.label}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ФОТО — full-bleed лента (composition-moves №8 + №13). Заголовок
            в контейнере, лента выходит за него до кромки экрана. */}
        <section id="foto" className="section-y-sm">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="nums font-mono text-sm text-muted/70">03</p>
                <h2 className="h-sect mt-5 max-w-[24ch]">Сцена, зал и закулисье</h2>
              </div>
              <p className="max-w-[34ch] text-[15px] text-muted">
                В сообществе студии 55 000 фотографий. Здесь 24 кадра: концерты,
                конкурсы, студийные съёмки и летние сборы. Нажмите, чтобы открыть.
              </p>
            </div>
          </div>
          <div className="mt-10 pl-5 md:pl-8">
            <PhotoBand />
          </div>
        </section>

        {/* ТРЕНЕР — «один мастер крупно», несимметричный сплит 7/5 по нижней
            кромке (composition-moves №4). */}
        <section className="section-y-lg bg-surface">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="grid items-end gap-10 md:grid-cols-12">
              <figure className="relative md:col-span-5">
                <img
                  src={site.coach.photo}
                  alt={site.coach.alt}
                  loading="lazy"
                  className="img-treat aspect-[4/5] w-full object-cover"
                />
                <figcaption className="chrome-plate mono-label absolute bottom-0 left-0 px-3 py-2">
                  Колпино · 2026
                </figcaption>
              </figure>

              <div className="md:col-span-6 md:col-start-7">
                <p className="nums font-mono text-sm text-muted/70">04</p>
                <h2 className="h-sect mt-5">{site.coach.name}</h2>
                <p className="mt-4 text-[15px] text-muted">{site.coach.role}</p>

                <dl className="mt-9 border-t border-line">
                  {site.coach.lines.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-12 gap-x-4 border-b border-line py-4">
                      <dt className="mono-label col-span-12 pt-1 text-accent sm:col-span-4">{k}</dt>
                      <dd className="col-span-12 text-[15px] leading-snug text-fg/90 sm:col-span-8">{v}</dd>
                    </div>
                  ))}
                </dl>

                <figure className="mt-9">
                  <Spark size={13} className="text-accent" />
                  <blockquote className="mt-4 max-w-[36ch] font-display text-lg leading-snug tracking-[-.01em] md:text-xl">
                    «{site.coach.quote}»
                  </blockquote>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ЧТО ВХОДИТ — на месте снятой секции цен. Хайрлайн-список без
            коробок; справа одна тихая колонка про деньги, чтобы вопрос
            стоимости не остался без ответа. */}
        <section id="zanyatiya" className="section-y">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Head
              n="05"
              title="Что входит в занятия"
              lead="Ребёнок приходит танцевать, а получает целую историю: свой номер, костюм, большую сцену и съёмку, которую потом пересматривают всей семьёй."
            />
            <div className="mt-14 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="border-t border-line">
                  {site.included.map((p, i) => (
                    <Reveal key={p.name} delay={i * 0.03}>
                      <div className="row-lift flex items-baseline gap-5 border-b border-line px-1 py-5">
                        <Spark size={11} className="mt-[.45em] shrink-0 text-accent" />
                        <div>
                          <p className="text-[16px] font-medium text-fg md:text-[17px]">{p.name}</p>
                          <p className="mt-1.5 max-w-[58ch] text-[14px] leading-snug text-muted">{p.note}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3 md:col-start-10">
                <div className="border-l-2 border-accent pl-5">
                  <p className="font-display text-[15px] font-bold uppercase leading-snug tracking-[-.01em]">
                    Первое занятие бесплатно
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    На пробное приходят без оплаты и без документов. Стоимость абонемента
                    зависит от направления и от того, сколько раз в неделю ходить: назовём
                    сумму по вашей группе в ответ на заявку или по телефону.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Полноширинный разрыв: выезды и сборы одним крупным кадром. Нижняя
            половина страницы без фотографий читалась как реестр. */}
        <section className="relative">
          <figure className="wash-stage relative">
            <img
              src={`${import.meta.env.BASE_URL}img/trip-1.webp`}
              alt="Коллектив ART HOUSE на вокзале по дороге на конкурс в Петрозаводск"
              loading="lazy"
              className="img-treat h-[58vw] w-full object-cover md:h-[520px]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1400px] px-5 pb-8 md:px-8 md:pb-12">
              <p className="mono-label text-fg/80">Петрозаводск · май 2026</p>
              <p className="mt-3 max-w-[30ch] font-display text-xl font-bold uppercase leading-tight tracking-[-.01em] md:max-w-[38ch] md:text-3xl">
                Ездим целым составом: конкурсы в других городах и летние сборы на море
              </p>
            </figcaption>
          </figure>
        </section>

        {/* ОТЗЫВЫ — одна большая цитата */}
        <section className="section-y bg-surface">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Quotes />
          </div>
        </section>

        {/* КАК НАЧАТЬ — горизонтальная нумерация 01 → 02 → 03 */}
        <section className="section-y">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Head n="06" title="Три шага до первого занятия" />
            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {site.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.07}>
                  <div className="border-t-2 border-accent pt-5">
                    <p className="num-giant text-fg/15" style={{ fontSize: 'clamp(3.4rem, 6vw, 5rem)' }}>{s.n}</p>
                    <h3 className="mt-4 font-display text-[17px] font-bold uppercase leading-tight tracking-[-.01em]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ЗАЯВКА — плакат на живом свете (второй выход шейдера), full-bleed */}
        <section id="zapis" className="relative overflow-hidden">
          {/* seedOffset: у плаката своя фаза потока, иначе два экрана
              показывают один и тот же рисунок */}
          <LightField seedOffset={17} />
          <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="nums font-mono text-sm text-fg/60">07</p>
                <h2 className="h-giant mt-5" style={{ fontSize: 'clamp(2.1rem, 5.6vw, 4.6rem)' }}>
                  Приходите<br />танцевать
                </h2>
                <p className="text-lead mt-6 max-w-[34ch] text-fg/85">
                  Напишите возраст ребёнка и удобный зал, подберём группу и время,
                  запишем на бесплатное пробное.
                </p>
                <div className="mt-9 space-y-3">
                  <a href={site.contacts.phoneHref} className="nums block font-display text-2xl font-bold tracking-[-.02em] md:text-3xl">
                    {site.contacts.phone}
                  </a>
                  <div className="flex flex-wrap gap-x-6 text-[15px]">
                    <a href={site.contacts.telegram} className="inline-flex h-11 items-center text-fg/80 underline decoration-fg/30 underline-offset-4 hover:text-accent">
                      Telegram
                    </a>
                    <a href={site.contacts.vk} className="inline-flex h-11 items-center text-fg/80 underline decoration-fg/30 underline-offset-4 hover:text-accent">
                      ВКонтакте
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 md:col-start-8">
                <div className="border border-fg/20 bg-bg/80 p-6 md:p-8">
                  <LeadForm
                    title="Записаться на пробное"
                    note="Нажимая кнопку, вы соглашаетесь с обработкой персональных данных."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* АДРЕСА — разворот с картой, залы переключаются кликом */}
        <section id="adresa" className="section-y">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Head n="08" title="Два зала в Колпино" />
            <div className="mt-14">
              <Places />
            </div>
          </div>
        </section>

        {/* FAQ — аккордеон на линейках */}
        <section className="section-y bg-surface">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="nums font-mono text-sm text-muted/70">09</p>
                <h2 className="h-sect mt-5">Коротко о главном</h2>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <Faq />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — парадигма №1 «гигантская подпись»: имя в обрез нижней кромкой */}
      <footer className="overflow-hidden border-t border-line pt-14">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div>
              <a href={site.contacts.phoneHref} className="nums flex h-11 items-center font-display text-xl font-bold tracking-[-.02em]">
                {site.contacts.phone}
              </a>
              <a href={site.contacts.vk} className="flex h-11 items-center text-[15px] text-muted hover:text-fg">
                {site.contacts.vkHandle}
              </a>
              <a href={site.contacts.telegram} className="flex h-11 items-center text-[15px] text-muted hover:text-fg">
                {site.contacts.telegramHandle}
              </a>
            </div>
            <div className="space-y-1.5 text-[15px] text-muted">
              {site.places.map((p) => (
                <p key={p.title}>
                  {p.title} · {p.address}, {p.floor}
                </p>
              ))}
              <p>{site.contacts.city}</p>
            </div>
            <a
              href="#zapis"
              className="inline-flex h-[54px] items-center bg-accent px-7 text-[13px] font-semibold uppercase tracking-[.08em] text-accent-contrast transition-colors hover:bg-accent-hi"
            >
              Записаться на пробное
            </a>
          </div>

          <p className="mono-label mt-12 leading-[2.6] text-muted/80">
            © {new Date().getFullYear()} Школа танцев ART HOUSE · Колпино, Санкт-Петербург ·{' '}
            <a href={site.contacts.vk} className="underline underline-offset-2 hover:text-fg">Сообщество ВКонтакте</a>
          </p>

          {/* Подпись в обрез: слово упирается в кромку и уходит под неё.
              Потолок в пикселях по той же причине, что в hero: контейнер
              зажат в 1400px, а vw после этого продолжает расти. */}
          <p
            aria-hidden="true"
            className="mt-6 -mb-[.16em] select-none font-display text-[12.5vw] font-extrabold uppercase leading-[.78] tracking-[-.05em] text-fg/[0.13] sm:text-[min(13.2vw,190px)]"
          >
            Arthouse
          </p>
        </div>
      </footer>
    </SmoothScroll>
  )
}
