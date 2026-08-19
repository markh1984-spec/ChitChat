import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteHeader from '@/components/SiteHeader'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <SiteHeader />
        {children}
        <footer className="border-t border-gray-200 py-8 text-center text-gray-500">
          <p>ChitChat &mdash; a student project prototype. Not a live product.</p>
        </footer>
      </body>
    </html>
  )
}
