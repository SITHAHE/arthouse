import Container from './Container.jsx'

// Секция: вертикальный ритм (.section-y) + опциональный контейнер.
// tone задаёт фон через роли токенов, а не хардкод цвета.
const tones = {
  base: 'bg-bg text-fg',
  surface: 'bg-surface text-fg',
  accent: 'bg-accent text-accent-contrast',
}

export default function Section({
  id,
  tone = 'base',
  size = 'base',           // 'base' | 'sm'
  container = true,
  className = '',
  children,
}) {
  const pad = size === 'sm' ? 'section-y-sm' : 'section-y'
  const inner = container ? <Container>{children}</Container> : children
  return (
    <section id={id} className={`${pad} ${tones[tone]} ${className}`}>
      {inner}
    </section>
  )
}
