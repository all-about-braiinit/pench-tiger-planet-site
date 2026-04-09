'use client'
import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

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

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full bg-forest-800 text-cream-100 border border-forest-700 px-4 py-3 text-sm placeholder-cream-600 focus:outline-none focus:border-gold-400 transition-colors'

  return (
    <main>
      {/* Page Hero */}
      <section
        className="relative h-[55vh] min-h-[350px] flex items-center justify-center overflow-hidden pt-20"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-forest-950/78" />
        <div className="relative z-10 text-center px-4">
          <p className="text-gold-400 text-xs tracking-[0.4em] uppercase mb-4">Let&apos;s Talk</p>
          <h1 className="font-heading text-5xl md:text-7xl text-white font-bold">Get In Touch</h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-6" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-forest-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Info */}
            <div className="lg:col-span-2 animate-up">
              <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase mb-4 block">Contact Information</span>
              <h2 className="font-heading text-3xl md:text-4xl text-cream-100 font-bold mb-6 leading-tight">
                We&apos;re Here<br />
                <span className="text-gold-400">to Help</span>
              </h2>
              <div className="w-10 h-0.5 bg-gold-400 mb-8" />
              <p className="text-cream-300 text-sm leading-relaxed mb-10">
                Have questions about your stay, safari arrangements, or need assistance with your booking?
                Our friendly team is available to assist you from 8 AM to 8 PM daily.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-800 border border-forest-700 flex items-center justify-center shrink-0">
                    <MapPin className="text-gold-400" size={18} />
                  </div>
                  <div>
                    <p className="text-cream-100 text-sm font-medium mb-1">Our Location</p>
                    <p className="text-cream-400 text-sm leading-relaxed">Village Kohka Turiya Block Kurai,<br />District Seoni MP 480881</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-800 border border-forest-700 flex items-center justify-center shrink-0">
                    <Phone className="text-gold-400" size={18} />
                  </div>
                  <div>
                    <p className="text-cream-100 text-sm font-medium mb-1">Phone</p>
                    <a href="tel:+919522066101" className="text-cream-400 text-sm hover:text-gold-400 transition-colors">+91 9522066101</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-800 border border-forest-700 flex items-center justify-center shrink-0">
                    <Mail className="text-gold-400" size={18} />
                  </div>
                  <div>
                    <p className="text-cream-100 text-sm font-medium mb-1">Email</p>
                    <a href="mailto:penchtigerplanet@gmail.com" className="text-cream-400 text-sm hover:text-gold-400 transition-colors break-all">penchtigerplanet@gmail.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-forest-800 border border-forest-700 flex items-center justify-center shrink-0">
                    <Clock className="text-gold-400" size={18} />
                  </div>
                  <div>
                    <p className="text-cream-100 text-sm font-medium mb-1">Office Hours</p>
                    <p className="text-cream-400 text-sm">Monday – Sunday: 8:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-up">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <CheckCircle className="text-gold-400 mb-4" size={56} />
                  <h3 className="font-heading text-3xl text-cream-100 font-bold mb-3">Message Sent!</h3>
                  <p className="text-cream-300 text-sm max-w-sm">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')} className="mt-8 px-6 py-2.5 border border-forest-600 text-cream-300 text-xs tracking-widest uppercase hover:border-gold-400 hover:text-gold-400 transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-forest-900 border border-forest-700 p-8">
                  <h3 className="font-heading text-2xl text-cream-100 font-semibold mb-6">Send a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Your Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@email.com" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 99999 99999" className={inputCls} />
                    </div>
                    <div>
                      <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Subject</label>
                      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Booking Inquiry" className={inputCls} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-2 block">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help..." className={`${inputCls} resize-none`} />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-400 text-xs mb-4">Something went wrong. Please try again or call us directly.</p>
                  )}
                  <button type="submit" disabled={status === 'loading'} className="btn-gold w-full py-3.5 bg-gold-500 text-forest-950 font-bold text-xs tracking-[0.15em] uppercase hover:bg-gold-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                    {status === 'loading' ? 'Sending...' : <><Send size={14} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 relative">
        <iframe
          src="https://maps.google.com/maps?q=Turiya,+Seoni,+Madhya+Pradesh,+India&t=&z=12&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale opacity-70"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pench Tiger Planet Location"
        />
        <div className="absolute inset-0 pointer-events-none border-t-2 border-gold-500/20" />
      </section>
    </main>
  )
}
