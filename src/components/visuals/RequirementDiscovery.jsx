import { useEffect, useState } from 'react'
import { REQUIREMENTS } from '../../data/slides'
import { useCoarsePointer } from '../../hooks/useMedia'
import { STAKEHOLDER_ICONS } from '../icons/Icons'

export function RequirementDiscovery({ active = false }) {
  const coarse = useCoarsePointer()
  const [open, setOpen] = useState(null)
  const [played, setPlayed] = useState(false)

  useEffect(() => {
    if (active) setPlayed(true)
  }, [active])

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

  return (
    <div className={`discovery ${active || played ? 'is-active' : ''}`}>
      <div className="discovery-stage s-collect">
        <span className="stage-label">{REQUIREMENTS.stages.collect}</span>
      </div>

      <ul className="stakeholders">
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

      <svg className="discovery-fork" viewBox="0 0 400 54" fill="none" aria-hidden="true">
        <path className="draw-line" d="M200 4 L72 50" pathLength="1" />
        <path className="draw-line late" d="M200 4 L328 50" pathLength="1" />
      </svg>

      <div className="discovery-methods">
        {REQUIREMENTS.methods.map((method) => (
          <button
            key={method.id}
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
            <span className={`method-hint ${open === method.id ? 'is-visible' : ''}`}>
              {method.hint}
            </span>
          </button>
        ))}
      </div>

      <svg className="discovery-join" viewBox="0 0 400 54" fill="none" aria-hidden="true">
        <path className="draw-line" d="M72 4 L200 50" pathLength="1" />
        <path className="draw-line late" d="M328 4 L200 50" pathLength="1" />
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
