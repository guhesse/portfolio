import { useEffect, useRef } from "react"
import { projects } from "@/data/content"
import { SectionHeading } from "@/components/shared/section-heading"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const scrollContainer = scrollRef.current
        if (!section || !scrollContainer) return

        // Força o refresh do ScrollTrigger após renderização
        ScrollTrigger.refresh()

        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth

        const ctx = gsap.context(() => {
            gsap.to(scrollContainer, {
                scrollLeft: maxScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => maxScroll,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            })
        }, section)

        return () => {
            ctx.revert()
        }
    }, [])

    return (
        <section ref={sectionRef} id="projetos" className=" relative border-b border-border/60 bg-background">
            <div className="relative z-10 space-y-12 py-36">
                <div className="container px-6">
                    <SectionHeading
                        eyebrow="Portfólio"
                        title="Identidades visuais que viraram pontos de conexão reais."
                        description="Cada projeto nasce de uma imersão profunda na essência da marca e é lançado com um manual vivo para manter a consistência no dia a dia."
                    />
                </div>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-hidden overflow-y-hidden"
                >
                    {projects.map((project, index) => (
                        <div
                            key={`${project.title}-${index}`}
                            className="group relative h-[60vh] w-[500px] flex-shrink-0 cursor-pointer overflow-hidden"
                        >
                            {/* Imagem de fundo ou gradiente */}
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.accent} transition-transform duration-700 group-hover:scale-110`}
                                />
                            )}
                            {/* Overlay escuro no hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Informações que aparecem no hover */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-background/80">
                                    {project.industry}
                                </span>
                                <h3 className="mb-3 font-display text-3xl font-bold text-background">
                                    {project.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-background/90">
                                    {project.description}
                                </p>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
