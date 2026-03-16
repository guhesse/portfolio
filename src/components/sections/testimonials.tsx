import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionHeading } from "@/components/shared/section-heading"
import { testimonials } from "@/data/content"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const sectionRef = useSectionTracking("depoimentos")

    const goTo = (i: number) => {
        setCurrent(i)
        setExpanded(false)
    }
    const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length)
    const next = () => goTo((current + 1) % testimonials.length)

    return (
        <section id="depoimentos" ref={sectionRef} className="border-b border-border/60 bg-background overflow-hidden">
            <div className="space-y-12 py-36">
                <div className="container px-6">
                    <SectionHeading
                        eyebrow="Depoimentos"
                        title="Projetos construídos com confiança e parceria de longo prazo."
                        description="Clientes que se tornam guardiões da marca e seguem colhendo resultados consistentes no pós-lançamento."
                    />
                </div>

                <div className="container px-6">
                    <div className="relative mx-auto max-w-3xl">
                        {/* Cards empilhados — fade entre eles */}
                        <div className="relative">
                            {testimonials.map((t, i) => {
                                const isLong = t.quote.length > 200
                                return (
                                <div
                                    key={i}
                                    className={`${i === current ? "relative opacity-100 pointer-events-auto" : "absolute inset-0 opacity-0 pointer-events-none"} rounded-2xl border border-border/70 bg-background p-10 md:p-14 shadow-sm transition-opacity duration-500`}
                                >
                                    {/* Texto com clamp ou expandido */}
                                    <p className={`text-base leading-relaxed text-foreground/80 md:text-lg ${isLong && !expanded ? "line-clamp-3" : ""}`}>
                                        "{t.quote}"
                                    </p>

                                    {/* Botão ler mais — só aparece se o texto for longo */}
                                    {isLong && (
                                        <div className="mt-2 flex justify-end">
                                            <button
                                                onClick={() => setExpanded((v) => !v)}
                                                className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {expanded ? "Ler menos ↑" : "Ler mais ↓"}
                                            </button>
                                        </div>
                                    )}

                                    <div className="mt-6 flex items-center gap-4">
                                        <Avatar className="h-11 w-11 flex-shrink-0">
                                            {t.image ? (
                                                <AvatarImage src={t.image} alt={t.name} />
                                            ) : (
                                                <AvatarFallback className="text-xs font-semibold">
                                                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">{t.name}</p>
                                            <p className="text-xs text-muted-foreground">{t.company}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>

                        {/* Controles */}
                        <div className="mt-8 flex items-center justify-between">
                            {/* Pontos indicadores */}
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        title={`Depoimento ${i + 1}`}
                                        onClick={() => goTo(i)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            i === current
                                                ? "w-6 bg-foreground"
                                                : "w-1.5 bg-border hover:bg-muted-foreground"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Setas */}
                            <div className="flex gap-2">
                                <button
                                    onClick={prev}
                                    title="Anterior"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={next}
                                    title="Próximo"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
