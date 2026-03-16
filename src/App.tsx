import { useEffect } from "react"
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
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projetos/:slug" element={<ProjectPage />} />
    </Routes>
  )
}

