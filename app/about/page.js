'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { TreePine, Binoculars, Heart, Award, Star, Users, ArrowRight } from 'lucide-react'

const values = [
  { Icon: TreePine, title: 'Eco Responsible', desc: 'We operate with deep respect for the natural environment, minimizing our footprint and supporting local conservation efforts.' },
  { Icon: Heart, title: 'Warm Hospitality', desc: 'Every guest is welcomed like family. Our intuitive, anticipatory service ensures you feel at home in the wilderness.' },
  { Icon: Binoculars, title: 'Safari Expertise', desc: 'Our team arranges expert-led jungle safaris, bird-watching tours, and nature trails around Pench Tiger Reserve.' },
  { Icon: Award, title: 'Luxury Standards', desc: 'Premium amenities, king-size beds, gourmet meals and round-the-clock service — all set amidst pristine nature.' },
  { Icon: Star, title: '4.8 Star Rated', desc: 'Consistently rated 4.8 stars by our guests for exceptional service, cleanliness, food and overall experience.' },
  { Icon: Users, title: 'Personal Attention', desc: 'With only 10 rooms, we offer personalized attention to every guest ensuring a truly exclusive experience.' },
]

const facts = [
  { num: '758', label: 'sq. km Protected Area' },
  { num: '250+', label: 'Bird Species' },
  { num: '50+', label: 'Tiger Population' },
  { num: '4 km', label: 'From Turiya Gate' },
]

/* ─── reusable reveal component ──────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const from = direction === 'up' ? { opacity: 0, y: 50 } : direction === 'left' ? { opacity: 0, x: -50 } : { opacity: 0, x: 50 }
  return (
    <motion.div ref={ref} initial={from} animate={isInView ? { opacity: 1, y: 0, x: 0 } : from}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function StaggerParent({ children, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
      initial="hidden" animate={isInView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}
const staggerItem = { hidden: { opacity: 0, y: 30, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

export default function AboutPage() {
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

  return (
    <main>
      {/* Page Hero */}
      <section
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1502252430442-aac78f397426?w=1920&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Our Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl lg:text-8xl text-white font-bold text-shadow-strong">About Us</motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left">
              <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-4 block">Who We Are</span>
              <h2 className="font-heading text-5xl md:text-6xl text-cream-100 font-bold mb-6 leading-tight">
                Born from a Love<br />
                <span className="text-gold-400">for Wildlife & People</span>
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mb-8" />
              <p className="text-cream-300 leading-relaxed mb-5 text-sm">
                Pench Tiger Planet was born out of a deep passion for India&apos;s rich natural heritage and the
                desire to share it with the world. Located in Village Kohka Turiya near the Pench Tiger Reserve,
                our homestay blends the raw beauty of the jungle with the comforts of luxury living.
              </p>
              <p className="text-cream-300 leading-relaxed mb-5 text-sm">
                Every corner of our property tells the story of this land — the rustle of leaves, the call of
                wild birds at dawn, and the quiet majesty of the tiger country. We have crafted a space where
                nature lovers and luxury seekers can both find their perfect escape.
              </p>
              <p className="text-cream-300 leading-relaxed mb-8 text-sm">
                With a dedicated team of 15 staff members, each personally trained in anticipatory hospitality,
                we ensure every moment of your stay exceeds expectations. From arranging early-morning safari
                pickups to serving home-cooked meals with local flavours — we are here for you.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link href="/booking" className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl shadow-lg bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-all group">
                  Book Your Stay <motion.span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></motion.span>
                </Link>
              </motion.div>
            </Reveal>
            <Reveal direction="right" delay={0.2}>
              <div className="relative">
                <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                  src="https://www.penchtigerplanet.com/assets/img/about/abt.jpg" alt="Pench Tiger Planet" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-gold-400" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-gold-400" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-32 bg-forest-900">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-3 block">Why Us</span>
            <h2 className="font-heading text-5xl md:text-6xl text-cream-100 font-bold">Why Choose Pench Tiger Planet</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-6" />
          </Reveal>
          <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ Icon, title, desc }) => (
              <motion.div key={title} variants={staggerItem} whileHover={{ y: -8, borderColor: 'rgba(212, 175, 55, 0.4)' }}
                className="p-6 border border-forest-700 rounded-2xl transition-all duration-300 bg-forest-800/50 group">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-forest-700 border border-forest-600 flex items-center justify-center mb-4 group-hover:border-gold-500 transition-colors">
                  <Icon className="text-gold-400" size={22} />
                </motion.div>
                <h3 className="text-cream-100 font-heading font-semibold text-lg mb-3">{title}</h3>
                <p className="text-cream-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* Pench Facts */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=1920&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-forest-950/85" />
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-3 block">The Reserve</span>
            <h2 className="font-heading text-3xl md:text-4xl text-cream-100 font-bold">Pench Tiger Reserve Facts</h2>
          </Reveal>
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {facts.map(({ num, label }) => (
              <motion.div key={label} variants={staggerItem} whileHover={{ scale: 1.08 }} className="cursor-default">
                <p className="font-heading text-4xl md:text-5xl font-bold text-gold-400 mb-2">{num}</p>
                <p className="text-cream-300 text-xs tracking-[0.15em] uppercase">{label}</p>
              </motion.div>
            ))}
          </StaggerParent>
          <Reveal delay={0.4} className="mt-16 max-w-3xl mx-auto">
            <p className="text-cream-300 text-sm leading-relaxed text-center">
              Pench Tiger Reserve, spread across Seoni and Chhindwara districts of Madhya Pradesh, is one of India&apos;s finest national parks.
              Famous as the inspiration for Rudyard Kipling&apos;s &ldquo;The Jungle Book&rdquo;, it is home to tigers, leopards,
              wild dogs, over 250 species of birds and a rich biodiversity that makes every safari a unique adventure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-forest-950">
        <Reveal className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold mb-6">
            Ready to Experience the <span className="text-gold-400">Magic of Pench?</span>
          </h2>
          <p className="text-cream-300 text-sm max-w-xl mx-auto mb-10">
            Book your stay and let us show you why Pench Tiger Planet is the most-loved homestay near Pench Tiger Reserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/booking" className="btn-gold inline-flex items-center gap-2 justify-center px-10 py-4 bg-gold-500 text-forest-950 font-bold tracking-[0.15em] uppercase text-xs hover:bg-gold-400 transition-all group">
                Book Now <motion.span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 border border-forest-700 text-cream-200 tracking-[0.15em] uppercase text-xs hover:border-gold-400 hover:text-gold-400 transition-all">
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
