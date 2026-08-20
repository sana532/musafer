const ROUTE_PATH = 'M80 390 C 160 390, 170 240, 270 220 C 380 198, 390 310, 500 150'

export function BusShape() {
  return (
    <g transform="translate(-28 -16)">
      <rect x="0" y="6" width="56" height="22" rx="7" fill="#1c2414" stroke="#c5ce9a" />
      <rect x="8" y="10" width="14" height="10" rx="2" fill="#8aa05e" />
      <rect x="26" y="10" width="14" height="10" rx="2" fill="#8aa05e" />
      <circle cx="14" cy="30" r="4" fill="#c5ce9a" />
      <circle cx="42" cy="30" r="4" fill="#c5ce9a" />
    </g>
  )
}

export function RouteVisual({ parallax = { x: 0, y: 0 }, active = false, reduced = false }) {
  const layer = (factor) => ({
    transform: `translate(${parallax.x * factor}px, ${parallax.y * factor}px)`,
  })

  return (
    <div className={`route-visual ${active ? 'is-active' : ''}`} aria-hidden="true">
      <svg className="route-svg" viewBox="0 0 640 520" fill="none" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="road" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8aa05e" />
            <stop offset="1" stopColor="#c4a35a" />
          </linearGradient>
          <filter id="route-glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="route-bg" style={layer(0.16)}>
          <circle cx="120" cy="90" r="70" />
          <circle cx="520" cy="400" r="90" />
        </g>

        <g style={layer(0.38)}>
          <path className="route-halo" d={ROUTE_PATH} />
          <path
            id="hero-path"
            className="route-line"
            d={ROUTE_PATH}
            pathLength="1"
            filter="url(#route-glow)"
          />
          <path className="route-marks" d={ROUTE_PATH} />

          <circle cx="80" cy="390" r="10" className="station-core" />
          <circle cx="80" cy="390" r="22" className="station-ring pulse-ring" />
          <circle cx="500" cy="150" r="10" className="station-core gold" />
          <circle cx="500" cy="150" r="22" className="station-ring gold pulse-ring" />

          <text x="80" y="430" textAnchor="middle" className="city-label">
            دمشق
          </text>
          <text x="500" y="120" textAnchor="middle" className="city-label">
            حلب
          </text>
        </g>

        <g className="bus-layer" style={layer(0.55)}>
          {!reduced && (
            <g className="bus-animated">
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href="#hero-path" xlinkHref="#hero-path" />
              </animateMotion>
              <BusShape />
            </g>
          )}
          <g className="bus-static" transform="translate(242 204)">
            <BusShape />
          </g>
        </g>
      </svg>
    </div>
  )
}
