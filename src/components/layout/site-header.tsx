import { Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { TopMarquee } from "@/components/layout/top-marquee"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { whatsappUrl, type Locale } from "@/i18n/locale"
import { useLocale, useSiteContent, useUi } from "@/i18n/use-locale"
import { useAnalytics } from "@/hooks/use-analytics"

function LanguageSwitch() {
    const { locale, pathFor } = useLocale()
    const ui = useUi()

    const itemClass = (target: Locale) =>
        target === locale
            ? "text-foreground"
            : "text-muted-foreground transition-colors hover:text-foreground"

    return (
        <nav aria-label={ui.header.language} className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em]">
            <Link to={pathFor("pt")} hrefLang="pt-BR" lang="pt-BR" aria-current={locale === "pt" ? "true" : undefined} className={itemClass("pt")}>
                PT
            </Link>
            <span className="text-border" aria-hidden="true">/</span>
            <Link to={pathFor("en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined} className={itemClass("en")}>
                EN
            </Link>
        </nav>
    )
}

export function SiteHeader() {
    const navigate = useNavigate()
    const { isHome, homePath, locale } = useLocale()
    const { navigation } = useSiteContent()
    const ui = useUi()
    const { track } = useAnalytics()
    const chatHref = whatsappUrl(locale)

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
        track("navigation_click", { label, location: "header" })
        if (href.startsWith("#")) {
            e.preventDefault()
            if (isHome) {
                const el = document.querySelector(href)
                el?.scrollIntoView({ behavior: "smooth" })
            } else {
                navigate(`${homePath}${href}`)
            }
        }
    }

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm">
            <TopMarquee />
            <div className="border-b border-border/40 bg-background/85">
                <div className="container flex h-16 md:h-20 items-center justify-between">
                    <Link
                        to={homePath}
                        className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.6em] md:tracking-[0.8em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Gustavo Hesse
                    </Link>

                    <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground md:flex">
                        {navigation.map((item) => (
                            <a
                                key={item.href}
                                href={isHome ? item.href : `${homePath}${item.href}`}
                                onClick={(e) => handleNavClick(e, item.href, item.label)}
                                className="transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 md:gap-5">
                        <Button asChild size="lg" className="hidden rounded-full px-6 text-xs uppercase tracking-[0.4em] md:inline-flex">
                            <a
                                href={chatHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => track("whatsapp_click", { location: "header" })}
                            >
                                {ui.header.chat}
                            </a>
                        </Button>

                        <Sheet>
                            <SheetTrigger className="inline-flex items-center justify-center rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">{ui.header.openMenu}</span>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-background/95">
                                <SheetHeader>
                                    <SheetTitle className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
                                        {ui.header.navigation}
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-8 flex flex-col gap-6 text-sm uppercase tracking-[0.4em] text-muted-foreground">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.href}
                                            href={isHome ? item.href : `${homePath}${item.href}`}
                                            onClick={(e) => handleNavClick(e, item.href, item.label)}
                                            className="transition-colors hover:text-foreground"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                    <Button asChild className="mt-4 rounded-full px-6 text-xs uppercase tracking-[0.4em]">
                                        <a
                                            href={chatHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => track("whatsapp_click", { location: "header_mobile" })}
                                        >
                                            {ui.header.chat}
                                        </a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <LanguageSwitch />
                    </div>
                </div>
            </div>
        </header>
    )
}
