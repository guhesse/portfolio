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
        <section id="contato" ref={sectionRef} className="bg-foreground text-background">
            <div className="container px-6 py-28 md:py-40">
                <div className="grid items-end gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)] lg:gap-20">
                    <div className="max-w-xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-background/55">
                            {contact.index}
                        </p>
                        <h2 className="mt-6 font-display text-[2.2rem] font-normal leading-[1.08] md:text-[3rem]">
                            {contact.title}
                        </h2>
                    </div>
                    <div className="max-w-sm pb-1">
                        <p className="text-[14px] leading-7 text-background/80">{contact.description}</p>
                        <p className="mt-4 text-[13px] leading-relaxed text-background/65">
                            {contact.prompt}
                            <br />
                            {contact.reply}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={whatsappUrl(locale)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => track("whatsapp_click", { location: "contact" })}
                                className="inline-flex items-center gap-2 rounded-none bg-background px-5 py-2.5 text-[12px] text-foreground transition-opacity hover:opacity-90"
                            >
                                {contact.send}
                                <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="https://calendly.com/hesse-gustavo/30min"
                                target="_blank"
                                rel="noreferrer noopener"
                                onClick={() => track("cta_click", { location: "contact", label: contact.book })}
                                className="inline-flex items-center rounded-none border border-background/40 px-5 py-2.5 text-[12px] text-background transition-colors hover:border-background"
                            >
                                {contact.book}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
