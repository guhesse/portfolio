import { Menu } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { TopMarquee } from "@/components/layout/top-marquee"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navigation } from "@/data/content"

export function SiteHeader() {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === "/"

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            if (isHome) {
                const el = document.querySelector(href)
                el?.scrollIntoView({ behavior: "smooth" })
            } else {
                navigate(`/${href}`)
            }
        }
    }

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm">
            <TopMarquee />
            <div className="border-b border-border/40 bg-background/85">
                <div className="container flex h-16 md:h-20 items-center justify-between">
                    <a
                        href="/"
                        className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.6em] md:tracking-[0.8em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Gustavo Hesse
                    </a>

                    <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground md:flex">
                        {navigation.map((item) => (
                            <a
                                key={item.href}
                                href={isHome ? item.href : `/${item.href}`}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button asChild size="lg" className="hidden rounded-full px-6 text-xs uppercase tracking-[0.4em] md:inline-flex">
                            <a href="https://wa.me/5511970981101?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20conversar%20sobre%20minha%20identidade%20visual." target="_blank" rel="noopener noreferrer">Bater um papo</a>
                        </Button>

                        <Sheet>
                            <SheetTrigger className="inline-flex items-center justify-center rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">Abrir menu</span>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-background/95">
                                <SheetHeader>
                                    <SheetTitle className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
                                        Navegação
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-8 flex flex-col gap-6 text-sm uppercase tracking-[0.4em] text-muted-foreground">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.href}
                                            href={isHome ? item.href : `/${item.href}`}
                                            onClick={(e) => handleNavClick(e, item.href)}
                                            className="transition-colors hover:text-foreground"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                    <Button asChild className="mt-4 rounded-full px-6 text-xs uppercase tracking-[0.4em]">
                                        <a href="https://wa.me/5511970981101?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20conversar%20sobre%20minha%20identidade%20visual." target="_blank" rel="noopener noreferrer">Bater um papo</a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
