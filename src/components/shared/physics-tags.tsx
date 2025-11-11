import { useEffect, useRef, useState } from "react"
import {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Events,
    Body,
} from "matter-js"

const tags = [
    // base
    "criatividade",
    "identidade",
    "design",
    "motion",
    "estratégia",
    "branding",
    "yeah!",

    // criação / produção
    "conceito",
    "direção de arte",
    "copywriting",
    "produção",
    "campanhas",

    // branding / identidade
    "logotipo",
    "paletas",
    "tipografia",
    "brandbook",
    "posicionamento",

    // estratégia / visão
    "planejamento",
    "storytelling",
    "insights",
    "análise",
    "tendências",
];

// Tags reduzidas para mobile
const tagsMobile = [
    "criatividade",
    "design",
    "branding",
    "motion",
    "yeah!",
    "conceito",
    "logotipo",
    "storytelling",
];

// Paleta única permitida (aplicada ciclicamente em todas as tags)
const TAGS_PALETTE = [
    { bg: "#111", fg: "#fff" },
    { bg: "#b67fea", fg: "#fff" },
    { bg: "#4B2BBE", fg: "#C9B5FF" },
    { bg: "#E9E7E4", fg: "#333", border: "#9E9B96" },
    { bg: "#7AC27A", fg: "#111" },
    { bg: "#EA5C79", fg: "#fff" },
]


