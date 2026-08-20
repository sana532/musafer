import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FUTURE } from '../../data/slides'

function StationPin({ lit = false }) {
  return (
    <svg className={`future-pin ${lit ? 'is-lit' : ''}`} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.4 L14.4 8 L8 14.6 L1.6 8 Z" />
    </svg>
  )
}

function wavePath(points, vertical) {
  if (points.length < 2) return ''
  const start = points[0]
  let d = `M${start.x.toFixed(1)} ${start.y.toFixed(1)}`
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1]
    const b = points[i]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const sign = i % 2 === 1 ? 1 : -1
    if (vertical) {
      const swing = Math.min(22, Math.abs(dy) * 0.18)
      d += ` C${(a.x + sign * swing).toFixed(1)} ${(a.y + dy * 0.38).toFixed(1)}, ${(b.x - sign * swing).toFixed(1)} ${(b.y - dy * 0.38).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
    } else {
      d += ` C${(a.x + dx * 0.38).toFixed(1)} ${(a.y + sign * 14).toFixed(1)}, ${(b.x - dx * 0.38).toFixed(1)} ${(b.y - sign * 12).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
    }
  }
  return d
}

export function RoadAhead({ active = false }) {
  const [hot, setHot] = useState(null)
  const [path, setPath] = useState('')
  const [fade, setFade] = useState({ x1: 0, y1: 0, x2: 1, y2: 0, vertical: false, w: 1000, h: 90 })
  const roadRef = useRef(null)
  const pinRefs = useRef([])
  const rtl = typeof document === 'undefined' || document.documentElement.dir !== 'ltr'

  useEffect(() => {
    if (!active) setHot(null)
  }, [active])

  const measure = useCallback(() => {
    const root = roadRef.current
    if (!root) return
    const origin = root.getBoundingClientRect()
    if (origin.width < 8 || origin.height < 8) return

    const points = pinRefs.current
      .slice(0, 1 + FUTURE.stops.length)
      .map((el) => {
        if (!el) return null
        const box = el.getBoundingClientRect()
        return {
          x: box.left + box.width / 2 - origin.left,
          y: box.top + box.height / 2 - origin.top,
        }
      })
      .filter(Boolean)

    if (points.length !== 1 + FUTURE.stops.length) return

    const vertical = Math.abs(points.at(-1).y - points[0].y) > Math.abs(points.at(-1).x - points[0].x)
    setFade({
      x1: points[0].x,
      y1: points[0].y,
      x2: points.at(-1).x,
      y2: points.at(-1).y,
      vertical,
      w: origin.width,
      h: origin.height,
    })
    setPath(wavePath(points, vertical))
  }, [])

  useLayoutEffect(() => {
    measure()
    const root = roadRef.current
    if (!root || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => measure())
    observer.observe(root)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, active])

  useEffect(() => {
    if (!active) return undefined
    const frames = [80, 520, 1400, 2800, 3600].map((delay) => window.setTimeout(measure, delay))
    return () => frames.forEach((id) => window.clearTimeout(id))
  }, [active, measure])

  const onEnter = (id) => {
    setHot(id)
  }

  const onLeave = () => {
    setHot(null)
  }

  const setPinRef = (index) => (el) => {
    pinRefs.current[index] = el
  }

  return (
    <div
      ref={roadRef}
      className={`future-road ${active ? 'is-active' : ''} ${hot ? 'is-focusing' : ''} ${rtl ? 'is-rtl' : 'is-ltr'}`}
    >
      <div className="future-horizon" aria-hidden="true" />

      <svg className="future-path" viewBox={`0 0 ${fade.w} ${fade.h}`} preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id="future-fade-h"
            x1={fade.x1}
            y1={fade.y1}
            x2={fade.x2}
            y2={fade.y2}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#c5a96a" stopOpacity="0.95" />
            <stop offset="0.42" stopColor="#8aa05e" stopOpacity="0.7" />
            <stop offset="0.78" stopColor="#8aa05e" stopOpacity="0.42" />
            <stop offset="1" stopColor="#8aa05e" stopOpacity="0.32" />
          </linearGradient>
        </defs>
        {path ? (
          <>
            <path className="future-road-bed" d={path} />
            <path
              key={active ? 'draw' : 'idle'}
              className={`future-road-line ${fade.vertical ? 'is-vertical' : ''}`}
              d={path}
              pathLength="1"
            />
          </>
        ) : null}
      </svg>

      <div className="future-track">
        <div className="future-origin">
          <div className="future-origin-card">
            <strong>{FUTURE.origin}</strong>
          </div>
          <span className="future-stem" aria-hidden="true" />
          <span className="future-pin-slot" ref={setPinRef(0)}>
            <StationPin lit />
          </span>
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
            <span className="future-pin-slot" ref={setPinRef(index + 1)}>
              <StationPin />
            </span>
          </article>
        ))}
      </div>
    </div>
  )
}
