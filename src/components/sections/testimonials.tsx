import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { useSiteContent, useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

function useFineHover() {
    const [fineHover, setFineHover] = useState(true)
    useEffect(() => {
        const query = window.matchMedia("(hover: hover) and (pointer: fine)")
        const update = () => setFineHover(query.matches)
        update()
        query.addEventListener("change", update)
        return () => query.removeEventListener("change", update)
    }, [])
    return fineHover
}

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

function SmoothQuote({
    summary,
    quote,
    expanded,
}: {
    summary: string
    quote: string
    expanded: boolean
}) {
    const clipRef = useRef<HTMLDivElement>(null)
    const summaryRef = useRef<HTMLParagraphElement>(null)
    const fullRef = useRef<HTMLParagraphElement>(null)
    const ready = useRef(false)

    useLayoutEffect(() => {
        const clip = clipRef.current
        const summaryNode = summaryRef.current
        const fullNode = fullRef.current
        if (!clip || !summaryNode || !fullNode) return

        const motion = "height 700ms cubic-bezier(0.22, 1, 0.36, 1)"
        const apply = (animate: boolean) => {
            const next = (expanded ? fullNode : summaryNode).offsetHeight
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            if (!animate || reduce) {
                clip.style.transition = "none"
                clip.style.height = `${next}px`
                void clip.offsetHeight
                clip.style.transition = reduce ? "none" : motion
                return
            }
            clip.style.transition = motion
            clip.style.height = `${next}px`
        }

        apply(ready.current)
        ready.current = true

        let width = fullNode.offsetWidth
        const observer = new ResizeObserver(() => {
            const nextWidth = fullNode.offsetWidth
            if (nextWidth === width) return
            width = nextWidth
            apply(false)
        })
        observer.observe(fullNode)
        return () => observer.disconnect()
    }, [expanded, quote, summary])

    return (
        <div className="relative mt-3">
            <p
                ref={summaryRef}
                aria-hidden="true"
                className="invisible absolute inset-x-0 top-0 text-[14px] leading-relaxed"
            >
                “{summary}”
            </p>
            <div
                ref={clipRef}
                className="overflow-hidden"
            >
                <p ref={fullRef} className="text-[14px] leading-relaxed text-foreground/75">
                    “{quote}”
                </p>
            </div>
        </div>
    )
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
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const fineHover = useFineHover()
    const sectionRef = useSectionTracking("depoimentos")
    const { testimonials } = useSiteContent()
    const { testimonials: copy } = useUi()

    return (
        <section id="depoimentos" ref={sectionRef} className="overflow-x-clip bg-background">
            <div className="container px-6 pb-28 md:pb-40">
                <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
                    <SectionHeading
                        eyebrow={copy.eyebrow}
                        title={copy.title}
                        description={copy.description}
                    />
                    <ol>
                        {testimonials.map((item, index) => {
                            const parts = quoteParts(item.quote)
                            const canExpand = fineHover && parts.rest.length > 0
                            const expanded = !fineHover || openIndex === index || !parts.rest
                            return (
                                <li
                                    key={item.name}
                                    tabIndex={canExpand ? 0 : undefined}
                                    aria-expanded={canExpand ? expanded : undefined}
                                    onMouseEnter={() => canExpand && setOpenIndex(index)}
                                    onMouseLeave={() => setOpenIndex((current) => (current === index ? null : current))}
                                    onFocus={() => canExpand && setOpenIndex(index)}
                                    onBlur={() => setOpenIndex((current) => (current === index ? null : current))}
                                    className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 py-7 outline-none md:grid-cols-[2.5rem_minmax(0,1fr)] md:py-8"
                                >
                                    <RowRule edge="top" />
                                    {index === testimonials.length - 1 ? <RowRule edge="bottom" /> : null}
                                    {canExpand ? (
                                        <ArrowDown
                                            aria-hidden="true"
                                            className={`pointer-events-none absolute right-0 top-7 h-3.5 w-3.5 text-foreground/70 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-8 ${expanded ? "rotate-180" : ""}`}
                                        />
                                    ) : null}
                                    <span className="pt-0.5 font-sans text-[12px] tabular-nums text-muted-foreground">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm text-foreground">{item.name}</p>
                                        <p className="mt-1 text-[12px] text-muted-foreground">{item.company}</p>
                                        <SmoothQuote summary={parts.summary} quote={item.quote} expanded={expanded} />
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
