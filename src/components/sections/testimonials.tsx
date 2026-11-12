import { useState } from "react"
import { SectionHeading } from "@/components/shared/section-heading"
import { useSiteContent, useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

function quoteParts(quote: string) {
    const trimmed = quote.trim()
    const sentenceEnd = trimmed.search(/[.!?](?:\s|$)/)
    const firstSentence = sentenceEnd >= 0 ? trimmed.slice(0, sentenceEnd + 1) : trimmed
    if (firstSentence.length < trimmed.length && firstSentence.length <= 220) {
        return { summary: firstSentence, rest: trimmed.slice(firstSentence.length).trim() }
    }
    if (trimmed.length <= 180) return { summary: trimmed, rest: "" }
    const cut = trimmed.slice(0, 160).replace(/\s+\S*$/, "")
    return { summary: cut, rest: trimmed.slice(cut.length).trim() }
}

function RowRule({ edge }: { edge: "top" | "bottom" }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 h-px w-screen bg-[#0a0a0a]/15 ${
                edge === "top" ? "top-0" : "bottom-0"
            }`}
        />
    )
}

export function TestimonialsSection() {
    const [open, setOpen] = useState<Record<number, boolean>>({})
    const sectionRef = useSectionTracking("depoimentos")
    const { testimonials } = useSiteContent()
    const { testimonials: copy } = useUi()

    return (
        <section id="depoimentos" ref={sectionRef} className="overflow-x-clip border-b border-border/60 bg-background">
            <div className="container px-6 py-24 md:py-36">
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20">
                    <SectionHeading
                        eyebrow={copy.eyebrow}
                        title={copy.title}
                        description={copy.description}
                    />
                    <ol>
                        {testimonials.map((item, index) => {
                            const parts = quoteParts(item.quote)
                            const expanded = Boolean(open[index])
                            const canExpand = parts.rest.length > 0
                            return (
                                <li key={item.name} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-6 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-x-6">
                                    <RowRule edge="top" />
                                    {index === testimonials.length - 1 ? <RowRule edge="bottom" /> : null}
                                    <span className="pt-0.5 font-sans text-sm font-medium tabular-nums text-muted-foreground">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-base font-semibold leading-snug text-[#0a0a0a]">{item.name}</p>
                                        <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>
                                        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                                            <span aria-hidden={expanded ? true : undefined} className={expanded ? "hidden" : undefined}>
                                                “{parts.summary}”
                                            </span>
                                            <span aria-hidden={expanded ? undefined : true} className={expanded ? undefined : "hidden"}>
                                                “{item.quote}”
                                            </span>
                                        </p>
                                        {canExpand ? (
                                            <button
                                                type="button"
                                                aria-expanded={expanded}
                                                onClick={() => setOpen((current) => ({ ...current, [index]: !current[index] }))}
                                                className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {expanded ? copy.readLess : copy.readMore}
                                            </button>
                                        ) : null}
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        </section>
    )
}
