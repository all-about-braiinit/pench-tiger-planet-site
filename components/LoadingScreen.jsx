'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TITLE_CHARS = 'PENCH TIGER PLANET'.split('')

export default function LoadingScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!sessionStorage.getItem('ptp_session_v2')) {
      setShow(true)
      const t = setTimeout(() => {
        setShow(false)
        sessionStorage.setItem('ptp_session_v2', '1')
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-forest-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Decorative lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/3 left-0 right-0 h-px bg-gold-500/10 origin-left"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-2/3 left-0 right-0 h-px bg-gold-500/10 origin-right"
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <img
              src="https://www.penchtigerplanet.com/assets/img/logo.png"
              alt="Pench Tiger Planet"
              className="h-16 w-auto"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </motion.div>

          {/* Title - letter by letter */}
          <div className="flex flex-wrap justify-center gap-0 mb-4 overflow-hidden px-4">
            {TITLE_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.055,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-heading text-2xl md:text-3xl text-cream-100 font-light"
                style={{ letterSpacing: '0.22em' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-cream-500 text-[10px] tracking-[0.5em] uppercase mb-12"
          >
            Luxury Eco-Homestay &middot; Pench Tiger Reserve
          </motion.p>

          {/* Progress bar */}
          <div className="relative w-48 h-px bg-forest-800 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, delay: 0.6, ease: 'easeInOut' }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-4 text-cream-600 text-[9px] tracking-[0.35em] uppercase"
          >
            Loading Experience&hellip;
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
