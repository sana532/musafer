import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const BACK = [
  { x: 58, y: 42, w: 364, h: 236, rx: 26, o: 0.38 },
  { x: 84, y: 68, w: 328, h: 212, rx: 22, o: 0.62 },
]

export function PlanStackVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    if (!active) {
      setFloating(false)
      return undefined
    }
    if (reduced) {
      setFloating(false)
      return undefined
    }
    const timer = window.setTimeout(() => setFloating(true), 1720)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  return (
    <div className={`plan-stack ${active ? 'is-active' : ''} ${floating ? 'is-floating' : ''}`}>
      <svg className="plan-stack-svg" viewBox="0 0 480 340" fill="none" aria-hidden="true">
        {BACK.map((layer, index) => (
          <g key={layer.x} className="plan-layer" style={{ '--i': index, '--o': layer.o }}>
            <rect className="plan-card" x={layer.x} y={layer.y} width={layer.w} height={layer.h} rx={layer.rx} />
          </g>
        ))}

        <g className="plan-layer is-front" style={{ '--i': 2, '--o': 1 }}>
          <rect className="plan-card" x="114" y="98" width="288" height="184" rx="20" />
          <path className="plan-front-line" d="M138 132 H 332" />
          <path className="plan-front-line" d="M138 168 H 280" />
          <path className="plan-front-line" d="M138 192 H 246" />
          <path className="plan-front-line" d="M138 216 H 264" />
          <path
            className="plan-front-star"
            d="M378 114.5 L380.1 120.1 L386.1 120.4 L381.4 124.1 L383 129.9 L378 126.6 L373 129.9 L374.6 124.1 L369.9 120.4 L375.9 120.1 Z"
          />
        </g>
      </svg>
    </div>
  )
}
