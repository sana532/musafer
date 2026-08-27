import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
} from '../components/presentation/PresentationSection'
import { FeatureShowcase } from '../components/visuals/FeatureShowcase'

export function FeaturesSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="features" labelledBy="features-title">
      <div className="section-head">
        <span className="section-index">06</span>
        <AnimatedHeading>
          <span id="features-title">ميزات تطبيقنا</span>
        </AnimatedHeading>
      </div>

      <FeatureShowcase active={activeId === 'features'} />
    </PresentationSection>
  )
}
