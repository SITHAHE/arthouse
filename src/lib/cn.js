// Мини-хелпер для склейки классов (аналог clsx/cn из shadcn).
// Нужен при адаптации вендор-компонентов из _factory/components,
// которые импортируют cn из "@/lib/utils" — меняй импорт на этот файл.
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .map((a) => (typeof a === 'object' ? Object.keys(a).filter((k) => a[k]).join(' ') : a))
    .join(' ')
}
export default cn
