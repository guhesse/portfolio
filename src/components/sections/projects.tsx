import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { withLocale } from "@/i18n/locale"
import { useLocale, useSiteContent, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"
import { useSectionTracking } from "@/hooks/use-section-tracking"

const caseImages = [
    "/images/projects/dell-sass-image1.webp",
    "/images/projects/dell-aw-image.webp",
    "/images/projects/coral-image.webp",
]

type Filter = "all" | "brand" | "ops"

type WorkItem = {
    key: string
    title: string
    description: string
    eyebrow: string
    image?: string
    accent: string
    href?: string
    external?: boolean
    document?: boolean
    slug?: string
    group: "brand" | "ops"
}

function BleedRule() {
    return (
        <div aria-hidden="true" className="relative h-px">
            <div className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-foreground/[0.08]" />
        </div>
    )
}

function WorkMedia({ item }: { item: WorkItem }) {
    return (
        <>
            {item.image ? (
                <img
                    src={item.image}
                    alt=""
                    width={1100}
                    height={733}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">
                    {item.eyebrow}
                </p>
                <h3 className="mt-3 max-w-[18ch] font-display text-[1.7rem] leading-[1.08] text-white md:text-[2rem]">
                    {item.title}
                </h3>
            </div>
        </>
    )
}

export function ProjectsSection() {
    const { track } = useAnalytics()
    const sectionRef = useSectionTracking("projetos")
    const { locale } = useLocale()
    const { projects } = useSiteContent()
    const { projects: copy, ops } = useUi()
    const [filter, setFilter] = useState<Filter>("all")

    const { brand, operation, all } = useMemo(() => {
        const brandItems: WorkItem[] = projects.map((project, index) => {
            const external = Boolean(project.link && (project.link.startsWith("http") || project.link.startsWith("//")))
            const document = Boolean(project.link && !external && !project.slug)
            const href = external
                ? project.link
                : project.slug
                    ? withLocale(`/projetos/${project.slug}`, locale)
                    : project.link
            return {
                key: `brand-${project.title}-${index}`,
                title: project.title,
                description: project.description,
                eyebrow: project.industry,
                image: project.image,
                accent: project.accent,
                href,
                external,
                document,
                slug: project.slug,
                group: "brand",
            }
        })

        const usedImages = new Set(brandItems.map((item) => item.image).filter(Boolean))
        const operationItems: WorkItem[] = ops.cases.map((item, index) => ({
            key: `ops-${item.title}`,
            title: item.title,
            description: item.description,
            eyebrow: item.tag,
            image: caseImages[index],
            accent: "from-neutral-800 to-neutral-950",
            href: index === 2 ? "https://touchingcolors.com/" : undefined,
            external: index === 2,
            group: "ops",
        }))

        return {
            brand: brandItems,
            operation: operationItems,
            all: [...brandItems, ...operationItems.filter((item) => !usedImages.has(item.image))],
        }
    }, [locale, ops.cases, projects])

    const visible = filter === "brand" ? brand : filter === "ops" ? operation : all

    const renderVisual = (item: WorkItem) => {
        const frame = "group relative block aspect-[4/3] overflow-hidden bg-neutral-900"
        const onClick = item.href
            ? () => track("project_click", {
                project_name: item.title,
                project_slug: item.slug,
                project_type: item.external ? "external" : "internal",
            })
            : undefined
        const media = <WorkMedia item={item} />

        if (item.href && (item.external || item.document)) {
            return (
                <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className={frame} onClick={onClick}>
                    {media}
                </a>
            )
        }
        if (item.href) {
            return (
                <Link to={item.href} className={frame} onClick={onClick}>
                    {media}
                </Link>
            )
        }
        return <div className={frame}>{media}</div>
    }

    const renderCaption = (item: WorkItem) => (
        <div className="flex items-start justify-between gap-6 px-6 py-5 md:px-8 md:py-6">
            <div className="min-w-0">
                <p className="text-sm text-foreground">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                    {item.description}
                </p>
            </div>
            {item.href ? (
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" aria-hidden="true" />
            ) : null}
        </div>
    )
    const filters: { id: Filter; label: string; count: number }[] = [
        { id: "all", label: copy.filterAll, count: all.length },
        { id: "brand", label: copy.filterBrand, count: brand.length },
        { id: "ops", label: copy.filterOps, count: operation.length },
    ]

    return (
        <section id="projetos" ref={sectionRef} className="overflow-x-clip bg-background">
            <div className="container px-6 pb-8 pt-20 md:pb-10 md:pt-28">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            {copy.index}
                        </p>
                        <h2 className="mt-6 font-display text-[2rem] font-normal leading-[1.12] text-foreground md:text-[2.65rem]">
                            {copy.title}
                        </h2>
                    </div>
                    <div className="flex max-w-sm flex-col items-start gap-6 lg:items-end">
                        <p className="text-[13px] leading-relaxed text-muted-foreground lg:text-right">
                            {copy.description}
                        </p>
                        <div className="flex flex-wrap gap-2 lg:justify-end" role="group" aria-label={copy.eyebrow}>
                            {filters.map((item) => {
                                const active = filter === item.id
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => {
                                            setFilter(item.id)
                                            track("cta_click", { location: "projects_filter", label: item.label })
                                        }}
                                        className={`inline-flex items-center gap-1.5 rounded-none px-3.5 py-1.5 text-[12px] transition-colors ${
                                            active
                                                ? "bg-foreground text-background"
                                                : "border border-foreground/15 text-foreground/75 hover:border-foreground/40"
                                        }`}
                                    >
                                        {item.label}
                                        <span className={active ? "text-background/70" : "text-foreground/40"}>{item.count}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-28 md:pb-40">
                <div className="bg-foreground/[0.08] px-px">
                    <div className="md:hidden">
                        {visible.map((item) => (
                            <div key={item.key}>
                                <BleedRule />
                                <div className="bg-background">{renderVisual(item)}</div>
                                <BleedRule />
                                <div className="bg-background">{renderCaption(item)}</div>
                            </div>
                        ))}
                        <BleedRule />
                    </div>
                    <div className="hidden md:block">
                        {Array.from({ length: Math.ceil(visible.length / 2) }, (_, rowIndex) => {
                            const row = visible.slice(rowIndex * 2, rowIndex * 2 + 2)
                            const cells = row.length === 1 ? [...row, null] : row
                            return (
                                <div key={row.map((item) => item.key).join("-")}>
                                    <BleedRule />
                                    <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] gap-x-px">
                                        <div className="bg-background">{cells[0] ? renderVisual(cells[0]) : null}</div>
                                        <div aria-hidden="true" className="bg-background" />
                                        <div className="bg-background">{cells[1] ? renderVisual(cells[1]) : null}</div>
                                    </div>
                                    <BleedRule />
                                    <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] gap-x-px">
                                        <div className="bg-background">{cells[0] ? renderCaption(cells[0]) : null}</div>
                                        <div aria-hidden="true" className="bg-background" />
                                        <div className="bg-background">
                                            {cells[1] ? renderCaption(cells[1]) : <div className="px-6 py-5 md:px-8 md:py-6" />}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <BleedRule />
                    </div>
                </div>
            </div>
        </section>
    )
}
