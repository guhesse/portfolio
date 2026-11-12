import { useParams, Link } from "react-router-dom"
import { useState, useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { HeroDots } from "@/components/sections/hero-dots"
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

    const arrowClass = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/15 bg-background text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-25"

    return (
        <div className="bg-foreground/[0.08] p-px">
            <div
                role="region"
                aria-roledescription="carousel"
                aria-label={copy.gallery}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className="group relative aspect-[3/2] w-full overflow-hidden bg-background outline-none focus-visible:ring-2 focus-visible:ring-foreground"
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

                <div className="pointer-events-none absolute bottom-0 left-0 flex items-baseline gap-2 bg-foreground px-4 py-2.5 text-background">
                    <span className="font-display text-2xl leading-none">{padFrame(current + 1)}</span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-background/70">
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
                            className={`${arrowClass} left-3`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(current + 1)}
                            disabled={current === images.length - 1}
                            title={copy.nextImage}
                            className={`${arrowClass} right-3`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div
                    ref={stripRef}
                    className="mt-px flex gap-px overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                                className="min-w-[7.25rem] flex-1 bg-background text-left"
                            >
                                <span className="relative block aspect-[3/2] overflow-hidden">
                                    <img
                                        src={src.replace(/\.webp$/, "-thumb.webp")}
                                        alt=""
                                        width={320}
                                        height={213}
                                        loading="lazy"
                                        decoding="async"
                                        className={`h-full w-full object-cover transition-opacity duration-300 ${active ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
                                    />
                                </span>
                                <span className={`block px-2.5 py-2 text-[10px] font-medium tabular-nums tracking-[0.16em] ${active ? "bg-foreground text-background" : "text-foreground/55"}`}>
                                    {padFrame(index + 1)}
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
                <section className="relative overflow-hidden border-b border-border/60 bg-background">
                    <HeroDots />

                    <div data-motion="enter" className="relative z-10 container px-6 pb-20 pt-28">
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
                            <h1 data-motion-enter className="font-display text-4xl font-normal leading-[1.08] md:text-5xl">
                                {project.title}
                            </h1>
                            <p data-motion-enter className="mt-5 max-w-xl text-[15px] leading-7 text-muted-foreground">
                                {project.description}
                            </p>

                            {/* Serviços */}
                            {details?.services && details.services.length > 0 && (
                                <div data-motion-enter className="mt-8 flex flex-wrap gap-2">
                                    {details.services.map((service) => (
                                        <span
                                            key={service}
                                            className="border border-foreground/15 px-3.5 py-1.5 text-[12px] text-foreground/80"
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
                        <div data-motion="stagger" className="container px-6">
                            <div className="bg-foreground/[0.08] md:grid md:grid-cols-2 md:gap-px">
                                {details.challenge && (
                                    <div data-motion-item className="bg-background md:pr-14">
                                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                            {copy.challenge}
                                        </p>
                                        <p className="mt-5 text-[15px] leading-7 text-foreground/80">
                                            {details.challenge}
                                        </p>
                                    </div>
                                )}
                                {details.solution && (
                                    <div data-motion-item className="mt-14 bg-background md:mt-0 md:pl-14">
                                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                            {copy.solution}
                                        </p>
                                        <p className="mt-5 text-[15px] leading-7 text-foreground/80">
                                            {details.solution}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Galeria de imagens */}
                {details?.gallery && details.gallery.length > 0 && (
                    <section className="border-b border-border/60 py-24">
                        <div data-motion="rise" className="container px-6">
                            <p className="mb-10 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                                {copy.gallery}
                            </p>
                            <GalleryCarousel images={details.gallery} title={project.title} projectSlug={slug} />
                        </div>
                    </section>
                )}

                {/* CTA final */}
                <section className="bg-foreground py-24 text-background md:py-28">
                    <div className="container px-6">
                        <div data-motion="rise" className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-background/55">
                                    {copy.nextStep}
                                </p>
                                <h2 className="mt-6 font-display text-[1.7rem] font-normal leading-tight md:text-[2rem]">
                                    {copy.together}
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {details?.externalUrl && (
                                    <a
                                        href={details.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 border border-background/40 px-5 py-2.5 text-[12px] text-background transition-colors hover:border-background"
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
                                    className="inline-flex items-center gap-2 bg-background px-5 py-2.5 text-[12px] text-foreground transition-opacity hover:opacity-90"
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
