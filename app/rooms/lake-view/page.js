'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { Check, BedDouble, Wifi, Tv, UtensilsCrossed, Coffee, Waves } from 'lucide-react'

const amenities = [
  { Icon: BedDouble, title: 'King Size Bed' },
  { Icon: Wifi, title: 'Free WiFi' },
  { Icon: Tv, title: 'Smart TV' },
  { Icon: UtensilsCrossed, title: 'Room Service' },
  { Icon: Coffee, title: 'Morning Tea' },
  { Icon: Waves, title: 'Lake View' },
]

const galleryImages = [7, 8, 9, 10, 11, 12].map(
  (n) => `https://www.penchtigerplanet.com/assets/img/gallery/${n}.jpg`
)

export default function LakeViewRoomPage() {
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
        className="relative h-[65vh] min-h-[420px] flex items-end overflow-hidden"
        style={{ backgroundImage: 'url(https://www.penchtigerplanet.com/assets/img/room/2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,26,17,0.3) 0%, rgba(10,26,17,0.9) 100%)' }} />
        <div className="relative z-10 container mx-auto px-6 pb-14">
          <div className="flex items-center gap-2 text-cream-400 text-xs mb-4">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-gold-400 transition-colors">Rooms</Link>
            <span>/</span>
            <span className="text-gold-400">Lake View Room</span>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="text-gold-400 text-[10px] tracking-[0.4em] uppercase mb-2 block">Premium Suite</span>
              <h1 className="font-heading text-5xl md:text-6xl text-white font-bold">Lake View Room</h1>
            </div>
            <div className="text-right">
              <p className="text-gold-400 font-heading text-4xl font-bold">₹3,800</p>
              <p className="text-cream-400 text-xs tracking-widest uppercase">Per Night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2 animate-up">
              <h2 className="font-heading text-3xl text-cream-100 font-semibold mb-6">Room Overview</h2>
              <p className="text-cream-300 text-sm leading-relaxed mb-5">
                The Lake View Rooms at Pench Tiger Planet are designed specially to pamper our guests.
                These premium suites showcase a perfect blend of luxury in accommodation with utmost security.
                The rooms bestow an elegant design combined with refined elegance and luxuriously appointed
                sleek interiors.
              </p>
              <p className="text-cream-300 text-sm leading-relaxed mb-5">
                Step onto your private balcony to witness the mesmerizing view of the lake, with the forest
                as your backdrop. The shimmering water at dawn and the chorus of birds creates an atmosphere
                that is both calming and invigorating — a true gift of nature.
              </p>
              <p className="text-cream-300 text-sm leading-relaxed mb-10">
                Every element of the Lake View Room has been curated for the discerning traveler. From premium
                bedding to thoughtfully stocked amenities, from personalized room service to expert safari
                guidance — this is luxury in its most natural form.
              </p>

              <h3 className="font-heading text-2xl text-cream-100 font-semibold mb-5">What&apos;s Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'King Size Bed', 'Panoramic Lake View', 'En-suite Premium Bathroom', 'Air Conditioning',
                  'Free WiFi', 'Smart Television', 'Priority Room Service', 'Complimentary Breakfast',
                  'Housekeeping', 'Laundry on Request', 'Doctor on Call', 'Free Parking',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gold-500/20 border border-gold-500/40 flex items-center justify-center shrink-0">
                      <Check className="text-gold-400" size={12} />
                    </div>
                    <span className="text-cream-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <h3 className="font-heading text-2xl text-cream-100 font-semibold mb-5">Room Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="overflow-hidden aspect-square group">
                    <img src={img} alt={`Lake View Room ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="animate-up">
              <div className="bg-forest-900 border border-forest-700 p-6 sticky top-28">
                <div className="border-b border-forest-700 pb-5 mb-5">
                  <p className="text-gold-400 font-heading text-3xl font-bold">₹3,800</p>
                  <p className="text-cream-400 text-xs tracking-widest uppercase mt-1">Per Night (incl. breakfast)</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {amenities.map(({ Icon, title }) => (
                    <div key={title} className="text-center">
                      <Icon className="text-gold-400 mx-auto mb-1" size={18} />
                      <p className="text-cream-400 text-[10px]">{title}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-cream-300">
                    <span>Room Type</span>
                    <span className="text-cream-100">Lake View</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Max Occupancy</span>
                    <span className="text-cream-100">2 Adults</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Bed Type</span>
                    <span className="text-cream-100">King Size</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Check-in</span>
                    <span className="text-cream-100">12:00 PM</span>
                  </div>
                  <div className="flex justify-between text-cream-300">
                    <span>Check-out</span>
                    <span className="text-cream-100">11:00 AM</span>
                  </div>
                </div>

                <Link href="/booking?room=lake-view" className="btn-gold block text-center py-3.5 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-all mb-3">
                  Book This Room
                </Link>
                <Link href="/contact" className="block text-center py-3 border border-forest-600 text-cream-300 text-xs tracking-[0.15em] uppercase hover:border-gold-400 hover:text-gold-400 transition-all">
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
