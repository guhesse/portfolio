import { navigation } from "@/data/content"

export function SiteFooter() {
    return (
        <footer className="border-t border-border/60 bg-background/80">
            <div className="container grid gap-8 px-6 py-10 md:grid-cols-[1.5fr_1fr] md:items-start">
                <div className="space-y-4">
                    <span className="text-sm font-semibold tracking-[0.32em] text-muted-foreground">
                        GUSTAVO HESSE
                    </span>
                    <p className="max-w-md text-sm text-muted-foreground">
                        Estratégia, identidade visual e direção criativa para marcas autorais
                        que querem ocupar seu espaço com personalidade.
                    </p>
                </div>
                <div className="flex gap-8 text-sm text-muted-foreground md:justify-end">
                    <div className="flex flex-col gap-3">
                        <span className="font-semibold text-foreground">Sessões</span>
                        {navigation.map((item) => (
                            <a key={item.href} href={item.href} className="transition hover:text-foreground">
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="font-semibold text-foreground">Contato</span>
                        <a href="https://wa.me/5511970981101?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20conversar%20sobre%20minha%20identidade%20visual.%20" className="transition hover:text-foreground">
                            WhatsApp
                        </a>
                        <a
                            href="https://www.linkedin.com/in/guhesse/"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="transition hover:text-foreground"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-border/40 py-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Gustavo Hesse. Todos os direitos reservados.
            </div>
        </footer>
    )
}
