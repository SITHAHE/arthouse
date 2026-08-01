import { useEffect, useState } from 'react'
import { site } from '../data.js'

// =========================================================================
// Nav — парадигма №8 «шапка-невидимка поверх hero»: прозрачная над шейдером,
// на скролле получает фон bg и хайрлайн (ОДНО из двух по закону nav-paradigms:
// фон — да, уплотнение — нет). Телефон текстом табличными цифрами, не иконкой.
// Мобильное меню — полноэкранный оверлей фоном bg, пункты display-кеглем,
// scroll-lock, Escape закрывает.
// =========================================================================
export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          solid ? 'border-b border-line bg-bg/96' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[68px] md:px-8">
          <a
            href="#top"
            className="font-display text-[15px] font-extrabold uppercase tracking-[.14em] md:text-base"
          >
            {site.brand}
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {site.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="inline-flex h-11 items-center text-[13px] font-medium text-fg/85 transition-colors hover:text-fg"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={site.contacts.phoneHref}
              className="nums hidden h-11 items-center text-[13px] font-medium text-fg transition-colors hover:text-accent md:inline-flex"
            >
              {site.contacts.phone}
            </a>
            <a
              href="#zapis"
              className="hidden h-10 items-center bg-accent px-5 text-[12px] font-semibold uppercase tracking-[.08em] text-accent-contrast transition-colors hover:bg-accent-hi sm:inline-flex"
            >
              Записаться на пробное
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-line text-fg lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 7h18M3 17h18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-bg">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-[15px] font-extrabold uppercase tracking-[.14em]">{site.brand}</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-line"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-5">
            {site.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="h-sect py-1.5"
                style={{ fontSize: 'clamp(1.9rem, 9vw, 3rem)' }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="space-y-3 px-5 pb-10">
            <a
              href="#zapis"
              onClick={() => setOpen(false)}
              className="flex h-[54px] items-center justify-center bg-accent text-sm font-semibold uppercase tracking-[.08em] text-accent-contrast"
            >
              Записаться на пробное
            </a>
            <a
              href={site.contacts.phoneHref}
              className="nums flex h-[54px] items-center justify-center border border-line text-base font-medium"
            >
              {site.contacts.phone}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
