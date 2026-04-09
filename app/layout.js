import './globals.css'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Pench Tiger Planet | Luxury Eco-Homestay near Pench Tiger Reserve',
    template: '%s | Pench Tiger Planet'
  },
  description: 'Experience luxury eco-hospitality at Pench Tiger Planet, nestled in the heart of Pench Tiger Reserve, Madhya Pradesh. Book Garden View or Lake View rooms for an unforgettable wildlife experience.',
  keywords: ['Pench Tiger Planet', 'Pench Tiger Reserve', 'luxury homestay', 'eco lodge', 'wildlife safari', 'Madhya Pradesh', 'Seoni', 'Turiya'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Pench Tiger Planet | Luxury Eco-Homestay',
    description: 'Experience luxury eco-hospitality at Pench Tiger Planet near Pench Tiger Reserve, Madhya Pradesh.',
    siteName: 'Pench Tiger Planet',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-forest-950 text-cream-100 font-sans antialiased">
        <SmoothScroll>
          <Navbar />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
