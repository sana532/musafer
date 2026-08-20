import { COVER } from '../data/slides'
import { useParallax } from '../hooks/useMotion'
import { usePresentation } from '../hooks/usePresentation'
import { PresentationSection, Reveal } from '../components/presentation/PresentationSection'
import { RouteVisual } from '../components/visuals/RouteVisual'

export function CoverSlide() {
  const { activeId, reduced, goBy } = usePresentation()
  const active = activeId === 'cover'
  const parallax = useParallax(active, reduced, 16)

  return (
    <PresentationSection id="cover" tone="cover" labelledBy="cover-title">
      <div className="cover-grid">
        <div className="cover-copy">
          <Reveal>
            <p className="cover-kicker">{COVER.kicker}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 id="cover-title" className="cover-title">
              {COVER.title}
            </h1>
            <p className="cover-tagline">{COVER.tagline}</p>
            <p className="cover-subtitle">{COVER.subtitle}</p>
          </Reveal>
          <Reveal delay={200}>
            <div className="cover-meta">
              <div className="cover-team">
                {COVER.team.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <p>{COVER.faculty}</p>
              <p>{COVER.supervision}</p>
            </div>
          </Reveal>
        </div>

        <RouteVisual parallax={parallax} active={active} reduced={reduced} />
      </div>

      <button type="button" className="scroll-hint" onClick={() => goBy(1)}>
        <span>المشكلة</span>
        <i />
      </button>
    </PresentationSection>
  )
}
