import { useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export function AboutSection() {
    const sectionRef = useSectionTracking("sobre")
    const { about } = useUi()

    return (
        <section id="sobre" ref={sectionRef} className="bg-background">
            <div className="container px-6 pb-28 pt-4 md:pb-40 md:pt-8">
                <div className="grid items-start gap-12 md:grid-cols-[220px_minmax(0,1fr)] md:gap-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-28">
                    <div>
                        <img
                            src="/images/about/foto-gus.webp"
                            alt={about.photoAlt}
                            width={640}
                            height={800}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[4/5] w-full max-w-[240px] object-cover"
                        />
                    </div>
                    <div className="max-w-xl pt-2 md:pt-6">
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                            {about.index}
                        </p>
                        <h2 className="mt-6 font-display text-[2rem] font-normal leading-[1.12] text-foreground md:text-[2.75rem]">
                            {about.title}
                        </h2>
                        <p className="mt-8 max-w-md text-[14px] leading-7 text-foreground/75">
                            {about.description}
                        </p>
                        <blockquote className="mt-10 font-display text-xl leading-snug text-foreground">
                            <p className="whitespace-nowrap">{about.quoteLine1}</p>
                            <p className="whitespace-nowrap">{about.quoteLine2}</p>
                        </blockquote>
                        <ul className="mt-10 flex flex-wrap gap-2">
                            {about.tags.map((tag) => (
                                <li
                                    key={tag}
                                    className="rounded-none border border-foreground/15 px-3.5 py-1.5 text-[12px] text-foreground/80"
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
