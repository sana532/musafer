import { useEffect, useMemo, useState } from 'react'
import { PROCESS_MODEL } from '../../data/slides'
import { usePresentation } from '../../hooks/usePresentation'

const VB_W = 1280
const VB_H = 860
const CX = 640
const CY = 455
const RX = 428
const RY = 255
const STAGE_COUNT = PROCESS_MODEL.stages.length
const MAX_STEP = STAGE_COUNT
const STEP_MS = 760
const START_MS = 480

function ellipsePoint(index, count = STAGE_COUNT) {
  const deg = -90 + (index * 360) / count
  const rad = (deg * Math.PI) / 180
  return {
    x: CX + RX * Math.cos(rad),
    y: CY + RY * Math.sin(rad),
    nx: Math.cos(rad),
    ny: Math.sin(rad),
  }
}

function arcD(from, to) {
  return `M${from.x.toFixed(2)} ${from.y.toFixed(2)} A ${RX} ${RY} 0 0 1 ${to.x.toFixed(2)} ${to.y.toFixed(2)}`
}

export function ProcessLoop({ active = false }) {
  const { reduced } = usePresentation()
  const [step, setStep] = useState(0)

  const geometry = useMemo(() => {
    const points = PROCESS_MODEL.stages.map((stage, index) => {
      const point = ellipsePoint(index)
      return {
        stage,
        index,
        point,
        left: (point.x / VB_W) * 100,
        top: (point.y / VB_H) * 100,
      }
    })
    const segments = points.map((item, index) => {
      const next = points[(index + 1) % points.length]
      return {
        id: `${item.stage.id}-${next.stage.id}`,
        index,
        d: arcD(item.point, next.point),
        isReturn: index === points.length - 1,
      }
    })
    return { points, segments }
  }, [])

  useEffect(() => {
    if (!active) {
      setStep(0)
      return undefined
    }

    if (reduced) {
      setStep(MAX_STEP)
      return undefined
    }

    setStep(0)
    const timers = []
    for (let next = 1; next <= MAX_STEP; next += 1) {
      timers.push(window.setTimeout(() => setStep(next), START_MS + (next - 1) * STEP_MS))
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [active, reduced])

  const looped = step >= MAX_STEP
  const now = looped ? -1 : step

  return (
    <div
      className={`process-loop ${active ? 'is-active' : ''} ${looped ? 'is-looped' : ''}`}
      data-step={step}
    >
      <div className="process-orbit">
        <svg
          className="process-svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="process-loop-arrow"
              markerWidth="12"
              markerHeight="12"
              refX="9"
              refY="6"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path className="process-arrow-head" d="M2 2 L10 6 L2 10" />
            </marker>
          </defs>

          <ellipse className="loop-ghost" cx={CX} cy={CY} rx={RX} ry={RY} />

          {geometry.segments.map((segment) => {
            const on = active && step > segment.index
            const latest = active && !looped && step === segment.index + 1
            return (
              <path
                key={segment.id}
                className={`process-seg ${on ? 'is-on' : ''} ${latest ? 'is-latest' : ''} ${segment.isReturn ? 'is-return' : ''}`}
                d={segment.d}
                pathLength="1"
                markerEnd={segment.isReturn && on ? 'url(#process-loop-arrow)' : undefined}
              />
            )
          })}
        </svg>

        <p className="process-headline">{PROCESS_MODEL.headline}</p>

        {geometry.points.map((item) => {
          const revealed = active && step >= item.index
          const isNow = revealed && item.index === now
          const isPast = revealed && now >= 0 && !isNow
          return (
            <div
              key={item.stage.id}
              className={`process-node ${revealed ? 'is-on' : ''} ${isNow ? 'is-now' : ''} ${isPast ? 'is-past' : ''}`}
              data-k={item.index}
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                '--nx': String(item.point.nx),
                '--ny': String(item.point.ny),
              }}
            >
              <span className="process-dot">{item.stage.n}</span>
              <StageCopy stage={item.stage} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StageCopy({ stage }) {
  const keys = stage.keys.filter((item) => item !== stage.en && item !== stage.ar)

  return (
    <div className="process-copy">
      <strong>{stage.en}</strong>
      {stage.ar && stage.ar !== stage.en ? <em>{stage.ar}</em> : null}
      {keys.length ? (
        <p className="process-keys">
          {keys.map((item, index) => (
            <span key={item}>
              {item}
              {index < keys.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  )
}
