'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const allImages = Array.from({ length: 15 }, (_, i) => ({
  src: `https://www.penchtigerplanet.com/assets/img/gallery/${i + 1}.jpg`,
  alt: `Pench Tiger Planet Gallery ${i + 1}`,
}))

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
          <p className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Visual Journey</p>
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold">Our Gallery</h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-forest-950">
        <div className="container mx-auto px-6">
          <p className="text-cream-400 text-sm text-center mb-12 animate-up">
            A glimpse into the beauty of Pench Tiger Planet &mdash; Click any image to view in full.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                className="animate-up relative overflow-hidden group aspect-square cursor-pointer"
                onClick={() => setLightbox(idx)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/50 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
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
            <button
              className="absolute top-4 right-4 w-10 h-10 border border-white/30 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 transition-colors z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p - 1 + allImages.length) % allImages.length) }}
            >
              <ChevronLeft size={24} />
            </button>

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
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:border-gold-400 hover:text-gold-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p + 1) % allImages.length) }}
            >
              <ChevronRight size={24} />
            </button>

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
