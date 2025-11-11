import { Menu } from "lucide-react"

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
    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm">
            <TopMarquee />
            <div className="border-b border-border/40 bg-background/85">
                <div className="container flex h-20 items-center justify-between">
                    <a
                        href="#inicio"
                        className="text-xs font-semibold uppercase tracking-[0.8em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Gustavo Hesse
                    </a>

                    <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground md:flex">
                        {navigation.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button asChild size="lg" className="hidden rounded-full px-6 text-xs uppercase tracking-[0.4em] md:inline-flex">
                            <a href="https://meet.gustavohesse.com.br/" target="_blank" rel="noopener noreferrer">Agendar</a>
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
                                        <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                                            {item.label}
                                        </a>
                                    ))}
                                    <Button asChild className="mt-4 rounded-full px-6 text-xs uppercase tracking-[0.4em]">
                                        <a href="https://meet.gustavohesse.com.br/" target="_blank" rel="noopener noreferrer">Agendar</a>
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
