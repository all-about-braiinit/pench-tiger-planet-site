'use client'
import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-950 border-t border-forest-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://www.penchtigerplanet.com/assets/img/logo.png"
                alt="Pench Tiger Planet"
                className="h-14 w-auto"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div>
                <p className="text-gold-400 font-heading text-lg font-semibold">Pench Tiger Planet</p>
                <p className="text-cream-500 text-[10px] tracking-widest uppercase">Luxury Eco-Homestay</p>
              </div>
            </div>
            <p className="text-cream-400 text-sm leading-relaxed mb-6 max-w-sm">
              Bestowing excellent hospitality to every category of guests, Pench Tiger Planet
              reflects the culture and ethos of its location amidst the wilderness of Pench Tiger Reserve.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="https://www.instagram.com/penchtigerplanet/" className="w-9 h-9 border border-forest-700 flex items-center justify-center text-cream-400 hover:border-gold-400 hover:text-gold-400 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-400 text-xs font-bold tracking-[0.25em] uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                ['/', 'Home'], ['/about', 'About Us'], ['/rooms', 'All Rooms'],
                ['/rooms/garden-view', 'Garden View Room'], ['/rooms/lake-view', 'Lake View Room'],
                ['/gallery', 'Gallery'], ['/contact', 'Contact'], ['/booking', 'Book Now'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-cream-400 text-sm hover:text-gold-400 transition-colors flex items-center gap-2 group">
                    <span className="w-3 h-px bg-forest-600 group-hover:bg-gold-400 group-hover:w-5 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-400 text-xs font-bold tracking-[0.25em] uppercase mb-6">Contact Us</h4>
            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin className="text-gold-400 shrink-0 mt-0.5" size={16} />
                <p className="text-cream-400 text-sm leading-relaxed">Village Kohka Turiya Block Kurai,<br />District Seoni MP 480881</p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="text-gold-400 shrink-0" size={16} />
                <a href="tel:+919522066101" className="text-cream-400 text-sm hover:text-gold-400 transition-colors">+91 9522066101</a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="text-gold-400 shrink-0" size={16} />
                <a href="mailto:penchtigerplanet@gmail.com" className="text-cream-400 text-sm hover:text-gold-400 transition-colors break-all">penchtigerplanet@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-forest-800">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-cream-500 text-xs">&copy; {new Date().getFullYear()} Pench Tiger Planet. All rights reserved.</p>
          <p className="text-cream-500 text-xs">Crafted with passion for wildlife &amp; hospitality</p>
        </div>
      </div>
    </footer>
  )
}
