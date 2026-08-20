import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const RAW_DOTS = [
  { x: 528, y: 108, i: 0, gx: -86, gy: 78 },
  { x: 572, y: 132, i: 1, gx: -118, gy: 62 },
  { x: 504, y: 156, i: 2, gx: -64, gy: 42 },
  { x: 612, y: 164, i: 3, gx: -148, gy: 38 },
  { x: 548, y: 188, i: 4, gx: -96, gy: 18 },
  { x: 590, y: 204, i: 5, gx: -128, gy: 8 },
  { x: 516, y: 228, i: 6, gx: -72, gy: -16 },
  { x: 638, y: 236, i: 7, gx: -168, gy: -22 },
  { x: 560, y: 262, i: 8, gx: -102, gy: -46 },
  { x: 604, y: 284, i: 9, gx: -140, gy: -68 },
  { x: 522, y: 308, i: 10, gx: -74, gy: -88 },
  { x: 578, y: 322, i: 11, gx: -118, gy: -102 },
]

const RAW_BARS = [
  { x: 500, h: 28, i: 0 },
  { x: 522, h: 52, i: 1 },
  { x: 544, h: 18, i: 2 },
  { x: 566, h: 44, i: 3 },
  { x: 588, h: 24, i: 4 },
  { x: 610, h: 36, i: 5 },
]

const REPORT_LINES = [
  { y: 108, w: 168 },
  { y: 128, w: 132 },
  { y: 148, w: 154 },
  { y: 176, w: 96 },
  { y: 196, w: 148 },
]

const REPORT_BARS = [
  { x: 78, h: 36 },
  { x: 106, h: 58 },
  { x: 134, h: 46 },
  { x: 162, h: 78 },
]

export function AiReportsVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (!active) {
      setPhase('idle')
      return undefined
    }
    if (reduced) {
      setPhase('ready')
      return undefined
    }
    setPhase('raw')
    const gather = window.setTimeout(() => setPhase('gather'), 780)
    const ready = window.setTimeout(() => setPhase('ready'), 1680)
    return () => {
      window.clearTimeout(gather)
      window.clearTimeout(ready)
    }
  }, [active, reduced])

  return (
    <div className={`ai-reports is-${phase} ${active ? 'is-active' : ''}`}>
      <svg className="ai-reports-svg" viewBox="0 0 720 420" fill="none" aria-hidden="true">
        <defs>
          <marker id="ai-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M1 1 L7 4 L1 7" />
          </marker>
        </defs>

        <g className="ai-raw">
          {RAW_BARS.map((bar) => (
            <rect
              key={bar.x}
              className="ai-raw-bar"
              x={bar.x}
              y={318 - bar.h}
              width="12"
              height={bar.h}
              rx="2"
              style={{ '--i': bar.i }}
            />
          ))}
          {RAW_DOTS.map((dot) => (
            <circle
              key={`${dot.x}-${dot.y}`}
              className="ai-dot"
              cx={dot.x}
              cy={dot.y}
              r="4"
              style={{ '--i': dot.i, '--gx': `${dot.gx}px`, '--gy': `${dot.gy}px` }}
            />
          ))}
        </g>

        <g className="ai-net">
          <path className="ai-net-line" d="M348 168 L388 210 L348 252" />
          <path className="ai-net-line" d="M388 210 L428 186" />
          <path className="ai-net-line" d="M388 210 L428 234" />
          <path className="ai-net-line" d="M348 168 L428 186" />
          <path className="ai-net-line" d="M348 252 L428 234" />
          <circle className="ai-node" cx="348" cy="168" r="6" />
          <circle className="ai-node" cx="348" cy="252" r="6" />
          <circle className="ai-node is-core" cx="388" cy="210" r="7.5" />
          <circle className="ai-node" cx="428" cy="186" r="5.5" />
          <circle className="ai-node" cx="428" cy="234" r="5.5" />
          <path className="ai-flow" d="M318 210 H 286" markerEnd="url(#ai-arrow)" pathLength="1" />
        </g>

        <g className="ai-report">
          <rect className="ai-report-card" x="48" y="72" width="220" height="276" rx="16" />
          {REPORT_LINES.map((line, index) => (
            <path
              key={line.y}
              className="ai-report-line"
              d={`M72 ${line.y} H ${72 + line.w}`}
              pathLength="1"
              style={{ '--i': index }}
            />
          ))}
          {REPORT_BARS.map((bar, index) => (
            <rect
              key={bar.x}
              className="ai-report-bar"
              x={bar.x}
              y={318 - bar.h}
              width="18"
              height={bar.h}
              rx="3"
              style={{ '--i': index }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
