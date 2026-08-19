import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'ChitChat - Connect with People Who Share Your Interests',
  description: 'A social connection platform for meeting people with similar interests and hobbies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans bg-cream text-ink`}>
        <SiteHeader />
        {children}
        <footer className="border-t border-primary-100 py-8 text-center text-primary-800/60 text-base">
          <p>ChitChat &mdash; a student project prototype. Not a live product.</p>
        </footer>
      </body>
    </html>
  )
}
