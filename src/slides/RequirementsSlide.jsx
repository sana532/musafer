import { REQUIREMENTS } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { RequirementDiscovery } from '../components/visuals/RequirementDiscovery'

export function RequirementsSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="requirements" labelledBy="requirements-title">
      <div className="section-head">
        <span className="section-index">03</span>
        <AnimatedHeading>
          <span id="requirements-title">{REQUIREMENTS.title}</span>
        </AnimatedHeading>
        <Reveal delay={80}>
          <p className="section-sub">{REQUIREMENTS.subtitle}</p>
        </Reveal>
      </div>

      <RequirementDiscovery active={activeId === 'requirements'} />
    </PresentationSection>
  )
}
