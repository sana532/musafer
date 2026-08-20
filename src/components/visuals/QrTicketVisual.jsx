import { useEffect, useMemo, useState } from 'react'
import { usePresentation } from '../../hooks/usePresentation'

const SIZE = 21
const CELL = 4
const ORIGIN = 18

function inFinder(x, y, fx, fy) {
  return x >= fx && x < fx + 7 && y >= fy && y < fy + 7
}

function finderFilled(x, y, fx, fy) {
  const lx = x - fx
  const ly = y - fy
  const ring = lx === 0 || ly === 0 || lx === 6 || ly === 6
  const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4
  return ring || core
}

function isTiming(x, y) {
  return (y === 6 && x >= 8 && x <= 12) || (x === 6 && y >= 8 && y <= 12)
}

function dataFilled(x, y) {
  return (x * 5 + y * 13 + x * y) % 3 !== 1
}

function modules() {
  const cells = []
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const finder =
        (inFinder(x, y, 0, 0) && finderFilled(x, y, 0, 0)) ||
        (inFinder(x, y, 14, 0) && finderFilled(x, y, 14, 0)) ||
        (inFinder(x, y, 0, 14) && finderFilled(x, y, 0, 14))
      const timing = isTiming(x, y) && (x + y) % 2 === 0
      const data =
        !inFinder(x, y, 0, 0) &&
        !inFinder(x, y, 14, 0) &&
        !inFinder(x, y, 0, 14) &&
        !(x === 6 || y === 6) &&
        dataFilled(x, y)
      if (finder || timing || data) {
        cells.push({ x, y, finder })
      }
    }
  }
  return cells
}

export function QrTicketVisual({ active = false }) {
  const { reduced } = usePresentation()
  const [scanning, setScanning] = useState(false)
  const cells = useMemo(modules, [])

  useEffect(() => {
    if (!active) {
      setScanning(false)
      return undefined
    }
    if (reduced) {
      setScanning(false)
      return undefined
    }
    const timer = window.setTimeout(() => setScanning(true), 720)
    return () => window.clearTimeout(timer)
  }, [active, reduced])

  return (
    <div className={`qr-scan ${active ? 'is-active' : ''} ${scanning ? 'is-scanning' : ''}`}>
      <div className="qr-frame">
        <svg className="qr-mark" viewBox="0 0 120 120" fill="none" aria-hidden="true">
          <rect className="qr-border" x="10" y="10" width="100" height="100" rx="10" />
          {cells.map((cell) => (
            <rect
              key={`${cell.x}-${cell.y}`}
              className={cell.finder ? 'qr-module is-finder' : 'qr-module'}
              x={ORIGIN + cell.x * CELL}
              y={ORIGIN + cell.y * CELL}
              width={CELL - 0.7}
              height={CELL - 0.7}
              rx={0.5}
            />
          ))}
        </svg>
        <span className="qr-scan-line" aria-hidden="true" />
        <svg className="qr-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12.5 L10 17.5 L19 7" />
        </svg>
      </div>
    </div>
  )
}
