import { type MouseEvent } from "react"
import { SectionHeading } from "@/components/shared/section-heading"
import { useSiteContent, useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

function tiltStep(event: MouseEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = event.currentTarget.querySelector<HTMLElement>("[data-tilt]")
    if (!el) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    const rotY = px * 10
    const rotX = -py * 8
    const moveX = px * 8
    const moveY = py * 6
    el.style.transition = "transform 80ms linear"
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${moveX}px, ${moveY}px, 0) scale(1.03)`
}

function resetStep(event: MouseEvent<HTMLElement>) {
    const el = event.currentTarget.querySelector<HTMLElement>("[data-tilt]")
    if (!el) return
    el.style.transition = "transform 450ms ease"
    el.style.transform = ""
}

export function ProcessSection() {
    const sectionRef = useSectionTracking("processo")
    const { process } = useSiteContent()
    const { process: copy } = useUi()

    return (
        <section id="processo" ref={sectionRef} className="border-b border-border/60 bg-muted/20">
            <div className="container space-y-12 px-6 py-36">
                <SectionHeading
                    eyebrow={copy.eyebrow}
                    title={copy.title}
                    description={copy.description}
                />
                <ol className="relative grid gap-8 md:grid-cols-3">
                    {process.map((step, index) => (
                        <li
                            key={step.title}
                            className="[perspective:900px]"
                            onMouseMove={tiltStep}
                            onMouseLeave={resetStep}
                        >
                            <div
                                data-tilt
                                className="group h-full origin-center rounded-3xl border border-border/70 bg-card/70 p-8 shadow-none transition-transform duration-500 ease-out [transform-style:preserve-3d] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
                            >
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                    0{index + 1}
                                </span>
                                <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                                <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
                                <div className="mt-6 rounded-2xl bg-secondary/30 p-4 text-sm">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/80">
                                        {copy.keyDelivery}
                                    </span>
                                    <p className="mt-2 text-secondary-foreground">{step.deliverable}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
