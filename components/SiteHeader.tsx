import Link from 'next/link'
import Logo from './Logo'

export default function SiteHeader() {
  return (
    <header className="bg-cream border-b border-primary-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="w-10 h-10 shrink-0 transition-transform group-hover:scale-105" />
          <span className="font-display text-xl sm:text-2xl font-semibold text-primary-800">
            ChitChat
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden sm:inline text-lg text-ink/70 hover:text-primary-700 px-3 py-2 rounded-lg transition-colors"
          >
            About
          </Link>
          <Link
            href="/demo"
            className="text-base sm:text-lg font-semibold bg-primary-600 hover:bg-primary-700 text-cream px-4 sm:px-5 py-2 rounded-full transition-colors whitespace-nowrap shadow-sm"
          >
            Try the Demo
          </Link>
        </nav>
      </div>
    </header>
  )
}
