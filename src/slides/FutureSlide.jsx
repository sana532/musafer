import { FUTURE } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { RoadAhead } from '../components/visuals/RoadAhead'

export function FutureSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="future" labelledBy="future-title">
      <div className="section-head">
        <span className="section-index">
          <span>11</span>
          <span className="progress-rule" aria-hidden="true" />
          <span className="progress-current">12</span>
        </span>
        <AnimatedHeading>
          <span id="future-title">{FUTURE.title}</span>
        </AnimatedHeading>
        <Reveal delay={120}>
          <p className="future-subtitle">{FUTURE.subtitle}</p>
        </Reveal>
        <Reveal delay={280}>
          <p className="future-lede">{FUTURE.lede}</p>
        </Reveal>
      </div>

      <RoadAhead active={activeId === 'future'} />
    </PresentationSection>
  )
}
