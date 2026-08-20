import { PROCESS_MODEL } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
} from '../components/presentation/PresentationSection'
import { ProcessLoop } from '../components/visuals/ProcessLoop'

export function ProcessSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="process" labelledBy="process-title">
      <div className="section-head">
        <span className="section-index">06</span>
        <AnimatedHeading>
          <span id="process-title">{PROCESS_MODEL.title}</span>
        </AnimatedHeading>
      </div>

      <ProcessLoop active={activeId === 'process'} />
    </PresentationSection>
  )
}
