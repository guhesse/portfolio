import { lazy, Suspense, useEffect, useState } from "react"
import { HeroDots } from "@/components/sections/hero-dots"
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
        if (typeof window.requestIdleCallback !== "function") {
            const id = window.setTimeout(start, 800)
            return () => window.clearTimeout(id)
        }
        const id = window.requestIdleCallback(start, { timeout: 1800 })
        return () => window.cancelIdleCallback(id)
    }, [])

    if (!ready) return null

    return (
        <Suspense fallback={null}>
            <PhysicsTags />
        </Suspense>
    )
}

const pill = "inline-flex items-center rounded-none border border-foreground/25 px-4 py-2 text-[12px] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
const pillSolid = "inline-flex items-center rounded-none border border-foreground bg-foreground px-4 py-2 text-[12px] text-background transition-colors hover:bg-transparent hover:text-foreground"

function HeroLines({ text }: { text: string }) {
    return text.split("\n").map((line, index) => (
        <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
        </span>
    ))
}

export function HeroSection() {
    const ui = useUi()
    const { track } = useAnalytics()
    const sectionRef = useSectionTracking("inicio")

    return (
        <section
            ref={sectionRef}
            id="inicio"
            className="relative flex min-h-[68vh] items-center overflow-hidden bg-background md:min-h-[74vh]"
        >
            <HeroDots />
            <DeferredPhysics />

            <div aria-hidden="true" className="container pointer-events-none relative z-0 px-6 py-24">
                <div className="mx-auto flex max-w-2xl flex-col items-center space-y-7 text-center">
                    <span data-physics-obstacle className="invisible text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                        {ui.hero.eyebrow}
                    </span>
                    <div data-physics-obstacle className="invisible text-balance font-display text-[2rem] font-normal leading-[1.12] text-foreground sm:text-[2.5rem] lg:text-[2.85rem]">
                        {ui.hero.titleLine1}
                        <br />
                        {ui.hero.titleLine2}
                    </div>
                    <p data-physics-obstacle className="invisible max-w-md text-pretty text-[14px] leading-7 text-muted-foreground">
                        <HeroLines text={ui.hero.bodyLine1} />
                        <br />
                        <HeroLines text={ui.hero.bodyLine2} />
                    </p>
                        <div data-physics-obstacle className="invisible flex flex-wrap justify-center gap-3">
                            <span className={pillSolid}>{ui.hero.ctaProject}</span>
                            <span className={pill}>{ui.hero.ctaPortfolio}</span>
                        </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-30 flex items-center">
                <div className="container pointer-events-none px-6 py-24">
                    <div className="mx-auto flex max-w-2xl flex-col items-center space-y-7 text-center">
                        <span className="pointer-events-none text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            {ui.hero.eyebrow}
                        </span>
                        <h1 className="pointer-events-none text-balance font-display text-[2rem] font-normal leading-[1.12] text-foreground sm:text-[2.5rem] lg:text-[2.85rem]">
                            {ui.hero.titleLine1}
                            <br />
                            {ui.hero.titleLine2}
                        </h1>
                        <p className="pointer-events-none max-w-md text-pretty text-[14px] leading-7 text-muted-foreground">
                            <HeroLines text={ui.hero.bodyLine1} />
                            <br />
                            <HeroLines text={ui.hero.bodyLine2} />
                        </p>
                        <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
                            <a
                                href="#contato"
                                onClick={() => track("cta_click", { location: "hero", label: ui.hero.ctaProject })}
                                className={pillSolid}
                            >
                                {ui.hero.ctaProject}
                            </a>
                            <a
                                href="#projetos"
                                onClick={() => track("cta_click", { location: "hero", label: ui.hero.ctaPortfolio })}
                                className={pill}
                            >
                                {ui.hero.ctaPortfolio}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
