import { useRef, useState, type MouseEvent, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { SectionHeading } from "@/components/shared/section-heading"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { withLocale } from "@/i18n/locale"
import { useLocale, useSiteContent, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"
import { useSectionTracking } from "@/hooks/use-section-tracking"

function tiltCard(event: MouseEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = event.currentTarget.querySelector<HTMLElement>("[data-tilt]")
    if (!el) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    const scale = window.matchMedia("(min-width: 768px)").matches ? 1.14 : 1.06
    const rotY = px * 12
    const rotX = -py * 10
    const moveX = px * 14
    const moveY = py * 10
    el.style.transition = "transform 80ms linear"
    el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`
}

function resetCard(event: MouseEvent<HTMLElement>) {
    const el = event.currentTarget.querySelector<HTMLElement>("[data-tilt]")
    if (!el) return
    el.style.transition = "transform 450ms ease"
    el.style.transform = ""
}

function ProjectCard({
    className,
    children,
    href,
    external,
    onClick,
}: {
    className: string
    children: ReactNode
    href?: string
    external?: boolean
    onClick?: () => void
}) {
    const motionClass = `${className} origin-center transition-transform duration-500 ease-out [transform-style:preserve-3d]`

    if (href && external) {
        return (
            <a
                data-tilt
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={motionClass}
                onClick={onClick}
            >
                {children}
            </a>
        )
    }

    if (href) {
        return (
            <Link
                data-tilt
                to={href}
                className={motionClass}
                onClick={onClick}
            >
                {children}
            </Link>
        )
    }

    return (
        <div data-tilt className={motionClass}>
            {children}
        </div>
    )
}

export function ProjectsSection() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const { track } = useAnalytics()
    const sectionRef = useSectionTracking("projetos")
    const { locale } = useLocale()
    const { projects } = useSiteContent()
    const { projects: copy } = useUi()
    const [hovered, setHovered] = useState<number | null>(null)

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return
        const amount = 520
        scrollRef.current.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" })
        track("carousel_scroll", { direction, location: "projects" })
    }

    return (
        <section id="projetos" ref={sectionRef} className="relative border-b border-border/60 bg-background">
            <div className="relative z-10 space-y-12 pt-36">
                <div className="container px-6">
                    <SectionHeading
                        eyebrow={copy.eyebrow}
                        title={copy.title}
                        description={copy.description}
                    />
                </div>

                {/* Carrossel com setas nas laterais */}
                <div className="relative">
                    {/* Seta esquerda */}
                    <button
                        onClick={() => scroll("left")}
                        title={copy.previous}
                        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground shadow-md transition-colors hover:bg-foreground hover:text-background"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    {/* Seta direita */}
                    <button
                        onClick={() => scroll("right")}
                        title={copy.next}
                        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground shadow-md transition-colors hover:bg-foreground hover:text-background"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Scroll container */}
                    <div
                        ref={scrollRef}
                        className="flex items-center overflow-x-auto py-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:py-16"
                    >
                        {projects.map((project, index) => {
                            const isExternal = project.link && (project.link.startsWith("http") || project.link.startsWith("//"))
                            const href = isExternal ? project.link! : project.slug ? withLocale(`/projetos/${project.slug}`, locale) : project.link
                            const hasLink = !!(project.slug || project.link)

                            const cardContent = (
                                <>
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            width={1100}
                                            height={733}
                                            loading="lazy"
                                            decoding="async"
                                            fetchPriority="low"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100" />
                                    <div className="absolute inset-0 flex translate-y-3 flex-col justify-end p-8 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
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
                                                {copy.viewProject}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )

                            const cardClass = `group relative block h-[50vh] md:h-[60vh] w-[280px] md:w-[500px] overflow-hidden shadow-none hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)] ${hasLink ? "cursor-pointer" : ""}`

                            const dimmed = hovered !== null && hovered !== index

                            return (
                                <div
                                    key={`${project.title}-${index}`}
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseMove={tiltCard}
                                    onMouseLeave={(event) => {
                                        setHovered(null)
                                        resetCard(event)
                                    }}
                                    className={`relative z-0 flex-shrink-0 snap-start [perspective:1100px] transition-[filter,opacity] duration-500 ease-out hover:z-20 ${dimmed ? "opacity-70 blur-[3px] brightness-[0.62]" : ""}`}
                                >
                                    <ProjectCard
                                        className={cardClass}
                                        href={hasLink ? href : undefined}
                                        external={!!isExternal}
                                        onClick={hasLink ? () => track("project_click", {
                                            project_name: project.title,
                                            project_slug: project.slug,
                                            project_type: isExternal ? "external" : "internal",
                                        }) : undefined}
                                    >
                                        {cardContent}
                                    </ProjectCard>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
