import { useParams, Link } from "react-router-dom"
import { useState, useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { useLocale, useSiteContent, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"
import { usePageMotion } from "@/lib/scroll-motion"

function padFrame(index: number) {
    return String(index).padStart(2, "0")
}

function GalleryCarousel({ images, title, projectSlug }: { images: string[]; title: string; projectSlug?: string }) {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)
    const stripRef = useRef<HTMLDivElement>(null)
    const dragStart = useRef<number | null>(null)
    const currentRef = useRef(0)
    const { track } = useAnalytics()
    const { project: copy } = useUi()

    const goTo = useCallback((index: number) => {
        const next = Math.max(0, Math.min(index, images.length - 1))
        if (next === currentRef.current) return
        setDirection(next > currentRef.current ? 1 : -1)
        currentRef.current = next
        setCurrent(next)
        track("gallery_image_view", { project_name: title, project_slug: projectSlug, image_index: next + 1 })
    }, [images.length, title, projectSlug, track])

    useEffect(() => {
        const strip = stripRef.current
        const active = strip?.querySelector<HTMLElement>("[data-active='true']")
        if (!strip || !active) return
        const left = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2
        strip.scrollTo({ left, behavior: "smooth" })
    }, [current])

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return
        dragStart.current = event.clientX
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (dragStart.current == null) return
        const delta = event.clientX - dragStart.current
        dragStart.current = null
        if (delta <= -56) goTo(current + 1)
        else if (delta >= 56) goTo(current - 1)
    }

    const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault()
            goTo(current + 1)
        } else if (event.key === "ArrowLeft") {
            event.preventDefault()
            goTo(current - 1)
        }
    }

    const arrowClass = "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-background/50 bg-background text-foreground shadow-lg transition duration-300 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-25"

    return (
        <div className="space-y-5">
            <div
                role="region"
                aria-roledescription="carousel"
                aria-label={copy.gallery}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className="group relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-muted shadow-[0_28px_70px_-36px_rgba(24,24,22,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
                <div
                    className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => { dragStart.current = null }}
                >
                    <img
                        key={images[current]}
                        src={images[current]}
                        alt={`${title} — ${padFrame(current + 1)}`}
                        decoding="async"
                        draggable={false}
                        data-dir={direction}
                        className="gallery-settle absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                <div className="pointer-events-none absolute bottom-4 left-4 flex items-baseline gap-2 rounded-full bg-foreground/90 px-4 py-2 text-background md:bottom-5 md:left-5">
                    <span className="font-display text-2xl leading-none md:text-3xl">{padFrame(current + 1)}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-background/70">
                        / {padFrame(images.length)}
                    </span>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => goTo(current - 1)}
                            disabled={current === 0}
                            title={copy.previousImage}
                            className={`${arrowClass} left-4 opacity-80 group-hover:opacity-100`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(current + 1)}
                            disabled={current === images.length - 1}
                            title={copy.nextImage}
                            className={`${arrowClass} right-4 opacity-80 group-hover:opacity-100`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-1.5" aria-hidden>
                    {images.map((src, index) => (
                        <button
                            key={src}
                            type="button"
                            tabIndex={-1}
                            onClick={() => goTo(index)}
                            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${index === current ? "bg-foreground" : index < current ? "bg-foreground/40" : "bg-foreground/15 hover:bg-foreground/30"}`}
                        />
                    ))}
                </div>
            )}

            {images.length > 1 && (
                <div
                    ref={stripRef}
                    className="flex items-end gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {images.map((src, index) => {
                        const active = index === current
                        return (
                            <button
                                key={src}
                                type="button"
                                data-active={active}
                                onClick={() => goTo(index)}
                                title={copy.thumb(index + 1)}
                                className={`group/thumb flex-shrink-0 transition-all duration-500 ease-out ${active ? "w-32 opacity-100 md:w-40" : "w-20 opacity-45 hover:opacity-100 md:w-24"}`}
                            >
                                <span className="relative block aspect-[3/2] overflow-hidden rounded-lg">
                                    <img
                                        src={src.replace(/\.webp$/, "-thumb.webp")}
                                        alt=""
                                        width={320}
                                        height={213}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                    <span className={`absolute bottom-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${active ? "bg-foreground text-background" : "bg-background/85 text-foreground"}`}>
                                        {padFrame(index + 1)}
                                    </span>
                                </span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export function ProjectPage() {
    const { slug } = useParams<{ slug: string }>()
    const { projects } = useSiteContent()
    const { homePath } = useLocale()
    const { project: copy } = useUi()
    const project = projects.find((p) => p.slug === slug)
    const { track } = useAnalytics()
    const pageRef = useRef<HTMLDivElement>(null)
    usePageMotion(pageRef, slug ?? "missing")

    if (!project) {
        return (
            <div ref={pageRef} className="min-h-screen bg-background text-foreground">
                <SiteHeader />
                <main className="container px-6 py-36 text-center">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                        404
                    </p>
                    <h1 className="font-display text-4xl font-bold">{copy.notFoundTitle}</h1>
                    <p className="mt-4 text-muted-foreground">
                        {copy.notFoundBody}
                    </p>
                    <Link
                        to={homePath}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {copy.back}
                    </Link>
                </main>
                <SiteFooter />
            </div>
        )
    }

    const { details } = project

    return (
        <div ref={pageRef} className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            <main>
                {/* Hero do projeto */}
                <section className="relative overflow-hidden border-b border-border/60">
                    {/* Imagem ou gradiente de fundo */}
                    <div className="absolute inset-0">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                width={1100}
                                height={733}
                                decoding="async"
                                fetchPriority="high"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className={`h-full w-full bg-gradient-to-br ${project.accent}`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
                    </div>

                    {/* Conteúdo do hero */}
                    <div data-motion="enter" className="relative container px-6 pb-24 pt-40">
                        <Link
                            data-motion-enter
                            to={`${homePath}#projetos`}
                            className="mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            {copy.allProjects}
                        </Link>

                        <div className="max-w-3xl">
                            <p data-motion-enter className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                {project.industry}
                                {details?.year && (
                                    <span className="ml-4 text-muted-foreground/60">— {details.year}</span>
                                )}
                            </p>
                            <h1 data-motion-enter className="font-display text-5xl font-bold leading-tight md:text-7xl">
                                {project.title}
                            </h1>
                            <p data-motion-enter className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                                {project.description}
                            </p>

                            {/* Serviços */}
                            {details?.services && details.services.length > 0 && (
                                <div data-motion-enter className="mt-8 flex flex-wrap gap-2">
                                    {details.services.map((service) => (
                                        <span
                                            key={service}
                                            className="rounded-full border border-border/60 bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Desafio & Solução */}
                {(details?.challenge || details?.solution) && (
                    <section className="border-b border-border/60 py-24">
                        <div data-motion="stagger" className="container grid gap-16 px-6 md:grid-cols-2">
                            {details.challenge && (
                                <div data-motion-item className="space-y-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                        {copy.challenge}
                                    </p>
                                    <p className="text-lg leading-relaxed text-foreground/80">
                                        {details.challenge}
                                    </p>
                                </div>
                            )}
                            {details.solution && (
                                <div data-motion-item className="space-y-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                        {copy.solution}
                                    </p>
                                    <p className="text-lg leading-relaxed text-foreground/80">
                                        {details.solution}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Galeria de imagens */}
                {details?.gallery && details.gallery.length > 0 && (
                    <section className="border-b border-border/60 py-24">
                        <div data-motion="rise" className="container px-6">
                            <p className="mb-10 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                {copy.gallery}
                            </p>
                            <GalleryCarousel images={details.gallery} title={project.title} projectSlug={slug} />
                        </div>
                    </section>
                )}

                {/* CTA final */}
                <section className="py-24">
                    <div className="container px-6">
                        <div data-motion="rise" className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                    {copy.nextStep}
                                </p>
                                <h2 className="font-display text-3xl font-bold md:text-4xl">
                                    {copy.together}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {details?.externalUrl && (
                                    <a
                                        href={details.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
                                        onClick={() => track("external_link_click", { project_name: project.title, project_slug: slug, url: details.externalUrl })}
                                    >
                                        {copy.seeLive}
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                )}
                                <a
                                    href="https://meet.gustavohesse.com.br/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-foreground/80"
                                    onClick={() => track("cta_click", { location: "project_page", label: copy.book, project_slug: slug })}
                                >
                                    {copy.book}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    )
}
