import { Link } from "react-router-dom"
import { whatsappUrl } from "@/i18n/locale"
import { useLocale, useSiteContent } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"

const LINKEDIN_URL = "https://www.linkedin.com/in/guhesse/"

export function SiteFooter() {
    const { track } = useAnalytics()
    const { homePath, locale } = useLocale()
    const { navigation } = useSiteContent()

    return (
        <footer className="bg-background">
            <div className="container flex flex-col gap-8 px-6 py-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-baseline gap-4">
                    <Link to={homePath} className="font-display text-lg tracking-tight text-foreground">
                        Gustavo Hesse
                    </Link>
                    <span className="text-[11px] tracking-[0.14em] text-muted-foreground">
                        © {new Date().getFullYear()}
                    </span>
                </div>
                <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground">
                    {navigation.map((item) => (
                        <a
                            key={item.href}
                            href={`${homePath}${item.href}`}
                            className="transition-colors hover:text-foreground"
                            onClick={() => track("navigation_click", { label: item.label, location: "footer" })}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href={whatsappUrl(locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-foreground"
                        onClick={() => track("social_click", { platform: "whatsapp", location: "footer" })}
                    >
                        WhatsApp
                    </a>
                    <a
                        href={LINKEDIN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-foreground"
                        onClick={() => track("social_click", { platform: "linkedin", location: "footer" })}
                    >
                        LinkedIn
                    </a>
                </nav>
            </div>
        </footer>
    )
}
