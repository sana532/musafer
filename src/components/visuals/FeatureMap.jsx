import { useEffect, useRef, useState } from 'react'
import { FEATURE_ROLES } from '../../data/slides'
import { usePresentation } from '../../hooks/usePresentation'
import { LINE_ICONS } from '../icons/Icons'
import { InteractiveNode } from './InteractiveNode'

function HubGpsMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  )
}

const SPOKE_PATHS = {
  passenger: 'M50 50 L50 16',
  admin: 'M50 50 L50 84',
}

const REVEAL_ORDER = ['passenger', 'driver', 'admin', 'company']
const MAX_STEP = REVEAL_ORDER.length

function spokePath(id, rtl) {
  if (id === 'passenger' || id === 'admin') return SPOKE_PATHS[id]
  const towardEnd = 'M50 50 L81 50'
  const towardStart = 'M50 50 L19 50'
  if (id === 'driver') return rtl ? towardEnd : towardStart
  return rtl ? towardStart : towardEnd
}

export function FeatureMap({ active = false, gathering = false }) {
  const { registerInnerNav } = usePresentation()
  const [played, setPlayed] = useState(false)
  const [step, setStep] = useState(0)
  const stepRef = useRef(0)
  stepRef.current = step
  const rtl = typeof document === 'undefined' || document.documentElement.dir !== 'ltr'

  useEffect(() => {
    if (active) setPlayed(true)
    else setStep(0)
  }, [active])

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

  const selected = step > 0 ? REVEAL_ORDER[step - 1] : null
  const current = FEATURE_ROLES.find((role) => role.id === selected)
  const routeLive = Boolean(selected)

  const onToggle = (id) => {
    const index = REVEAL_ORDER.indexOf(id)
    if (index < 0) return
    setStep(index + 1)
  }

  return (
    <div
      className={`feature-map ${active || played ? 'is-active' : ''} ${gathering ? 'is-gathering' : ''} ${routeLive ? 'is-live' : ''} ${selected ? 'is-revealing' : 'is-overview'}`}
    >
      <div className="feature-stage">
        <svg className="feature-spokes" viewBox="0 0 100 100" aria-hidden="true">
          {FEATURE_ROLES.map((role) => {
            const d = spokePath(role.id, rtl)
            const hot = selected === role.id
            return (
              <g key={role.id} className={hot ? 'is-hot' : ''}>
                <path className={`spoke ${hot ? 'is-hot' : ''}`} d={d} />
                {hot ? <path className="spoke-flow" d={d} /> : null}
              </g>
            )
          })}
        </svg>

        <div className="hub-core" aria-hidden="true">
          <span className={`hub-mark ${routeLive ? 'is-live' : ''}`}>
            <HubGpsMark />
          </span>
          <strong>مسافر</strong>
          <small>MUSAFER</small>
        </div>

        {FEATURE_ROLES.map((role, index) => {
          const hot = selected === role.id
          const dimmed = Boolean(selected) && !hot
          return (
            <div
              key={role.id}
              className={`role-orbit role-${role.id} ${hot ? 'is-hot' : dimmed ? 'is-dim' : ''}`}
              style={{ '--i': index }}
            >
              <div className="role-card">
                <InteractiveNode
                  className="role-node"
                  icon={role.icon}
                  kicker={role.en}
                  label={role.ar}
                  active={hot}
                  dimmed={dimmed}
                  onToggle={() => onToggle(role.id)}
                />
                {hot && current ? <RoleFeaturePanel role={current} /> : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function RoleFeaturePanel({ role }) {
  return (
    <div className="role-feature-panel" key={role.id}>
      <div className="role-progress" aria-hidden="true">
        {role.features.map((item, index) => (
          <span key={item.id} className="role-progress-dot" style={{ '--i': index }} />
        ))}
      </div>
      <ul className="role-features">
        {role.features.map((item, index) => {
          const Icon = LINE_ICONS[item.icon] || LINE_ICONS.seat
          return (
            <li key={item.id} className="feature-chip" style={{ '--i': index }}>
              <span className="inode-icon">
                <Icon />
              </span>
              <span>{item.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
