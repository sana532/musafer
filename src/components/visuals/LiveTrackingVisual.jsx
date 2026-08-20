import { useEffect, useId, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const ROUTE = 'M28 75 C 46 64, 50 38, 37 25'

export function LiveTrackingVisual({ active = false }) {
  const { reduced } = usePresentation()
  const uid = useId().replace(/:/g, '')
  const routeId = `live-route-${uid}`
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    if (!active) {
      setMoving(false)
      return undefined
    }
    if (reduced) {
      setMoving(true)
      return undefined
    }
    const timer = window.setTimeout(() => setMoving(true), 1880)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  const live = active && moving && !reduced

  return (
    <div className={`live-tracking ${active ? 'is-active' : ''} ${moving ? 'is-live' : ''}`}>
      <div className="live-map-stack">
        <img className="live-map-img" src="/syria-map-outline.png" alt="" />

        <svg className="live-map-overlay" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
          <path id={routeId} className="live-map-route" d={ROUTE} pathLength="1" />

          {live ? (
            <g>
              <circle className="live-pulse" r="3.4" />
              <circle className="live-pulse is-late" r="3.4" />
              <circle className="live-bus" r="1.15" />
              <animateMotion dur="10s" repeatCount="indefinite" rotate="0">
                <mpath href={`#${routeId}`} />
              </animateMotion>
            </g>
          ) : null}

          {active && moving && reduced ? (
            <g transform="translate(28 75)">
              <circle className="live-pulse" r="3.4" />
              <circle className="live-bus" r="1.15" />
            </g>
          ) : null}
        </svg>

        <span className="live-city live-city-damascus">دمشق</span>
        <span className="live-city live-city-aleppo">حلب</span>
      </div>
    </div>
  )
}
