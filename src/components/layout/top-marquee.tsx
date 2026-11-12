import { useUi } from "@/i18n/use-locale"

export function TopMarquee({ items }: { items?: string[] }) {
    const { marquee } = useUi()
    const source = items ?? marquee
    const duplicatedItems = [...source, ...source]

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
