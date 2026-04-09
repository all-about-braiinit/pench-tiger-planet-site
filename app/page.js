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
  { Icon: Wifi, title: 'Free Wi-Fi' }, { Icon: Tv, title: 'Television' },
  { Icon: BedDouble, title: 'King Size Bed' }, { Icon: Stethoscope, title: 'Doctor on Call' },
  { Icon: Shirt, title: 'Laundry Facility' }, { Icon: UtensilsCrossed, title: 'Room Service' },
  { Icon: ChefHat, title: 'Restaurant' }, { Icon: ParkingCircle, title: 'Parking' },
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

        {/* Overlays */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(10,26,17,0.52) 0%, rgba(10,26,17,0.08) 45%, rgba(10,26,17,0.92) 100%)' }} />

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
              className="font-heading text-[clamp(52px,9vw,110px)] text-white font-light leading-[0.9]">
              Pench Tiger<br />
              <span className="text-gold-400 italic">Planet</span>
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-cream-200/85 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-light">
            Experience the raw beauty of India&apos;s finest tiger reserve from our luxury eco-homestay
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }} className="flex flex-col sm:flex-row gap-4">
            <motion.a href="/booking" whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(201,162,19,0.35)' }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group inline-flex items-center gap-2.5 px-9 py-4 bg-gold-500 text-forest-950 font-semibold text-xs tracking-[0.18em] uppercase rounded-sm">
              Book Your Stay
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
            <motion.a href="/rooms" whileHover={{ y: -3, borderColor: 'rgba(232,197,30,0.7)', color: '#e8c51e' }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2.5 px-9 py-4 border border-cream-200/40 text-cream-100 text-xs tracking-[0.18em] uppercase rounded-sm transition-colors duration-300">
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

      {/* ── QUICK BOOKING BAR ─────────────────────────────────── */}
      <Reveal>
        <section className="bg-forest-900 border-b border-forest-700 py-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end gap-4 justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {[['Check In', 'date'], ['Check Out', 'date']].map(([label, type]) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="text-gold-400 text-[9px] tracking-[0.25em] uppercase font-medium">{label}</label>
                    <input type={type} className="bg-forest-800 text-cream-100 border border-forest-700 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 min-w-[160px] transition-colors" />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-gold-400 text-[9px] tracking-[0.25em] uppercase font-medium">Guests</label>
                  <select className="bg-forest-800 text-cream-100 border border-forest-700 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors">
                    {['1 Adult', '2 Adults', '3 Adults', '4+ Adults'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <motion.a href="/booking" whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(201,162,19,0.3)' }} whileTap={{ scale: 0.97 }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold-500 text-forest-950 font-semibold text-xs tracking-[0.18em] uppercase rounded-sm text-center hover:bg-gold-400 transition-colors">
                Check Availability
              </motion.a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="left" className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden">
                <img src="https://www.penchtigerplanet.com/assets/img/about/abt.jpg" alt="About Pench Tiger Planet" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}
                className="absolute -bottom-5 -right-5 bg-gold-500 text-forest-950 p-5 hidden md:block cursor-default">
                <p className="font-heading text-3xl font-bold leading-none">4.8</p>
                <div className="flex gap-0.5 my-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-forest-950" />)}</div>
                <p className="text-[10px] font-semibold tracking-widest uppercase">Rating</p>
              </motion.div>
              <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-gold-400 hidden md:block" />
            </Reveal>

            <Reveal direction="right" className="order-1 lg:order-2">
              <p className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-medium mb-3">About Us</p>
              <div className="overflow-hidden mb-2">
                <motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading text-4xl md:text-5xl text-cream-100 font-light leading-tight">
                  A Sanctuary Where<br />
                  <em className="text-gold-400 not-italic">Wilderness Meets Luxury</em>
                </motion.h2>
              </div>
              <div className="w-10 h-px bg-gold-400 mt-4 mb-7" />
              <p className="text-cream-300 leading-relaxed mb-5 text-sm">
                Bestowing excellent hospitality to its every category of guests, Pench Tiger Planet reflects the culture and ethos of its location. With the perfect fusion of contemporary decor in the sumptuous interiors, we have set the bar of services much higher than the expectations of our guests.
              </p>
              <p className="text-cream-300 leading-relaxed mb-8 text-sm">
                The concept of intuitive anticipatory service makes the guest experience unalloyed. We welcome guests from all around the world, ensuring each stay is truly memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mb-9">
                {[['Authentic Experience', 'Immersive wildlife encounters'], ['Luxury Comfort', 'Premium amenities & service']].map(([t, s]) => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold-500 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-forest-950" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                    </div>
                    <div><p className="text-cream-100 font-medium text-sm">{t}</p><p className="text-cream-500 text-xs mt-0.5">{s}</p></div>
                  </div>
                ))}
              </div>
              <motion.a href="/about" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex items-center gap-3 text-gold-400 font-medium text-xs tracking-[0.2em] uppercase group">
                Discover Our Story
                <motion.span className="w-8 h-px bg-gold-400 group-hover:w-12 transition-all duration-300" />
              </motion.a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-900">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-medium mb-3">Amenities</p>
            <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-5xl text-cream-100 font-light">During Your Stay</motion.h2></div>
            <div className="w-14 h-px bg-gold-400 mx-auto mt-5" />
          </Reveal>
          <StaggerParent className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
            {services.map(({ Icon, title }, idx) => (
              <motion.div key={idx} variants={staggerItem}
                whileHover={{ y: -6, borderColor: 'rgba(201,162,19,0.6)' }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="text-center group cursor-default border border-transparent p-4 rounded-sm">
                <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.4 }}
                  className="w-16 h-16 mx-auto bg-forest-800 border border-forest-700 flex items-center justify-center mb-4 group-hover:border-gold-500 group-hover:bg-forest-700 transition-colors duration-300">
                  <Icon className="text-gold-400" size={26} />
                </motion.div>
                <p className="text-cream-200 text-sm font-medium">{title}</p>
              </motion.div>
            ))}
          </StaggerParent>
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
            <p className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-medium mb-3">Accommodation</p>
            <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl md:text-5xl text-cream-100 font-light">Our Rooms</motion.h2></div>
            <div className="w-14 h-px bg-gold-400 mx-auto mt-5" />
          </Reveal>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {rooms.map((room) => (
              <motion.div key={room.slug} variants={staggerItem}
                className="group border border-forest-700 hover:border-gold-500/40 transition-all duration-500 overflow-hidden bg-forest-900">
                <div className="relative overflow-hidden h-64">
                  <motion.img src={room.img} alt={room.name} className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }} transition={{ duration: 0.7, ease: 'easeOut' }} />
                  <div className="absolute top-0 right-0 bg-gold-500 text-forest-950 px-4 py-2">
                    <p className="font-heading text-lg font-bold leading-none">{room.price}</p>
                    <p className="text-[9px] tracking-widest uppercase">Per Night</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-cream-100 font-light mb-2">{room.name}</h3>
                  <p className="text-cream-400 text-sm leading-relaxed mb-5">{room.desc}</p>
                  <motion.a href={`/rooms/${room.slug}`} className="inline-flex items-center gap-2.5 text-gold-400 text-xs tracking-[0.2em] uppercase font-medium group/link"
                    whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                    View Details
                    <span className="w-5 h-px bg-gold-400 group-hover/link:w-8 transition-all duration-300" />
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
              <p className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-medium mb-2">Gallery</p>
              <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85 }}
                className="font-heading text-4xl md:text-5xl text-cream-100 font-light">Our Gallery</motion.h2></div>
              <div className="w-10 h-px bg-gold-400 mt-4" />
            </Reveal>
            <Reveal delay={0.15}>
              <motion.a href="/gallery" className="mt-6 sm:mt-0 inline-flex items-center gap-2.5 text-gold-400 text-xs tracking-[0.2em] uppercase font-medium group"
                whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                View All <span className="w-6 h-px bg-gold-400 group-hover:w-10 transition-all duration-300" />
              </motion.a>
            </Reveal>
          </div>
          <StaggerParent className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {galleryImages.map((img, idx) => (
              <motion.a key={idx} href="/gallery" variants={staggerItem}
                className="relative overflow-hidden group aspect-square block"
                whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <motion.img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: 'easeOut' }} />
                <motion.div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/45 transition-all duration-400 flex items-center justify-center">
                  <motion.span initial={{ opacity: 0, scale: 0.8 }} whileHover={{ opacity: 1, scale: 1 }}
                    className="text-white text-[10px] tracking-[0.3em] uppercase border border-white/50 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                  </motion.span>
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
            <p className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-medium mb-3">Testimonials</p>
            <div className="overflow-hidden"><motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.85 }}
              className="font-heading text-4xl md:text-5xl text-cream-100 font-light">What Our Guests Say</motion.h2></div>
            <div className="w-14 h-px bg-gold-400 mx-auto mt-5" />
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
        <div className="absolute inset-0 bg-forest-950/78" />
        <div className="relative container mx-auto px-6 text-center">
          <Reveal>
            <p className="text-gold-400 text-[10px] tracking-[0.5em] uppercase font-medium mb-4">Ready for an Adventure?</p>
            <div className="overflow-hidden mb-4">
              <motion.h2 initial={{ y: '110%' }} whileInView={{ y: '0%' }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-5xl md:text-6xl lg:text-7xl text-white font-light leading-tight">
                Book Your Stay at<br />
                <em className="text-gold-400 not-italic">Pench Tiger Planet</em>
              </motion.h2>
            </div>
            <p className="text-cream-200/80 text-base max-w-lg mx-auto mb-10 font-light">
              Experience the magic of the jungle, the warmth of our hospitality, and memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href="/booking" whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(201,162,19,0.35)' }} whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-gold-500 text-forest-950 font-semibold tracking-[0.15em] uppercase text-xs rounded-sm hover:bg-gold-400 transition-colors">
                Book Now <ArrowRight size={13} className="transition-transform group-hover:translate-x-1.5" />
              </motion.a>
              <motion.a href="/contact" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-cream-200/35 text-cream-100 tracking-[0.15em] uppercase text-xs rounded-sm hover:border-gold-400 hover:text-gold-400 transition-colors">
                Contact Us
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
