import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shared/section-heading"
import { whatsappUrl } from "@/i18n/locale"
import { useLocale, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"
import { useSectionTracking } from "@/hooks/use-section-tracking"

export function ContactSection() {
    const { track } = useAnalytics()
    const sectionRef = useSectionTracking("contato")
    const { locale } = useLocale()
    const { contact } = useUi()

    return (
        <section id="contato" ref={sectionRef} className="overflow-x-clip bg-background">
            <div className="container px-6 py-24 md:py-32">
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
                    <SectionHeading
                        align="left"
                        eyebrow={contact.eyebrow}
                        title={contact.title}
                        description={contact.description}
                    />
                    <div className="relative py-8">
                        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-screen bg-[#0a0a0a]/15" />
                        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-screen bg-[#0a0a0a]/15" />
                        <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                            <p>{contact.prompt}</p>
                            <p>{contact.reply}</p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button size="lg" asChild>
                                <a
                                    href={whatsappUrl(locale)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track("whatsapp_click", { location: "contact" })}
                                >
                                    {contact.send}
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a
                                    href="https://calendly.com/hesse-gustavo/30min"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    onClick={() => track("cta_click", { location: "contact", label: contact.book })}
                                >
                                    {contact.book}
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
