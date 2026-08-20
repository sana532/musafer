import { useEffect, useMemo, useRef, useState } from 'react'
import { NFR_PILLARS } from '../../data/slides'
import { usePresentation } from '../../hooks/usePresentation'
import { LINE_ICONS } from '../icons/Icons'

const VB_W = 1280
const VB_H = 1000
const CX = 640
const CY = 508
const RADIUS = 298
const RING_SCALES = [0.38, 0.68, 1]
const START_DEG = -90

function polar(index, radius) {
  const deg = START_DEG + index * 60
  const rad = (deg * Math.PI) / 180
  return {
    deg,
    rad,
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
    nx: Math.cos(rad),
    ny: Math.sin(rad),
  }
}

function hexD(radius) {
  return (
    Array.from({ length: 6 }, (_, i) => {
      const p = polar(i, radius)
      return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    }).join(' ') + 'Z'
  )
}

function fanD(index, radius) {
  const prev = polar((index + 5) % 6, radius)
  const curr = polar(index, radius)
  const next = polar((index + 1) % 6, radius)
  const midA = { x: (prev.x + curr.x) / 2, y: (prev.y + curr.y) / 2 }
  const midB = { x: (curr.x + next.x) / 2, y: (curr.y + next.y) / 2 }
  return `M${midA.x.toFixed(2)} ${midA.y.toFixed(2)} L${curr.x.toFixed(2)} ${curr.y.toFixed(2)} L${midB.x.toFixed(2)} ${midB.y.toFixed(2)}`
}

const REVEAL_ORDER = NFR_PILLARS.map((pillar) => pillar.id)
const MAX_STEP = REVEAL_ORDER.length

export function QualityRadar({ active = false, collapsing = false }) {
  const { registerInnerNav } = usePresentation()
  const [played, setPlayed] = useState(false)
  const [step, setStep] = useState(0)
  const stepRef = useRef(0)
  stepRef.current = step

  useEffect(() => {
    if (active) setPlayed(true)
    else setStep(0)
  }, [active])

  useEffect(() => {
    if (collapsing) setStep(0)
  }, [collapsing])

  useEffect(() => {
    if (!active) return undefined
    return registerInnerNav((dir) => {
      const current = stepRef.current
      if (dir > 0 && current < MAX_STEP) {
        setStep(current + 1)
        return true
      }
      if (dir < 0 && current > 0) {
        setStep(current - 1)
        return true
      }
      return false
    })
  }, [active, registerInnerNav])

  const open = step > 0 ? REVEAL_ORDER[step - 1] : null

  const geometry = useMemo(
    () =>
      NFR_PILLARS.map((pillar, index) => {
        const vertex = polar(index, RADIUS)
        return {
          pillar,
          index,
          vertex,
          fan: fanD(index, RADIUS),
          left: (vertex.x / VB_W) * 100,
          top: (vertex.y / VB_H) * 100,
        }
      }),
    [],
  )

  const rings = useMemo(() => RING_SCALES.map((scale) => hexD(RADIUS * scale)), [])

  const onToggle = (id) => {
    const index = REVEAL_ORDER.indexOf(id)
    if (index < 0) return
    setStep(index + 1)
  }

  const lit = Boolean(open)

  return (
    <div
      className={`quality-radar ${active || played ? 'is-active' : ''} ${lit ? 'is-lit' : ''} ${collapsing ? 'is-collapsing' : ''} ${open ? 'is-revealing' : 'is-overview'}`}
    >
      <div className="radar-stage">
        <svg
          className="radar-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="nfr-radar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {rings.map((d, index) => (
            <path
              key={RING_SCALES[index]}
              className={`radar-ring ${index === 2 ? 'is-outer' : index === 1 ? 'is-mid' : 'is-inner'}`}
              d={d}
              pathLength="1"
              style={{ '--i': String(index) }}
            />
          ))}

          <polygon
            className="radar-origin"
            points={originPoints()}
          />

          {geometry.map((item) => {
            const hot = open === item.pillar.id
            return (
              <g
                key={item.pillar.id}
                className={`radar-fan ${hot ? 'is-hot' : lit ? 'is-dim' : ''}`}
                style={{ '--i': String(item.index) }}
              >
                {hot ? (
                  <path className="radar-fan-glow" d={item.fan} filter="url(#nfr-radar-glow)" />
                ) : null}
                <path className="radar-fan-line" d={item.fan} pathLength="1" />
              </g>
            )
          })}
        </svg>

        {geometry.map((item) => {
          const { pillar, index, vertex } = item
          const hot = open === pillar.id
          const dim = lit && !hot
          const Icon = LINE_ICONS[pillar.icon]
          const panelId = `nfr-radar-panel-${pillar.id}`

          return (
            <div
              key={pillar.id}
              className={`radar-slot ${hot ? 'is-hot' : ''} ${dim ? 'is-dim' : ''}`}
              data-k={index}
              style={{
                '--i': String(index),
                '--nx': String(vertex.nx),
                '--ny': String(vertex.ny),
                left: `${item.left}%`,
                top: `${item.top}%`,
              }}
            >
              <button
                type="button"
                className={`radar-node ${hot ? 'is-hot' : ''}`}
                onClick={() => onToggle(pillar.id)}
                aria-expanded={hot}
                aria-controls={hot ? panelId : undefined}
                aria-label={`${pillar.en} — ${pillar.ar}`}
              >
                <span className="radar-mark">
                  {Icon ? <Icon /> : null}
                </span>
                <span className="radar-copy">
                  <small>{pillar.en}</small>
                  <strong>{pillar.ar}</strong>
                </span>
                {hot ? (
                  <div id={panelId} className="radar-panel" role="tooltip">
                    <span>{pillar.summary}</span>
                    <small>{pillar.tech}</small>
                  </div>
                ) : null}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function originPoints() {
  const r = 7
  return Array.from({ length: 6 }, (_, i) => {
    const p = polar(i, r)
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
  }).join(' ')
}
