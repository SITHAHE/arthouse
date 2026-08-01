// =========================================================================
// MOTION-ПРЕСЕТЫ  —  замороженный слой. Тайминги перестают быть «на глаз».
// Импортируй из блоков/секций, не изобретай значения заново.
// =========================================================================

// Фирменный easing (совпадает с --ease-out в index.css)
export const ease = [0.22, 1, 0.36, 1]
export const easeInOut = [0.65, 0, 0.35, 1]

// Пружины
export const spring = { type: 'spring', stiffness: 260, damping: 26 }
export const springSoft = { type: 'spring', stiffness: 140, damping: 20 }

// Длительности (мс → сек для framer)
export const dur = { fast: 0.15, base: 0.3, slow: 0.6 }

// -------- Появление при скролле --------
export const revealUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease } },
}

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.slow, ease } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: dur.base, ease } },
}

// -------- Каскад (stagger) для списков --------
export const stagger = (gap = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
})

// Готовый viewport-конфиг для whileInView (один раз, с запасом снизу)
export const inView = { once: true, margin: '-60px' }
