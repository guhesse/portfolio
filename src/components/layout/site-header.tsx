import { Menu } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { TopMarquee } from "@/components/layout/top-marquee"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { stripLocale, whatsappUrl, withLocale, type Locale } from "@/i18n/locale"
import { useLocale, useUi } from "@/i18n/use-locale"
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

export function SiteHeader({ variant = "brand" }: { variant?: "brand" | "ops" }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { isHome, homePath, locale } = useLocale()
    const ui = useUi()
    const { track } = useAnalytics()
    const chatHref = whatsappUrl(locale)
    const onOps = stripLocale(pathname) === "/ops"
    const onBrand = stripLocale(pathname) === "/"
    const opsPath = withLocale("/ops", locale)
    const linkClass = "transition-colors hover:text-foreground"

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

    const pageLink = (active: boolean) =>
        active ? "text-foreground" : linkClass

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm">
            <TopMarquee items={variant === "ops" ? ui.ops.marquee : undefined} />
            <div className="border-b border-border/40 bg-background/85">
                <div className="flex h-16 w-full items-center gap-4 px-5 md:h-20 md:px-8 lg:px-12">
                    <Link
                        to={homePath}
                        className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.42em] text-muted-foreground transition-colors hover:text-foreground md:text-xs md:tracking-[0.55em]"
                    >
                        Gustavo Hesse
                    </Link>

                    <nav aria-label={ui.header.navigation} className="hidden min-w-0 items-center gap-6 px-6 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground md:flex lg:gap-8 lg:px-8 lg:text-[11px] lg:tracking-[0.22em]">
                        <div className="flex items-center gap-3">
                            <Link to={homePath} aria-current={onBrand ? "page" : undefined} className={pageLink(onBrand)}>
                                {ui.header.navBrand}
                            </Link>
                            <span className="text-border" aria-hidden="true">/</span>
                            <Link to={opsPath} aria-current={onOps ? "page" : undefined} className={pageLink(onOps)}>
                                {ui.ops.navCreative}
                            </Link>
                        </div>
                        <a href={`${homePath}#contato`} onClick={(e) => handleNavClick(e, "#contato", ui.ops.navContact)} className={linkClass}>
                            {ui.ops.navContact}
                        </a>
                        <a href={`${homePath}#depoimentos`} onClick={(e) => handleNavClick(e, "#depoimentos", ui.ops.navTestimonials)} className={linkClass}>
                            {ui.ops.navTestimonials}
                        </a>
                    </nav>

                    <div className="ml-auto flex items-center gap-3 md:gap-5">
                        <Button asChild size="lg" className="hidden rounded-full px-4 text-[10px] uppercase tracking-[0.18em] md:inline-flex lg:px-6 lg:text-xs lg:tracking-[0.28em]">
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
                                <div className="mt-8 flex flex-col gap-6 text-sm uppercase tracking-[0.28em] text-muted-foreground">
                                    <Link to={homePath} aria-current={onBrand ? "page" : undefined} className={pageLink(onBrand)}>
                                        {ui.header.navBrand}
                                    </Link>
                                    <Link to={opsPath} aria-current={onOps ? "page" : undefined} className={pageLink(onOps)}>
                                        {ui.ops.navCreative}
                                    </Link>
                                    <a href={`${homePath}#contato`} onClick={(e) => handleNavClick(e, "#contato", ui.ops.navContact)} className={linkClass}>
                                        {ui.ops.navContact}
                                    </a>
                                    <a href={`${homePath}#depoimentos`} onClick={(e) => handleNavClick(e, "#depoimentos", ui.ops.navTestimonials)} className={linkClass}>
                                        {ui.ops.navTestimonials}
                                    </a>
                                    <Button asChild className="mt-4 rounded-full px-6 text-xs uppercase tracking-[0.28em]">
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
