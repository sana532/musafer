import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const STOPS = [
  { x: 78, tick: 10 },
  { x: 168, tick: 16 },
  { x: 278, tick: 8 },
  { x: 352, tick: 20 },
  { x: 486, tick: 12 },
  { x: 612, tick: 18 },
]

const Y = 168

export function TripScheduleVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!active) {
      setPlaying(false)
      return undefined
    }
    if (reduced) {
      setPlaying(false)
      return undefined
    }
    const timer = window.setTimeout(() => setPlaying(true), 1480)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  return (
    <div className={`trip-schedule ${active ? 'is-active' : ''} ${playing ? 'is-playing' : ''}`}>
      <svg className="trip-schedule-svg" viewBox="0 0 700 280" fill="none" aria-hidden="true">
        <path className="trip-line" d={`M56 ${Y} H 644`} pathLength="1" />

        {STOPS.map((stop, index) => (
          <g key={stop.x} className="trip-stop" style={{ '--i': index }}>
            <path className="trip-tick" d={`M${stop.x} ${Y - 8} V ${Y - 8 - stop.tick}`} />
            <path className="trip-tick-bar" d={`M${stop.x - 5} ${Y - 10 - stop.tick} H ${stop.x + 5}`} />
            <circle className="trip-dot" cx={stop.x} cy={Y} r="4.2" />
          </g>
        ))}

        <g className="trip-handle">
          <path className="trip-handle-stem" d={`M0 ${Y - 6} V ${Y - 36}`} />
          <rect className="trip-handle-knob" x="-11" y={Y - 52} width="22" height="18" rx="9" />
          <circle className="trip-handle-pin" cx="0" cy={Y} r="3" />
        </g>
      </svg>
    </div>
  )
}
