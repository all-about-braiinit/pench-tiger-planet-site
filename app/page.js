'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import { Wifi, Tv, BedDouble, Stethoscope, Shirt, UtensilsCrossed, ChefHat, ParkingCircle, Star, ArrowRight, ArrowUpRight } from 'lucide-react'

/* ─── data ─────────────────────────────────────────────── */
const heroSlides = [
  { img: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=1920&q=80&auto=format&fit=crop', label: 'Bengal Tiger Reserve' },
  { img: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80&auto=format&fit=crop', label: 'Misty Forest Trails' },
  { img: 'https://images.unsplash.com/photo-1502252430442-aac78f397426?w=1920&q=80&auto=format&fit=crop', label: 'Serene Wilderness' },
]

const services = [
  { 
    Icon: Wifi, 
    title: 'Free Wi-Fi', 
    desc: 'Stay connected with high-speed wireless internet throughout the property',
    img: 'https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: Tv, 
    title: 'Television', 
    desc: 'Smart TVs in every room with premium entertainment channels',
    img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: BedDouble, 
    title: 'King Size Beds', 
    desc: 'Luxurious king-size beds with premium linens for ultimate comfort',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: Stethoscope, 
    title: 'Doctor on Call', 
    desc: '24/7 medical assistance available for your peace of mind',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: Shirt, 
    title: 'Laundry Facility', 
    desc: 'Professional laundry and dry-cleaning services at your convenience',
    img: 'https://images.unsplash.com/photo-1545968736-e11a26aeff5c?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: UtensilsCrossed, 
    title: 'Room Service', 
    desc: 'In-room dining with delicious meals served to your comfort',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: ChefHat, 
    title: 'Restaurant', 
    desc: 'Multi-cuisine restaurant serving authentic local and international dishes',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&auto=format&fit=crop'
  },
  { 
    Icon: ParkingCircle, 
    title: 'Free Parking', 
    desc: 'Secure parking space available for all our guests',
    img: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80&auto=format&fit=crop'
  },
]

const stats = [
  { end: 4.8, suffix: '★', label: 'Guest Rating', float: true },
  { end: 10, suffix: '+', label: 'Luxury Rooms', float: false },
  { end: 15, suffix: '', label: 'Staff Members', float: false },
  { end: 100, suffix: '+', label: 'Happy Clients', float: false },
]

const rooms = [
  { slug: 'garden-view', name: 'Garden View Room', price: '₹3,200', img: 'https://www.penchtigerplanet.com/assets/img/room/1.jpg', desc: 'Classic modern luxury with fully furnished spacious rooms overlooking the serene garden.' },
  { slug: 'lake-view', name: 'Lake View Room', price: '₹3,800', img: 'https://www.penchtigerplanet.com/assets/img/room/2.jpg', desc: 'Breathtaking lake views with refined elegance — our most coveted retreat for discerning guests.' },
]

const galleryImages = [1, 2, 3, 4, 5, 6].map((n) => `https://www.penchtigerplanet.com/assets/img/gallery/${n}.jpg`)

const testimonials = [
  { text: 'We had a great stay at Pench Tiger Planet. Great location, really pleasant and clean rooms. The owner and manager are very helpful. Food was absolutely delicious.', name: 'CS Pratiksha Kumbhare', tag: 'Family Stay' },
  { text: 'My weekend was so refreshing! I enjoyed a lot with my family. Staff was very helpful and food was amazing — it was like another home away from home.', name: 'Nehali Datar', tag: 'Weekend Getaway' },
  { text: 'Very nice place to stay. The owner is very kind. Staff provided breakfast at 5am for our early safari. Definitely going to visit again!', name: 'Aviral Vats', tag: 'Safari Trip' },
  { text: 'Five stars to the service and food. Room was clean and spacious. Excellent service and homely, safe environment — perfect for families.', name: 'Pratiksha Dhote', tag: 'Family Trip' },
  { text: 'Amazing experience! Incredible food, top-notch service and calm surroundings. My new spot for holiday getaway is now fixed!', name: 'Anurag Shukla', tag: 'Leisure Stay' },
]

/* ─── reusable reveal ───────────────────────────────────── */
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
    <motion.div ref={ref} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
      initial="hidden" animate={isInView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}
const staggerItem = { hidden: { opacity: 0, y: 30, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

/* ─── counter hook ──────────────────────────────────────── */
function Counter({ end, suffix, isFloat }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const dur = 2200
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(eased * end)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, end])
  return <span ref={ref}>{isFloat ? val.toFixed(1) : Math.round(val)}{suffix}</span>
}

/* ─── main component ────────────────────────────────────── */
export default function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeAmenity, setActiveAmenity] = useState(0)
  const [activeTesti, setActiveTesti] = useState(0)

  // Parallax
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '32%'])
  const contentY = useTransform(scrollY, [0, 700], ['0%', '18%'])
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const t = setInterval(() => setActiveTesti((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])
  
  // Auto-rotate amenities slider
  useEffect(() => {
    const t = setInterval(() => setActiveAmenity((prev) => (prev + 1) % services.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: bgY }} className="absolute top-[-15%] left-0 right-0 bottom-[-15%]">
          {heroSlides.map((slide, idx) => (
            <motion.div key={idx} className="absolute inset-0"
              animate={{ opacity: idx === activeSlide ? 1 : 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}>
              <img src={slide.img} alt={slide.label} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>

        {/* Overlays - Enhanced for better text visibility */}
        <div className="absolute inset-0 z-10 gradient-overlay" />
        <div className="absolute inset-0 z-10 bg-black/20" />

        {/* Parallax content */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          
          {/* Slide label */}
          <AnimatePresence mode="wait">
            <motion.p key={activeSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }} className="text-gold-400/70 text-[10px] tracking-[0.5em] uppercase mb-3 font-medium">
              {heroSlides[activeSlide].label}
            </motion.p>
          </AnimatePresence>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-400 text-sm tracking-[0.45em] uppercase font-medium mb-5">
            Welcome To
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1 initial={{ y: '110%' }} animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[clamp(60px,10vw,130px)] text-white font-bold leading-[0.9] text-shadow-strong">
              Pench Tiger<br />
              <span className="text-gold-400 italic text-shadow-gold">Planet</span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream-100 text-base md:text-xl max-w-2xl mb-10 leading-relaxed font-medium text-shadow">
            Experience the raw beauty of India&apos;s finest tiger reserve from our luxury eco-homestay
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }} className="flex flex-col sm:flex-row gap-4">
            <motion.a href="/booking" whileHover={{ y: -3, scale: 1.02, boxShadow: '0 12px 40px rgba(201,162,19,0.4)' }} whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group inline-flex items-center gap-2.5 px-10 py-5 bg-gold-500 text-forest-950 font-bold text-sm tracking-[0.15em] uppercase rounded-xl shadow-xl">
              Book Your Stay
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
            <motion.a href="/rooms" whileHover={{ y: -3, scale: 1.02, borderColor: 'rgba(232,197,30,1)', backgroundColor: 'rgba(232,197,30,0.1)' }} whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2.5 px-10 py-5 border-2 border-cream-100/50 text-cream-100 text-sm font-semibold tracking-[0.15em] uppercase rounded-xl backdrop-blur-sm transition-colors duration-300">
              Explore Rooms
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <motion.button key={i} onClick={() => setActiveSlide(i)}
              animate={{ width: i === activeSlide ? 40 : 18, backgroundColor: i === activeSlide ? '#e8c51e' : 'rgba(255,255,255,0.3)' }}
              transition={{ duration: 0.4 }} className="h-0.5 rounded-full cursor-pointer" />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-9 right-8 z-20 hidden md:flex flex-col items-center gap-1.5">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-cream-200/50 to-transparent" />
          <p className="text-cream-400/50 text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</p>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Side with Animations */}
            <Reveal direction="left" className="relative order-2 lg:order-1">
              <motion.div 
                className="relative overflow-hidden rounded-3xl group"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img 
                  src="https://www.penchtigerplanet.com/assets/img/about/abt.jpg" 
                  alt="About Pench Tiger Planet" 
                  className="w-full aspect-[4/3] object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent group-hover:from-forest-950/60 transition-all duration-500" />
              </motion.div>
              
              {/* Animated Rating Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08, rotate: 3 }}
                className="absolute -bottom-6 -right-6 bg-gold-500 text-forest-950 p-6 hidden md:block cursor-default rounded-2xl shadow-2xl"
              >
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="font-heading text-4xl font-bold leading-none mb-1"
                >
                  4.8
                </motion.p>
                <div className="flex gap-0.5 my-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + (i * 0.05), duration: 0.3, type: 'spring' }}
                    >
                      <Star size={12} className="fill-forest-950" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase">Guest Rating</p>
              </motion.div>
              
              {/* Decorative Corner Elements - Animated */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold-400 rounded-tl-2xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold-400 rounded-br-2xl hidden md:block"
              />
            </Reveal>

            {/* Content Side with Animations */}
            <Reveal direction="right" className="order-1 lg:order-2">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-gold-400 text-xs tracking-[0.4em] uppercase font-semibold mb-4"
              >
                About Us
              </motion.p>
              
              {/* Large Hero-Style Title */}
              <div className="overflow-hidden mb-4">
                <motion.h2 
                  initial={{ y: '110%' }} 
                  whileInView={{ y: '0%' }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading text-5xl md:text-6xl lg:text-7xl text-cream-100 font-bold leading-tight"
                >
                  A Sanctuary Where<br />
                  <em className="text-gold-400 not-italic">Wilderness Meets Luxury</em>
                </motion.h2>
              </div>
              
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-16 h-1 bg-gold-400 rounded-full mt-5 mb-8"
              />
              
              {/* Animated Paragraphs */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-cream-300 leading-relaxed mb-5 text-base"
              >
                Bestowing excellent hospitality to its every category of guests, Pench Tiger Planet reflects the culture and ethos of its location. With the perfect fusion of contemporary decor in the sumptuous interiors, we have set the bar of services much higher than the expectations of our guests.
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-cream-300 leading-relaxed mb-9 text-base"
              >
                The concept of intuitive anticipatory service makes the guest experience unalloyed. We welcome guests from all around the world, ensuring each stay is truly memorable.
              </motion.p>
              
              {/* Animated Feature Cards */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {[
                  ['Authentic Experience', 'Immersive wildlife encounters'], 
                  ['Luxury Comfort', 'Premium amenities & service']
                ].map(([t, s], idx) => (
                  <motion.div 
                    key={t}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (idx * 0.1), duration: 0.6 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-start gap-3 bg-forest-900/50 p-4 rounded-2xl border border-forest-800 hover:border-gold-500/30 transition-all duration-300"
                  >
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="w-6 h-6 bg-gold-500 flex items-center justify-center shrink-0 mt-0.5 rounded-lg"
                    >
                      <svg className="w-3.5 h-3.5 text-forest-950" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="text-cream-100 font-semibold text-base mb-1">{t}</p>
                      <p className="text-cream-500 text-sm">{s}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated CTA */}
              <motion.a 
                href="/about" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ x: 8, scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 text-gold-400 font-bold text-sm tracking-[0.2em] uppercase group"
              >
                Discover Our Story
                <motion.span 
                  className="w-10 h-px bg-gold-400 group-hover:w-16 transition-all duration-300"
                  animate={{ scaleX: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES/AMENITIES SLIDER ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium mb-4">Amenities</p>
            <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-6xl md:text-7xl lg:text-8xl text-cream-100 font-bold">During Your Stay</motion.h2></div>
            <div className="w-16 h-px bg-gold-400 mx-auto mt-6" />
          </Reveal>
          
          {/* Amenities Slider */}
          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAmenity}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Image */}
                <motion.div 
                  className="relative overflow-hidden rounded-3xl h-[400px] lg:h-[500px] group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={services[activeAmenity].img} 
                    alt={services[activeAmenity].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
                  <motion.div 
                    className="absolute top-6 left-6 w-20 h-20 bg-forest-900/80 backdrop-blur-sm border-2 border-gold-400 rounded-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {(() => {
                      const IconComponent = services[activeAmenity].Icon
                      return <IconComponent className="text-gold-400" size={36} />
                    })()}
                  </motion.div>
                </motion.div>
                
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <p className="text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">Feature {activeAmenity + 1} of {services.length}</p>
                    <h3 className="font-heading text-5xl md:text-6xl text-cream-100 font-bold mb-4">
                      {services[activeAmenity].title}
                    </h3>
                    <div className="w-12 h-1 bg-gold-400 rounded-full mb-6" />
                    <p className="text-cream-300 text-lg leading-relaxed">
                      {services[activeAmenity].desc}
                    </p>
                  </div>
                  
                  {/* Dots Indicator */}
                  <div className="flex gap-2 pt-4">
                    {services.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAmenity(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeAmenity 
                            ? 'w-12 bg-gold-400' 
                            : 'w-6 bg-forest-700 hover:bg-gold-400/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden"
        style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/counter/counter.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-forest-950/85" />
        <div className="relative container mx-auto px-6">
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ end, suffix, label, float }, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <p className="font-heading text-5xl md:text-6xl font-light text-gold-400 mb-2">
                  <Counter end={end} suffix={suffix} isFloat={float} />
                </p>
                <p className="text-cream-300 text-xs tracking-[0.22em] uppercase font-medium">{label}</p>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── ROOMS ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium mb-4">Accommodation</p>
            <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-6xl md:text-7xl lg:text-8xl text-cream-100 font-bold">Our Rooms</motion.h2></div>
            <div className="w-16 h-px bg-gold-400 mx-auto mt-6" />
          </Reveal>
          <StaggerParent className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {rooms.map((room) => (
              <motion.div key={room.slug} variants={staggerItem}
                className="group border-2 border-forest-700 hover:border-gold-500/50 transition-all duration-500 overflow-hidden bg-forest-900 rounded-3xl shadow-2xl hover:shadow-gold-500/10"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <div className="relative overflow-hidden h-80">
                  <motion.img src={room.img} alt={room.name} className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }} transition={{ duration: 0.7, ease: 'easeOut' }} />
                  <div className="absolute top-6 right-6 bg-gold-500 text-forest-950 px-6 py-3 rounded-2xl shadow-lg">
                    <p className="font-heading text-2xl font-bold leading-none">{room.price}</p>
                    <p className="text-[10px] tracking-widest uppercase">Per Night</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-4xl text-cream-100 font-bold mb-4">{room.name}</h3>
                  <p className="text-cream-300 text-base leading-relaxed mb-6">{room.desc}</p>
                  <motion.a href={`/rooms/${room.slug}`} 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500/10 border-2 border-gold-500 text-gold-400 text-sm tracking-[0.15em] uppercase font-bold rounded-xl group/link hover:bg-gold-500 hover:text-forest-950 transition-all"
                    whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                    View Details
                    <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ───────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14">
            <Reveal>
              <p className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium mb-3">Gallery</p>
              <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85 }}
                className="font-heading text-6xl md:text-7xl lg:text-8xl text-cream-100 font-bold">Our Gallery</motion.h2></div>
              <div className="w-12 h-px bg-gold-400 mt-5" />
            </Reveal>
            <Reveal delay={0.15}>
              <motion.a href="/gallery" className="mt-6 sm:mt-0 inline-flex items-center gap-2.5 text-gold-400 text-xs tracking-[0.2em] uppercase font-medium group"
                whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                View All <span className="w-6 h-px bg-gold-400 group-hover:w-10 transition-all duration-300" />
              </motion.a>
            </Reveal>
          </div>
          <StaggerParent className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, idx) => (
              <motion.a key={idx} href="/gallery" variants={staggerItem}
                className="relative overflow-hidden group aspect-square block rounded-2xl shadow-lg"
                whileHover={{ y: -8, scale: 1.03, rotateY: 2, rotateX: 2 }} 
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}>
                <motion.img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <motion.span 
                    className="text-white font-heading text-xl tracking-wider">
                    Gallery
                  </motion.span>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className="w-8 h-8 rounded-full bg-gold-500/90 flex items-center justify-center">
                    <ArrowRight size={16} className="text-forest-950" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: 'backOut' }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold-500/20 backdrop-blur-sm border border-gold-400/50 flex items-center justify-center">
                  <span className="text-gold-400 text-xs font-bold">{idx + 1}</span>
                </motion.div>
              </motion.a>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/testi.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.4em] uppercase font-medium mb-4">Testimonials</p>
            <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85 }}
              className="font-heading text-6xl md:text-7xl lg:text-8xl text-cream-100 font-bold">What Our Guests Say</motion.h2></div>
            <div className="w-16 h-px bg-gold-400 mx-auto mt-6" />
          </Reveal>
          <Reveal className="max-w-2xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div key={activeTesti} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -24, scale: 0.98 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="text-gold-400/10 font-heading text-[120px] leading-none select-none -mb-8">&ldquo;</div>
                <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="text-gold-400 fill-gold-400" size={14} />)}</div>
                <p className="text-cream-200 text-base md:text-lg leading-relaxed mb-8 italic font-light">&ldquo;{testimonials[activeTesti].text}&rdquo;</p>
                <p className="font-heading text-lg text-gold-400 font-medium">{testimonials[activeTesti].name}</p>
                <p className="text-cream-500 text-[10px] tracking-[0.3em] uppercase mt-1">{testimonials[activeTesti].tag} &bull; Verified Guest</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <motion.button key={i} onClick={() => setActiveTesti(i)}
                  animate={{ width: i === activeTesti ? 24 : 8, backgroundColor: i === activeTesti ? '#e8c51e' : '#225032' }}
                  transition={{ duration: 0.3 }} className="h-2 rounded-full cursor-pointer" />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1649689727213-9842bb6fe095?w=1920&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="relative container mx-auto px-6 text-center">
          <Reveal>
            <p className="text-gold-400 text-xs tracking-[0.5em] uppercase font-medium mb-5">Ready for an Adventure?</p>
            <div className="overflow-hidden mb-6">
              <motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-6xl md:text-7xl lg:text-8xl text-white font-bold leading-tight text-shadow-strong">
                Book Your Stay at<br />
                <em className="text-gold-400 not-italic text-shadow-gold">Pench Tiger Planet</em>
              </motion.h2>
            </div>
            <p className="text-cream-100 text-lg max-w-2xl mx-auto mb-12 text-shadow">
              Experience the magic of the jungle, the warmth of our hospitality, and memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.a href="/booking" whileHover={{ y: -4, scale: 1.05, boxShadow: '0 16px 48px rgba(201,162,19,0.5)' }} whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-gold-500 text-forest-950 font-bold tracking-[0.15em] uppercase text-sm rounded-xl shadow-xl hover:bg-gold-400 transition-colors">
                Book Now <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
              </motion.a>
              <motion.a href="/contact" whileHover={{ y: -4, scale: 1.05, borderColor: 'rgba(232,197,30,1)', backgroundColor: 'rgba(232,197,30,0.15)' }} whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-flex items-center justify-center gap-2 px-12 py-5 border-2 border-cream-100/50 text-cream-100 tracking-[0.15em] uppercase text-sm rounded-xl backdrop-blur-sm transition-all">
                Contact Us
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
