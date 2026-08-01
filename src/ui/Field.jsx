// Поле формы с доступной подписью (label связан с input через id).
// Один компонент для input и textarea (multiline).
export default function Field({
  id,
  label,
  type = 'text',
  multiline = false,
  hint,
  className = '',
  ...props
}) {
  const base =
    'w-full rounded-[var(--radius)] border border-line bg-bg px-4 py-3 text-fg ' +
    'placeholder:text-muted/70 focus-visible:border-accent transition-colors'

  return (
    <label htmlFor={id} className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-muted">{label}</span>
      {multiline ? (
        <textarea id={id} rows={3} className={base} {...props} />
      ) : (
        <input id={id} type={type} className={base} {...props} />
      )}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  )
}
