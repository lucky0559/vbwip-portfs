import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useParallax'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX: progress }}
    />
  )
}
