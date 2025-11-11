import { Button } from "@/components/ui/button"
import { featuredClients, stats } from "@/data/content"

export function HeroSection() {
    return (
        <section
            id="inicio"
            className="relative overflow-hidden border-b border-border/60 flex items-center h-[60vh]"
            style={{
                backgroundColor: '#f6f5ef',
                backgroundImage: 'radial-gradient(#25282b 0.5px, #f6f5ef 0.5px)',
                backgroundSize: '15px 15px'
            }}
        >
            <div className="container px-6 py-24">
                <div className="space-y-8 flex flex-col items-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-1 text-xs font-medium uppercase tracking-[0.30em] bg-foreground text-muted">
                        Branding & Direção Criativa
                    </span>
                    <h1 className="text-balance text-4xl font-semibold leading-tight text-center text-foreground sm:text-5xl lg:text-6xl">
                        Crio marcas que fazem sentido.
                        <br />Por dentro e por fora.
                    </h1>
                    <p className="max-w text-balance text-base text-center text-muted-foreground sm:text-lg">
                        Cada projeto é único. Tem seu próprio comportamento, linguagem e emoção. <br />
                        O resultado? É sempre o mesmo. Marcas com alma e coerência visual.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button size="lg" asChild>
                            <a href="#contato">Iniciar um projeto</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <a href="#projetos">Ver portfólio</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
