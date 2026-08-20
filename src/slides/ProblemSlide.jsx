import { useState } from 'react'
import { PROBLEMS } from '../data/slides'
import { useCoarsePointer } from '../hooks/useMedia'
import { usePresentation } from '../hooks/usePresentation'
import {
  AnimatedHeading,
  PresentationSection,
  Reveal,
} from '../components/presentation/PresentationSection'
import { ProblemMap } from '../components/visuals/ProblemMap'

export function ProblemSlide() {
  const { activeId, goBy } = usePresentation()
  const coarse = useCoarsePointer()
  const [highlight, setHighlight] = useState(null)
  const aligning = activeId === 'requirements'

  const activate = (id) => setHighlight(id)
  const clear = () => {
    if (!coarse) setHighlight(null)
  }
  const toggle = (id) => {
    if (!coarse) return
    setHighlight((current) => (current === id ? null : id))
  }

  return (
    <PresentationSection id="problem" tone="problem" labelledBy="problem-title">
      <div className="section-head">
        <span className="section-index">02</span>
        <AnimatedHeading>
          <span id="problem-title">المشكلة</span>
        </AnimatedHeading>
      </div>

      <div className="problem-layout">
        <ol className="problem-list">
          {PROBLEMS.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 90}>
                <button
                  type="button"
                  className={`problem-item ${highlight === item.highlight ? 'is-hot' : ''}`}
                  onMouseEnter={() => activate(item.highlight)}
                  onMouseLeave={clear}
                  onFocus={() => activate(item.highlight)}
                  onBlur={clear}
                  onClick={() => toggle(item.highlight)}
                >
                  <span className="problem-n">{item.n}</span>
                  <span className="problem-text">
                    <strong>{item.label}</strong>
                    {item.aside ? <em>{item.aside}</em> : null}
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={160} className="problem-visual">
          <ProblemMap highlight={highlight} aligning={aligning} />
        </Reveal>
      </div>

      <Reveal delay={420} className="problem-bridge">
        <button type="button" onClick={() => goBy(1)}>
          فما الذي احتجناه لبناء الحل؟
        </button>
      </Reveal>
    </PresentationSection>
  )
}
