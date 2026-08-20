import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const WAVE = 'M 348 152 C 292 92, 216 92, 160 172'

export function PaySecureVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [cycling, setCycling] = useState(false)

  useEffect(() => {
    if (!active) {
      setCycling(false)
      return undefined
    }
    if (reduced) {
      setCycling(false)
      return undefined
    }
    const timer = window.setTimeout(() => setCycling(true), 860)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  return (
    <div className={`pay-secure ${active ? 'is-active' : ''} ${cycling ? 'is-cycling' : ''}`}>
      <svg className="pay-secure-svg" viewBox="0 0 680 300" fill="none" aria-hidden="true">
        <g className="pay-card">
          <rect className="pay-card-body" x="352" y="74" width="252" height="156" rx="20" />
          <path className="pay-card-stripe" d="M374 118 H 582" />
          <rect className="pay-card-chip" x="376" y="140" width="36" height="26" rx="5" />
        </g>

        <path className="pay-wave" d={WAVE} pathLength="1" />
        <path className="pay-pulse" d={WAVE} pathLength="1" />

        <g className="pay-lock">
          <g className="pay-lock-shackle">
            <path d="M114 158 V 126 A 14 14 0 0 1 142 126 V 158" />
          </g>
          <rect className="pay-lock-body" x="104" y="154" width="48" height="38" rx="8" />
        </g>
      </svg>
    </div>
  )
}
