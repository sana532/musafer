import { CHALLENGES } from '../data/slides'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'

export function ChallengesSlide() {
  return (
    <PresentationSection id="challenges" labelledBy="challenges-title">
      <div className="section-head">
        <span className="section-index">08</span>
        <AnimatedHeading>
          <span id="challenges-title">{CHALLENGES.title}</span>
        </AnimatedHeading>
        <Reveal delay={70}>
          <p className="challenge-claim">{CHALLENGES.claim}</p>
        </Reveal>
        <Reveal delay={140}>
          <p className="section-sub">{CHALLENGES.subtitle}</p>
        </Reveal>
      </div>

      <div className="challenge-grid">
        {CHALLENGES.cards.map((card, index) => (
          <Reveal key={card.id} delay={180 + index * 110}>
            <article className="challenge-card">
              <span className="challenge-n">{card.n}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </PresentationSection>
  )
}
