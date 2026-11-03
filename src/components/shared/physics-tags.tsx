import { useEffect, useRef, useState, type CSSProperties } from "react"
import { useLocale } from "@/i18n/use-locale"
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

const tagsEn = [
    "creativity",
    "identity",
    "design",
    "motion",
    "strategy",
    "branding",
    "yeah!",
    "concept",
    "art direction",
    "copywriting",
    "production",
    "campaigns",
    "logotype",
    "palettes",
    "typography",
    "brandbook",
    "positioning",
    "planning",
    "storytelling",
    "insights",
    "analysis",
    "trends",
]

const tagsMobileEn = [
    "creativity",
    "design",
    "branding",
    "motion",
    "yeah!",
    "concept",
    "logotype",
    "storytelling",
]

const spawnTags = [
    "marca",
    "tom de voz",
    "símbolo",
    "grid",
    "cor",
    "forma",
    "ritmo",
    "presença",
    "narrativa",
    "essência",
    "sistema",
    "atitude",
    "memória",
    "contraste",
    "gesto",
    "clareza",
    "afeto",
    "precisão",
    "origem",
    "voz",
    "textura",
    "código",
    "cena",
    "ritual",
]

const spawnTagsEn = [
    "brand",
    "tone of voice",
    "symbol",
    "grid",
    "color",
    "form",
    "rhythm",
    "presence",
    "narrative",
    "essence",
    "system",
    "attitude",
    "memory",
    "contrast",
    "gesture",
    "clarity",
    "affection",
    "precision",
    "origin",
    "voice",
    "texture",
    "code",
    "scene",
    "ritual",
]

const MAX_SPAWNED_TAGS = spawnTags.length

type TagPalette = (typeof TAGS_PALETTE)[number]
type TagBody = Body & {
    el?: HTMLSpanElement
    halfW: number
    halfH: number
}

function tagChrome(palette: TagPalette, isMobile: boolean): CSSProperties {
    return {
        position: "absolute",
        left: 0,
        top: 0,
        padding: isMobile ? "5px 14px" : "6px 18px",
        borderRadius: "999px",
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
        touchAction: "none",
        transform: "translate(-9999px,-9999px)",
    }
}

