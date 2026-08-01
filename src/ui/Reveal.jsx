import { motion } from 'framer-motion'
import { revealUp, inView } from '../lib/motion.js'

// Появление при скролле. Обёртка вокруг любого блока.
// delay — для лёгкого каскада вручную; y — амплитуда сдвига.
export default function Reveal({ children, delay = 0, y = 22, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

export { revealUp }
