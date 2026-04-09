'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    label: 'Rooms',
    href: '/rooms',
    children: [
      { href: '/rooms/garden-view', label: 'Garden View Room' },
      { href: '/rooms/lake-view', label: 'Lake View Room' },
    ],
  },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBg = scrolled || !isHomePage
    ? 'bg-forest-950/97 backdrop-blur-md shadow-md shadow-forest-950/50'
    : 'bg-transparent'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="https://www.penchtigerplanet.com/assets/img/logo.png" alt="Pench Tiger Planet" className="h-10 lg:h-10 w-auto" onError={(e) => { e.target.style.display = 'none' }} />
            <div className="hidden sm:block">
              <p className="font-heading text-lg font-semibold text-cream-100 leading-tight">Pench Tiger Planet</p>
              <p className="text-gold-400 text-[9px] tracking-[0.25em] uppercase">Luxury Eco-Homestay</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.children ? (
                  <div className="relative group">
                    <button className={`flex items-center gap-1 text-[15px] font-semibold tracking-wide transition-colors hover:text-gold-400 ${
                      pathname.startsWith('/rooms') ? 'text-gold-400' : 'text-cream-100'
                    }`}>
                      {link.label}
                      <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 w-52 bg-forest-900 border border-forest-700 rounded-lg py-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 shadow-xl">
                      <Link href="/rooms" className="block px-4 py-2.5 text-sm text-cream-300 hover:text-gold-400 hover:bg-forest-800 transition-colors">All Rooms</Link>
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className={`block px-4 py-2.5 text-sm hover:text-gold-400 hover:bg-forest-800 transition-colors ${
                            pathname === child.href ? 'text-gold-400' : 'text-cream-300'
                          }`}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={link.href}
                    className={`text-[15px] font-semibold tracking-wide transition-colors hover:text-gold-400 relative group/link ${
                      pathname === link.href ? 'text-gold-400' : 'text-cream-100'
                    }`}>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover/link:w-full'
                    }`} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link href="/booking" className="hidden lg:block btn-gold px-7 py-3 bg-gold-500 text-forest-950 text-sm font-bold tracking-[0.12em] uppercase hover:bg-gold-400 transition-all duration-300 rounded-xl shadow-lg">
            Book Now
          </Link>

          {/* Mobile Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-cream-100 hover:text-gold-400 transition-colors" aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={26} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={26} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
            <motion.div className="absolute inset-0 bg-forest-950/95 backdrop-blur-md" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-forest-900 shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="mb-10">
                  <p className="font-heading text-2xl font-semibold text-cream-100 mb-1">Menu</p>
                  <p className="text-gold-400 text-xs tracking-widest uppercase">Navigation</p>
                </div>
                <nav className="space-y-2">
                  {navLinks.map((link) => (
                    <div key={link.href}>
                      <Link href={link.href}
                        className={`block py-3 px-4 rounded-lg text-base font-semibold transition-colors ${
                          pathname === link.href ? 'bg-gold-500/10 text-gold-400' : 'text-cream-200 hover:bg-forest-800 hover:text-gold-400'
                        }`}>
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 mt-2 space-y-1">
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href}
                              className={`block py-2 px-4 rounded-lg text-sm transition-colors ${
                                pathname === child.href ? 'bg-gold-500/10 text-gold-400' : 'text-cream-400 hover:bg-forest-800 hover:text-gold-400'
                              }`}>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <Link href="/booking" className="mt-8 w-full block text-center py-4 bg-gold-500 text-forest-950 text-sm font-bold tracking-widest uppercase rounded-xl shadow-lg hover:bg-gold-400 transition-all">
                  Book Your Stay
                </Link>
                <div className="mt-10 pt-8 border-t border-forest-700">
                  <p className="text-cream-500 text-xs tracking-widest uppercase mb-4">Get In Touch</p>
                  <a href="tel:+919522066101" className="flex items-center gap-3 text-cream-200 hover:text-gold-400 transition-colors mb-3">
                    <Phone size={18} className="text-gold-400" />
                    <span className="text-sm">+91 9522066101</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
