import { useEffect, useRef } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

/**
 * Hook que dispara um evento GA4 "section_view" uma única vez
 * quando o elemento entra no viewport (≥ 50% visível).
 *
 * Uso:
 *   const sectionRef = useSectionTracking("projetos")
 *   <section ref={sectionRef} ...>
 */
export function useSectionTracking(sectionName: string) {
  const ref = useRef<HTMLElement | null>(null)
  const tracked = useRef(false)
  const { track } = useAnalytics()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          track("section_view", { section: sectionName })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName, track])

  return ref
}
