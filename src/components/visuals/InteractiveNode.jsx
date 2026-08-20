import { LINE_ICONS } from '../icons/Icons'

export function InteractiveNode({
  icon,
  label,
  kicker,
  active = false,
  dimmed = false,
  onEnter,
  onLeave,
  onToggle,
  className = '',
  children,
}) {
  const Icon = icon ? LINE_ICONS[icon] : null

  return (
    <button
      type="button"
      className={`interactive-node ${active ? 'is-hot' : ''} ${dimmed ? 'is-dim' : ''} ${className}`.trim()}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onToggle}
    >
      {Icon ? (
        <span className="inode-icon">
          <Icon />
        </span>
      ) : null}
      {kicker ? <small>{kicker}</small> : null}
      {label ? <strong>{label}</strong> : null}
      {children}
    </button>
  )
}

export function AnimatedConnector({ d, className = '', delay = 0 }) {
  return (
    <path
      className={`draw-line ${className}`.trim()}
      d={d}
      pathLength="1"
      style={{ '--d': `${delay}ms` }}
    />
  )
}
