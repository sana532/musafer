import { useEffect, useRef, useState } from 'react'
import { FEATURE_SHOWCASE } from '../../data/slides'
import { usePresentation } from '../../hooks/usePresentation'
import { LiveTrackingVisual } from './LiveTrackingVisual'
import { QrTicketVisual } from './QrTicketVisual'
import { AiReportsVisual } from './AiReportsVisual'
import { TripScheduleVisual } from './TripScheduleVisual'
import { PaySecureVisual } from './PaySecureVisual'
import { PlanStackVisual } from './PlanStackVisual'
import { NotifyBellVisual } from './NotifyBellVisual'

const TOTAL = FEATURE_SHOWCASE.length

function Chevron({ dir = 1 }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {dir < 0 ? <path d="M12.5 4.5 L6.5 10 L12.5 15.5" /> : <path d="M7.5 4.5 L13.5 10 L7.5 15.5" />}
    </svg>
  )
}

function FeatureVisual({ feature, active }) {
  if (feature.id === 'tracking') return <LiveTrackingVisual active={active} />
  if (feature.id === 'scheduling') return <TripScheduleVisual active={active} />
  if (feature.id === 'ai-reports') return <AiReportsVisual active={active} />
  if (feature.id === 'payment') return <PaySecureVisual active={active} />
  if (feature.id === 'qr') return <QrTicketVisual active={active} />
  if (feature.id === 'plans') return <PlanStackVisual active={active} />
  if (feature.id === 'alerts') return <NotifyBellVisual active={active} />
  return <div className="feature-visual-idle" aria-hidden="true" />
}

export function FeatureShowcase({ active = false }) {
  const { registerInnerNav } = usePresentation()
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  indexRef.current = index

  useEffect(() => {
    if (!active) setIndex(0)
  }, [active])

  useEffect(() => {
    if (!active) return undefined
    return registerInnerNav((dir) => {
      const current = indexRef.current
      if (dir > 0 && current < TOTAL - 1) {
        setIndex(current + 1)
        return true
      }
      if (dir < 0 && current > 0) {
        setIndex(current - 1)
        return true
      }
      return false
    })
  }, [active, registerInnerNav])

  const feature = FEATURE_SHOWCASE[index]
  const current = String(index + 1).padStart(2, '0')
  const total = String(TOTAL).padStart(2, '0')

  return (
    <div className={`feature-showcase ${active ? 'is-active' : ''}`}>
      <div className="feature-copy">
        {feature.title ? (
          <>
            <p className="feature-kicker">{feature.n}</p>
            <h3 className="feature-title">{feature.title}</h3>
            {feature.body ? <p className="feature-body">{feature.body}</p> : null}
            {feature.lede ? <p className="feature-lede">{feature.lede}</p> : null}
          </>
        ) : (
          <p className="feature-body is-quiet"> </p>
        )}

        <div className="feature-nav">
          <button
            type="button"
            className="feature-arrow"
            onClick={() => index > 0 && setIndex(index - 1)}
            disabled={index === 0}
            aria-label="الميزة السابقة"
          >
            <Chevron dir={1} />
          </button>
          <p className="feature-count" aria-live="polite">
            <span className="feature-count-now">{current}</span>
            <span className="feature-count-of">من</span>
            <span>{total}</span>
          </p>
          <button
            type="button"
            className="feature-arrow"
            onClick={() => index < TOTAL - 1 && setIndex(index + 1)}
            disabled={index === TOTAL - 1}
            aria-label="الميزة التالية"
          >
            <Chevron dir={-1} />
          </button>
        </div>
      </div>

      <div className="feature-visual" key={feature.id}>
        <FeatureVisual feature={feature} active={active} />
      </div>
    </div>
  )
}
