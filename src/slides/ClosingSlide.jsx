import { CLOSING, COVER } from '../data/slides'
import { useParallax } from '../hooks/useMotion'
import { usePresentation } from '../hooks/usePresentation'
import { PresentationSection } from '../components/presentation/PresentationSection'
import { ArrivalVisual } from '../components/visuals/ArrivalVisual'

export function ClosingSlide() {
  const { activeId, reduced } = usePresentation()
  const active = activeId === 'closing'
  const parallax = useParallax(active, reduced, 16)

  return (
    <PresentationSection id="closing" tone="cover" labelledBy="closing-title">
      <div className="cover-grid closing-grid">
        <div className="cover-copy">
          <p className="cover-kicker">{COVER.kicker}</p>
          <h1 id="closing-title" className="cover-title closing-title">
            {CLOSING.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="closing-faint">{CLOSING.tagline}</p>
          <p className="cover-subtitle closing-thanks">{CLOSING.thanks}</p>
          <div className="cover-meta">
            <div className="cover-team">
              {COVER.team.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <p>{COVER.faculty}</p>
            <p>{COVER.supervision}</p>
          </div>
        </div>

        <ArrivalVisual parallax={parallax} active={active} reduced={reduced} />
      </div>
    </PresentationSection>
  )
}
