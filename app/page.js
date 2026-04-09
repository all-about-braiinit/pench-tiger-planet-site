'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Wifi, Tv, BedDouble, Stethoscope, Shirt, UtensilsCrossed, ChefHat,
  ParkingCircle, Star, ArrowRight, ChevronRight
} from 'lucide-react'

const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Experience the Raw Beauty of the Wild'
  },
  {
    img: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Nestled in the Heart of Pench Tiger Reserve'
  },
  {
    img: 'https://images.unsplash.com/photo-1502252430442-aac78f397426?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Safari, Serenity & Unforgettable Hospitality'
  },
]

const services = [
  { Icon: Wifi, title: 'Free Wi-Fi' },
  { Icon: Tv, title: 'Television' },
  { Icon: BedDouble, title: 'King Size Bed' },
  { Icon: Stethoscope, title: 'Doctor on Call' },
  { Icon: Shirt, title: 'Laundry Facility' },
  { Icon: UtensilsCrossed, title: 'Room Service' },
  { Icon: ChefHat, title: 'Restaurant' },
  { Icon: ParkingCircle, title: 'Parking' },
]

const stats = [
  { value: 4.8, suffix: '', label: 'Guest Rating', isFloat: true },
  { value: 10, suffix: '+', label: 'Luxury Rooms', isFloat: false },
  { value: 15, suffix: '', label: 'Staff Members', isFloat: false },
  { value: 100, suffix: '+', label: 'Happy Clients', isFloat: false },
]

const rooms = [
  {
    slug: 'garden-view',
    name: 'Garden View Room',
    price: '\u20b93,200',
    img: 'https://www.penchtigerplanet.com/assets/img/room/1.jpg',
    desc: 'Classic modern luxury with fully furnished spacious rooms overlooking the serene garden. Indulge in comfort while enjoying personalized hospitality.',
  },
  {
    slug: 'lake-view',
    name: 'Lake View Room',
    price: '\u20b93,800',
    img: 'https://www.penchtigerplanet.com/assets/img/room/2.jpg',
    desc: 'Designed to pamper guests with a breathtaking lake view. Elegant design combined with refined luxury, utmost security and unmatched comfort.',
  },
]

const galleryImages = [1, 2, 3, 4, 5, 6].map(
  (n) => `https://www.penchtigerplanet.com/assets/img/gallery/${n}.jpg`
)

