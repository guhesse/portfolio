import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import cvEn from "@/assets/Gustavo_Hesse_CV_EN.pdf"
import cvPt from "@/assets/Gustavo_Hesse_CV_PT.pdf"
import { SectionHeading } from "@/components/shared/section-heading.tsx"
import { experienceCopy } from "@/data/experience.ts"
import { useAnalytics } from "@/hooks/use-analytics"
import { useLocale } from "@/i18n/use-locale"
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

function Paragraphs({ text }: { text: string }) {
    return text.split("\n\n").map((paragraph) => (
        <p key={paragraph} className="mt-3 first:mt-0">
            {paragraph}
        </p>
    ))
}

function SmoothBody({
    summary,
    body,
    expanded,
}: {
    summary: string
    body: string
    expanded: boolean
}) {
    const clipRef = useRef<HTMLDivElement>(null)
    const summaryRef = useRef<HTMLDivElement>(null)
    const fullRef = useRef<HTMLDivElement>(null)
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
    }, [expanded, body, summary])

    return (
        <div className="relative mt-3">
            <div
                ref={summaryRef}
                aria-hidden="true"
                className="invisible absolute inset-x-0 top-0 text-[14px] leading-relaxed"
            >
                <p>{summary}</p>
            </div>
            <div ref={clipRef} className="overflow-hidden">
                <div ref={fullRef} className="text-[14px] leading-relaxed text-foreground/75">
                    <Paragraphs text={body} />
                </div>
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

export function ExperienceSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const fineHover = useFineHover()
    const sectionRef = useSectionTracking("experiencia")
    const { locale } = useLocale()
    const { track } = useAnalytics()
    const copy = experienceCopy[locale]
    const resumeHref = locale === "en" ? cvEn : cvPt
    const resumeFile = locale === "en" ? "Gustavo_Hesse_CV_EN.pdf" : "Gustavo_Hesse_CV_PT.pdf"

    return (
        <section id="experiencia" ref={sectionRef} className="overflow-x-clip bg-background">
            <div className="container px-6 pb-28 pt-16 md:pb-40 md:pt-24">
                <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
                    <div>
                        <SectionHeading as="h1" eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
                        <a
                            href={resumeHref}
                            download={resumeFile}
                            onClick={() => track("file_download", { label: copy.resume, location: "experiencia", url: resumeFile })}
                            className="mt-8 inline-flex items-center gap-2 border border-foreground/70 px-4 py-2 text-[12px] text-foreground transition-colors hover:bg-foreground hover:text-background"
                        >
                            {copy.resume}
                            <span aria-hidden="true">↓</span>
                        </a>
                    </div>
                    <ol>
                        {copy.items.map((item, index) => {
                            const canExpand = fineHover && item.body !== item.summary
                            const expanded = !fineHover || openIndex === index || item.body === item.summary
                            return (
                                <li
                                    key={`${item.org}-${item.role}`}
                                    tabIndex={canExpand ? 0 : undefined}
                                    aria-expanded={canExpand ? expanded : undefined}
                                    onMouseEnter={() => canExpand && setOpenIndex(index)}
                                    onMouseLeave={() => setOpenIndex((current) => (current === index ? null : current))}
                                    onFocus={() => canExpand && setOpenIndex(index)}
                                    onBlur={() => setOpenIndex((current) => (current === index ? null : current))}
                                    className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 py-7 outline-none md:grid-cols-[2.5rem_minmax(0,1fr)] md:py-8"
                                >
                                    <RowRule edge="top" />
                                    {index === copy.items.length - 1 ? <RowRule edge="bottom" /> : null}
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
                                        <p className="text-sm text-foreground">{item.role}</p>
                                        <p className="mt-1 text-[12px] text-muted-foreground">
                                            {item.org} · {item.when}
                                        </p>
                                        <SmoothBody summary={item.summary} body={item.body} expanded={expanded} />
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
