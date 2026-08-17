import Reveal from '../ui/Reveal.jsx'

const A = import.meta.env.BASE_URL

// Каждый кадр выгружен в двух ширинах (photos5 export): 640 для телефона,
// 1280 для десктопа. srcset отдаёт браузеру выбирать, sizes считает по факту
// вёрстки — плашка занимает всю ширину на телефоне и треть колонки на десктопе.
function Frame({ p, priority, wide }) {
  return (
    <figure className="relative">
      <img
        src={`${A}img/${p.src}-1280.webp`}
        srcSet={`${A}img/${p.src}-640.webp 640w, ${A}img/${p.src}-1280.webp 1280w`}
        sizes="(max-width: 767px) 92vw, 22vw"
        alt={p.alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`img-treat w-full object-cover ${wide ? 'aspect-[4/3] md:aspect-[3/4]' : 'aspect-[3/4]'}`}
      />
      <figcaption className="chrome-plate mono-label absolute bottom-0 left-0 px-2.5 py-1.5">
        {p.tag}
      </figcaption>
    </figure>
  )
}

// =========================================================================
// AgeStep — возрастная ступень отдельной плашкой.
//
// Порядок чтения задан заказчицей дословно: «родитель должен зайти, увидеть
// название, потом увидеть, что это, и дальше — для кого это». Поэтому внутри
// строго возраст → название → что это → для кого, и ни строкой раньше про то,
// какие мы молодцы: регалии живут ниже по странице, тоже её решение.
//
// Три кадра на ступень — съёмка, зал и сцена — её же просьба: «фотография с
// фотосессии, с выступления и с тренировки».
//
// «Плашка» здесь не карточка с рамкой и тенью: коробок на сайте нет ни одной
// (stage-violet, ноль теней — вся глубина на хайрлайнах). Плашку держат
// хайрлайн сверху, крупная цифра возраста и лента из трёх кадров.
// =========================================================================
export default function AgeStep({ step, index }) {
  return (
    <Reveal>
      <article className="grid gap-8 border-t border-line pt-9 md:grid-cols-12 md:gap-10 md:pt-11">
        <div className="md:col-span-4">
          <p className="num-giant text-accent" style={{ fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)' }}>
            {step.title}
          </p>
          <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-[-.01em] md:text-2xl">
            {step.lead}
          </h3>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <p className="text-[15px] leading-relaxed text-fg/90 md:text-[16px]">{step.what}</p>
          <p className="mt-5 border-l-2 border-accent pl-5 text-[15px] leading-relaxed text-muted">
            <span className="mono-label mr-2 text-accent">Для кого</span>
            {step.who}
          </p>
        </div>

        {/* На телефоне три равные колонки давали кадры по 110px — лица в них
            уже не читаются, а вся правка заказчицы про то, чтобы родитель
            фотографии УВИДЕЛ. Поэтому на мобиле первый кадр во всю ширину,
            два других парой под ним; с md — три равных. */}
        <div className="grid grid-cols-2 gap-2.5 md:col-span-12 md:grid-cols-3 md:gap-4">
          {step.photos.map((p, i) => (
            <div key={p.src} className={i === 0 ? 'col-span-2 md:col-span-1' : ''}>
              <Frame p={p} priority={index === 0 && i === 0} wide={i === 0} />
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  )
}
