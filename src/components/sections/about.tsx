import { SectionHeading } from "@/components/shared/section-heading"
import { useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export function AboutSection() {
    const sectionRef = useSectionTracking("sobre")
    const { about } = useUi()

    return (
        <section className="relative border-b border-border/60 bg-background" id="sobre" ref={sectionRef}>
            <div className="container px-6 py-24 md:py-36 ">
                <div className="mx-auto">
                    {/* Layout em grid: foto à esquerda, conteúdo à direita */}
                    <div className="grid gap-12 md:grid-cols-[225px_1fr] md:gap-36">
                        {/* Círculo com foto */}
                        <div className="mx-auto">
                            <div className="h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-border/40 bg-gradient-to-br from-primary/5 to-accent/10">
                                <img
                                    src="/images/about/foto-gus.webp"
                                    alt={about.photoAlt}
                                    width={640}
                                    height={640}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col justify-center space-y-8">
                            {/* Conteúdo */}
                            <SectionHeading
                                eyebrow={about.eyebrow}
                                title={about.title}
                                description={about.description}
                            />


                            <blockquote className="border-l-4 border-primary/30 pl-6">
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {about.quoteLine1} <br /> {about.quoteLine2}
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