const testimonials = [
  { text: 'We had a great stay at Pench Tiger Planet. Great location, really pleasant and clean rooms. The homestay owner and manager are very helpful. The food was very delicious. I visited with my family and had a wonderful experience.', name: 'CS Pratiksha Kumbhare', tag: 'Family Stay' },
  { text: 'My weekend was so refreshing and all credit goes to Pench Tiger Planet! I enjoyed a lot with my family. The owner and staff were very helpful. Food was just amazing — it was like another home away from home. Highly recommended!', name: 'Nehali Datar', tag: 'Weekend Getaway' },
  { text: 'Very nice place to stay. The service was very good. The owner is very kind and helpful. Staff Ram Deshmukh was excellent — provided breakfast at 5am for our early safari. Definitely going to visit again!', name: 'Aviral Vats', tag: 'Safari Trip' },
  { text: 'I give five stars to the service and food. Staff and owner were really helpful. Room was clean and spacious, food was excellent. Homely and safe — perfect for families.', name: 'Pratiksha Dhote', tag: 'Family Trip' },
  { text: 'Amazing experience! The food is incredible, the service is top notch, and the property is very calm and soothing. My new spot for holiday getaway is now fixed. Pench Tiger Planet, see you soon!', name: 'Anurag Shukla', tag: 'Leisure Stay' },
]

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTesti, setActiveTesti] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTesti((p) => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const initGSAP = async () => {
      const gsapMod = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapMod.gsap || gsapMod.default
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        // Hero entrance
        const tl = gsap.timeline({ delay: 0.2 })
        tl.fromTo('.hero-label', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .fromTo('.hero-title', { opacity: 0, y: 70, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power4.out' }, '-=0.3')
          .fromTo('.hero-desc', { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
          .fromTo('.hero-cta', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, '-=0.4')

        // Scroll-triggered fade-ups
        gsap.utils.toArray('.animate-up').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 55 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
          )
        })

        // Counter animations
        gsap.utils.toArray('.counter-num').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target'))
          const isFloat = el.getAttribute('data-float') === 'true'
          const obj = { val: 0 }
          ScrollTrigger.create({
            trigger: el, start: 'top 82%', once: true,
            onEnter: () => {
              gsap.to(obj, {
                val: target, duration: 2, ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = isFloat ? obj.val.toFixed(1) : Math.round(obj.val)
                },
              })
            },
          })
        })
      })

      return () => ctx.revert()
    }

    let cleanup
    initGSAP().then((fn) => { cleanup = fn })
    return () => { if (cleanup) cleanup() }
  }, [])

  return (
    <main className="overflow-hidden">

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background slides */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, idx) => (
            <motion.div
              key={idx}
              className="absolute inset-0"
              animate={{ opacity: idx === activeSlide ? 1 : 0 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            >
              <img src={slide.img} alt="Pench Tiger Planet" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(10,26,17,0.55) 0%, rgba(10,26,17,0.1) 40%, rgba(10,26,17,0.93) 100%)' }} />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="hero-label text-gold-400 text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-4">Welcome To</p>
          <h1 className="hero-title font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-bold leading-[0.9] mb-6">
            Pench Tiger<br />
            <span className="text-gold-400">Planet</span>
          </h1>
          <p className="hero-desc text-cream-200 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
            {heroSlides[activeSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="hero-cta btn-gold inline-flex items-center justify-center px-8 py-3.5 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25">
              Book Your Stay
            </Link>
            <Link href="/rooms" className="hero-cta inline-flex items-center justify-center px-8 py-3.5 border border-cream-200/50 text-cream-100 text-xs tracking-[0.2em] uppercase hover:border-gold-400 hover:text-gold-400 transition-all duration-300">
              Explore Rooms
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)}
              className={`h-0.5 transition-all duration-500 cursor-pointer ${
                i === activeSlide ? 'bg-gold-400 w-10' : 'bg-white/35 w-5'
              }`} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-cream-200/40 to-transparent" />
          <p className="text-cream-200/40 text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</p>
        </div>
      </section>

      {/* ─── QUICK BOOKING BAR ────────────────────────────────── */}
      <section className="bg-forest-900 border-b border-forest-700 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {[['Check In', 'date'], ['Check Out', 'date']].map(([label, type]) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-medium">{label}</label>
                  <input type={type} className="bg-forest-800 text-cream-100 border border-forest-700 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 min-w-[160px] transition-colors" />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase font-medium">Guests</label>
                <select className="bg-forest-800 text-cream-100 border border-forest-700 px-4 py-2.5 text-sm focus:outline-none focus:border-gold-400 transition-colors">
                  {['1 Adult', '2 Adults', '3 Adults', '4+ Adults'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <Link href="/booking" className="btn-gold w-full md:w-auto px-8 py-3 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold-400 transition-all whitespace-nowrap text-center">
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="animate-up relative order-2 lg:order-1">
              <div className="relative overflow-hidden">
                <img src="https://www.penchtigerplanet.com/assets/img/about/abt.jpg" alt="About Pench Tiger Planet" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gold-500 text-forest-950 p-5 hidden md:block">
                <p className="text-3xl font-heading font-bold leading-none">4.8</p>
                <div className="flex gap-0.5 my-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-forest-950" />)}</div>
                <p className="text-[10px] font-bold tracking-widest uppercase">Rating</p>
              </div>
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold-400" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold-400 hidden md:block" />
            </div>

            {/* Text */}
            <div className="animate-up order-1 lg:order-2">
              <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-medium mb-3 block">About Us</span>
              <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold mb-6 leading-tight">
                A Sanctuary Where<br />
                <span className="text-gold-400">Wilderness Meets Luxury</span>
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mb-8" />
              <p className="text-cream-300 leading-relaxed mb-5 text-sm">
                Bestowing excellent hospitality to its every category of guests, Pench Tiger Planet reflects
                the culture and ethos of its location. With the perfect fusion of contemporary decor in the
                sumptuous interiors, we have set the bar of services much higher than the expectations of our guests.
              </p>
              <p className="text-cream-300 leading-relaxed mb-8 text-sm">
                The concept of intuitive anticipatory service makes the guest experience unalloyed. We welcome
                guests from all around the world, ensuring each stay is a truly memorable one.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                {[['Authentic Experience', 'Immersive wildlife encounters'], ['Luxury Comfort', 'Premium amenities & service']].map(([title, sub]) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gold-500 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-forest-950" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    <div>
                      <p className="text-cream-100 font-medium text-sm">{title}</p>
                      <p className="text-cream-500 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-3 text-gold-400 font-medium text-xs tracking-[0.2em] uppercase hover:gap-5 transition-all group">
                Discover Our Story
                <span className="w-8 h-px bg-gold-400 group-hover:w-12 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-up">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-medium mb-3 block">Amenities</span>
            <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold">During Your Stay</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10">
            {services.map(({ Icon, title }, idx) => (
              <div key={idx} className="animate-up text-center group cursor-default">
                <div className="w-16 h-16 mx-auto bg-forest-800 border border-forest-700 flex items-center justify-center mb-4 group-hover:border-gold-500 group-hover:bg-forest-700 transition-all duration-300">
                  <Icon className="text-gold-400" size={26} />
                </div>
                <p className="text-cream-200 text-sm font-medium">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/counter/counter.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      >
        <div className="absolute inset-0 bg-forest-950/85" />
        <div className="relative container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, suffix, label, isFloat }, idx) => (
              <div key={idx} className="animate-up">
                <div className="font-heading text-5xl md:text-6xl font-bold text-gold-400 mb-2 flex items-center justify-center gap-0.5">
                  <span className="counter-num" data-target={value} data-float={isFloat ? 'true' : 'false'}>0</span>
                  <span>{suffix}</span>
                </div>
                <p className="text-cream-300 text-xs tracking-[0.2em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROOMS ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-up">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-medium mb-3 block">Accommodation</span>
            <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold">Our Rooms</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {rooms.map((room) => (
              <div key={room.slug} className="animate-up group border border-forest-700 hover:border-gold-500/40 transition-all duration-500 overflow-hidden bg-forest-900">
                <div className="relative overflow-hidden h-64">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-0 bg-gold-500 text-forest-950 px-4 py-1.5 text-sm font-bold font-heading">
                    {room.price}/Night
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-cream-100 font-semibold mb-3">{room.name}</h3>
                  <p className="text-cream-400 text-sm leading-relaxed mb-6">{room.desc}</p>
                  <Link href={`/rooms/${room.slug}`} className="inline-flex items-center gap-3 text-gold-400 font-medium text-xs tracking-[0.2em] uppercase hover:gap-5 transition-all group/link">
                    View Details
                    <span className="w-6 h-px bg-gold-400 group-hover/link:w-10 transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14">
            <div className="animate-up">
              <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-medium mb-3 block">Gallery</span>
              <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold">Our Gallery</h2>
              <div className="w-12 h-0.5 bg-gold-400 mt-5" />
            </div>
            <Link href="/gallery" className="animate-up mt-6 sm:mt-0 inline-flex items-center gap-3 text-gold-400 font-medium text-xs tracking-[0.2em] uppercase hover:gap-5 transition-all group">
              View All <span className="w-8 h-px bg-gold-400 group-hover:w-12 transition-all" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {galleryImages.map((img, idx) => (
              <Link href="/gallery" key={idx} className="animate-up relative overflow-hidden group aspect-square block">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/60 px-3 py-1">View</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/testi.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16 animate-up">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase font-medium mb-3 block">Testimonials</span>
            <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold">What Our Guests Say</h2>
            <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-6" />
          </div>

          <div className="max-w-2xl mx-auto text-center animate-up">
            <AnimatePresence mode="wait">
              <motion.div key={activeTesti} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <div className="text-gold-400/15 font-heading text-[120px] leading-none select-none -mb-6">&ldquo;</div>
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="text-gold-400 fill-gold-400" size={14} />)}
                </div>
                <p className="text-cream-200 text-base md:text-lg leading-relaxed mb-8 italic font-light">
                  &ldquo;{testimonials[activeTesti].text}&rdquo;
                </p>
                <p className="text-gold-400 font-heading font-semibold text-lg">{testimonials[activeTesti].name}</p>
                <p className="text-cream-500 text-[10px] tracking-[0.25em] uppercase mt-1">{testimonials[activeTesti].tag} &bull; Verified Guest</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTesti(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeTesti ? 'bg-gold-400 w-6 h-2' : 'bg-forest-700 w-2 h-2 hover:bg-forest-500'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────── */}
      <section
        className="py-32 relative overflow-hidden"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1649689727213-9842bb6fe095?w=1920&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-forest-950/78" />
        <div className="relative container mx-auto px-6 text-center">
          <div className="animate-up">
            <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-medium mb-4 block">Ready for an Adventure?</span>
            <h2 className="font-heading text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
              Book Your Stay at<br />
              <span className="text-gold-400">Pench Tiger Planet</span>
            </h2>
            <p className="text-cream-200 text-base md:text-lg max-w-lg mx-auto mb-10 font-light">
              Experience the magic of the jungle, the warmth of our hospitality, and memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-gold inline-flex items-center gap-2 justify-center px-10 py-4 bg-gold-500 text-forest-950 font-bold tracking-[0.15em] uppercase text-xs hover:bg-gold-400 transition-all">
                Book Now <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-cream-200/40 text-cream-100 tracking-[0.15em] uppercase text-xs hover:border-gold-400 hover:text-gold-400 transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
