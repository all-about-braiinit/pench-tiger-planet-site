'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const allImages = Array.from({ length: 15 }, (_, i) => ({
  src: `https://www.penchtigerplanet.com/assets/img/gallery/${i + 1}.jpg`,
  alt: `Pench Tiger Planet Gallery ${i + 1}`,
}))

/* ─── reusable reveal component ───────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function StaggerParent({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } } }}
      initial="hidden" animate={isInView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}
const staggerItem = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const init = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapMod.gsap || gsapMod.default
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.animate-up').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 55 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        })
      })
      return () => ctx.revert()
    }
    let cleanup
    init().then((fn) => { cleanup = fn })
    return () => { if (cleanup) cleanup() }
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((p) => (p + 1) % allImages.length)
      if (e.key === 'ArrowLeft') setLightbox((p) => (p - 1 + allImages.length) % allImages.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <main>
      {/* Page Hero */}
      <section
        className="relative h-[55vh] min-h-[350px] flex items-center justify-center overflow-hidden pt-20"
        style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/gallery/5.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-forest-950/75" />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Visual Journey</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-5xl md:text-7xl text-white font-bold">Our Gallery</motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-forest-950">
        <div className="container mx-auto px-6">
          <Reveal>
            <p className="text-cream-400 text-sm text-center mb-12">
              A glimpse into the beauty of Pench Tiger Planet &mdash; Click any image to view in full.
            </p>
          </Reveal>
          <StaggerParent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {allImages.map((img, idx) => (
              <motion.div key={idx} variants={staggerItem} whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative overflow-hidden group aspect-square cursor-pointer"
                onClick={() => setLightbox(idx)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-forest-950/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-[10px] tracking-[0.2em] uppercase">
                    View
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <motion.button whileHover={{ scale: 1.1, borderColor: '#d4af37' }} whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </motion.button>

            {/* Prev */}
            <motion.button whileHover={{ scale: 1.1, borderColor: '#d4af37' }} whileTap={{ scale: 0.95 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p - 1 + allImages.length) % allImages.length) }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox}
                src={allImages[lightbox].src}
                alt={allImages[lightbox].alt}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="max-h-[85vh] max-w-[85vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next */}
            <motion.button whileHover={{ scale: 1.1, borderColor: '#d4af37' }} whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:text-gold-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p + 1) % allImages.length) }}
            >
              <ChevronRight size={24} />
            </motion.button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-cream-400 text-xs tracking-widest">
              {lightbox + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
