import { ARCHITECTURE } from '../../data/slides'

function ArchCard({ item, index }) {
  return (
    <article
      className={`arch-card ${item.accent ? 'is-accent' : ''}`}
      style={{ '--i': index }}
    >
      <strong>{item.ar}</strong>
      {item.stack ? <small>{item.stack}</small> : null}
    </article>
  )
}

function ArchRow({ layer }) {
  const count = layer.items.length
  const rail = layer.id === 'clients'

  const row = (
    <div className={`arch-row is-${count} ${rail ? 'is-rail' : ''}`}>
      {layer.items.map((item, index) => (
        <ArchCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )

  if (!layer.docker) return row

  return (
    <div className="arch-docker">
      <span className="arch-docker-label">Docker</span>
      {row}
    </div>
  )
}

export function ArchitectureMap({ active = false }) {
  return (
    <div className={`arch-map ${active ? 'is-active' : ''}`}>
      {ARCHITECTURE.layers.map((layer, band) => (
        <div key={layer.id} className={`arch-band is-${layer.id}`} style={{ '--band': band }}>
          <div className="arch-band-head">
            <span className="arch-band-n">{layer.n}</span>
            <span className="arch-band-ar">{layer.ar}</span>
            <span className="arch-band-en">{layer.en}</span>
          </div>

          {layer.tags ? (
            <ul className="arch-services">
              {layer.tags.map((label, index) => (
                <li key={label} className="arch-tag" style={{ '--i': index }}>
                  {label}
                </li>
              ))}
            </ul>
          ) : (
            <ArchRow layer={layer} />
          )}

          {band < ARCHITECTURE.layers.length - 1 ? (
            <div className="arch-connect" aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  )
}
