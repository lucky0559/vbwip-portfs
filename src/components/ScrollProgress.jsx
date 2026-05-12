import { useScrollProgress } from '../hooks/useParallax'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-[#B09070] z-[100] origin-left"
      style={{ scaleX: progress }}
    />
  )
}
