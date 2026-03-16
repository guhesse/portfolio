import { useRef } from "react"
import { Link } from "react-router-dom"
import { projects } from "@/data/content"
import { SectionHeading } from "@/components/shared/section-heading"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ProjectsSection() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return
        const amount = 520
        scrollRef.current.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" })
    }

    return (
        <section id="projetos" className="relative border-b border-border/60 bg-background">
            <div className="relative z-10 space-y-12 pt-36">
                <div className="container px-6">
                    <SectionHeading
                        eyebrow="Portfólio"
                        title="Identidades visuais que viraram pontos de conexão reais."
                        description="Cada projeto nasce de uma imersão profunda na essência da marca e é lançado com um manual vivo para manter a consistência no dia a dia."
                    />
                </div>

                {/* Carrossel com setas nas laterais */}
                <div className="relative">
                    {/* Seta esquerda */}
                    <button
                        onClick={() => scroll("left")}
                        title="Anterior"
                        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground shadow-md transition-colors hover:bg-foreground hover:text-background"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    {/* Seta direita */}
                    <button
                        onClick={() => scroll("right")}
                        title="Próximo"
                        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground shadow-md transition-colors hover:bg-foreground hover:text-background"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Scroll container */}
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {projects.map((project, index) => {
                            const isExternal = project.link && (project.link.startsWith("http") || project.link.startsWith("//"))
                            const href = isExternal ? project.link! : project.slug ? `/projetos/${project.slug}` : project.link
                            const hasLink = !!(project.slug || project.link)

                            const cardContent = (
                                <>
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
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
                                        {hasLink && (
                                            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-background/40 bg-background/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-background backdrop-blur transition-colors group-hover:bg-background/20">
                                                Ver projeto →
                                            </span>
                                        )}
                                    </div>
                                </>
                            )

                            const cardClass = `group relative h-[50vh] md:h-[60vh] w-[280px] md:w-[500px] flex-shrink-0 overflow-hidden snap-start ${hasLink ? "cursor-pointer" : ""}`

                            return hasLink ? (
                                isExternal ? (
                                    <a
                                        key={`${project.title}-${index}`}
                                        href={href!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cardClass}
                                    >
                                        {cardContent}
                                    </a>
                                ) : (
                                    <Link
                                        key={`${project.title}-${index}`}
                                        to={href!}
                                        className={cardClass}
                                    >
                                        {cardContent}
                                    </Link>
                                )
                            ) : (
                                <div
                                    key={`${project.title}-${index}`}
                                    className={cardClass}
                                >
                                    {cardContent}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
