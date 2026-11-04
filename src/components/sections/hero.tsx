import { lazy, Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"
import { useSectionTracking } from "@/hooks/use-section-tracking"

const PhysicsTags = lazy(() =>
    import("@/components/shared/physics-tags").then((mod) => ({ default: mod.PhysicsTags })),
)

function DeferredPhysics() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const start = () => setReady(true)
        const id = window.requestIdleCallback(start, { timeout: 2500 })
        return () => window.cancelIdleCallback(id)
    }, [])

    if (!ready) return null

    return (
        <Suspense fallback={null}>
            <PhysicsTags />
        </Suspense>
    )
}

export function HeroSection() {
    const ui = useUi()
    const { track } = useAnalytics()
    const sectionRef = useSectionTracking("inicio")

    return (
        <section
            ref={sectionRef}
            id="inicio"
            className="relative overflow-hidden border-b border-border/60 flex items-center min-h-[70vh]"
            style={{
                backgroundColor: '#f6f5ef',
                backgroundImage: 'radial-gradient(#25282b 0.5px, #f6f5ef 0.5px)',
                backgroundSize: '15px 15px'
            }}
        >
            <DeferredPhysics />

            {/* Container invisível para colisões físicas */}
            <div className="container px-6 py-24 relative z-0 pointer-events-none">
                <div className="space-y-8 flex flex-col items-center">
                    <span data-physics-obstacle className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-1 text-xs font-medium uppercase tracking-[0.30em] bg-foreground text-muted invisible">
                        {ui.hero.eyebrow}
                    </span>
                    <h1 data-physics-obstacle className="text-balance text-4xl font-semibold leading-tight text-center text-foreground sm:text-5xl lg:text-6xl invisible">
                        {ui.hero.titleLine1}
                        <br />{ui.hero.titleLine2}
                    </h1>
                    <p data-physics-obstacle className="max-w text-balance text-base text-center text-muted-foreground sm:text-lg invisible">
                        {ui.hero.bodyLine1} <br />
                        {ui.hero.bodyLine2}
                    </p>
                    <div data-physics-obstacle className="flex flex-wrap gap-4 justify-center invisible">
                        <Button size="lg" asChild>
                            <a href="#contato">{ui.hero.ctaProject}</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="#projetos">{ui.hero.ctaPortfolio}</a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Container visível para interação */}
            <div className="container px-6 py-24 absolute inset-0 z-20 pointer-events-none flex items-center">
                <div data-motion="enter" className="space-y-8 flex flex-col items-center w-full">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-1 text-xs font-medium uppercase tracking-[0.30em] bg-foreground text-muted pointer-events-none">
                        {ui.hero.eyebrow}
                    </span>
                    <h1 className="text-balance text-4xl font-semibold leading-tight text-center text-foreground sm:text-5xl lg:text-6xl pointer-events-none">
                        {ui.hero.titleLine1}
                        <br />{ui.hero.titleLine2}
                    </h1>
                    <p className="max-w text-balance text-base text-center text-muted-foreground sm:text-lg pointer-events-none">
                        {ui.hero.bodyLine1} <br />
                        {ui.hero.bodyLine2}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
                        <Button size="lg" asChild>
                            <a
                                href="#contato"
                                onClick={() => track("cta_click", { location: "hero", label: ui.hero.ctaProject })}
                            >
                                {ui.hero.ctaProject}
                            </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a
                                href="#projetos"
                                onClick={() => track("cta_click", { location: "hero", label: ui.hero.ctaPortfolio })}
                            >
                                {ui.hero.ctaPortfolio}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
