'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Template({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        type: 'tween',
        ease: [0.22, 1, 0.36, 1],
        duration: 0.45,
      }}
    >
      {children}
    </motion.div>
  )
}
