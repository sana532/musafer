import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { READY_SLIDES, TOTAL_PLANNED } from '../../data/slides'
import { usePrefersReducedMotion } from '../../hooks/useMedia'
import { PresentationContext } from '../../hooks/usePresentation'
import { ProgressIndicator, SectionNavigation } from './SectionNavigation'

export function PresentationShell({ children, slides = READY_SLIDES, totalPlanned = TOTAL_PLANNED }) {
  const systemReduce = usePrefersReducedMotion()
  const [reduced, setReduced] = useState(systemReduce)
  const [activeId, setActiveId] = useState(slides[0]?.id)
  const deckRef = useRef(null)
  const lockRef = useRef(false)
  const touchStart = useRef(0)

  const innerNavRef = useRef(null)

  useEffect(() => {
    if (systemReduce) setReduced(true)
  }, [systemReduce])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduced)
  }, [reduced])

  const ids = useMemo(() => slides.map((slide) => slide.id), [slides])

  const registerInnerNav = useCallback((handler) => {
    innerNavRef.current = typeof handler === 'function' ? handler : null
    return () => {
      innerNavRef.current = null
    }
  }, [])

  const goTo = useCallback(
    (id) => {
      const el = document.getElementById(id)
      el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced],
  )

  const goBy = useCallback(
    (dir) => {
      // Inner-slide steps consume this first; only then do we change slides.
      if (innerNavRef.current?.(dir)) return
      const index = Math.max(0, ids.indexOf(activeId))
      const next = ids[Math.min(ids.length - 1, Math.max(0, index + dir))]
      if (next && next !== activeId) goTo(next)
    },
    [activeId, goTo, ids],
  )

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { threshold: [0.35, 0.55, 0.7] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  useEffect(() => {
    const onKey = (event) => {
      if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        goBy(1)
      } else if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        goBy(-1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goBy(1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goBy(-1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        goTo(ids[0])
      } else if (event.key === 'End') {
        event.preventDefault()
        goTo(ids.at(-1))
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goBy, goTo, ids])

  useEffect(() => {
    const deck = deckRef.current
    if (!deck || reduced) return undefined

    const release = () => {
      window.setTimeout(() => {
        lockRef.current = false
      }, 780)
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 18) return
      event.preventDefault()
      if (lockRef.current) return
      lockRef.current = true
      goBy(event.deltaY > 0 ? 1 : -1)
      release()
    }

    const onTouchStart = (event) => {
      touchStart.current = event.changedTouches[0]?.clientY ?? 0
    }

    const onTouchMove = (event) => {
      const y = event.touches[0]?.clientY ?? 0
      if (Math.abs(touchStart.current - y) > 12) event.preventDefault()
    }

    const onTouchEnd = (event) => {
      const y = event.changedTouches[0]?.clientY ?? 0
      const delta = touchStart.current - y
      if (Math.abs(delta) < 48 || lockRef.current) return
      lockRef.current = true
      goBy(delta > 0 ? 1 : -1)
      release()
    }

    deck.addEventListener('wheel', onWheel, { passive: false })
    deck.addEventListener('touchstart', onTouchStart, { passive: true })
    deck.addEventListener('touchmove', onTouchMove, { passive: false })
    deck.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      deck.removeEventListener('wheel', onWheel)
      deck.removeEventListener('touchstart', onTouchStart)
      deck.removeEventListener('touchmove', onTouchMove)
      deck.removeEventListener('touchend', onTouchEnd)
    }
  }, [goBy, reduced])

  const current = slides.find((slide) => slide.id === activeId) || slides[0]
  const index = Math.max(0, slides.findIndex((slide) => slide.id === current.id))

  const value = {
    slides,
    totalPlanned,
    activeId: current.id,
    current,
    index,
    reduced,
    setReduced,
    goTo,
    goBy,
    registerInnerNav,
  }

  return (
    <PresentationContext.Provider value={value}>
      <div ref={deckRef} className="presentation-shell">
        <a className="skip-link" href={`#${slides[0]?.id}`}>
          تخطّي إلى المحتوى
        </a>
        <header className="chrome-top">
          <p className="chrome-brand">مسافر</p>
          <ProgressIndicator />
        </header>
        <SectionNavigation />
        <ThreadLine progress={index / Math.max(slides.length - 1, 1)} />
        {children}
      </div>
    </PresentationContext.Provider>
  )
}

function ThreadLine({ progress }) {
  return (
    <svg className="thread-line" viewBox="0 0 24 100" aria-hidden="true">
      <path d="M12 8 C 12 28, 12 52, 12 92" pathLength="1" />
      <g style={{ transform: `translateY(${progress * 64}px)` }}>
        <circle className="thread-bus" cx="12" cy="18" r="2.2" />
      </g>
    </svg>
  )
}
