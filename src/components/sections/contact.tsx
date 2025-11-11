import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/shared/section-heading"

export function ContactSection() {
    return (
        <section id="contato" className="bg-gradient-to-br from-background via-background to-muted/30">
            <div className="container px-6 py-24">
                <Card className="overflow-hidden border-border/70 bg-background/80 shadow-sm">
                    <CardContent className="grid gap-8 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:px-12 lg:py-16">
                        <SectionHeading
                            align="left"
                            eyebrow="Próximo passo"
                            title="Uma conversa para entender sua marca, desafios e visão de futuro."
                            description="Traga seus objetivos e perguntas. Eu levo repertório, metodologia e um plano claro de como podemos construir essa história juntos."
                        />
                        <div className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-muted/30 p-8">
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>
                                    Me chame no WhatsApp, ou podemos marcar um papo!
                                </p>
                                <p><i>Respondo em até 24 horas úteis.</i></p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button size="lg" asChild>
                                    <a href="https://wa.me/5511970981101?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Gostaria%20de%20conversar%20sobre%20minha%20identidade%20visual.%20">Enviar mensagem</a>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <a href="https://cal.com" target="_blank" rel="noreferrer noopener">
                                        Marcar papo
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
