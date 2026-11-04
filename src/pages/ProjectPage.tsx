import { useParams, Link } from "react-router-dom"
import { useState, useCallback, useRef } from "react"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { useLocale, useSiteContent, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"
import { usePageMotion } from "@/lib/scroll-motion"

function GalleryCarousel({ images, title, projectSlug }: { images: string[]; title: string; projectSlug?: string }) {
    const [current, setCurrent] = useState(0)
    const { track } = useAnalytics()
    const { project: copy } = useUi()

    const goTo = useCallback((index: number) => {
        const next = Math.max(0, Math.min(index, images.length - 1))
        setCurrent(next)
        track("gallery_image_view", { project_name: title, project_slug: projectSlug, image_index: next + 1 })
    }, [images.length, title, projectSlug, track])

    return (
        <div className="space-y-4">
            {/* Viewport 16:9 */}
            <div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-video">
                {/* Track */}
                <div className="relative h-full w-full">
                    <img
                        src={images[current]}
                        alt={`${title} — imagem ${current + 1}`}
                        width={1100}
                        height={619}
                        decoding="async"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Seta esquerda */}
                {current > 0 && (
                    <button
                        onClick={() => goTo(current - 1)}
                        title={copy.previousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground shadow transition-colors hover:bg-foreground hover:text-background"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                )}

                {/* Seta direita */}
                {current < images.length - 1 && (
                    <button
                        onClick={() => goTo(current + 1)}
                        title={copy.nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-foreground shadow transition-colors hover:bg-foreground hover:text-background"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                )}

                {/* Contador */}
                <div className="absolute bottom-4 right-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium tabular-nums text-foreground">
                    {current + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            title={copy.thumb(i + 1)}
                            className={`flex-shrink-0 overflow-hidden rounded-md transition-all w-20 aspect-video ${
                                i === current
                                    ? "ring-2 ring-foreground opacity-100"
                                    : "opacity-40 hover:opacity-70"
                            }`}
                        >
                            <img
                                src={src.replace(/\.webp$/, "-thumb.webp")}
                                alt=""
                                width={240}
                                height={135}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
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
                                            className="rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground backdrop-blur"
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
