import { useEffect, useRef, useState } from "react"
import { useLocale, useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

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

    return (
        <p className="font-display text-[clamp(1.85rem,3vw,2.6rem)] font-normal leading-none tracking-tight text-foreground">
            <span className="tabular-nums">
                {format(current)}
                {suffix.startsWith(" ") ? (
                    <span className="ml-[0.45em] align-baseline text-[0.42em] tracking-normal">{suffix.trim()}</span>
                ) : (
                    suffix
                )}
            </span>
        </p>
    )
}

export function OperationsSection() {
    const sectionRef = useSectionTracking("operacao")
    const numbersRef = useRef<HTMLUListElement>(null)
    const [numbersActive, setNumbersActive] = useState(false)
    const { locale } = useLocale()
    const { ops } = useUi()

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
        <section id="operacao" ref={sectionRef} className="bg-background">
            <div className="container px-6 pb-28 md:pb-40">
                <div className="max-w-xl">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                        {ops.sectionIndex}
                    </p>
                    <h2 className="mt-6 font-display text-[2rem] font-normal leading-[1.12] text-foreground md:text-[2.65rem]">
                        {ops.sectionTitle}
                    </h2>
                    <p className="mt-6 text-[14px] leading-7 text-foreground/75">
                        {ops.heroSubtitle}
                    </p>
                    <p className="mt-4 max-w-md text-[14px] leading-7 text-muted-foreground">
                        {ops.aboutBody}
                    </p>
                </div>

                <ul ref={numbersRef} className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-4 md:gap-x-10">
                    {ops.stats.map((stat) => (
                        <li key={stat.label}>
                            <StatFigure value={stat.value} suffix={stat.suffix} active={numbersActive} locale={locale} />
                            <p className="mt-4 text-sm leading-snug text-foreground">{stat.label}</p>
                            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{stat.context}</p>
                        </li>
                    ))}
                </ul>

                <div className="mt-16 md:mt-20">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                        {ops.stackLabel}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                        {ops.stack.map((item) => (
                            <li
                                key={item}
                                className="rounded-none border border-foreground/15 px-3.5 py-1.5 text-[12px] text-foreground/80"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
