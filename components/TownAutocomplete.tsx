'use client'

import { useEffect, useId, useRef, useState } from 'react'

export default function TownAutocomplete({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const listId = useId()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const requestId = useRef(0)

  useEffect(() => {
    if (!isOpen || value.trim().length < 2) {
      setSuggestions([])
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const thisRequest = ++requestId.current
      setIsLoading(true)
      try {
        const res = await fetch(`/api/towns?q=${encodeURIComponent(value)}`)
        const data = await res.json()
        if (thisRequest === requestId.current) {
          setSuggestions(Array.isArray(data.towns) ? data.towns : [])
        }
      } catch {
        if (thisRequest === requestId.current) setSuggestions([])
      } finally {
        if (thisRequest === requestId.current) setIsLoading(false)
      }
    }, 350)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, isOpen])

  const selectTown = (town: string) => {
    onChange(town)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(prev => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(prev => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      selectTown(suggestions[highlighted])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <input
        id="town"
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        value={value}
        onChange={e => {
          onChange(e.target.value)
          setIsOpen(true)
          setHighlighted(0)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        onKeyDown={handleKeyDown}
        placeholder="Start typing a town or city…"
        className="w-full text-xl px-4 py-3 border-2 border-primary-200 bg-white rounded-xl focus:border-primary-500 focus:outline-none"
      />
      {isOpen && (isLoading || suggestions.length > 0) && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 w-full bg-white border-2 border-primary-200 rounded-xl shadow-lg overflow-hidden"
        >
          {isLoading && suggestions.length === 0 && (
            <li className="px-4 py-3 text-lg text-ink/50">Searching…</li>
          )}
          {suggestions.map((town, i) => (
            <li key={town} role="option" aria-selected={i === highlighted}>
              <button
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => selectTown(town)}
                className={`w-full text-left text-lg px-4 py-3 transition-colors ${
                  i === highlighted ? 'bg-primary-100 text-primary-800' : 'text-ink hover:bg-primary-50'
                }`}
              >
                {town}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
