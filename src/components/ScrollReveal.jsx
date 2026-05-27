import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Global scroll-reveal driver. Any element with `data-reveal` fades/rises in
// when it enters the viewport. Re-scans on route change so freshly mounted
// pages get observed. Items can stagger via an inline `transitionDelay`.
const ScrollReveal = () => {
  const location = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'))
    if (reduce) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    // Defer so newly routed nodes exist before we observe them.
    const t = setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
    }, 50)

    return () => { clearTimeout(t); io.disconnect() }
  }, [location.pathname])

  return null
}

export default ScrollReveal
