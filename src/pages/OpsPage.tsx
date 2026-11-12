import { useEffect, useRef, useState } from "react"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { HeroDots } from "@/components/sections/hero-dots"
import { HeroTree } from "@/components/sections/hero-tree"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/hooks/use-analytics"
import { useLocale, useUi } from "@/i18n/use-locale"
import { usePageMotion } from "@/lib/scroll-motion"

const LINKEDIN_URL = "https://www.linkedin.com/in/guhesse/"

const caseImages = [
    "/images/projects/dell-sass-image1.webp",
    "/images/projects/dell-aw-image.webp",
    "/images/projects/coral-image.webp",
]

function useCountUp(target: number, active: boolean) {
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const [value, setValue] = useState(reduced ? target : 0)

    useEffect(() => {
        if (!active) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setValue(target)
            return
        }
        const start = performance.now()
        let frame = 0
        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / 1200)
            const eased = 1 - (1 - progress) ** 3
            setValue(Math.round(target * eased))
            if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [active, target])

    return value
}

function StatFigure({
    value,
    suffix,
    active,
    locale,
}: {
    value: number
    suffix: string
    active: boolean
    locale: "pt" | "en"
}) {
    const current = useCountUp(value, active)
    const format = (amount: number) => amount.toLocaleString(locale === "pt" ? "pt-BR" : "en-US")
    const finalFigure = `${format(value)}${suffix}`

    return (
        <p
            aria-label={finalFigure}
            className="font-display text-[clamp(3rem,5.2vw,5rem)] font-extrabold leading-none tracking-tight text-[#0a0a0a]"
        >
            <span aria-hidden="true" className="tabular-nums">
                {format(current)}
                {suffix.startsWith(" ") ? (
                    <span className="ml-[0.7em] align-baseline text-[0.34em] font-extrabold leading-none tracking-normal">
                        {suffix.trim()}
                    </span>
                ) : suffix}
            </span>
        </p>
    )
}

