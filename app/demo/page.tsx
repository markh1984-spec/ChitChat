'use client'

import { useMemo, useState } from 'react'
import InterestPicker from '@/components/InterestPicker'
import PrioritySlider from '@/components/PrioritySlider'
import MatchCard from '@/components/MatchCard'
import { MOCK_USERS } from '@/lib/mockUsers'
import { rankMatches } from '@/lib/discover'

type Step = 'welcome' | 'profile' | 'interests' | 'matches'

const MIN_INTERESTS = 3

export default function DemoPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [name, setName] = useState('')
  const [town, setTown] = useState('Riverside')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [priority, setPriority] = useState(0.5)

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const me = useMemo(
    () => ({
      id: 'me',
      interests: selectedInterests.map(id => ({ interestId: id, level: 8 })),
    }),
    [selectedInterests]
  )

  const matches = useMemo(
    () => rankMatches(me, MOCK_USERS, priority),
    [me, priority]
  )

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <ProgressBar step={step} />

      {step === 'welcome' && (
        <section className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Let&rsquo;s set up your ChitChat profile
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This is a demo with made-up neighbours &mdash; it shows how ChitChat finds you
            people to meet nearby, or people who share your interests, or a bit of both.
          </p>
          <button
            onClick={() => setStep('profile')}
            className="text-xl font-bold bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-lg transition-colors"
          >
            Get Started
          </button>
        </section>
      )}

      {step === 'profile' && (
        <section className="py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">A few details about you</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xl font-medium text-gray-800 mb-2">
                Your first name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Barbara"
                className="w-full text-xl px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="town" className="block text-xl font-medium text-gray-800 mb-2">
                Your area
              </label>
              <select
                id="town"
                value={town}
                onChange={e => setTown(e.target.value)}
                className="w-full text-xl px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
              >
                <option>Riverside</option>
                <option>Oakfield</option>
                <option>Millbrook</option>
                <option>Elmswood</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <BackButton onClick={() => setStep('welcome')} />
            <NextButton onClick={() => setStep('interests')} disabled={name.trim().length === 0} />
          </div>
        </section>
      )}

      {step === 'interests' && (
        <section className="py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What do you enjoy, {name || 'friend'}?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Pick at least {MIN_INTERESTS} &mdash; the more you pick, the better your matches.
          </p>
          <InterestPicker selected={selectedInterests} onToggle={toggleInterest} />
          <div className="flex justify-between mt-10">
            <BackButton onClick={() => setStep('profile')} />
            <NextButton
              onClick={() => setStep('matches')}
              disabled={selectedInterests.length < MIN_INTERESTS}
            />
          </div>
        </section>
      )}

      {step === 'matches' && (
        <section className="py-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            People near {town} you might like
          </h2>

          <div className="mb-8">
            <PrioritySlider value={priority} onChange={setPriority} />
          </div>

          <div className="space-y-4">
            {matches.map(result => (
              <MatchCard key={result.user.id} result={result} />
            ))}
          </div>

          <div className="mt-10">
            <BackButton onClick={() => setStep('interests')} label="← Edit my interests" />
          </div>
        </section>
      )}
    </main>
  )
}

function ProgressBar({ step }: { step: Step }) {
  const steps: Step[] = ['welcome', 'profile', 'interests', 'matches']
  const currentIndex = steps.indexOf(step)
  return (
    <div className="flex gap-2 mb-8" aria-hidden="true">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`h-2 flex-1 rounded-full ${
            i <= currentIndex ? 'bg-primary-600' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

function NextButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-xl font-bold bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg transition-colors"
    >
      Continue
    </button>
  )
}

function BackButton({ onClick, label = '← Back' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="text-xl font-semibold text-gray-600 hover:text-gray-900 px-6 py-4"
    >
      {label}
    </button>
  )
}
