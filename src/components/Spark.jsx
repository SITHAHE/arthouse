// Фирменная искра ✦ — svg-маркер, а не эмодзи. Разделитель в бегущей строке
// и маркер в списках. Снят с блёсток на обложке сообщества.
export default function Spark({ size = 12, className = '' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      className={className} aria-hidden="true"
    >
      <path
        d="M12 0c.7 6.6 4.7 10.6 12 12-7.3 1.4-11.3 5.4-12 12-.7-6.6-4.7-10.6-12-12C7.3 10.6 11.3 6.6 12 0z"
        fill="currentColor"
      />
    </svg>
  )
}
