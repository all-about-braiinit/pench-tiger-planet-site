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
            <img
              src="https://www.penchtigerplanet.com/assets/img/logo.png"
              alt="Pench Tiger Planet"
              className="h-10 w-auto"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="hidden sm:block">
              <p className="text-gold-400 font-heading font-semibold text-sm leading-tight tracking-wide">Pench Tiger Planet</p>
              <p className="text-cream-500 text-[9px] tracking-[0.2em] uppercase">Luxury Eco-Homestay</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href || link.label}>
                {link.children ? (
                  <div className="relative group">
                    <button className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-gold-400 ${
                      pathname.startsWith('/rooms') ? 'text-gold-400' : 'text-cream-200'
                    }`}>
                      {link.label}
                      <ChevronDown size={13} className="transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 w-52 bg-forest-900 border border-forest-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 shadow-xl">
                      <Link href="/rooms" className="block px-4 py-2.5 text-xs text-cream-300 hover:text-gold-400 hover:bg-forest-800 transition-colors">All Rooms</Link>
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}
                          className={`block px-4 py-2.5 text-xs hover:text-gold-400 hover:bg-forest-800 transition-colors ${
                            pathname === child.href ? 'text-gold-400' : 'text-cream-300'
                          }`}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={link.href}
                    className={`text-sm font-medium tracking-wide transition-colors hover:text-gold-400 relative group/link ${
                      pathname === link.href ? 'text-gold-400' : 'text-cream-200'
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
          <Link href="/booking" className="hidden lg:block btn-gold px-6 py-2.5 bg-gold-500 text-forest-950 text-xs font-bold tracking-[0.15em] uppercase hover:bg-gold-400 transition-all duration-300">
            Book Now
          </Link>

          {/* Mobile Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-cream-100 hover:text-gold-400 transition-colors" aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-forest-950/98 backdrop-blur-xl flex flex-col justify-center items-center gap-1 px-8 pt-20 pb-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href || link.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="w-full max-w-sm"
              >
                <Link href={link.href || '/rooms'}
                  className={`block py-3 text-2xl font-heading font-medium border-b border-forest-800 transition-colors ${
                    pathname === link.href ? 'text-gold-400' : 'text-cream-100 hover:text-gold-400'
                  }`}>
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 pt-1 pb-2">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block py-1.5 text-sm text-cream-300 hover:text-gold-400 transition-colors">
                        &mdash; {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full max-w-sm mt-6">
              <Link href="/booking" className="block text-center py-4 bg-gold-500 text-forest-950 font-bold tracking-[0.15em] uppercase text-sm hover:bg-gold-400 transition-colors">
                Book Your Stay
              </Link>
              <p className="text-center mt-4 text-cream-400 text-sm">
                <a href="tel:+919522066101" className="hover:text-gold-400 transition-colors">+91 9522066101</a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
