'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { BedDouble, Wifi, Tv, UtensilsCrossed, ParkingCircle, Stethoscope, ArrowRight, Check } from 'lucide-react'

const rooms = [
  {
    slug: 'garden-view',
    name: 'Garden View Room',
    price: '\u20b93,200',
    tagline: 'Classic Luxury Overlooking the Garden',
    img: 'https://www.penchtigerplanet.com/assets/img/room/1.jpg',
    desc: 'The Garden View Rooms are a classic example of modern luxury and class. With fully furnished spacious rooms, indulge in a reminiscent comfortable stay while enjoying the luxury and service provided by our hospitable staff.',
    features: ['Garden View', 'King Size Bed', 'AC & Heating', 'En-suite Bathroom', 'Smart TV', 'Free WiFi', 'Room Service', 'Complimentary Breakfast'],
  },
  {
    slug: 'lake-view',
    name: 'Lake View Room',
    price: '\u20b93,800',
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
        <div className="absolute inset-0 bg-forest-950/75" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Stay with Us</p>
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold">Accommodation</h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-forest-900 border-b border-forest-700">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <p className="text-cream-300 leading-relaxed text-sm">
            Pench Tiger Planet offers two exquisitely designed room categories, each crafted to deliver
            a unique yet equally luxurious experience. Whether you seek garden serenity or lake-side vistas,
            every room promises comfort, class, and impeccable service.
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-24 lg:py-32 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {rooms.map((room, i) => (
              <div key={room.slug} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                i % 2 !== 0 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}>
                <div className="animate-up relative overflow-hidden group">
                  <img src={room.img} alt={room.name} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-0 bg-gold-500 text-forest-950 px-5 py-2">
                    <p className="font-heading text-xl font-bold">{room.price}</p>
                    <p className="text-[10px] tracking-widest uppercase">Per Night</p>
                  </div>
                  <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold-400" />
                </div>
                <div className="animate-up">
                  <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-3 block">{room.tagline}</span>
                  <h2 className="font-heading text-4xl md:text-5xl text-cream-100 font-bold mb-4">{room.name}</h2>
                  <div className="w-12 h-0.5 bg-gold-400 mb-6" />
                  <p className="text-cream-300 text-sm leading-relaxed mb-8">{room.desc}</p>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {room.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-cream-300 text-sm">
                        <Check className="text-gold-400 shrink-0" size={14} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/rooms/${room.slug}`} className="inline-flex items-center gap-2 text-gold-400 text-xs tracking-[0.2em] uppercase font-medium hover:gap-4 transition-all group">
                      View Details <span className="w-6 h-px bg-gold-400 group-hover:w-10 transition-all" />
                    </Link>
                    <Link href="/booking" className="btn-gold px-6 py-2.5 bg-gold-500 text-forest-950 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gold-400 transition-all">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Amenities */}
      <section className="py-24 bg-forest-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 animate-up">
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-3 block">All Rooms Include</span>
            <h2 className="font-heading text-3xl md:text-4xl text-cream-100 font-bold">Premium Amenities</h2>
            <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-3xl mx-auto">
            {amenities.map(({ Icon, title }) => (
              <div key={title} className="animate-up text-center group">
                <div className="w-14 h-14 mx-auto bg-forest-800 border border-forest-700 flex items-center justify-center mb-3 group-hover:border-gold-500 transition-colors">
                  <Icon className="text-gold-400" size={22} />
                </div>
                <p className="text-cream-300 text-xs">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-950 border-t border-forest-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="animate-up">
            <h3 className="font-heading text-2xl md:text-3xl text-cream-100 font-bold mb-2">Ready to book your room?</h3>
            <p className="text-cream-400 text-sm">Contact us for special group rates and seasonal packages.</p>
          </div>
          <Link href="/booking" className="btn-gold animate-up inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-all whitespace-nowrap">
            Book Your Room <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  )
}
