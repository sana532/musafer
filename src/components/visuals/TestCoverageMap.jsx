import { Fragment, useEffect, useState } from 'react'
import { TESTING } from '../../data/slides'
import { useCoarsePointer } from '../../hooks/useMedia'
import { usePresentation } from '../../hooks/usePresentation'
import { Reveal } from '../presentation/PresentationSection'

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function formatMetric(value, decimals) {
  if (decimals > 0) return value.toFixed(decimals)
  return Math.round(value).toLocaleString('en-US')
}

function useCountUp(active, target, { decimals = 0, duration = 900, delay = 0, reduced = false }) {
  const [value, setValue] = useState(reduced ? target : 0)

  useEffect(() => {
    if (!active) return undefined
    if (reduced) {
      setValue(target)
      return undefined
    }

    setValue(0)
    let frame = 0
    let start = 0

    const timeout = window.setTimeout(() => {
      const tick = (now) => {
        if (!start) start = now
        const t = Math.min(1, (now - start) / duration)
        const next = target * easeOutCubic(t)
        setValue(decimals > 0 ? next : Math.round(next))
        if (t < 1) frame = requestAnimationFrame(tick)
        else setValue(target)
      }
      frame = requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [active, target, decimals, duration, delay, reduced])

  return value
}

function LoadMetric({ metric, active, delay, reduced }) {
  const value = useCountUp(active, metric.value, {
    decimals: metric.decimals,
    duration: metric.accent ? 1100 : 900,
    delay,
    reduced,
  })
  const progress = metric.value === 0 ? 0 : Math.min(100, (value / metric.value) * (metric.accent ? metric.value : 100))

  return (
    <article
      className={`load-metric ${metric.accent ? 'is-success' : ''}`}
      aria-label={`${formatMetric(metric.value, metric.decimals)}${metric.suffix} ${metric.label}`}
    >
      <div className="load-metric-top">
        <span className="load-pulse" aria-hidden="true">
          <i />
        </span>
        <strong className="load-value">
          {formatMetric(value, metric.decimals)}
          {metric.suffix}
        </strong>
      </div>
      <span className="load-meter" aria-hidden="true">
        <i style={{ width: `${progress}%` }} />
      </span>
      <p className="load-label">{metric.label}</p>
    </article>
  )
}

export function TestCoverageMap({ active = false }) {
  const { reduced } = usePresentation()
  const coarse = useCoarsePointer()
  const [hot, setHot] = useState(null)

  const onEnter = (id) => {
    if (!coarse) setHot(id)
  }

  const onLeave = () => {
    if (!coarse) setHot(null)
  }

  return (
    <div className={`testing-stage ${active ? 'is-active' : ''}`}>
      <div className="load-readout" role="group" aria-label="نتائج اختبار التحميل">
        {TESTING.metrics.map((metric, index) => (
          <Fragment key={metric.id}>
            {index > 0 ? <span className="load-flow" aria-hidden="true" /> : null}
            <Reveal delay={200 + index * 140} className="load-cell">
              <LoadMetric
                metric={metric}
                active={active}
                delay={220 + index * 140}
                reduced={reduced}
              />
            </Reveal>
          </Fragment>
        ))}
      </div>

      <div
        className={`ts-map ${hot ? 'is-focusing' : ''}`}
        onMouseLeave={onLeave}
      >
        {TESTING.scenarios.map((scenario, index) => (
          <Reveal key={scenario.id} delay={620 + index * 55} className={`ts-slot ts-slot-${scenario.id}`}>
            <article
              className={`ts-card tone-${scenario.tone} ${scenario.weight === 'featured' ? 'is-featured' : ''} ${
                hot === scenario.id ? 'is-hot' : hot ? 'is-dim' : ''
              }`}
              tabIndex={0}
              onMouseEnter={() => onEnter(scenario.id)}
              onFocus={() => onEnter(scenario.id)}
              onBlur={onLeave}
            >
              <span className="ts-code">{scenario.code}</span>
              <h3>{scenario.label}</h3>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="testing-spacer" aria-hidden="true" />

      <Reveal delay={1180} className="testing-gateway-wrap">
        <p className="testing-gateway">{TESTING.gateway}</p>
      </Reveal>
    </div>
  )
}
