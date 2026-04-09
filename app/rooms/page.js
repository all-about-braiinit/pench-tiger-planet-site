'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { BedDouble, Wifi, Tv, UtensilsCrossed, ParkingCircle, Stethoscope, ArrowRight, Check } from 'lucide-react'

const rooms = [
  {
    slug: 'garden-view',
    name: 'Garden View Room',
    price: '₹3,200',
    tagline: 'Classic Luxury Overlooking the Garden',
    img: 'https://www.penchtigerplanet.com/assets/img/room/1.jpg',
    desc: 'The Garden View Rooms are a classic example of modern luxury and class. With fully furnished spacious rooms, indulge in a reminiscent comfortable stay while enjoying the luxury and service provided by our hospitable staff.',
    features: ['Garden View', 'King Size Bed', 'AC & Heating', 'En-suite Bathroom', 'Smart TV', 'Free WiFi', 'Room Service', 'Complimentary Breakfast'],
  },
  {
    slug: 'lake-view',
    name: 'Lake View Room',
    price: '₹3,800',
    tagline: 'Premium Suite with Breathtaking Lake Vistas',
    img: 'https://www.penchtigerplanet.com/assets/img/room/2.jpg',
    desc: 'Designed specially to pamper its guests, the lake view rooms showcase a perfect blend of luxury in its accommodation with utmost security. The rooms bestow an elegant design combined with refined elegance and luxuriously appointed sleek accommodation.',
    features: ['Panoramic Lake View', 'King Size Bed', 'Premium Decor', 'En-suite Bathroom', 'Smart TV', 'Free WiFi', 'Priority Room Service', 'Complimentary Breakfast'],
  },
]

const amenities = [
  { Icon: BedDouble, title: 'King Size Beds' },
  { Icon: Wifi, title: 'Free WiFi' },
  { Icon: Tv, title: 'Smart TV' },
  { Icon: UtensilsCrossed, title: 'Room Service' },
  { Icon: Stethoscope, title: 'Doctor on Call' },
  { Icon: ParkingCircle, title: 'Free Parking' },
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
    <motion.div ref={ref} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
      initial="hidden" animate={isInView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}
const staggerItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

export default function RoomsPage() {
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
        style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/room/1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative z-10 text-center px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Stay with Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-6xl md:text-7xl lg:text-8xl text-white font-bold text-shadow-strong">Accommodation</motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-forest-900 border-b border-forest-700">
        <Reveal className="container mx-auto px-6 text-center max-w-2xl">
          <p className="text-cream-300 leading-relaxed text-sm">
            Pench Tiger Planet offers two exquisitely designed room categories, each crafted to deliver
            a unique yet equally luxurious experience. Whether you seek garden serenity or lake-side vistas,
            every room promises comfort, class, and impeccable service.
          </p>
        </Reveal>
      </section>

      {/* Rooms */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {rooms.map((room, i) => (
              <motion.div 
                key={room.slug} 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 !== 0 ? 'lg:[&>div:first-child]:order-2' : ''
                }`}
              >
                {/* Image Side */}
                <div className="relative">
                  <motion.div 
                    className="relative overflow-hidden rounded-3xl group"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Image without zoom */}
                    <img 
                      src={room.img} 
                      alt={room.name} 
                      className="w-full aspect-[4/3] object-cover"
                    />
                    
                    {/* Animated overlay */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent flex items-end justify-start p-8"
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                      >
                        <p className="text-cream-100 text-sm font-semibold mb-1">Explore {room.name}</p>
                        <div className="flex items-center gap-2 text-gold-400">
                          <span className="text-xs tracking-wider uppercase">View Details</span>
                          <ArrowRight size={14} />
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Price Badge */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, x: 20 }}
                      whileInView={{ opacity: 1, scale: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.08, rotate: -3 }}
                      className="absolute top-6 right-6 bg-gold-500 text-forest-950 px-6 py-3 rounded-2xl shadow-2xl cursor-default"
                    >
                      <p className="font-heading text-2xl font-bold leading-none">{room.price}</p>
                      <p className="text-[10px] tracking-widest uppercase mt-1 font-bold">Per Night</p>
                    </motion.div>
                    
                    {/* Decorative corner */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold-400 rounded-tl-2xl"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold-400 rounded-br-2xl"
                    />
                  </motion.div>
                </div>
                
                {/* Content Side */}
                <div>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gold-400 text-xs tracking-[0.35em] uppercase mb-4 block font-semibold"
                  >
                    {room.tagline}
                  </motion.span>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-heading text-5xl md:text-6xl text-cream-100 font-bold mb-5 leading-tight"
                  >
                    {room.name}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-16 h-1 bg-gold-400 rounded-full mb-7"
                  />
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-cream-300 text-base leading-relaxed mb-8"
                  >
                    {room.desc}
                  </motion.p>
                  
                  {/* Features with staggered animation */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.7
                        }
                      }
                    }}
                    className="grid grid-cols-2 gap-3 mb-10"
                  >
                    {room.features.map((f) => (
                      <motion.div 
                        key={f}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                        whileHover={{ x: 4, scale: 1.02 }}
                        className="flex items-center gap-2.5 text-cream-300 text-sm bg-forest-900/50 px-3 py-2 rounded-xl border border-forest-800 hover:border-gold-500/30 transition-all"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Check className="text-gold-400 shrink-0" size={16} />
                        </motion.div>
                        <span className="font-medium">{f}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <motion.div whileHover={{ x: 8 }} whileTap={{ scale: 0.98 }}>
                      <Link 
                        href={`/rooms/${room.slug}`} 
                        className="inline-flex items-center gap-3 text-gold-400 text-sm tracking-[0.2em] uppercase font-bold group"
                      >
                        View Details 
                        <motion.span 
                          className="w-8 h-px bg-gold-400 group-hover:w-12 transition-all"
                          animate={{ scaleX: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        />
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }} 
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href="/booking" 
                        className="btn-gold px-8 py-3.5 rounded-xl shadow-xl bg-gold-500 text-forest-950 text-sm font-bold tracking-[0.15em] uppercase hover:bg-gold-400 transition-all inline-block text-center"
                      >
                        Book Now
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Amenities */}
      <section className="py-24 bg-forest-900">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-3 block">All Rooms Include</span>
            <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold">Premium Amenities</h2>
            <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-5" />
          </Reveal>
          <StaggerParent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-3xl mx-auto">
            {amenities.map(({ Icon, title }) => (
              <motion.div key={title} variants={staggerItem} whileHover={{ y: -8, scale: 1.05 }} className="text-center group">
                <motion.div whileHover={{ rotate: 10 }} transition={{ duration: 0.3 }}
                  className="w-14 h-14 mx-auto bg-forest-800 border border-forest-700 rounded-xl flex items-center justify-center mb-3 group-hover:border-gold-500 transition-colors">
                  <Icon className="text-gold-400" size={22} />
                </motion.div>
                <p className="text-cream-300 text-xs">{title}</p>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-950 border-t border-forest-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Reveal direction="left">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-cream-100 font-bold mb-2">Ready to book your room?</h3>
              <p className="text-cream-400 text-sm">Contact us for special group rates and seasonal packages.</p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/booking" className="btn-gold inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-all whitespace-nowrap group">
                Book Your Room <motion.span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={14} /></motion.span>
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
