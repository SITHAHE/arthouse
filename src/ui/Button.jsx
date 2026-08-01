// Кнопка/ссылка. Один компонент для <a> и <button> (as).
// ФОРМА кнопки — решение стиля: радиус берётся из --radius-btn (index.css,
// поле shape: карточки стиля). rounded-full и glow здесь НЕ живут:
// капсула — только если стиль капсульный (тогда --radius-btn: 999px),
// свечение — красный маркер design-ru.md.
const variants = {
  primary: 'bg-accent text-accent-contrast hover:bg-accent-hi',
  outline: 'border border-line text-fg hover:border-fg/40 hover:bg-surface',
  ghost:   'text-fg hover:bg-surface',
  inverse: 'bg-fg text-bg hover:opacity-90', // тёмная кнопка на светлом и наоборот
}
const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-semibold
        cursor-pointer transition-colors duration-150 focus-visible:outline-2 active:scale-[0.98]
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
