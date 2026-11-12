import { lazy, Suspense, useEffect, useRef } from "react"
import { Navigate, Routes, Route, useLocation } from "react-router-dom"
import { stripLocale, withLocale } from "@/i18n/locale"
import { useLocale, useUi } from "@/i18n/use-locale"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ContactSection } from "@/components/sections/contact"
import { AboutSection } from "@/components/sections/about"
import { HeroSection } from "@/components/sections/hero.tsx"
import { OperationsSection } from "@/components/sections/operations"
import { ProcessSection } from "@/components/sections/process.tsx"
import { ProjectsSection } from "@/components/sections/projects.tsx"
import { experienceCopy } from "@/data/experience.ts"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { ScrollToTop } from "@/components/shared/scroll-to-top"
import { usePageMotion } from "@/lib/scroll-motion"
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

const ProjectPage = lazy(() =>
  import("@/pages/ProjectPage").then((mod) => ({ default: mod.ProjectPage })),
)

const ExperiencePage = lazy(() =>
  import("@/pages/ExperiencePage").then((mod) => ({ default: mod.ExperiencePage })),
)

function DocumentLocale() {
  const { locale } = useLocale()
  const ui = useUi()
  const { pathname } = useLocation()

  useEffect(() => {
    const bare = stripLocale(pathname)
    const canonical = `https://gustavohesse.com.br${withLocale(bare, locale)}`
    const set = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute(selector.startsWith("link") ? "href" : "content", value)
    }

    const onOps = bare === "/ops"
    const onExperience = bare === "/experiencia"
    const experience = experienceCopy[locale]
    const title = onOps ? ui.ops.metaTitle : onExperience ? experience.metaTitle : ui.metaTitle
    const description = onOps ? ui.ops.metaDescription : onExperience ? experience.metaDescription : ui.metaDescription

    document.documentElement.lang = locale === "en" ? "en" : "pt-BR"
    document.title = title
    set('meta[name="description"]', description)
    set('meta[property="og:title"]', title)
    set('meta[property="og:description"]', description)
    set('meta[name="twitter:title"]', title)
    set('meta[name="twitter:description"]', description)
    set('link[rel="canonical"]', canonical)
    set('meta[property="og:url"]', canonical)
    set('link[rel="alternate"][hreflang="pt-BR"]', `https://gustavohesse.com.br${withLocale(bare, "pt")}`)
    set('link[rel="alternate"][hreflang="en"]', `https://gustavohesse.com.br${withLocale(bare, "en")}`)
    set('link[rel="alternate"][hreflang="x-default"]', `https://gustavohesse.com.br${withLocale(bare, "pt")}`)
  }, [locale, pathname, ui])

  return null
}

function ProjectRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProjectPage />
    </Suspense>
  )
}

function ExperienceRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ExperiencePage />
    </Suspense>
  )
}

function OpsRedirect() {
  const { locale } = useLocale()
  return <Navigate to={withLocale("/#operacao", locale)} replace />
}

function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  usePageMotion(pageRef, "home")
  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <OperationsSection />
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
      <DocumentLocale />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/ops" element={<OpsRedirect />} />
        <Route path="/en/ops" element={<OpsRedirect />} />
        <Route path="/experiencia" element={<ExperienceRoute />} />
        <Route path="/en/experiencia" element={<ExperienceRoute />} />
        <Route path="/projetos/:slug" element={<ProjectRoute />} />
        <Route path="/en/projetos/:slug" element={<ProjectRoute />} />
      </Routes>
    </>
  )
}

