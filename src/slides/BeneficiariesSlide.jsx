import { BENEFICIARIES } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { WhoGrid } from '../components/visuals/WhoGrid'

export function BeneficiariesSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="beneficiaries" labelledBy="beneficiaries-title">
      <div className="section-head">
        <span className="section-index">05</span>
        <AnimatedHeading>
          <span id="beneficiaries-title">{BENEFICIARIES.title}</span>
        </AnimatedHeading>
        <Reveal delay={80}>
          <p className="section-sub">{BENEFICIARIES.subtitle}</p>
        </Reveal>
      </div>

      <WhoGrid active={activeId === 'beneficiaries'} />
    </PresentationSection>
  )
}
