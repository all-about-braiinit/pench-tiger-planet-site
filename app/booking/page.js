'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Calendar, Users, MessageSquare } from 'lucide-react'

const roomOptions = [
  { value: '', label: 'No Preference' },
  { value: 'garden-view', label: 'Garden View Room (₹3,200/night)' },
  { value: 'lake-view', label: 'Lake View Room (₹3,800/night)' },
]

export default function BookingPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    checkIn: '', checkOut: '',
    roomType: '', adults: '2', children: '0',
    specialRequests: '',
  })
  const [status, setStatus] = useState('idle')
  const [bookingId, setBookingId] = useState('')

  useEffect(() => {
    // Pre-fill room from query params
    const params = new URLSearchParams(window.location.search)
    const room = params.get('room')
    if (room) setForm((p) => ({ ...p, roomType: room }))

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

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setBookingId(data.bookingId || '')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full bg-forest-800 text-cream-100 border border-forest-700 px-4 py-3 text-sm placeholder-cream-600 focus:outline-none focus:border-gold-400 transition-colors'
  const selectCls = `${inputCls} cursor-pointer`

  return (
    <main>
      {/* Page Hero */}
      <section
        className="relative h-[55vh] min-h-[350px] flex items-center justify-center overflow-hidden pt-20"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1649689727213-9842bb6fe095?w=1920&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-forest-950/80" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Reserve Your Stay</p>
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold">Book Now</h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Steps */}
      <section className="py-10 bg-forest-900 border-b border-forest-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { Icon: Calendar, title: 'Choose Dates', sub: 'Select your stay period' },
              { Icon: Users, title: 'Pick Room', sub: 'Garden or Lake View' },
              { Icon: MessageSquare, title: 'Confirm', sub: 'We contact you within 2 hrs' },
            ].map(({ Icon, title, sub }, i) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 bg-forest-800 border border-forest-700 flex items-center justify-center mx-auto mb-2">
                  <Icon className="text-gold-400" size={18} />
                </div>
                <p className="text-cream-100 text-xs font-medium">{title}</p>
                <p className="text-cream-500 text-[10px]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-forest-950">
        <div className="container mx-auto px-6">
          {status === 'success' ? (
            <div className="max-w-lg mx-auto text-center py-16 animate-up">
              <CheckCircle className="text-gold-400 mx-auto mb-5" size={64} />
              <h2 className="font-heading text-4xl text-cream-100 font-bold mb-4">Booking Received!</h2>
              <p className="text-cream-300 text-sm leading-relaxed mb-4">
                Thank you for choosing Pench Tiger Planet. We have received your booking inquiry and our team
                will contact you within 2 hours to confirm availability and finalize your reservation.
              </p>
              {bookingId && (
                <div className="bg-forest-900 border border-forest-700 px-6 py-4 mb-8">
                  <p className="text-cream-400 text-xs mb-1">Your Booking Reference</p>
                  <p className="text-gold-400 font-heading font-bold text-xl tracking-wider">{bookingId.slice(0, 8).toUpperCase()}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/" className="btn-gold px-8 py-3 bg-gold-500 text-forest-950 font-bold text-xs tracking-widest uppercase hover:bg-gold-400 transition-all">
                  Back to Home
                </Link>
                <button onClick={() => setStatus('idle')} className="px-8 py-3 border border-forest-600 text-cream-300 text-xs tracking-widest uppercase hover:border-gold-400 hover:text-gold-400 transition-all">
                  New Booking
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2 animate-up">
                <h2 className="font-heading text-3xl text-cream-100 font-semibold mb-8">Booking Inquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Full Name" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 99999 99999" className={inputCls} />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Check-in Date *</label>
                      <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required className={inputCls} />
                    </div>
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Check-out Date *</label>
                      <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required className={inputCls} />
                    </div>
                  </div>

                  {/* Room & Guests */}
                  <div>
                    <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Room Preference</label>
                    <select name="roomType" value={form.roomType} onChange={handleChange} className={selectCls}>
                      {roomOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Adults</label>
                      <select name="adults" value={form.adults} onChange={handleChange} className={selectCls}>
                        {['1', '2', '3', '4', '5'].map((n) => <option key={n} value={n}>{n} Adult{n !== '1' ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Children</label>
                      <select name="children" value={form.children} onChange={handleChange} className={selectCls}>
                        {['0', '1', '2', '3', '4'].map((n) => <option key={n} value={n}>{n} Child{n !== '1' ? 'ren' : ''}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Special Requests</label>
                    <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange} rows={4}
                      placeholder="Safari arrangements, dietary requirements, special occasions..."
                      className={`${inputCls} resize-none`} />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs">Something went wrong. Please try again or call us at +91 9522066101.</p>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="btn-gold w-full py-4 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                    {status === 'loading' ? 'Submitting...' : <><span>Submit Booking Inquiry</span> <ArrowRight size={14} /></>}
                  </button>

                  <p className="text-cream-500 text-xs text-center">
                    This is an inquiry form. A team member will contact you to confirm. No payment required now.
                  </p>
                </form>
              </div>

              {/* Info Panel */}
              <div className="animate-up">
                <div className="bg-forest-900 border border-forest-700 p-6 mb-6">
                  <h3 className="font-heading text-xl text-cream-100 font-semibold mb-4">Booking Info</h3>
                  <div className="space-y-4 text-sm">
                    {[
                      ['Check-in Time', '12:00 PM onwards'],
                      ['Check-out Time', 'By 11:00 AM'],
                      ['Breakfast', 'Complimentary'],
                      ['Safari', 'Can be arranged'],
                      ['Pets', 'Not allowed'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-forest-800 pb-3">
                        <span className="text-cream-400">{k}</span>
                        <span className="text-cream-100 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gold-500/10 border border-gold-500/30 p-5">
                  <h4 className="text-gold-400 font-heading font-semibold mb-3">Need Help?</h4>
                  <p className="text-cream-300 text-sm mb-4">Our team is available 8 AM – 8 PM to assist with your booking.</p>
                  <a href="tel:+919522066101" className="block text-center py-2.5 border border-gold-400 text-gold-400 text-xs font-bold tracking-widest uppercase hover:bg-gold-500 hover:text-forest-950 transition-all">
                    +91 9522066101
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
