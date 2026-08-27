import { TESTING } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { TestCoverageMap } from '../components/visuals/TestCoverageMap'

export function TestingSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="testing" labelledBy="testing-title">
      <div className="section-head">
        <span className="section-index">11</span>
        <AnimatedHeading>
          <span id="testing-title">{TESTING.title}</span>
        </AnimatedHeading>
        <Reveal delay={80}>
          <p className="section-sub">{TESTING.subtitle}</p>
        </Reveal>
      </div>

      <TestCoverageMap active={activeId === 'testing'} />
    </PresentationSection>
  )
}
