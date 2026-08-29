import { useEffect, useMemo, useRef, useState } from 'react'
import { CHALLENGES } from '../../data/slides'
import { useCoarsePointer } from '../../hooks/useMedia'
import { usePresentation } from '../../hooks/usePresentation'
import { LINE_ICONS } from '../icons/Icons'

const CX = 50
const CY = 52
const RADIUS = 34
const START_DEG = -90

function polar(index, total) {
  const step = 360 / total
  const deg = START_DEG + index * step
  const rad = (deg * Math.PI) / 180
  const nx = Math.cos(rad)
  const ny = Math.sin(rad)
  return {
    x: CX + RADIUS * nx,
    y: CY + RADIUS * ny,
    nx,
    ny,
  }
}

function polygonD(total) {
  return (
    Array.from({ length: total }, (_, i) => {
      const point = polar(i, total)
      return `${i === 0 ? 'M' : 'L'}${point.x.toFixed(2)} ${point.y.toFixed(2)}`
    }).join(' ') + 'Z'
  )
}

export function ChallengeOrbit({ active = false }) {
  const coarse = useCoarsePointer()
  const { registerInnerNav } = usePresentation()
  const [played, setPlayed] = useState(false)
  const [open, setOpen] = useState(null)
  const openRef = useRef(null)
  openRef.current = open
  const total = CHALLENGES.nodes.length
  const ids = useMemo(() => CHALLENGES.nodes.map((node) => node.id), [])
  const ring = useMemo(() => polygonD(total), [total])
  const points = useMemo(
    () => CHALLENGES.nodes.map((_, index) => polar(index, total)),
    [total],
  )

  useEffect(() => {
    if (active) setPlayed(true)
    else setOpen(null)
  }, [active])

  useEffect(() => {
    if (!active) return undefined
    return registerInnerNav((dir) => {
      const current = openRef.current
      const index = ids.indexOf(current)
      if (dir > 0) {
        if (!current) {
          setOpen(ids[0])
          return true
        }
        if (index < ids.length - 1) {
          setOpen(ids[index + 1])
          return true
        }
        return false
      }
      if (dir < 0) {
        if (!current) return false
        if (index > 0) {
          setOpen(ids[index - 1])
          return true
        }
        setOpen(null)
        return true
      }
      return false
    })
  }, [active, ids, registerInnerNav])

  const onEnter = (id) => {
    if (!coarse) setOpen(id)
  }

  const onLeave = () => {
    if (!coarse) setOpen(null)
  }

  const onToggle = (id) => {
    if (!coarse) return
    setOpen((value) => (value === id ? null : id))
  }

  const live = active || played
  const lit = Boolean(open)

  return (
    <div className={`challenge-orbit ${live ? 'is-active' : ''} ${lit ? 'is-lit' : ''}`}>
      <div className="challenge-stage">
        <svg className="challenge-spokes" viewBox="0 0 100 100" aria-hidden="true">
          <path className="challenge-ring" d={ring} pathLength="1" />
          {points.map((point, index) => (
            <path
              key={CHALLENGES.nodes[index].id}
              className={`challenge-spoke ${open === CHALLENGES.nodes[index].id ? 'is-hot' : ''}`}
              d={`M${CX} ${CY} L${point.x.toFixed(2)} ${point.y.toFixed(2)}`}
              pathLength="1"
              style={{ '--i': index }}
            />
          ))}
          <circle className="challenge-core" cx={CX} cy={CY} r="7.4" />
        </svg>

        <div className="challenge-hub" aria-hidden="true">
          <strong>{CHALLENGES.hub}</strong>
        </div>

        {CHALLENGES.nodes.map((node, index) => {
          const Icon = LINE_ICONS[node.icon]
          const hot = open === node.id
          const dim = lit && !hot
          return (
            <div
              key={node.id}
              className={`challenge-slot ${hot ? 'is-hot' : ''} ${dim ? 'is-dim' : ''}`}
              data-k={index}
              style={{
                '--i': index,
                '--nx': points[index].nx,
                '--ny': points[index].ny,
                left: `${points[index].x}%`,
                top: `${points[index].y}%`,
              }}
              onMouseEnter={() => onEnter(node.id)}
              onMouseLeave={onLeave}
            >
              <button
                type="button"
                className={`challenge-node ${hot ? 'is-hot' : ''}`}
                onFocus={() => onEnter(node.id)}
                onBlur={onLeave}
                onClick={() => onToggle(node.id)}
                aria-pressed={hot}
              >
                <span className="challenge-mark">{Icon ? <Icon /> : null}</span>
                <span className="challenge-copy">
                  <small>{node.n}</small>
                  <strong>{node.key}</strong>
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}