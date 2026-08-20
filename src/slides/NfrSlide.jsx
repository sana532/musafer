import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { QualityRadar } from '../components/visuals/QualityRadar'

export function NfrSlide() {
  const { activeId, goBy } = usePresentation()

  return (
    <PresentationSection id="nfr" labelledBy="nfr-title">
      <div className="section-head">
        <span className="section-index">05</span>
        <AnimatedHeading>
          <span id="nfr-title">المتطلبات غير الوظيفية</span>
        </AnimatedHeading>
      </div>

      <QualityRadar active={activeId === 'nfr'} collapsing={activeId === 'process'} />

      <Reveal delay={520} className="section-bridge">
        <button type="button" onClick={() => goBy(1)}>
          كيف طوّرنا هذا النظام؟
        </button>
      </Reveal>
    </PresentationSection>
  )
}
