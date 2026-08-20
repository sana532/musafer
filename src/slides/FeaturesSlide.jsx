import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { FeatureMap } from '../components/visuals/FeatureMap'

export function FeaturesSlide() {
  const { activeId, goBy } = usePresentation()

  return (
    <PresentationSection id="features" labelledBy="features-title">
      <div className="section-head">
        <span className="section-index">04</span>
        <AnimatedHeading>
          <span id="features-title">ميزات تطبيقنا</span>
        </AnimatedHeading>
      </div>

      <FeatureMap active={activeId === 'features'} gathering={activeId === 'nfr'} />

      <Reveal delay={420} className="section-bridge">
        <button type="button" onClick={() => goBy(1)}>
          ما الذي يجب أن يضمنه النظام؟
        </button>
      </Reveal>
    </PresentationSection>
  )
}
