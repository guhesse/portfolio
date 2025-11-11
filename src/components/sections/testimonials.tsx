import { SectionHeading } from "@/components/shared/section-heading"
import { testimonials } from "@/data/content"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TestimonialsSection() {
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

                <div className="container px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory">
                        {testimonials.map((testimonial, index) => (
                            <Card
                                key={`${testimonial.name}-${index}`}
                                className="flex h-[280px] flex-col border-border/70 snap-start"
                            >
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                    <Avatar className="h-12 w-12">
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
                                    <div className="text-sm">
                                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                                        <p className="text-muted-foreground">{testimonial.company}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col overflow-hidden pb-6">
                                    <p className="line-clamp-6 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                                        "{testimonial.quote}"
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
