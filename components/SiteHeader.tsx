import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-xl sm:text-2xl font-bold text-primary-700 flex items-center gap-2">
          <span aria-hidden="true">💬</span> ChitChat
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden sm:inline text-lg text-gray-700 hover:text-primary-700 px-3 py-2 rounded-lg"
          >
            About
          </Link>
          <Link
            href="/demo"
            className="text-base sm:text-lg font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 sm:px-5 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Try the Demo
          </Link>
        </nav>
      </div>
    </header>
  )
}
