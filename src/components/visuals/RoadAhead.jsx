import { useEffect, useState } from 'react'
import { FUTURE } from '../../data/slides'

const ROAD_H =
  'M972 76 C 830 52, 752 88, 638 70 C 524 52, 448 90, 334 72 C 220 54, 142 86, 36 68'
const ROAD_V = 'M40 16 C 16 88, 64 150, 40 214 C 16 278, 64 338, 40 404 C 18 456, 58 500, 40 548'

function StationPin({ lit = false }) {
  return (
    <svg className={`future-pin ${lit ? 'is-lit' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.4 L14.4 8 L8 14.6 L1.6 8 Z" />
    </svg>
  )
}

export function RoadAhead({ active = false }) {
  const [hot, setHot] = useState(null)
  const rtl = typeof document === 'undefined' || document.documentElement.dir !== 'ltr'

  useEffect(() => {
    if (!active) setHot(null)
  }, [active])

  const onEnter = (id) => {
    setHot(id)
  }

  const onLeave = () => {
    setHot(null)
  }

  return (
    <div
      className={`future-road ${active ? 'is-active' : ''} ${hot ? 'is-focusing' : ''} ${rtl ? 'is-rtl' : 'is-ltr'}`}
    >
      <div className="future-horizon" aria-hidden="true" />

      <svg className="future-path future-path-h" viewBox="0 0 1000 90" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="future-fade-h" x1="972" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c5a96a" stopOpacity="0.95" />
            <stop offset="0.38" stopColor="#8aa05e" stopOpacity="0.62" />
            <stop offset="0.72" stopColor="#8aa05e" stopOpacity="0.28" />
            <stop offset="1" stopColor="#8aa05e" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path className="future-road-bed" d={ROAD_H} />
        <path className="future-road-line" d={ROAD_H} pathLength="1" />
      </svg>

      <svg className="future-path future-path-v" viewBox="0 0 96 560" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="future-fade-v" x1="0" y1="20" x2="0" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c5a96a" stopOpacity="0.95" />
            <stop offset="0.38" stopColor="#8aa05e" stopOpacity="0.62" />
            <stop offset="0.72" stopColor="#8aa05e" stopOpacity="0.28" />
            <stop offset="1" stopColor="#8aa05e" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <path className="future-road-bed is-vertical" d={ROAD_V} />
        <path className="future-road-line is-vertical" d={ROAD_V} pathLength="1" />
      </svg>

      <div className="future-track">
        <div className="future-origin">
          <div className="future-origin-card">
            <strong>{FUTURE.origin}</strong>
          </div>
          <span className="future-stem" aria-hidden="true" />
          <StationPin lit />
        </div>

        {FUTURE.stops.map((stop, index) => (
          <article
            key={stop.id}
            className={`future-stop future-stop-${index + 1} ${hot === stop.id ? 'is-hot' : hot ? 'is-dim' : ''}`}
            style={{ '--i': index }}
            tabIndex={0}
            aria-label={`${stop.n} ${stop.title}`}
            onMouseEnter={() => onEnter(stop.id)}
            onMouseLeave={onLeave}
            onFocus={() => onEnter(stop.id)}
            onBlur={onLeave}
          >
            <div className="future-card">
              <span className="future-n">{stop.n}</span>
              <h3>{stop.title}</h3>
              <ul>
                {stop.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <span className="future-stem" aria-hidden="true" />
            <StationPin />
          </article>
        ))}
      </div>
    </div>
  )
}
