import { BENEFICIARIES } from '../../data/slides'

export function WhoGrid({ active = false }) {
  return (
    <div className={`who-grid ${active ? 'is-active' : ''}`}>
      {BENEFICIARIES.cards.map((card, index) => (
        <article key={card.id} className={`who-card is-${card.device}`} style={{ '--i': index }}>
          <header className="who-copy">
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </header>

          <div className={`who-device is-${card.device}`}>
            <div className="who-bezel" style={{ aspectRatio: card.ratio }}>
              <img src={card.src} alt={card.title} />
            </div>
            {card.device === 'laptop' ? <span className="who-hinge" aria-hidden="true" /> : null}
          </div>
        </article>
      ))}
    </div>
  )
}
