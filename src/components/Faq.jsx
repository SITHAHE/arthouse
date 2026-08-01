import { useState } from 'react'
import { site } from '../data.js'

// FAQ — облик «аккордеон на линейках»: только border-bottom, никаких коробок
// и теней (по карточке stage-violet тени запрещены везде).
export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="border-t border-line">
      {site.faq.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={it.q} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
            >
              <span className="max-w-[46ch] text-[17px] font-medium md:text-lg">{it.q}</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className={`mt-1 shrink-0 text-muted transition-transform duration-300 ease-[cubic-bezier(.52,.01,0,1)] ${isOpen ? 'rotate-45' : ''}`}
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`grid transition-all duration-300 ease-[cubic-bezier(.52,.01,0,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 text-[15px] leading-relaxed text-muted">{it.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
