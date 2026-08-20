import { useEffect, useState } from 'react'
import { BusShape } from './RouteVisual'

const ARRIVAL_PATH = 'M64 180 L470 180'

const ARRIVAL_TIMING = {
  road: 1400,
  busDelay: 250,
  busDur: 3200,
  arrive: 3450,
}

function HubGpsMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  )
}

export function ArrivalVisual({
  parallax = { x: 0, y: 0 },
  active = false,
  reduced = false,
}) {
  const [arrived, setArrived] = useState(false)
  const showMotion = active && !reduced

  useEffect(() => {
    if (!active) {
      setArrived(false)
      return undefined
    }
    if (reduced) {
      setArrived(true)
      return undefined
    }
    const timer = window.setTimeout(() => setArrived(true), ARRIVAL_TIMING.arrive)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  const layer = (factor) => ({
    transform: `translate(${parallax.x * factor}px, ${parallax.y * factor}px)`,
  })

  const parkX = reduced && active ? 470 : 64

  return (
    <div className={`route-visual arrival-visual ${active ? 'is-active' : ''}`} aria-hidden="true">
      <svg
        key={showMotion ? 'play' : 'idle'}
        className="route-svg"
        viewBox="0 0 640 360"
        fill="none"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient id="arrival-road" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8aa05e" />
            <stop offset="1" stopColor="#c4a35a" />
          </linearGradient>
          <filter id="arrival-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="route-bg" style={layer(0.16)}>
          <circle cx="96" cy="64" r="58" />
          <circle cx="560" cy="300" r="72" />
        </g>

        <g style={layer(0.38)}>
          <path className="arrival-halo" d={ARRIVAL_PATH} pathLength="1" />
          <path
            id="arrival-path"
            className="arrival-line"
            d={ARRIVAL_PATH}
            pathLength="1"
            filter="url(#arrival-glow)"
          />

          <circle cx="64" cy="180" r="10" className="station-core" />
          <circle cx="64" cy="180" r="22" className="station-ring" />
        </g>

        <g className="bus-layer" style={layer(0.55)}>
          {showMotion ? (
            <g className="bus-animated">
              <animateMotion
                dur="3.2s"
                begin="0.25s"
                fill="freeze"
                rotate="auto"
                repeatCount="1"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.33 0.08 0.18 1"
              >
                <mpath href="#arrival-path" xlinkHref="#arrival-path" />
              </animateMotion>
              <BusShape />
            </g>
          ) : (
            <g className="bus-static" transform={`translate(${parkX} 180)`}>
              <BusShape />
            </g>
          )}
        </g>
      </svg>

      <div className={`arrival-hub hub-core ${arrived ? 'is-lit' : ''}`}>
        <span className={`hub-mark ${arrived ? 'is-live' : ''}`}>
          <HubGpsMark />
        </span>
        <strong>مسافر</strong>
        <small>MUSAFER</small>
      </div>
    </div>
  )
}
