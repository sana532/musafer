import { usePresentation } from '../../hooks/usePresentation'

export function ProgressIndicator() {
  const { current, totalPlanned } = usePresentation()

  return (
    <div className="progress-indicator" aria-live="polite">
      <span className="progress-current">{current.n}</span>
      <span className="progress-rule" aria-hidden="true" />
      <span className="progress-total">{String(totalPlanned).padStart(2, '0')}</span>
    </div>
  )
}

export function SectionNavigation() {
  const { slides, activeId, goTo } = usePresentation()

  return (
    <nav className="section-nav" aria-label="أقسام العرض">
      {slides.map((slide) => (
        <button
          key={slide.id}
          type="button"
          className={slide.id === activeId ? 'is-active' : ''}
          onClick={() => goTo(slide.id)}
          aria-label={slide.label}
          aria-current={slide.id === activeId ? 'true' : undefined}
        >
          <span>{slide.n} {slide.label}</span>
        </button>
      ))}
    </nav>
  )
}
