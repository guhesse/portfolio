import { useEffect, useRef } from "react"
import { SectionHeading } from "@/components/shared/section-heading"
import { testimonials } from "@/data/content"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TestimonialsSection() {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        let animationFrameId: number

        const animate = () => {
            if (!scrollContainer) return

            scrollContainer.scrollLeft += 0.5

            // Reset para loop infinito
            const maxScroll = scrollContainer.scrollWidth / 2
            if (scrollContainer.scrollLeft >= maxScroll) {
                scrollContainer.scrollLeft = 0
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        // Pausa no hover
        const handleMouseEnter = () => cancelAnimationFrame(animationFrameId)
        const handleMouseLeave = () => {
            animationFrameId = requestAnimationFrame(animate)
        }

        scrollContainer.addEventListener('mouseenter', handleMouseEnter)
        scrollContainer.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrameId)
            scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
            scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <section id="depoimentos" className="border-b border-border/60 bg-background overflow-hidden">
            <div className="space-y-12 py-36">
                <div className="container px-6">
                    <SectionHeading
                        eyebrow="Depoimentos"
                        title="Projetos construídos com confiança e parceria de longo prazo."
                        description="Clientes que se tornam guardiões da marca e seguem colhendo resultados consistentes no pós-lançamento."
                    />
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-hidden pl-6"
                >
                    {/* Duplicar depoimentos para efeito infinito */}
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <Card
                            key={`${testimonial.name}-${index}`}
                            className="flex h-[320px] w-[420px] max-w-[420px] flex-shrink-0 flex-col border-border/70"
                        >
                            <CardHeader>
                                <Avatar className="h-11 w-11">
                                    {testimonial.image ? (
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                    ) : (
                                        <AvatarFallback>
                                            {testimonial.name
                                                .split(" ")
                                                .map((namePart) => namePart[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col gap-6 overflow-hidden pb-8">
                                <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                                    "{testimonial.quote}"
                                </p>
                                <div className="mt-auto text-sm text-muted-foreground">
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p>{testimonial.company}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
