import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
        <section id="contato" ref={sectionRef} className="bg-gradient-to-br from-background via-background to-muted/30">
            <div className="container px-6 py-24">
                <Card data-motion="rise" className="overflow-hidden border-border/70 bg-background/80 shadow-sm">
                    <CardContent className="grid gap-8 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:px-12 lg:py-16">
                        <SectionHeading
                            align="left"
                            eyebrow={contact.eyebrow}
                            title={contact.title}
                            description={contact.description}
                        />
                        <div data-motion="slide" data-motion-from="right" className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-muted/30 p-8">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>
                                    {contact.prompt}
                                </p>
                                <p><i>{contact.reply}</i></p>
                            </div>
                            <div className="flex flex-wrap gap-3">
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
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
