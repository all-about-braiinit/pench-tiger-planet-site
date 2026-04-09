'use client'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.28, ease: 'easeIn' },
  },
}

export default function Template({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
