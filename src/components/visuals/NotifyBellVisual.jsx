import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

export function NotifyBellVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [ringing, setRinging] = useState(false)

  useEffect(() => {
    if (!active) {
      setRinging(false)
      return undefined
    }
    if (reduced) {
      setRinging(false)
      return undefined
    }
    const timer = window.setTimeout(() => setRinging(true), 720)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  return (
    <div className={`notify-bell ${active ? 'is-active' : ''} ${ringing ? 'is-ringing' : ''}`}>
      <svg className="notify-bell-svg" viewBox="0 0 220 240" fill="none" aria-hidden="true">
        <circle className="notify-ping" cx="110" cy="118" r="78" />
        <circle className="notify-ping is-late" cx="110" cy="118" r="78" />
        <g className="notify-bell-mark">
          <path className="notify-handle" d="M96 46 C96 32, 124 32, 124 46" />
          <path
            className="notify-body"
            d="M68 86 C68 58, 152 58, 152 86 L164 148 C166 166, 54 166, 56 148 Z"
          />
          <path className="notify-lip" d="M56 148 H164" />
          <circle className="notify-clapper" cx="110" cy="176" r="8" />
        </g>
      </svg>
    </div>
  )
}
