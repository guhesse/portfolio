import { SectionHeading } from "@/components/shared/section-heading"
import { process } from "@/data/content"

export function ProcessSection() {
    return (
        <section id="processo" className="border-b border-border/60 bg-muted/20">
            <div className="container space-y-12 px-6 py-36">
                <SectionHeading
                    eyebrow="Processo"
                    title="Uma jornada colaborativa em três atos para dar vida à sua marca."
                    description="Cada fase tem objetivos, rituais e entregas claras para garantir que você participe das decisões e se sinta seguro na implementação."
                />
                <ol className="relative grid gap-8 md:grid-cols-3">
                    {process.map((step, index) => (
                        <li
                            key={step.title}
                            className="group rounded-3xl border border-border/70 bg-card/70 p-8"
                        >
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                0{index + 1}
                            </span>
                            <h3 className="mt-6 text-xl font-semibold text-foreground">{step.title}</h3>
                            <p className="mt-3 text-sm text-muted-foreground">{step.description}</p>
                            <div className="mt-6 rounded-2xl bg-secondary/30 p-4 text-sm">
                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary-foreground/80">
                                    Entrega-chave
                                </span>
                                <p className="mt-2 text-secondary-foreground">{step.deliverable}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
