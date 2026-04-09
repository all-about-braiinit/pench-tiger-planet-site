'use client'
import { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let rafCallback
    let cleanup

    const init = async () => {
      try {
        const { default: Lenis } = await import('lenis')
        const gsapModule = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        const gsap = gsapModule.gsap || gsapModule.default

        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        })

        lenis.on('scroll', ScrollTrigger.update)

        rafCallback = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(rafCallback)
        gsap.ticker.lagSmoothing(0)

        cleanup = () => {
          if (rafCallback) gsap.ticker.remove(rafCallback)
          lenis.destroy()
        }
      } catch (err) {
        console.warn('Lenis smooth scroll init error:', err)
      }
    }

    init()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return <>{children}</>
}
