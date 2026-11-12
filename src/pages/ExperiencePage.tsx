import { useRef } from "react"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ExperienceSection } from "@/components/sections/experiences.tsx"
import { usePageMotion } from "@/lib/scroll-motion"

export function ExperiencePage() {
    const pageRef = useRef<HTMLDivElement>(null)
    usePageMotion(pageRef, "experiencia")

    return (
        <div ref={pageRef} className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main>
                <ExperienceSection />
            </main>
            <SiteFooter />
        </div>
    )
}
