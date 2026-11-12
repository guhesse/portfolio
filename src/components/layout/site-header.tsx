import { type MouseEvent } from "react"
import { Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

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
    const other: Locale = locale === "pt" ? "en" : "pt"
    const label = other === "en" ? "EN" : "PT"

    return (
        <Link
            to={pathFor(other)}
            hrefLang={other === "en" ? "en" : "pt-BR"}
            lang={other === "en" ? "en" : "pt-BR"}
            aria-label={ui.header.language}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-none border border-foreground/25 px-2.5 text-[10px] font-medium tracking-[0.16em] text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
        >
            {label}
        </Link>
    )
}

export function SiteHeader() {
    const navigate = useNavigate()
    const { isHome, homePath, locale } = useLocale()
    const { navigation } = useSiteContent()
    const ui = useUi()
    const { track } = useAnalytics()
    const chatHref = whatsappUrl(locale)

    const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
        track("navigation_click", { label, location: "header" })
        if (!href.startsWith("#")) return
        e.preventDefault()
        if (isHome) {
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        } else {
            navigate(`${homePath}${href}`)
        }
    }

    const linkClass = "text-[13px] text-foreground/70 transition-colors hover:text-foreground"

    return (
        <header className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
            <div className="flex h-14 w-full items-center gap-4 px-5 md:h-16 md:px-8 lg:px-10">
                <Link to={homePath} className="flex min-w-0 shrink-0 items-baseline gap-3">
                    <span className="font-display text-[1.35rem] leading-none tracking-tight text-foreground">
                        Gustavo Hesse
                    </span>
                    <span className="hidden text-[10px] uppercase tracking-[0.22em] text-muted-foreground xl:inline">
                        {ui.header.role}
                    </span>
                </Link>

                <nav aria-label={ui.header.navigation} className="ml-auto hidden items-center gap-7 lg:flex">
                    {navigation.map((item) => (
                        <a
                            key={item.href}
                            href={`${homePath}${item.href}`}
                            onClick={(e) => handleNavClick(e, item.href, item.label)}
                            className={linkClass}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-2.5 lg:ml-6">
                    <a
                        href={chatHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("whatsapp_click", { location: "header" })}
                        className="hidden items-center gap-2 rounded-none border border-foreground/70 px-4 py-2 text-[12px] text-foreground transition-colors hover:bg-foreground hover:text-background sm:inline-flex"
                    >
                        {ui.header.chat}
                        <span aria-hidden="true">→</span>
                    </a>

                    <Sheet>
                        <SheetTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 text-foreground/80 transition-colors hover:text-foreground lg:hidden">
                            <Menu className="h-4 w-4" />
                            <span className="sr-only">{ui.header.openMenu}</span>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background/95">
                            <SheetHeader>
                                <SheetTitle className="font-display text-2xl font-normal tracking-tight text-foreground">
                                    {ui.header.navigation}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-10 flex flex-col gap-5">
                                {navigation.map((item) => (
                                    <a
                                        key={item.href}
                                        href={`${homePath}${item.href}`}
                                        onClick={(e) => handleNavClick(e, item.href, item.label)}
                                        className="font-display text-2xl text-foreground"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <a
                                    href={chatHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => track("whatsapp_click", { location: "header_mobile" })}
                                    className="mt-4 inline-flex w-fit items-center gap-2 rounded-none border border-foreground/70 px-4 py-2 text-[13px] text-foreground"
                                >
                                    {ui.header.chat}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <LanguageSwitch />
                </div>
            </div>
        </header>
    )
}
