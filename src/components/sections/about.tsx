import { SectionHeading } from "@/components/shared/section-heading"
import { useUi } from "@/i18n/use-locale"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export function AboutSection() {
    const sectionRef = useSectionTracking("sobre")
    const { about } = useUi()

    return (
        <section className="relative overflow-x-clip border-b border-border/60 bg-background" id="sobre" ref={sectionRef}>
            <div className="container px-6 py-16 md:py-24">
                <div className="relative grid grid-cols-1 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
                    <div aria-hidden="true" className="pointer-events-none absolute left-[calc(50%-50vw)] top-0 h-px w-screen bg-[#0a0a0a]/15" />
                    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-[calc(50%-50vw)] h-px w-screen bg-[#0a0a0a]/15" />
                    <div data-motion="portrait" className="relative aspect-[4/5] max-h-[460px] bg-muted md:aspect-auto md:h-full md:max-h-none md:min-h-[360px] md:border-r md:border-[#0a0a0a]/15">
                        <img
                            src="/images/about/foto-gus.webp"
                            alt={about.photoAlt}
                            width={640}
                            height={640}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center py-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
                        <SectionHeading
                            eyebrow={about.eyebrow}
                            title={about.title}
                            description={about.description}
                        />
                        <blockquote data-motion="slide" className="mt-10 border-t border-[#0a0a0a]/15 pt-6">
                            <p className="font-display text-xl leading-snug text-[#0a0a0a] md:text-2xl">
                                {about.quoteLine1}
                                <br />
                                {about.quoteLine2}
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    )
}
