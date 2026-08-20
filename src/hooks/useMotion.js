import { useCallback, useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.35, ...options },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.rootMargin, options.threshold])

  return [ref, inView]
}

export function useParallax(active, reduced, intensity = 14) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef(0)

  const tick = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * 0.08
    current.current.y += (target.current.y - current.current.y) * 0.08
    setOffset({ ...current.current })
    frame.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (!active || reduced) {
      target.current = { x: 0, y: 0 }
      current.current = { x: 0, y: 0 }
      setOffset({ x: 0, y: 0 })
      return undefined
    }

    const onMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      target.current = { x: nx * intensity, y: ny * intensity }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    frame.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame.current)
    }
  }, [active, intensity, reduced, tick])

  return offset
}
