// Контейнер: единая максимальная ширина и боковые отступы во всех секциях.
export default function Container({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`container-x ${className}`}>{children}</Tag>
}
