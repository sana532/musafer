import { useEffect, useState } from 'react'
import { FEATURE_ROLES } from '../../data/slides'
import { useCoarsePointer } from '../../hooks/useMedia'
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

function spokePath(id, rtl) {
  if (id === 'passenger' || id === 'admin') return SPOKE_PATHS[id]
  const towardEnd = 'M50 50 L81 50'
  const towardStart = 'M50 50 L19 50'
  if (id === 'driver') return rtl ? towardEnd : towardStart
  return rtl ? towardStart : towardEnd
}

export function FeatureMap({ active = false, gathering = false }) {
  const coarse = useCoarsePointer()
  const [played, setPlayed] = useState(false)
  const [selected, setSelected] = useState('passenger')
  const [live, setLive] = useState(false)
  const rtl = typeof document === 'undefined' || document.documentElement.dir !== 'ltr'

  useEffect(() => {
    if (active) setPlayed(true)
  }, [active])

  const current = FEATURE_ROLES.find((role) => role.id === selected) || FEATURE_ROLES[0]
  const routeLive = coarse || live

  const onEnter = (id) => {
    if (!coarse) {
      setSelected(id)
      setLive(true)
    }
  }

  const onLeave = () => {
    if (!coarse) setLive(false)
  }

  const onToggle = (id) => {
    if (!coarse) return
    setSelected(id)
  }

  return (
    <div
      className={`feature-map ${active || played ? 'is-active' : ''} ${gathering ? 'is-gathering' : ''} ${routeLive ? 'is-live' : ''}`}
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

        {FEATURE_ROLES.map((role, index) => (
          <div
            key={role.id}
            className={`role-orbit role-${role.id} ${selected === role.id ? 'is-hot' : 'is-dim'}`}
            style={{ '--i': index }}
          >
            <div className="role-card">
              <InteractiveNode
                className="role-node"
                icon={role.icon}
                kicker={role.en}
                label={role.ar}
                active={selected === role.id}
                dimmed={selected !== role.id}
                onEnter={() => onEnter(role.id)}
                onLeave={onLeave}
                onToggle={() => onToggle(role.id)}
              />
              {selected === role.id ? <RoleFeaturePanel role={current} /> : null}
            </div>
          </div>
        ))}
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
