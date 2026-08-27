import { CHALLENGES } from '../data/slides'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { ChallengeOrbit } from '../components/visuals/ChallengeOrbit'

export function ChallengesSlide() {
  const { activeId } = usePresentation()

  return (
    <PresentationSection id="challenges" labelledBy="challenges-title">
      <div className="section-head">
        <span className="section-index">07</span>
        <AnimatedHeading>
          <span id="challenges-title">{CHALLENGES.title}</span>
        </AnimatedHeading>
        <Reveal delay={80}>
          <p className="challenge-claim">{CHALLENGES.claim}</p>
        </Reveal>
      </div>

      <ChallengeOrbit active={activeId === 'challenges'} />
    </PresentationSection>
  )
}
