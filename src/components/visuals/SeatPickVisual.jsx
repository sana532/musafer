import { useEffect, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const COLS = [54, 96, 168, 210]
const ROWS = [82, 126, 170, 214, 258, 302, 346]
const RESERVED = new Set(['0-1', '1-3', '2-0', '3-2', '4-1', '5-3', '6-0'])
const PICK = ['2-2', '2-3', '3-3']

export function SeatPickVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [picking, setPicking] = useState(false)

  useEffect(() => {
    if (!active) {
      setPicking(false)
      return undefined
    }
    if (reduced) {
      setPicking(false)
      return undefined
    }
    const timer = window.setTimeout(() => setPicking(true), 620)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  return (
    <div className={`seat-map ${active ? 'is-active' : ''} ${picking ? 'is-picking' : ''}`}>
      <svg className="seat-map-svg" viewBox="0 0 280 430" fill="none" aria-hidden="true">
        <rect className="seat-shell" x="28" y="28" width="224" height="374" rx="28" />
        <path className="seat-front" d="M86 44 H 194" />
        <rect className="seat-wheel" x="118" y="52" width="44" height="16" rx="8" />

        {ROWS.map((y, row) =>
          COLS.map((x, col) => {
            const id = `${row}-${col}`
            const reserved = RESERVED.has(id)
            const pick = PICK.indexOf(id)
            return (
              <rect
                key={id}
                className={`seat-node ${reserved ? 'is-reserved' : ''} ${pick >= 0 ? `is-pick pick-${pick}` : ''}`}
                x={x}
                y={y}
                width="32"
                height="26"
                rx="8"
              />
            )
          }),
        )}
      </svg>
    </div>
  )
}
