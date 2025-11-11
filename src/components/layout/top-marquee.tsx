const items = [
    "BRANDING E IDENTIDADE",
    "DIREÇÃO CRIATIVA",
    "DESIGN COM INTENÇÃO",
    "PROJETOS AUTORAIS",
    "MARQUE UMA CONVERSA",
    "MARCA COM PERSONALIDADE",
    "ESTRATÉGIA DE MARCA",
    "COMUNICAÇÃO VISUAL",
    "DESIGN PARA IMPACTO",
    "MARQUE UMA CONVERSA"
];


export function TopMarquee() {
    // Duplicar mais vezes para garantir transição suave
    const duplicatedItems = [...items, ...items, ...items, ...items]

    return (
        <div className="border-b border-border/40 bg-card/40 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <div className="relative overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {duplicatedItems.map((item, index) => (
                        <span key={`${item}-${index}`} className="px-6 py-3">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
