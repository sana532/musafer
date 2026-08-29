import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const PATH_D = 'M170 60 C 130 20, 90 100, 50 60'

export function OfflineBookingVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [traveling, setTraveling] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (!active) {
      setTraveling(false)
      setConfirmed(false)
      return undefined
    }
    if (reduced) {
      setTraveling(true)
      setConfirmed(true)
      return undefined
    }
    const travelTimer = window.setTimeout(() => setTraveling(true), 600)
    const confirmTimer = window.setTimeout(() => setConfirmed(true), 2000)
    return () => {
      window.clearTimeout(travelTimer)
      window.clearTimeout(confirmTimer)
    }
  }, [active, reduced])

  return (
    <div
      className={`offline-booking ${active ? 'is-active' : ''} ${traveling ? 'is-traveling' : ''} ${confirmed ? 'is-confirmed' : ''}`}
    >
      <svg className="offline-booking-mark" viewBox="0 0 220 120" fill="none" aria-hidden="true">
        <path className="ob-link" d={PATH_D} pathLength="1" />

        <g className="ob-icon ob-phone">
          <rect x="158" y="42" width="24" height="36" rx="5" />
          <line x1="164" y1="70" x2="176" y2="70" />
        </g>

        <g className="ob-icon ob-ticket">
          <rect x="30" y="46" width="40" height="28" rx="4" />
          <line x1="30" y1="60" x2="70" y2="60" strokeDasharray="2 3" />
          <path className="ob-check" d="M42 60 L48 66 L58 54" />
        </g>
      </svg>

      <span className="ob-pulse" aria-hidden="true" />
    </div>
  )
}