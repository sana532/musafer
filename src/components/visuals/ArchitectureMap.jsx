import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ARCHITECTURE } from '../../data/slides'
import { useCoarsePointer } from '../../hooks/useMedia'
import { LINE_ICONS } from '../icons/Icons'

function StationMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.4" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  )
}

function pointOn(el, root, edge) {
  const origin = root.getBoundingClientRect()
  const box = el.getBoundingClientRect()
  const x = box.left + box.width / 2 - origin.left
  const y =
    edge === 'bottom'
      ? box.bottom - origin.top
      : edge === 'top'
        ? box.top - origin.top
        : box.top + box.height / 2 - origin.top
  return { x, y }
}

function routeD(from, merge) {
  const dx = merge.x - from.x
  const dy = Math.max(merge.y - from.y, 8)
  const c1x = from.x + dx * 0.06
  const c1y = from.y + dy * 0.4
  const c2x = merge.x - dx * 0.1
  const c2y = merge.y - Math.min(32, dy * 0.2)
  return `M${from.x.toFixed(1)} ${from.y.toFixed(1)} C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${merge.x.toFixed(1)} ${merge.y.toFixed(1)}`
}

export function ArchitectureMap({ active = false }) {
  const coarse = useCoarsePointer()
  const [played, setPlayed] = useState(false)
  const [hotClient, setHotClient] = useState(null)
  const [hotBackend, setHotBackend] = useState(false)
  const [stationPhase, setStationPhase] = useState('idle')
  const [geometry, setGeometry] = useState(null)

  const stageRef = useRef(null)
  const clientRefs = useRef([])
  const stationRef = useRef(null)
  const backendRef = useRef(null)
  const databaseRef = useRef(null)

  useEffect(() => {
    if (active) setPlayed(true)
  }, [active])

  useEffect(() => {
    if (!(active || played)) {
      setStationPhase('idle')
      return undefined
    }
    const arrive = window.setTimeout(() => setStationPhase('arrive'), 1420)
    const settle = window.setTimeout(() => setStationPhase('settled'), 2140)
    return () => {
      window.clearTimeout(arrive)
      window.clearTimeout(settle)
    }
  }, [active, played])

  const measure = useCallback(() => {
    const root = stageRef.current
    const stationEl = stationRef.current
    const backendEl = backendRef.current
    const databaseEl = databaseRef.current
    if (!root || !stationEl || !backendEl || !databaseEl) return
    if (root.clientWidth < 8 || root.clientHeight < 8) return

    const starts = clientRefs.current
      .map((el) => (el ? pointOn(el, root, 'bottom') : null))
      .filter(Boolean)
    if (starts.length !== ARCHITECTURE.clients.length) return

    const station = pointOn(stationEl, root, 'center')
    const backendBottom = pointOn(backendEl, root, 'bottom')
    const databaseTop = pointOn(databaseEl, root, 'top')
    const gap = station.y - Math.max(...starts.map((item) => item.y))
    const stem = Math.min(26, Math.max(12, gap * 0.22))
    const merge = { x: station.x, y: station.y - stem }

    const next = {
      width: root.clientWidth,
      height: root.clientHeight,
      routes: starts.map((from) => {
        const curve = routeD(from, merge)
        return {
          curve,
          full: `${curve} L${station.x.toFixed(1)} ${station.y.toFixed(1)}`,
        }
      }),
      stem: `M${merge.x.toFixed(1)} ${merge.y.toFixed(1)} L${station.x.toFixed(1)} ${station.y.toFixed(1)}`,
      spine: `M${backendBottom.x.toFixed(1)} ${backendBottom.y.toFixed(1)} L${databaseTop.x.toFixed(1)} ${databaseTop.y.toFixed(1)}`,
    }

    setGeometry((current) => {
      if (
        current &&
        current.width === next.width &&
        current.height === next.height &&
        current.stem === next.stem &&
        current.spine === next.spine &&
        current.routes.map((item) => item.full).join('|') === next.routes.map((item) => item.full).join('|')
      ) {
        return current
      }
      return next
    })
  }, [])

  useLayoutEffect(() => {
    measure()
    const root = stageRef.current
    if (!root || typeof ResizeObserver === 'undefined') return undefined
    const observer = new ResizeObserver(() => measure())
    observer.observe(root)
    const frame = window.requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
    }
  }, [measure, active, played])

  const onEnter = (id) => {
    if (!coarse) setHotClient(id)
  }

  const onLeave = () => {
    if (!coarse) setHotClient(null)
  }

  const onToggle = (id) => {
    if (!coarse) return
    setHotClient((current) => (current === id ? null : id))
    setHotBackend(false)
  }

  const onBackendEnter = () => {
    if (!coarse) setHotBackend(true)
  }

  const onBackendLeave = () => {
    if (!coarse) setHotBackend(false)
  }

  const onBackendToggle = () => {
    if (!coarse) return
    setHotBackend((current) => !current)
    setHotClient(null)
  }

  const live = active || played
  const BackendIcon = LINE_ICONS[ARCHITECTURE.backend.icon]
  const DatabaseIcon = LINE_ICONS[ARCHITECTURE.database.icon]

  return (
    <div
      className={`arch-map ${live ? 'is-active' : ''} ${hotBackend ? 'is-backend-hot' : ''} ${hotClient ? 'is-client-hot' : ''}`}
    >
      <div ref={stageRef} className="arch-stage">
        {geometry ? (
          <svg
            className="arch-routes"
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {geometry.routes.map((route, index) => {
              const id = ARCHITECTURE.clients[index].id
              const hot = hotClient === id
              return (
                <g key={id} className={hot ? 'is-hot' : ''}>
                  <path
                    className={`arch-route ${hot ? 'is-hot' : ''}`}
                    d={route.curve}
                    pathLength="1"
                    style={{ '--i': index }}
                  />
                  {hot ? <path className="arch-flow" d={route.full} /> : null}
                </g>
              )
            })}
            <path className="arch-stem" d={geometry.stem} pathLength="1" />
            <path className="arch-spine" d={geometry.spine} pathLength="1" />
          </svg>
        ) : null}

        <div className="arch-clients">
          {ARCHITECTURE.clients.map((client, index) => {
            const Icon = LINE_ICONS[client.icon]
            const hot = hotClient === client.id
            return (
              <div key={client.id} className="arch-client-slot" style={{ '--i': index }}>
                <button
                  type="button"
                  ref={(el) => {
                    clientRefs.current[index] = el
                  }}
                  className={`arch-card arch-client ${hot ? 'is-hot' : ''} ${hotClient && !hot ? 'is-dim' : ''}`}
                  onMouseEnter={() => onEnter(client.id)}
                  onMouseLeave={onLeave}
                  onFocus={() => onEnter(client.id)}
                  onBlur={onLeave}
                  onClick={() => onToggle(client.id)}
                >
                  <span className="inode-icon">
                    <Icon />
                  </span>
                  <strong>{client.ar}</strong>
                  <small>{client.stack}</small>
                </button>
              </div>
            )
          })}
        </div>

        <div className="arch-funnel">
          <span
            ref={stationRef}
            className={`arch-station is-${stationPhase}`}
            aria-hidden="true"
          >
            <StationMark />
          </span>
        </div>

        <button
          ref={backendRef}
          type="button"
          className={`arch-card arch-backend ${hotBackend || hotClient ? 'is-hot' : ''}`}
          onMouseEnter={onBackendEnter}
          onMouseLeave={onBackendLeave}
          onFocus={onBackendEnter}
          onBlur={onBackendLeave}
          onClick={onBackendToggle}
        >
          <span className="inode-icon">
            <BackendIcon />
          </span>
          <strong>{ARCHITECTURE.backend.label}</strong>
          <small>{ARCHITECTURE.backend.stack}</small>
        </button>

        <div className="arch-drop" aria-hidden="true" />

        <div ref={databaseRef} className="arch-card arch-database">
          <span className="inode-icon">
            <DatabaseIcon />
          </span>
          <strong>{ARCHITECTURE.database.label}</strong>
          <small>{ARCHITECTURE.database.stack}</small>
        </div>
      </div>

      <ul className="arch-services">
        {ARCHITECTURE.services.map((label, index) => (
          <li key={label} className="arch-tag" style={{ '--i': index }}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