export function PhysicsTags({ onInteract }: { onInteract?: () => void }) {
    const boxRef = useRef<HTMLDivElement>(null)
    const elsRef = useRef<(HTMLSpanElement | null)[]>([])
    const engineRef = useRef<Engine | null>(null)
    const runnerRef = useRef<Runner | null>(null)
    const [dragging, setDragging] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { locale } = useLocale()
    const onInteractRef = useRef(onInteract)
    onInteractRef.current = onInteract

    useEffect(() => {
        // Detecta mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const activeTags = isMobile
        ? (locale === "en" ? tagsMobileEn : tagsMobile)
        : (locale === "en" ? tagsEn : tags)
    const extraWords = locale === "en" ? spawnTagsEn : spawnTags

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

        const makeTagBody = (el: HTMLSpanElement, x: number, y: number) => {
            const w = el.offsetWidth
            const h = el.offsetHeight
            const body = Bodies.rectangle(x, y, w, h, {
                chamfer: { radius: h / 2 },
                restitution: 0.35,
                friction: 0.1,
                frictionAir: 0.002,
                density: 0.0015,
                angle: Math.random() * 0.5 - 0.25,
            }) as TagBody
            body.el = el
            body.halfW = w / 2
            body.halfH = h / 2
            return body
        }

        const bodies = elsRef.current
            .map((el, i) => {
                if (!el) return null
                const w = el.offsetWidth
                return makeTagBody(el, Math.random() * (W - w) + w / 2, -50 + i * 20)
            })
            .filter((b): b is TagBody => b !== null)

        World.add(world, bodies)

        const spawnedEls: HTMLSpanElement[] = []
        let spawnedCount = 0
        let spawnCursor = 0

        const pointHitsCopy = (clientX: number, clientY: number) => {
            const root = box.parentElement || box
            const obstacles = root.querySelectorAll<HTMLElement>("[data-physics-obstacle]")
            for (const obstacle of obstacles) {
                const rect = obstacle.getBoundingClientRect()
                const pad = 12
                if (
                    clientX >= rect.left - pad &&
                    clientX <= rect.right + pad &&
                    clientY >= rect.top - pad &&
                    clientY <= rect.bottom + pad
                ) {
                    return true
                }
            }
            return false
        }

        const spawnTag = (clientX: number, clientY: number) => {
            if (spawnedCount >= MAX_SPAWNED_TAGS) return
            const boxRect = box.getBoundingClientRect()
            const text = extraWords[spawnCursor % extraWords.length]
            const palette = TAGS_PALETTE[spawnedCount % TAGS_PALETTE.length]
            const el = document.createElement("span")
            el.dataset.physicsTag = "true"
            const inner = document.createElement("span")
            inner.className = "physics-tag-pop"
            inner.textContent = text
            el.appendChild(inner)
            const chrome = tagChrome(palette, isMobile)
            Object.assign(el.style, chrome)
            box.appendChild(el)

            const width = el.offsetWidth
            const height = el.offsetHeight
            if (width < 2 || height < 2) {
                el.remove()
                return
            }

            const limitW = box.clientWidth
            const limitH = box.clientHeight
            const x = Math.min(Math.max(clientX - boxRect.left, width / 2 + 8), limitW - width / 2 - 8)
            const y = Math.min(Math.max(clientY - boxRect.top, height / 2 + 8), limitH - height / 2 - 8)
            const body = makeTagBody(el, x, y)
            el.style.transform = `translate3d(${x - body.halfW}px, ${y - body.halfH}px, 0) rotate(${body.angle}rad)`
            Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: -3.2 })
            World.add(world, body)
            bodies.push(body)
            spawnedEls.push(el)
            spawnedCount += 1
            spawnCursor += 1
            onInteractRef.current?.()
        }

        let pointerStartX = 0
        let pointerStartY = 0
        let pointerOnSurface = false
        let didDrag = false

        const onPointerDown = (event: PointerEvent) => {
            pointerStartX = event.clientX
            pointerStartY = event.clientY
            pointerOnSurface = event.target === box
            didDrag = false
        }
        const onPointerUp = (event: PointerEvent) => {
            const startedOnSurface = pointerOnSurface
            pointerOnSurface = false
            const moved = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY)
            if (!startedOnSurface || didDrag || moved > 8) return
            if (event.pointerType === "mouse" && event.button !== 0) return
            if (event.target !== box) return
            if (pointHitsCopy(event.clientX, event.clientY)) return
            spawnTag(event.clientX, event.clientY)
        }
        box.addEventListener("pointerdown", onPointerDown)
        box.addEventListener("pointerup", onPointerUp)

        // Arrastar com mouse: usa o container (box) para capturar eventos
        const mouse = Mouse.create(box)
        box.removeEventListener("wheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel)
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
        const onStartDrag = () => {
            didDrag = true
            setDragging(true)
            onInteractRef.current?.()
        }
        const onEndDrag = () => setDragging(false)
        Events.on(mConstraint, "startdrag", onStartDrag)
        Events.on(mConstraint, "enddrag", onEndDrag)

        // Sincroniza posição/rotação
        Events.on(engine, "afterUpdate", () => {
            bodies.forEach((record) => {
                const el = record.el
                if (!el) return
                const { x, y } = record.position
                el.style.transform = `translate3d(${x - record.halfW}px, ${y - record.halfH}px, 0) rotate(${record.angle}rad)`
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
            box.removeEventListener("pointerdown", onPointerDown)
            box.removeEventListener("pointerup", onPointerUp)
            spawnedEls.forEach((el) => el.remove())
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
    }, [isMobile, locale, extraWords])

    return (
        <div
            ref={boxRef}
            className="absolute inset-0 z-10 select-none touch-pan-y pointer-events-auto"
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
                        data-physics-tag="true"
                        ref={(el) => {
                            elsRef.current[i] = el
                        }}
                        style={tagChrome(palette, isMobile)}
                    >
                        {text}
                    </span>
                )
            })}
        </div>
    )
}
