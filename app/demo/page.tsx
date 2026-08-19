'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import InterestPicker from '@/components/InterestPicker'
import PrioritySlider from '@/components/PrioritySlider'
import MatchCard from '@/components/MatchCard'
import TownAutocomplete from '@/components/TownAutocomplete'
import { MOCK_USERS } from '@/lib/mockUsers'
import { rankMatches, BALANCED_PRIORITY } from '@/lib/discover'
import { ICEBREAKER_QUESTION, ICEBREAKER_OPTIONS, getIcebreakerOption } from '@/lib/icebreaker'
import { loadLastLogin, saveLastLogin, clearLastLogin } from '@/lib/storage'

type Step = 'welcome' | 'icebreaker' | 'profile' | 'interests' | 'matches'
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

const MIN_INTERESTS = 3
const DEFAULT_AGE = '68'

export default function DemoPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [town, setTown] = useState('Riverside')
  const [ageInput, setAgeInput] = useState(DEFAULT_AGE)
  const age = Number(ageInput) || 0
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [priority, setPriority] = useState(BALANCED_PRIORITY)
  const [icebreakerAnswerId, setIcebreakerAnswerId] = useState<string | null>(null)

  const [loadName, setLoadName] = useState('')
  const [loadPin, setLoadPin] = useState('')
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const hydrated = useRef(false)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const last = loadLastLogin()
    if (last) {
      setLoadName(last.name)
      setLoadPin(last.pin)
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current) return
    if (!name || pin.length !== 4 || selectedInterests.length < MIN_INTERESTS) return

    setSaveStatus('saving')
    if (saveTimeout.current) clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, pin, town, age, selectedInterests, priority, icebreakerAnswerId }),
        })
        setSaveStatus(res.ok ? 'saved' : 'error')
        if (res.ok) saveLastLogin({ name, pin })
      } catch {
        setSaveStatus('error')
      }
    }, 600)

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current)
    }
  }, [name, pin, town, age, selectedInterests, priority, icebreakerAnswerId])

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const chooseIcebreaker = (optionId: string) => {
    setIcebreakerAnswerId(optionId)
    const option = getIcebreakerOption(optionId)
    if (option) {
      setSelectedInterests(prev => Array.from(new Set([...prev, ...option.relatedInterestIds])))
    }
    setStep('matches')
  }

  const loadMyProfile = async () => {
    setLoadStatus('loading')
    try {
      const res = await fetch(
        `/api/profile?name=${encodeURIComponent(loadName)}&pin=${encodeURIComponent(loadPin)}`
      )
      if (!res.ok) {
        setLoadStatus('error')
        return
      }
      const profile = await res.json()
      setName(profile.name)
      setPin(profile.pin)
      setTown(profile.town)
      setAgeInput(String(profile.age))
      setSelectedInterests(profile.selectedInterests)
      setPriority(profile.priority)
      setIcebreakerAnswerId(profile.icebreakerAnswerId)
      saveLastLogin({ name: profile.name, pin: profile.pin })
      setLoadStatus('idle')
      setStep('matches')
    } catch {
      setLoadStatus('error')
    }
  }

  const startOver = () => {
    clearLastLogin()
    setName('')
    setPin('')
    setTown('Riverside')
    setAgeInput(DEFAULT_AGE)
    setSelectedInterests([])
    setPriority(BALANCED_PRIORITY)
    setIcebreakerAnswerId(null)
    setSaveStatus('idle')
    setStep('welcome')
  }

  const me = useMemo(
    () => ({
      id: 'me',
      age,
      interests: selectedInterests.map(id => ({ interestId: id, level: 8 })),
    }),
    [selectedInterests, age]
  )

  const matches = useMemo(
    () => rankMatches(me, MOCK_USERS, priority),
    [me, priority]
  )

  const icebreakerAnswer = icebreakerAnswerId ? getIcebreakerOption(icebreakerAnswerId) : null

  return (
    <main className={`mx-auto px-6 py-10 ${step === 'matches' ? 'max-w-5xl' : 'max-w-3xl'}`}>
      <ProgressBar step={step} />

      {step === 'welcome' && (
        <section className="text-center py-10">
          <span className="inline-block text-5xl mb-4" aria-hidden="true">
            👋
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-primary-800 mb-4">
            Let&rsquo;s set up your ChitChat profile
          </h1>
          <p className="text-xl text-ink/70 mb-8 max-w-xl mx-auto leading-relaxed">
            This is a demo with made-up neighbours &mdash; it shows how ChitChat finds you
            people to meet nearby, or people who share your interests, or a bit of both.
          </p>
          <button
            onClick={() => setStep('profile')}
            className="text-xl font-bold bg-primary-600 hover:bg-primary-700 text-cream px-10 py-4 rounded-full transition-colors shadow-md"
          >
            Get Started
          </button>

          <div className="mt-14 pt-10 border-t border-primary-100 max-w-sm mx-auto text-left">
            <h2 className="text-xl font-semibold text-ink mb-1 text-center">Been here before?</h2>
            <p className="text-base text-ink/60 mb-4 text-center">
              Enter your name and PIN to load your profile.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={loadName}
                onChange={e => setLoadName(e.target.value)}
                placeholder="Your first name"
                className="w-full text-lg px-4 py-3 border-2 border-primary-200 bg-white rounded-xl focus:border-primary-500 focus:outline-none"
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={loadPin}
                onChange={e => setLoadPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4-digit PIN"
                className="w-full text-lg px-4 py-3 border-2 border-primary-200 bg-white rounded-xl focus:border-primary-500 focus:outline-none"
              />
              <button
                onClick={loadMyProfile}
                disabled={!loadName || loadPin.length !== 4 || loadStatus === 'loading'}
                className="w-full text-lg font-semibold bg-accent-600 hover:bg-accent-700 disabled:bg-accent-100 disabled:text-accent-300 text-cream px-6 py-3 rounded-full transition-colors"
              >
                {loadStatus === 'loading' ? 'Loading…' : 'Load my profile'}
              </button>
              {loadStatus === 'error' && (
                <p className="text-base text-red-700 text-center">
                  Couldn&rsquo;t find a profile with that name and PIN.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {step === 'icebreaker' && (
        <section className="py-6">
          <h2 className="font-display text-3xl font-semibold text-primary-800 mb-2">
            One last thing — an icebreaker
          </h2>
          <p className="text-lg text-ink/70 mb-6">
            {ICEBREAKER_QUESTION} We&rsquo;ll show your answer to people you match with, and
            add a couple of related interests to your profile.
          </p>
          <div className="space-y-3">
            {ICEBREAKER_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => chooseIcebreaker(option.id)}
                className="w-full flex items-center gap-4 text-left text-lg font-medium px-5 py-4 rounded-xl border-2 border-primary-200 bg-white hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <span className="text-3xl shrink-0" aria-hidden="true">
                  {option.emoji}
                </span>
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-10">
            <BackButton onClick={() => setStep('interests')} />
          </div>
        </section>
      )}

      {step === 'profile' && (
        <section className="py-6">
          <h2 className="font-display text-3xl font-semibold text-primary-800 mb-6">
            A few details about you
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xl font-medium text-ink mb-2">
                Your first name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Barbara"
                className="w-full text-xl px-4 py-3 border-2 border-primary-200 bg-white rounded-xl focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="town" className="block text-xl font-medium text-ink mb-2">
                Your area
              </label>
              <TownAutocomplete value={town} onChange={setTown} />
            </div>
            <div>
              <label htmlFor="age" className="block text-xl font-medium text-ink mb-2">
                Your age
              </label>
              <input
                id="age"
                type="text"
                inputMode="numeric"
                maxLength={3}
                value={ageInput}
                onChange={e => setAgeInput(e.target.value.replace(/\D/g, '').slice(0, 3))}
                className="w-full text-xl px-4 py-3 border-2 border-primary-200 bg-white rounded-xl focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pin" className="block text-xl font-medium text-ink mb-2">
                Choose a 4-digit PIN
              </label>
              <p className="text-base text-ink/60 mb-2">
                This is how you&rsquo;ll load your profile again next time &mdash; no password needed.
              </p>
              <input
                id="pin"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="e.g. 4821"
                className="w-full text-xl px-4 py-3 border-2 border-primary-200 bg-white rounded-xl focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <BackButton onClick={() => setStep('welcome')} />
            <NextButton
              onClick={() => setStep('interests')}
              disabled={name.trim().length === 0 || pin.length !== 4}
            />
          </div>
        </section>
      )}

      {step === 'interests' && (
        <section className="py-6">
          <h2 className="font-display text-3xl font-semibold text-primary-800 mb-2">
            What do you enjoy, {name || 'friend'}?
          </h2>
          <p className="text-lg text-ink/70 mb-6">
            Pick at least {MIN_INTERESTS} — the more you pick, the better your matches.
          </p>
          <InterestPicker selected={selectedInterests} onToggle={toggleInterest} />
          <div className="flex justify-between mt-10">
            <BackButton onClick={() => setStep('profile')} />
            <NextButton
              onClick={() => setStep('icebreaker')}
              disabled={selectedInterests.length < MIN_INTERESTS}
            />
          </div>
        </section>
      )}

      {step === 'matches' && (
        <section className="py-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="font-display text-3xl font-semibold text-primary-800">
              People near {town} you might like
            </h2>
          </div>

          <SaveStatusNote status={saveStatus} />

          {icebreakerAnswer && (
            <div className="mb-6 bg-primary-50 border border-primary-200 rounded-xl px-5 py-4">
              <p className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-1">
                Your icebreaker
              </p>
              <p className="text-lg text-ink">
                <span aria-hidden="true">{icebreakerAnswer.emoji}</span>{' '}
                {ICEBREAKER_QUESTION} &mdash; &ldquo;{icebreakerAnswer.label}&rdquo;
              </p>
            </div>
          )}

          <div className="mb-8">
            <PrioritySlider value={priority} onChange={setPriority} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {matches.map(result => (
              <MatchCard key={result.user.id} result={result} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-10">
            <BackButton onClick={() => setStep('interests')} label="← Edit my interests" />
            <button
              onClick={startOver}
              className="text-base text-ink/50 hover:text-ink/80 underline"
            >
              Not you? Start over
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

function SaveStatusNote({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null
  const copy = {
    saving: { text: 'Saving your profile…', cls: 'text-ink/50' },
    saved: { text: 'Saved ✓ — your profile is stored online.', cls: 'text-accent-700' },
    error: { text: "Couldn't save online right now — you can keep browsing.", cls: 'text-red-700' },
  }[status]
  return <p className={`text-sm mb-4 ${copy.cls}`}>{copy.text}</p>
}

function ProgressBar({ step }: { step: Step }) {
  const steps: Step[] = ['welcome', 'profile', 'interests', 'icebreaker', 'matches']
  const currentIndex = steps.indexOf(step)
  return (
    <div className="flex gap-2 mb-8 mt-4" aria-hidden="true">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`h-2 flex-1 rounded-full transition-colors ${
            i <= currentIndex ? 'bg-primary-600' : 'bg-primary-100'
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
      className="text-xl font-bold bg-primary-600 hover:bg-primary-700 disabled:bg-primary-100 disabled:text-primary-300 disabled:cursor-not-allowed text-cream px-8 py-4 rounded-full transition-colors shadow-sm disabled:shadow-none"
    >
      Continue
    </button>
  )
}

function BackButton({ onClick, label = '← Back' }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="text-xl font-semibold text-ink/60 hover:text-primary-700 px-6 py-4"
    >
      {label}
    </button>
  )
}
