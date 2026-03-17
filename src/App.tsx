import { useEffect, useRef } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ContactSection } from "@/components/sections/contact"
import { AboutSection } from "@/components/sections/about"
import { HeroSection } from "@/components/sections/hero"
import { ProcessSection } from "@/components/sections/process"
import { ProjectsSection } from "@/components/sections/projects"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ProjectPage } from "@/pages/ProjectPage"
import { ScrollToTop } from "@/components/shared/scroll-to-top"
import { trackEvent } from "@/lib/analytics"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function usePageTracking() {
  const location = useLocation()
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-C92MBMCXNL", {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])
}

/** Dispara eventos de scroll_depth em 25%, 50%, 75% e 100% da página. */
function useScrollDepthTracking() {
  const milestones = useRef(new Set<number>())
  const location = useLocation()

  useEffect(() => {
    milestones.current = new Set()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)
      const thresholds = [25, 50, 75, 100]
      for (const t of thresholds) {
        if (pct >= t && !milestones.current.has(t)) {
          milestones.current.add(t)
          trackEvent("scroll_depth", { scroll_depth: t, location: location.pathname })
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])
}

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="space-y-0">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default function App() {
  usePageTracking()
  useScrollDepthTracking()
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos/:slug" element={<ProjectPage />} />
      </Routes>
    </>
  )
}