export function PhysicsTags() {
    const boxRef = useRef<HTMLDivElement>(null)
    const elsRef = useRef<(HTMLSpanElement | null)[]>([])
    const engineRef = useRef<Engine | null>(null)
    const runnerRef = useRef<Runner | null>(null)
    const [dragging, setDragging] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Detecta mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const activeTags = isMobile ? tagsMobile : tags

    useEffect(() => {
        const box = boxRef.current
        if (!box) return

        const engine = Engine.create()
        // Gravidade mais leve no mobile
        engine.gravity.y = isMobile ? 0.6 : 1.0
        // Iterações um pouco maiores para evitar atravessar paredes em velocidades altas
        engine.positionIterations = 8
        engine.velocityIterations = 8
        engine.constraintIterations = 4
        engineRef.current = engine

        // Render canvas (invisível em produção)
        const render = Render.create({
            element: box,
            engine,
            options: {
                width: box.clientWidth,
                height: box.clientHeight,
                wireframes: false,
                background: "transparent",
            },
        })

        // Canvas fica passivo (não intercepta eventos)
        render.canvas.style.position = "absolute"
        render.canvas.style.top = "0"
        render.canvas.style.left = "0"
        render.canvas.style.opacity = "0"
        render.canvas.style.pointerEvents = "none"

        Render.run(render)

        const runner = Runner.create()
        Runner.run(runner, engine)
        runnerRef.current = runner

        const world = engine.world

        // Paredes de contenção
        const W = box.clientWidth
        const H = box.clientHeight
        const thickness = 120
        const ground = Bodies.rectangle(W / 2, H + thickness / 2, W + 2 * thickness, thickness, {
            isStatic: true,
        })
        const ceiling = Bodies.rectangle(W / 2, -thickness / 2, W + 2 * thickness, thickness, {
            isStatic: true,
        })
        const left = Bodies.rectangle(-thickness / 2, H / 2, thickness, H + 2 * thickness, {
            isStatic: true,
        })
        const right = Bodies.rectangle(W + thickness / 2, H / 2, thickness, H + 2 * thickness, {
            isStatic: true,
        })
        World.add(world, [ground, ceiling, left, right])

        // Obstáculos estáticos baseados em elementos do Hero (apenas desktop)
        let obstacleBodies: Body[] = []
        const buildObstacles = () => {
            // Pula construção de obstáculos no mobile
            if (isMobile) return
            
            // remove obstáculos antigos
            if (obstacleBodies.length) {
                World.remove(world, obstacleBodies)
                obstacleBodies = []
            }
            const boxRect = box.getBoundingClientRect()
            const root: HTMLElement = box.parentElement || box
            const els = Array.from(root.querySelectorAll<HTMLElement>("[data-physics-obstacle]"))
            obstacleBodies = els.map((el) => {
                const r = el.getBoundingClientRect()
                const w = r.width
                const h = r.height
                const x = r.left - boxRect.left + w / 2
                const y = r.top - boxRect.top + h / 2
                return Bodies.rectangle(x, y, w, h, { isStatic: true })
            })
            if (obstacleBodies.length) {
                World.add(world, obstacleBodies)
            }
        }
        // constrói após layout (apenas desktop)
        let t1: number | undefined
        let t2: number | undefined
        if (!isMobile) {
            requestAnimationFrame(buildObstacles)
            t1 = window.setTimeout(buildObstacles, 250)
            t2 = window.setTimeout(buildObstacles, 1000)
        }

        // Criar corpos para cada tag
        const bodies = elsRef.current
            .map((el, i) => {
                if (!el) return null
                const r = el.getBoundingClientRect()
                const w = r.width
                const h = r.height
                const body = Bodies.rectangle(
                    Math.random() * (W - w) + w / 2,
                    -50 + i * 20,
                    w,
                    h,
                    {
                        chamfer: { radius: h / 2 },
                        restitution: 0.35,
                        friction: 0.1,
                        frictionAir: 0.002,
                        density: 0.0015,
                        angle: Math.random() * 0.5 - 0.25,
                    }
                )
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ; (body as any).el = el
                return body
            })
            .filter((b): b is Body => b !== null)

        World.add(world, bodies)

        // Arrastar com mouse: usa o container (box) para capturar eventos
        const mouse = Mouse.create(box)
        const mConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.14,
                damping: 0.08,
                render: { visible: false }
            }
        })
        World.add(world, mConstraint)

        // keep the mouse in sync with rendering
        render.mouse = mouse

        // Toggle overlay while dragging to evitar interferência do conteúdo
        const onStartDrag = () => setDragging(true)
        const onEndDrag = () => setDragging(false)
        Events.on(mConstraint, "startdrag", onStartDrag)
        Events.on(mConstraint, "enddrag", onEndDrag)

        // Sincroniza posição/rotação
        Events.on(engine, "afterUpdate", () => {
            bodies.forEach((b) => {
                const { x, y } = b.position
                const angle = b.angle
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const el = (b as any).el as HTMLSpanElement
                if (!el) return
                // Usa translate3d para evitar "travadas" em alguns navegadores
                el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px, 0) rotate(${angle}rad)`
            })
        })

        // Previne bug de "clique preso" (mouse solto fora da área)
        const handleMouseUpGlobal = () => {
            // Libera o corpo manualmente se necessário
            if (mConstraint.constraint.bodyB) {
                mConstraint.constraint.bodyB = null
            }
        }
        window.addEventListener('mouseup', handleMouseUpGlobal)

        const onResize = () => {
            Render.lookAt(render, {
                min: { x: 0, y: 0 },
                max: { x: box.clientWidth, y: box.clientHeight },
            })
            buildObstacles()
        }
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
            window.removeEventListener('mouseup', handleMouseUpGlobal)
            setDragging(false)
            if (t1) window.clearTimeout(t1)
            if (t2) window.clearTimeout(t2)
            Render.stop(render)
            Runner.stop(runner)
            World.clear(world, false)
            Engine.clear(engine)
            render.canvas.remove()
            render.textures = {}
        }
    }, [isMobile])

    return (
        <div
            ref={boxRef}
            className="absolute inset-0 pointer-events-none z-10 select-none touch-none"
            style={{ overflow: "hidden" }}
        >
            {/* Overlay para bloquear interação com conteúdo durante drag */}
            {dragging && (
                <div className="absolute inset-0 pointer-events-auto cursor-grabbing select-none touch-none" />
            )}
            {activeTags.map((text, i) => {
                const palette = TAGS_PALETTE[i % TAGS_PALETTE.length]
                return (
                    <span
                        key={text}
                        ref={(el) => {
                            elsRef.current[i] = el
                        }}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            padding: isMobile ? "5px 14px" : "6px 18px",
                            borderRadius: 999,
                            zIndex: 15,
                            background: palette.bg,
                            color: palette.fg,
                            border: palette.border ? `2px solid ${palette.border}` : "none",
                            fontFamily: "carbona-variable, sans-serif",
                            fontWeight: 700,
                            fontSize: isMobile ? "12px" : "14px",
                            userSelect: "none",
                            cursor: "grab",
                            pointerEvents: "auto",
                            transform: "translate(-9999px,-9999px)",
                        }}
                    >
                        {text}
                    </span>
                )
            })}
        </div>
    )
}
