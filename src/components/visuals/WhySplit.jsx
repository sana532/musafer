import { SOLUTION } from '../../data/slides'

function GapMark() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.2 4.2 L11.8 11.8 M11.8 4.2 L4.2 11.8" />
    </svg>
  )
}

export function WhySplit({ active = false }) {
  return (
    <div className={`why-split ${active ? 'is-active' : ''}`}>
      <div className="why-pane is-gap">
        <div className="why-lead">
          <p className="why-kicker">{SOLUTION.kicker}</p>
          <p className="why-problem">{SOLUTION.problem}</p>
        </div>
        <ul className="why-gaps">
          {SOLUTION.gaps.map((label, index) => (
            <li key={label} className="why-gap" style={{ '--i': index }}>
              <span className="why-gap-mark">
                <GapMark />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <p className="why-bridge">{SOLUTION.bridge}</p>
      </div>

      <span className="why-divide" aria-hidden="true" />

      <div className="why-pane is-answer">
        <div className="why-mark">
          <img src="/logo.jpg" alt="مسافر" />
        </div>
        <div className="why-answer-copy">
          <h3 id="solution-title" className="why-title">
            {SOLUTION.title}
          </h3>
          <p className="why-lede">{SOLUTION.lede}</p>
        </div>
      </div>
    </div>
  )
}
