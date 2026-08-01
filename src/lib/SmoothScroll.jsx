import { useEffect } from 'react'
import Lenis from 'lenis'

// Плавный скролл (lenis). Оборачивает всё приложение.
// Уважает prefers-reduced-motion: если пользователь просит меньше движения —
// не включаем инерцию.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)

    // Инстанс наружу: оверлеям нужен stop/start, а скриншотилке гейта — destroy
    // (иначе инерция глотает программную прокрутку и reveal-секции остаются пустыми).
    window.__lenis = lenis

    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis }
  }, [])

  return children
}
