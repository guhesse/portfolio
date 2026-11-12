import { Link } from "react-router-dom"
import { whatsappUrl, withLocale } from "@/i18n/locale"
import { useLocale, useSiteContent, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"

const LINKEDIN_URL = "https://www.linkedin.com/in/guhesse/"

export function SiteFooter({ variant = "brand" }: { variant?: "brand" | "ops" }) {
    const { track } = useAnalytics()
    const { homePath, locale, isHome } = useLocale()
    const { navigation } = useSiteContent()
    const ui = useUi()

    if (variant === "ops") {
        return (
            <footer className="border-t border-border/60 bg-background/80">
                <div className="container flex flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to={homePath}
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                        onClick={() => track("navigation_click", { label: ui.ops.backToBranding, location: "ops_footer" })}
                    >
                        {ui.ops.backToBranding}
                    </Link>
                    <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                        onClick={() => track("social_click", { platform: "linkedin", location: "ops_footer" })}
                    >
                        {ui.ops.linkedin}
                    </a>
                </div>
                <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Gustavo Hesse. {ui.footer.rights}
                </div>
            </footer>
        )
    }

    return (
        <footer className="border-t border-border/60 bg-background/80">
            <div className="container grid gap-8 px-6 py-10 md:grid-cols-[1.5fr_1fr] md:items-start">
                <div data-motion="slide" className="space-y-4">
                    <span className="text-sm font-semibold tracking-[0.32em] text-muted-foreground">
                        GUSTAVO HESSE
                    </span>
                    <p className="max-w-md text-sm text-muted-foreground">
                        {ui.footer.blurb}
                    </p>
                    {isHome && (
                        <Link
                            to={withLocale("/ops", locale)}
                            className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground/80 transition hover:text-foreground"
                            onClick={() => track("navigation_click", { label: "Creative Operations", location: "footer" })}
                        >
                            Creative Operations →
                        </Link>
                    )}
                </div>
                <div data-motion="slide" data-motion-from="right" className="flex gap-8 text-sm text-muted-foreground md:justify-end">
                    <div className="flex flex-col gap-3">
                        <span className="font-semibold text-foreground">{ui.footer.sections}</span>
                        {navigation.map((item) => (
                            <a
                                key={item.href}
                                href={`${homePath}${item.href}`}
                                className="transition hover:text-foreground"
                                onClick={() => track("navigation_click", { label: item.label, location: "footer" })}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-semibold text-foreground">{ui.footer.contact}</span>
                        <a
                            href={whatsappUrl(locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-foreground"
                            onClick={() => track("social_click", { platform: "whatsapp", location: "footer" })}
                        >
                            WhatsApp
                        </a>
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="transition hover:text-foreground"
                            onClick={() => track("social_click", { platform: "linkedin", location: "footer" })}
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Gustavo Hesse. {ui.footer.rights}
            </div>
        </footer>
    )
}

