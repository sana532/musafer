import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { REQUIREMENTS } from '../../data/slides'
import { useCoarsePointer } from '../../hooks/useMedia'
import { STAKEHOLDER_ICONS } from '../icons/Icons'

function pointOn(el, root, edge) {
  const origin = root.getBoundingClientRect()
  const box = el.getBoundingClientRect()
  return {
    x: box.left + box.width / 2 - origin.left,
    y:
      edge === 'bottom'
        ? box.bottom - origin.top
        : edge === 'top'
          ? box.top - origin.top
          : box.top + box.height / 2 - origin.top,
  }
}

export function RequirementDiscovery({ active = false }) {
  const coarse = useCoarsePointer()
  const [open, setOpen] = useState(null)
  const [played, setPlayed] = useState(false)
  const [fan, setFan] = useState({ w: 1, h: 1, lines: [] })
  const blockRef = useRef(null)
  const collectRef = useRef(null)
  const stakeholdersRef = useRef(null)
  const methodRefs = useRef([])

  useEffect(() => {
    if (active) setPlayed(true)
  }, [active])

  const measure = useCallback(() => {
    const root = blockRef.current
    const hubEl = stakeholdersRef.current || collectRef.current
    if (!root || !hubEl) return
    const box = root.getBoundingClientRect()
    if (box.width < 8 || box.height < 8) return
    const hub = pointOn(hubEl, root, 'bottom')
    const start = { x: hub.x, y: hub.y + 10 }
    const lines = REQUIREMENTS.methods
      .map((_, index) => methodRefs.current[index])
      .filter(Boolean)
      .map((el) => {
        const end = pointOn(el, root, 'top')
        return `M${start.x.toFixed(1)} ${start.y.toFixed(1)} L${end.x.toFixed(1)} ${end.y.toFixed(1)}`
      })
    if (lines.length !== REQUIREMENTS.methods.length) return
    setFan({ w: box.width, h: box.height, lines })
  }, [])

  useLayoutEffect(() => {
    measure()
    const root = blockRef.current
    if (!root || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => measure())
    observer.observe(root)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, active, open])

  useEffect(() => {
    if (!active) return undefined
    const frames = [80, 400, 700, 1100].map((delay) => window.setTimeout(measure, delay))
    return () => frames.forEach((id) => window.clearTimeout(id))
  }, [active, measure])

  const onEnter = (id) => {
    if (!coarse) setOpen(id)
  }

  const onLeave = () => {
    if (!coarse) setOpen(null)
  }

  const onToggle = (id) => {
    if (!coarse) return
    setOpen((current) => (current === id ? null : id))
  }

  const setMethodRef = (index) => (el) => {
    methodRefs.current[index] = el
  }

  const lineClass = ['', 'mid', 'late']

  return (
    <div className={`discovery ${active || played ? 'is-active' : ''}`}>
      <div className="discovery-collect" ref={blockRef}>
        <div className="discovery-stage s-collect" ref={collectRef}>
          <span className="stage-label">{REQUIREMENTS.stages.collect}</span>
        </div>

        <ul className="stakeholders" ref={stakeholdersRef}>
          {REQUIREMENTS.stakeholders.map((item, index) => {
            const Icon = STAKEHOLDER_ICONS[item.icon]
            return (
              <li key={item.id} className="stakeholder" style={{ '--i': index }}>
                <span className="stakeholder-icon">
                  <Icon />
                </span>
                <span>{item.label}</span>
              </li>
            )
          })}
        </ul>

        <svg
          className="discovery-fork"
          viewBox={`0 0 ${fan.w} ${fan.h}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {fan.lines.map((d, index) => (
            <path
              key={d}
              className={`draw-line ${lineClass[index] || ''}`.trim()}
              d={d}
              pathLength="1"
            />
          ))}
        </svg>

        <div className="discovery-methods">
          {REQUIREMENTS.methods.map((method, index) => (
            <button
              key={method.id}
              ref={setMethodRef(index)}
              type="button"
              className={`method-node ${method.id} ${open === method.id ? 'is-open' : ''}`}
              onMouseEnter={() => onEnter(method.id)}
              onMouseLeave={onLeave}
              onFocus={() => onEnter(method.id)}
              onBlur={onLeave}
              onClick={() => onToggle(method.id)}
              aria-expanded={open === method.id}
            >
              <span className="method-label">{method.label}</span>
              {method.hint ? (
                <span className={`method-hint ${open === method.id ? 'is-visible' : ''}`}>
                  {method.hint}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <svg className="discovery-join" viewBox="0 0 100 54" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="draw-line" d="M15.7 4 L50 50" pathLength="1" />
        <path className="draw-line mid" d="M50 4 L50 50" pathLength="1" />
        <path className="draw-line late" d="M84.3 4 L50 50" pathLength="1" />
      </svg>

      <div className="discovery-stage s-analyze">
        <span className="stage-label">{REQUIREMENTS.stages.analyze}</span>
      </div>

      <svg className="discovery-down" viewBox="0 0 24 36" fill="none" aria-hidden="true">
        <path className="draw-line" d="M12 2 L12 34" pathLength="1" />
      </svg>

      <div className="discovery-stage s-requirements">
        <span className="stage-label strong">{REQUIREMENTS.stages.requirements}</span>
      </div>

      <p className="needs-kicker">احتياجات مستخلصة</p>
      <ul className="needs-row">
        {REQUIREMENTS.needs.map((need, index) => (
          <li key={need.id} className="need-item" style={{ '--i': index }}>
            {need.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
