import { useState, useEffect, useRef } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let hasSmoothScroll = false

    const updateProgress = (position = window.scrollY) => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? position / total : 0)
    }

    const onScroll = () => {
      if (!hasSmoothScroll) updateProgress()
    }

    const onSmoothScroll = event => {
      hasSmoothScroll = true
      updateProgress(event.detail?.position ?? window.scrollY)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('smoothscroll', onSmoothScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('smoothscroll', onSmoothScroll)
    }
  }, [])

  return progress
}
