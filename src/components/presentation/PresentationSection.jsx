import { useInView } from '../../hooks/useMotion'
import { usePresentation } from '../../hooks/usePresentation'

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const { reduced } = usePresentation()
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView || reduced ? 'is-in' : ''} ${className}`.trim()}
      style={{ '--d': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function AnimatedHeading({ children, className = '', as: Tag = 'h2' }) {
  return (
    <Reveal>
      <Tag className={`animated-heading ${className}`.trim()}>{children}</Tag>
    </Reveal>
  )
}

export function PresentationSection({
  id,
  children,
  className = '',
  tone = 'light',
  labelledBy,
}) {
  const { activeId } = usePresentation()
  const active = activeId === id

  return (
    <section
      id={id}
      className={`presentation-section tone-${tone} ${active ? 'is-active' : ''} ${className}`.trim()}
      aria-labelledby={labelledBy}
      data-active={active ? 'true' : 'false'}
    >
      <div className="section-frame">{children}</div>
    </section>
  )
}
