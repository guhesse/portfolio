import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ContactSection } from "@/components/sections/contact"
import { AboutSection } from "@/components/sections/about"
import { HeroSection } from "@/components/sections/hero"
import { ProcessSection } from "@/components/sections/process"
import { ProjectsSection } from "@/components/sections/projects"
import { TestimonialsSection } from "@/components/sections/testimonials"

export default function App() {
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
