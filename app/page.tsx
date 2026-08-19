import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-primary-700">
            <span aria-hidden="true">💬</span> ChitChat
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Real connections, close to home.
          </p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            ChitChat helps older adults meet people who share their interests and live
            nearby &mdash; starting on your phone, coming soon to wearables.
          </p>
          <Link
            href="/demo"
            className="inline-block text-xl font-bold bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg transition-colors"
          >
            Try the Working Demo
          </Link>
        </div>
      </section>

      {/* The problem */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why ChitChat</h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          Loneliness is one of the biggest, and most overlooked, risks to health in later
          life. Many existing social apps are built for a younger, faster audience.
          ChitChat is designed from the ground up for people 60 and over: bigger text,
          simple steps, and a focus on friendship, not swiping.
        </p>
      </section>

      {/* How it works */}
      <section className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <Step
              emoji="📝"
              title="Tell us about you"
              body="Share your interests, from gardening to chess to grandparenting."
            />
            <Step
              emoji="🎚️"
              title="Set your priority"
              body="Choose whether nearby neighbours or shared interests matter more to you &mdash; and change it any time."
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          You decide what matters most
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Everyone&rsquo;s priorities are different. Some people want to meet a neighbour
          five minutes away; others would happily travel further to meet someone who
          shares a real passion. ChitChat&rsquo;s matching gives every user their own
          balance between <strong>distance</strong> and <strong>shared interests</strong>,
          adjustable from their account settings at any time.
        </p>
        <Link href="/demo" className="text-lg font-semibold text-primary-700 hover:underline">
          See it in action in the demo →
        </Link>
      </section>

      {/* Accessibility commitment */}
      <section className="bg-primary-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for confidence, not confusion
          </h2>
          <ul className="text-xl text-gray-700 space-y-3 list-disc list-inside">
            <li>Large, high-contrast text and buttons throughout</li>
            <li>Short, simple steps with nothing hidden in menus</li>
            <li>No jargon, no clutter, no surprises</li>
            <li>Designed with input from older adults, not just for them</li>
          </ul>
        </div>
      </section>

      {/* Roadmap */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What&rsquo;s next</h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          ChitChat is launching as a phone app first. The same simple matching will come
          to wearables next, so a gentle nudge about a nearby match can reach you without
          needing to pick up your phone at all.
        </p>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary-700">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Curious how it feels to use?
          </h2>
          <Link
            href="/demo"
            className="inline-block text-xl font-bold bg-white hover:bg-gray-100 text-primary-700 px-10 py-4 rounded-lg transition-colors"
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
      <div className="text-5xl mb-3" aria-hidden="true">
        {emoji}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-lg text-gray-600">{body}</p>
    </div>
  )
}
