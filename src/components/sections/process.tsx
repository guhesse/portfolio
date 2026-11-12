import { SectionHeading } from "@/components/shared/section-heading"
import { useSiteContent, useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

function BleedRule({ edge }: { edge: "top" | "bottom" }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-[calc(50%-50vw)] h-px w-screen bg-[#0a0a0a]/15 ${
                edge === "top" ? "top-0" : "bottom-0"
            }`}
        />
    )
}

const columnPad = (index: number, total: number) =>
    index === 0 ? "md:pr-10" : index === total - 1 ? "md:pl-10" : "md:px-10"

export function ProcessSection() {
    const sectionRef = useSectionTracking("processo")
    const { process } = useSiteContent()
    const { process: copy } = useUi()

    return (
        <section id="processo" ref={sectionRef} className="border-b border-border/60">
            <div className="container px-6 pb-12 pt-24 md:pb-16 md:pt-36">
                <SectionHeading
                    eyebrow={copy.eyebrow}
                    title={copy.title}
                    description={copy.description}
                />
            </div>

            <div className="container px-6 md:hidden">
                <ol>
                    {process.map((step, index) => (
                        <li key={step.title} className="relative py-8">
                            <BleedRule edge="top" />
                            {index === process.length - 1 ? <BleedRule edge="bottom" /> : null}
                            <span className="font-sans text-[11px] font-semibold tabular-nums uppercase tracking-[0.22em] text-muted-foreground">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-[#0a0a0a]">
                                {step.title}
                            </h3>
                            <p className="mt-4 text-sm leading-relaxed text-foreground/80">{step.description}</p>
                            <div className="relative mt-8 pt-4">
                                <BleedRule edge="top" />
                                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                                    {copy.keyDelivery}
                                </span>
                                <p className="mt-2 text-sm leading-relaxed text-foreground">{step.deliverable}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="container hidden px-6 md:block">
                <div className="relative">
                    <BleedRule edge="top" />
                    <div className="grid grid-cols-3">
                        {process.map((step, index) => (
                            <div key={step.title} className={`py-3 ${columnPad(index, process.length)} ${index > 0 ? "border-l border-[#0a0a0a]/15" : ""}`}>
                                <span className="font-sans text-[11px] font-semibold tabular-nums uppercase tracking-[0.22em] text-muted-foreground">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>
                        ))}
                    </div>
                    <BleedRule edge="bottom" />
                </div>
                <div className="grid grid-cols-3">
                    {process.map((step, index) => (
                        <div key={step.title} className={`py-10 ${columnPad(index, process.length)} ${index > 0 ? "border-l border-[#0a0a0a]/15" : ""}`}>
                            <h3 className="font-display text-2xl font-semibold leading-tight text-[#0a0a0a]">
                                {step.title}
                            </h3>
                            <p className="mt-4 text-sm leading-relaxed text-foreground/80">{step.description}</p>
                        </div>
                    ))}
                </div>
                <div className="relative">
                    <BleedRule edge="top" />
                    <div className="grid grid-cols-3">
                        {process.map((step, index) => (
                            <div key={step.title} className={`pb-10 pt-4 ${columnPad(index, process.length)} ${index > 0 ? "border-l border-[#0a0a0a]/15" : ""}`}>
                                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                                    {copy.keyDelivery}
                                </span>
                                <p className="mt-2 text-sm leading-relaxed text-foreground">{step.deliverable}</p>
                            </div>
                        ))}
                    </div>
                    <BleedRule edge="bottom" />
                </div>
            </div>
        </section>
    )
}
