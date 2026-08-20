import { PROBLEM_NODES } from '../../data/slides'

export function ProblemMap({ highlight = null, aligning = false }) {
  return (
    <div
      className={`problem-map ${highlight ? `hl-${highlight}` : ''} ${aligning ? 'is-aligning' : ''}`}
      aria-hidden="true"
    >
      <div className="pmap-stage">
        <span className="pmap-dash d1" />
        <span className="pmap-dash d2" />
        <span className="pmap-dash d3" />
        <div className="pmap-grid">
          {PROBLEM_NODES.map((node) => (
            <div key={node.id} className={`pmap-node r${node.row} c-${node.col} n-${node.id}`}>
              <span className="pmap-en">{node.en}</span>
              <strong>{node.label}</strong>
              {node.id === 'booking' && (
                <div className="booking-scatter">
                  <i />
                  <i />
                  <i />
                </div>
              )}
              {node.id === 'tracking' && (
                <div className="tracking-bus">
                  <span className="frozen-bus" />
                </div>
              )}
            </div>
          ))}
        </div>
        <span className="pmap-x x1">×</span>
        <span className="pmap-x x2">×</span>
        <span className="pmap-x x3">×</span>
      </div>

      <p className="pmap-caption">غياب منصة موحّدة</p>
    </div>
  )
}
