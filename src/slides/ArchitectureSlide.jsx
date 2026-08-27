import { ARCHITECTURE } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { ArchitectureMap } from '../components/visuals/ArchitectureMap'

export function ArchitectureSlide() {
  const { activeId, goBy } = usePresentation()

  return (
    <PresentationSection id="architecture" labelledBy="architecture-title">
      <div className="section-head">
        <span className="section-index">09</span>
        <AnimatedHeading>
          <span id="architecture-title">{ARCHITECTURE.title}</span>
        </AnimatedHeading>
        <Reveal delay={70}>
          <p className="arch-claim">{ARCHITECTURE.claim}</p>
        </Reveal>
        <Reveal delay={140}>
          <p className="arch-lede">{ARCHITECTURE.lede}</p>
        </Reveal>
      </div>

      <ArchitectureMap active={activeId === 'architecture'} />

      <Reveal delay={520} className="section-bridge">
        <button type="button" onClick={() => goBy(1)}>
          كيف طوّرنا هذا النظام؟
        </button>
      </Reveal>
    </PresentationSection>
  )
}
