import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-100/70 via-cream to-cream">
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
          <Logo className="w-16 h-16 mx-auto mb-4" />
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-primary-800 mb-6">
            ChitChat
          </h1>
          <p className="text-2xl sm:text-3xl font-display text-ink mb-4">
            Real connections, close to home.
          </p>
          <p className="text-xl text-ink/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            ChitChat helps older adults meet people who share their interests and live
            nearby &mdash; starting on your phone, coming soon to wearables.
          </p>
          <Link
            href="/demo"
            className="inline-block text-xl font-bold bg-primary-600 hover:bg-primary-700 text-cream px-10 py-4 rounded-full transition-colors shadow-md"
          >
            Try the Working Demo
          </Link>
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary-800 mb-5">
          Why ChitChat
        </h2>
        <p className="text-xl text-ink/80 leading-relaxed">
          Loneliness is one of the biggest, and most overlooked, risks to health in later
          life. Many existing social apps are built for a younger, faster audience.
          ChitChat is designed from the ground up for people 60 and over: bigger text,
          simple steps, and a focus on friendship, not swiping.
        </p>
      </section>

      {/* How it works */}
      <section className="bg-accent-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-accent-800 mb-10 text-center">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            <Step
              emoji="📝"
              title="Tell us about you"
              body="Share your interests, from gardening to chess to grandparenting."
            />
            <Step
              emoji="🎚️"
              title="Set your priority"
              body="Choose whether nearby neighbours or shared interests matter more to you — and change it any time."
            />
            <Step
              emoji="👋"
              title="Meet people"
              body="Browse your matches and say hello, at your own pace."
            />
          </div>
        </div>
      </section>

      {/* Feature highlight: the slider */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-primary-50 border border-primary-200 rounded-3xl p-8 sm:p-12">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary-800 mb-5">
            You decide what matters most
          </h2>
          <p className="text-xl text-ink/80 leading-relaxed mb-6">
            Everyone&rsquo;s priorities are different. Some people want to meet a neighbour
            five minutes away; others would happily travel further to meet someone who
            shares a real passion. ChitChat&rsquo;s matching gives every user their own
            balance between <strong className="text-primary-800">location</strong> and{' '}
            <strong className="text-primary-800">interests</strong>, adjustable from their
            account settings at any time.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary-700 hover:text-primary-800 hover:underline"
          >
            See it in action in the demo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Accessibility commitment */}
      <section className="bg-accent-800 text-cream">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            Built for confidence, not confusion
          </h2>
          <ul className="text-xl space-y-4">
            <ChecklistItem text="Large, high-contrast text and buttons throughout" />
            <ChecklistItem text="Short, simple steps with nothing hidden in menus" />
            <ChecklistItem text="No jargon, no clutter, no surprises" />
            <ChecklistItem text="Designed with input from older adults, not just for them" />
          </ul>
        </div>
      </section>

      {/* Roadmap */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary-800 mb-5">
          What&rsquo;s next
        </h2>
        <p className="text-xl text-ink/80 leading-relaxed">
          ChitChat is launching as a phone app first. The same simple matching will come
          to wearables next, so a gentle nudge about a nearby match can reach you without
          needing to pick up your phone at all.
        </p>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary-700">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cream mb-6">
            Curious how it feels to use?
          </h2>
          <Link
            href="/demo"
            className="inline-block text-xl font-bold bg-cream hover:bg-primary-100 text-primary-800 px-10 py-4 rounded-full transition-colors shadow-md"
          >
            Try the Working Demo
          </Link>
        </div>
      </section>
    </main>
  )
}

function Step({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="text-center">
      <div
        className="text-4xl mb-3 w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm"
        aria-hidden="true"
      >
        {emoji}
      </div>
      <h3 className="font-display text-2xl font-semibold text-ink mb-2">{title}</h3>
      <p className="text-lg text-ink/70">{body}</p>
    </div>
  )
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 text-accent-200" aria-hidden="true">
        ✓
      </span>
      <span>{text}</span>
    </li>
  )
}
