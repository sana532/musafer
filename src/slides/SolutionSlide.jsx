import { usePresentation } from '../hooks/usePresentation'
import { PresentationSection } from '../components/presentation/PresentationSection'
import { WhySplit } from '../components/visuals/WhySplit'

export function SolutionSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="solution" labelledBy="solution-title">
      <div className="section-head">
        <span className="section-index">04</span>
      </div>

      <WhySplit active={activeId === 'solution'} />
    </PresentationSection>
  )
}