export function OpsPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    usePageMotion(pageRef, "ops")
    const { locale } = useLocale()
    const { ops } = useUi()
    const { track } = useAnalytics()
    const numbersRef = useRef<HTMLElement>(null)
    const [numbersActive, setNumbersActive] = useState(false)

    useEffect(() => {
        const node = numbersRef.current
        if (!node) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) setNumbersActive(true)
            },
            { threshold: 0.4 },
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={pageRef} className="min-h-screen bg-background text-foreground">
            <SiteHeader variant="ops" />
            <main>
                <section className="relative overflow-hidden border-b border-border/60 md:min-h-[calc(100svh-7.5rem)]">
                    <HeroDots />
                    <div className="container pointer-events-none relative z-20 grid items-center px-6 py-16 md:min-h-[calc(100svh-7.5rem)] md:py-20">
                        <div data-motion="enter" className="pointer-events-auto max-w-xl space-y-8 md:max-w-[42%]">
                            <h1 data-motion-enter className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                                {ops.heroTitle}
                            </h1>
                            <p data-motion-enter className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {ops.heroSubtitle}
                            </p>
                            <div data-motion-enter className="flex flex-wrap items-center gap-x-6 gap-y-4">
                                <Button asChild size="lg" className="rounded-full px-6 text-xs uppercase tracking-[0.28em]">
                                    <a
                                        href={LINKEDIN_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => track("social_click", { platform: "linkedin", location: "ops_hero" })}
                                    >
                                        {ops.ctaLinkedin}
                                    </a>
                                </Button>
                                <a
                                    href="#cases"
                                    className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
                                    onClick={() => track("cta_click", { location: "ops_hero", label: ops.ctaProjects })}
                                >
                                    {ops.ctaProjects}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div data-motion="rise" className="relative z-10 mx-auto h-[520px] w-full max-w-lg px-2 pb-6 md:absolute md:inset-y-0 md:left-[38%] md:right-0 md:mx-0 md:h-auto md:w-auto md:max-w-none md:px-0 md:pb-0">
                        <HeroTree
                            hint={ops.treeHint}
                            stages={ops.treeStages}
                            marks={ops.treeMarks}
                            styleOutline={ops.treeStyleOutline}
                            styleFill={ops.treeStyleFill}
                        />
                    </div>
                </section>

                <section ref={numbersRef} aria-labelledby="ops-numeros" className="border-b border-border/60">
                    <div className="container px-6 py-16 md:py-24">
                        <h2 id="ops-numeros" className="sr-only">{ops.numbersLabel}</h2>
                        <ul className="grid grid-cols-2 md:grid-cols-4">
                            {ops.stats.map((stat, index) => (
                                <li
                                    key={stat.label}
                                    className={`min-w-0 px-3 py-8 sm:px-5 md:px-8 md:py-2 ${
                                        index < 2 ? "border-b border-[#0a0a0a]/15 md:border-b-0" : ""
                                    } ${index > 0 ? "md:border-l md:border-[#0a0a0a]/15" : ""}`}
                                >
                                    <StatFigure value={stat.value} suffix={stat.suffix} active={numbersActive} locale={locale} />
                                    <p className="mt-4 font-sans text-base font-semibold leading-snug text-primary md:text-lg">
                                        {stat.label}
                                    </p>
                                    <p className="mt-1 font-sans text-sm font-normal leading-relaxed text-neutral-500/60">
                                        {stat.context}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section aria-labelledby="ops-sobre" className="border-b border-border/60">
                    <div className="container px-6 py-16 md:py-24">
                        <div data-motion="heading" className="max-w-3xl space-y-6">
                            <h2 id="ops-sobre" data-motion="eyebrow" className="text-[11px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
                                {ops.aboutLabel}
                            </h2>
                            <p data-motion="body" className="text-base leading-relaxed text-foreground/85 md:text-lg">
                                {ops.aboutBody}
                            </p>
                        </div>
                    </div>
                </section>

                <section id="cases" aria-labelledby="ops-cases" className="scroll-mt-24 overflow-x-clip border-b border-border/60">
                    <div className="container px-6 pb-10 pt-16 md:pb-14 md:pt-24">
                        <h2 id="ops-cases" data-motion="eyebrow" className="text-[11px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
                            {ops.casesLabel}
                        </h2>
                    </div>
                    <div className="container px-6 pb-16 md:pb-24">
                        <ol>
                            {ops.cases.map((item, index) => (
                                <li
                                    key={item.title}
                                    className="relative grid grid-cols-1 md:grid-cols-[minmax(0,240px)_minmax(0,1.35fr)_minmax(0,0.8fr)] lg:grid-cols-[minmax(0,280px)_minmax(0,1.4fr)_minmax(0,0.75fr)]"
                                >
                                    <div aria-hidden="true" className="pointer-events-none absolute left-[calc(50%-50vw)] top-0 h-px w-screen bg-[#0a0a0a]/15" />
                                    {index === ops.cases.length - 1 ? (
                                        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[calc(50%-50vw)] h-px w-screen bg-[#0a0a0a]/15" />
                                    ) : null}
                                    <div className="relative aspect-[16/10] bg-muted md:aspect-auto md:min-h-[220px] md:border-r md:border-[#0a0a0a]/15">
                                        <img
                                            src={caseImages[index]}
                                            alt=""
                                            width={1100}
                                            height={733}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="min-w-0 py-8 md:px-12 md:py-14 lg:px-16 lg:py-16">
                                        <span className="font-sans text-sm font-medium tabular-nums text-muted-foreground">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                                            {item.tag}
                                        </p>
                                        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-[#0a0a0a] md:text-3xl">
                                            {item.title}
                                        </h3>
                                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80 md:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="min-w-0 border-t border-[#0a0a0a]/15 py-8 md:border-l md:border-t-0 md:px-10 md:py-14 lg:px-12 lg:py-16">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                                            {ops.resultLabel}
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-foreground">
                                            {item.result}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section aria-labelledby="ops-stack">
                    <div className="container px-6 py-16 md:py-24">
                        <h2 id="ops-stack" className="text-[11px] font-semibold uppercase tracking-[0.5em] text-muted-foreground">
                            {ops.stackLabel}
                        </h2>
                        <ul data-motion="stagger" data-motion-stagger="soft" className="mt-8 flex flex-wrap gap-2">
                            {ops.stack.map((item) => (
                                <li
                                    key={item}
                                    data-motion-item
                                    className="rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
            <SiteFooter variant="ops" />
        </div>
    )
}
