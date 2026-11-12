import type { ReactNode } from "react"
import { useSiteContent, useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

const columnTone = "bg-background"

type Step = {
    title: string
    description: string
    deliverable: string
}

function BleedRule() {
    return (
        <div aria-hidden="true" className="relative h-px">
            <div className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-foreground/[0.12]" />
        </div>
    )
}

function interleave(items: ReactNode[], gutter: (index: number) => ReactNode) {
    return items.flatMap((item, index) => (index === 0 ? [item] : [gutter(index), item]))
}

function StepBody({ step, index }: { step: Step; index: number }) {
    return (
        <div className={`flex h-full flex-col px-6 py-8 md:px-8 md:py-10 ${columnTone}`}>
            <span className="text-[11px] tabular-nums tracking-[0.18em] text-foreground/45">
                {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-8 font-display text-[1.55rem] font-normal leading-tight text-foreground">
                {step.title}
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-foreground/75">{step.description}</p>
        </div>
    )
}

function StepDelivery({ step, label }: { step: Step; label: string }) {
    return (
        <div className={`h-full px-6 py-6 md:px-8 md:py-7 ${columnTone}`}>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/45">{label}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground">{step.deliverable}</p>
        </div>
    )
}

export function ProcessSection() {
    const sectionRef = useSectionTracking("processo")
    const { process } = useSiteContent()
    const { process: copy } = useUi()

    const sheetRow = "grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)_4.5rem_minmax(0,1fr)] gap-x-px"

    return (
        <section id="processo" ref={sectionRef} className="overflow-x-clip bg-background">
            <div className="container px-6">
                <div className="max-w-xl">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                        {copy.index}
                    </p>
                    <h2 className="mt-6 font-display text-[2rem] font-normal leading-[1.12] text-foreground md:text-[2.5rem]">
                        {copy.title}
                    </h2>
                    <p className="mt-6 max-w-md text-[14px] leading-7 text-muted-foreground">{copy.description}</p>
                </div>
            </div>

            <div className="container mt-14 pb-28 md:mt-20 md:pb-40">
                <div className="bg-foreground/[0.12] px-px">
                    <div className="md:hidden">
                        {process.map((step, index) => (
                            <div key={step.title}>
                                <BleedRule />
                                <StepBody step={step} index={index} />
                                <BleedRule />
                                <StepDelivery step={step} label={copy.keyDelivery} />
                            </div>
                        ))}
                        <BleedRule />
                    </div>

                    <div className="hidden md:block">
                        <BleedRule />
                        <div className={sheetRow}>
                            {interleave(
                                process.map((step, index) => <StepBody key={step.title} step={step} index={index} />),
                                (index) => (
                                    <div key={`gutter-body-${index}`} aria-hidden="true" className="bg-background" />
                                ),
                            )}
                        </div>
                        <BleedRule />
                        <div className={sheetRow}>
                            {interleave(
                                process.map((step) => (
                                    <StepDelivery key={step.title} step={step} label={copy.keyDelivery} />
                                )),
                                (index) => (
                                    <div key={`gutter-delivery-${index}`} aria-hidden="true" className="bg-background" />
                                ),
                            )}
                        </div>
                        <BleedRule />
                    </div>
                </div>
            </div>
        </section>
    )
}
