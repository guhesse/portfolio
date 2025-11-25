import { SectionHeading } from "@/components/shared/section-heading"

export function AboutSection() {
    return (
        <section className="relative border-b border-border/60 bg-background" id="sobre">
            <div className="container px-6 py-24 md:py-36 ">
                <div className="mx-auto">
                    {/* Layout em grid: foto à esquerda, conteúdo à direita */}
                    <div className="grid gap-12 md:grid-cols-[225px_1fr] md:gap-36">
                        {/* Círculo com foto */}
                        <div className="mx-auto">
                            <div className="h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-border/40 bg-gradient-to-br from-primary/5 to-accent/10">
                                <img
                                    src="/images/about/foto-gus.jpg"
                                    alt="Gustavo"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col justify-center space-y-8">
                            {/* Conteúdo */}
                            <SectionHeading
                                eyebrow="Sobre"
                                title="Sou Gustavo, designer estrategista."
                                description="Gosto de entender o porquê por trás das formas e transformar intenção em linguagem visual.
                            
                            Trabalho com branding, identidade e direção criativa. Minha abordagem mistura pesquisa, percepção e estética. Sempre com atenção a como a marca respira no dia a dia."
                            />


                            {/* Chart/Quote */}
                            <blockquote className="border-l-4 border-primary/30 pl-6">
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    Design bom faz sentido antes de ficar bonito. <br /> Quando faz sentido, o bonito dura.
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
