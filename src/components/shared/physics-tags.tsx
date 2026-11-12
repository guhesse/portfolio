import { useEffect, useRef, useState, type CSSProperties } from "react"
import { ArrowDown, ArrowUp, Magnet, Paintbrush, Plus, Trash2, Wind } from "lucide-react"
import { useLocale, useUi } from "@/i18n/use-locale"
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
    Query,
} from "matter-js"

const tags = [
    "criatividade",
    "design",
    "branding",
    "direção de arte",
    "tipografia",
    "estratégia",
    "conceito",
    "posicionamento",
]

const tagsMobile = [
    "criatividade",
    "design",
    "branding",
    "estratégia",
]

// Paleta única permitida (aplicada ciclicamente em todas as tags)
const TAGS_PALETTE = [
    { bg: "#2e2c29", fg: "#f6f4ef" },
    { bg: "transparent", fg: "#2e2c29", border: "rgba(46,44,41,0.22)" },
    { bg: "#e7e1d6", fg: "#2e2c29" },
]

const tagsEn = [
    "creativity",
    "design",
    "branding",
    "art direction",
    "typography",
    "strategy",
    "concept",
    "positioning",
]

const tagsMobileEn = [
    "creativity",
    "design",
    "branding",
    "strategy",
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

type TagTool = "create" | "delete" | "blow" | "magnet" | "paint"

function toolCursor(tool: TagTool | null) {
    if (tool === "create") return "crosshair"
    if (tool === "delete") return "pointer"
    if (tool === "blow") return "move"
    if (tool === "paint") return "cell"
    if (tool === "magnet") return "grab"
    return "grab"
}

function applyPalette(el: HTMLElement, index: number) {
    const palette = TAGS_PALETTE[index % TAGS_PALETTE.length]
    const face = el.querySelector<HTMLElement>("[data-tag-face]") ?? el
    face.style.background = palette.bg
    face.style.color = palette.fg
    face.style.border = palette.border ? `1px solid ${palette.border}` : "none"
    el.dataset.paletteIndex = String(index % TAGS_PALETTE.length)
}

type TagPalette = (typeof TAGS_PALETTE)[number]
type TagBody = Body & {
    el?: HTMLSpanElement
    halfW: number
    halfH: number
    owned?: boolean
}

function tagShell(): CSSProperties {
    return {
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        width: "max-content",
        cursor: "grab",
        pointerEvents: "auto",
        touchAction: "pan-y",
        transform: "translate(-9999px,-9999px)",
    }
}

function tagFace(palette: TagPalette, isMobile: boolean): CSSProperties {
    return {
        display: "inline-block",
        padding: isMobile ? "4px 11px" : "5px 13px",
        borderRadius: "0",
        background: palette.bg,
        color: palette.fg,
        border: palette.border ? `1px solid ${palette.border}` : "none",
        fontFamily: "carbona-variable, sans-serif",
        fontWeight: 500,
        fontSize: isMobile ? "11px" : "12px",
        letterSpacing: "0.04em",
        lineHeight: "1.2",
        userSelect: "none",
    }
}

export function PhysicsTags({ onInteract }: { onInteract?: () => void }) {
    const boxRef = useRef<HTMLDivElement>(null)
    const elsRef = useRef<(HTMLSpanElement | null)[]>([])
    const engineRef = useRef<Engine | null>(null)
    const runnerRef = useRef<Runner | null>(null)
    const [dragging, setDragging] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [tool, setTool] = useState<TagTool | null>(null)
    const [gravityUp, setGravityUp] = useState(false)
    const { locale } = useLocale()
    const onInteractRef = useRef(onInteract)
    onInteractRef.current = onInteract
    const toolRef = useRef<TagTool | null>(null)
    const gravityRef = useRef(1)
    const { hero } = useUi()

    const selectTool = (next: TagTool) => {
        setTool((current) => (current === next ? null : next))
    }

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
    gravityRef.current = gravityUp ? -1 : 1

    useEffect(() => {
        const engine = engineRef.current
        if (!engine) return
        const base = window.innerWidth < 768 ? 1.05 : 1.4
        engine.gravity.y = gravityUp ? -base : base
    }, [gravityUp])

    useEffect(() => {
        toolRef.current = tool
        const box = boxRef.current
        if (!box) return
        const cursor = toolCursor(tool)
        box.style.cursor = tool ? cursor : ""
        box.querySelectorAll<HTMLElement>("[data-physics-tag]").forEach((el) => {
            el.style.cursor = cursor
        })
    }, [tool])

    useEffect(() => {
        const box = boxRef.current
        if (!box) return

        const engine = Engine.create()
        engine.enableSleeping = false
        engine.gravity.y = (isMobile ? 1.05 : 1.4) * gravityRef.current
        engine.positionIterations = 12
        engine.velocityIterations = 10
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
        const wallInset = 14
        const ground = Bodies.rectangle(W / 2, H + thickness / 2 - wallInset, W + 2 * thickness, thickness, {
            isStatic: true,
        })
        const ceiling = Bodies.rectangle(W / 2, -thickness / 2 + wallInset, W + 2 * thickness, thickness, {
            isStatic: true,
        })
        const left = Bodies.rectangle(wallInset - thickness / 2, H / 2, thickness, H + 2 * thickness, {
            isStatic: true,
        })
        const right = Bodies.rectangle(W - wallInset + thickness / 2, H / 2, thickness, H + 2 * thickness, {
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
                const pad = 14
                const w = r.width + pad * 2
                const h = r.height + pad * 2
                const x = r.left - boxRect.left + r.width / 2
                const y = r.top - boxRect.top + r.height / 2
                return Bodies.rectangle(x, y, w, h, { isStatic: true, friction: 0.2 })
            })
            if (obstacleBodies.length) {
                World.add(world, obstacleBodies)
            }
        }
        // constrói após layout (apenas desktop)
        let t1: number | undefined
        let t2: number | undefined
        if (!isMobile) {
            buildObstacles()
            requestAnimationFrame(buildObstacles)
            t1 = window.setTimeout(buildObstacles, 250)
            t2 = window.setTimeout(buildObstacles, 1000)
        }

        const makeTagBody = (el: HTMLSpanElement, x: number, y: number) => {
            const w = el.offsetWidth
            const h = el.offsetHeight
            const body = Bodies.rectangle(x, y, w, h, {
                chamfer: { radius: 0 },
                restitution: 0.35,
                friction: 0.2,
                frictionAir: 0.012,
                density: 0.0015,
                angle: (Math.random() - 0.5) * 0.7,
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
                const h = el.offsetHeight
                const clusters = [
                    { x: 0.08, y: 0.18 },
                    { x: 0.11, y: 0.74 },
                    { x: 0.92, y: 0.16 },
                    { x: 0.89, y: 0.76 },
                ]
                const cluster = clusters[i % clusters.length]
                const x = Math.min(
                    W - w / 2 - 22,
                    Math.max(w / 2 + 22, cluster.x * W + (Math.random() - 0.5) * 42),
                )
                const y = Math.min(
                    H - h / 2 - 22,
                    Math.max(h / 2 + 22, cluster.y * H + (Math.random() - 0.5) * 34),
                )
                const body = makeTagBody(el, x, y)
                const dx = W / 2 - x
                const dy = H * 0.42 - y
                const len = Math.hypot(dx, dy) || 1
                const speed = 1.15 + Math.random() * 0.85
                Body.setVelocity(body, { x: (dx / len) * speed, y: (dy / len) * speed * 0.75 })
                Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.45)
                return body
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
            inner.dataset.tagFace = "true"
            inner.textContent = text
            Object.assign(inner.style, tagFace(palette, isMobile))
            el.appendChild(inner)
            Object.assign(el.style, tagShell())
            box.appendChild(el)
            el.dataset.paletteIndex = String(spawnedCount % TAGS_PALETTE.length)
            const activeTool = toolRef.current
            el.style.cursor = toolCursor(activeTool)

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
            body.owned = true
            World.add(world, body)
            bodies.push(body)
            spawnedEls.push(el)
            spawnedCount += 1
            spawnCursor += 1
            onInteractRef.current?.()
        }

        const detachTag = (body: TagBody) => {
            World.remove(world, body)
            const index = bodies.indexOf(body)
            if (index >= 0) bodies.splice(index, 1)
            if (body.owned) {
                body.el?.remove()
                const spawnedIndex = body.el ? spawnedEls.indexOf(body.el) : -1
                if (spawnedIndex >= 0) spawnedEls.splice(spawnedIndex, 1)
                spawnedCount = Math.max(0, spawnedCount - 1)
            } else if (body.el) {
                body.el.style.visibility = "hidden"
                body.el = undefined
            }
        }

        const fromTools = (event: Event) =>
            event.target instanceof Element && !!event.target.closest("[data-tag-tools]")

        const eraseAt = (clientX: number, clientY: number) => {
            const rect = box.getBoundingClientRect()
            const hits = Query.point(bodies, {
                x: clientX - rect.left,
                y: clientY - rect.top,
            })
            if (!hits.length) return
            hits.forEach((body) => detachTag(body as TagBody))
            onInteractRef.current?.()
        }

        const blowGroup = (dx: number, dy: number) => {
            const speed = Math.hypot(dx, dy)
            if (speed < 1.5) return
            const power = Math.min(speed, 36) * 0.45
            const nx = dx / speed
            const ny = dy / speed
            bodies.forEach((body) => {
                Body.setVelocity(body, {
                    x: body.velocity.x * 0.45 + nx * power,
                    y: body.velocity.y * 0.45 + ny * power,
                })
            })
            onInteractRef.current?.()
        }

        let pointerStartX = 0
        let pointerStartY = 0
        let pointerOnSurface = false
        let didDrag = false
        const attractGroup = (clientX: number, clientY: number) => {
            const rect = box.getBoundingClientRect()
            const x = clientX - rect.left
            const y = clientY - rect.top
            bodies.forEach((body) => {
                const dx = x - body.position.x
                const dy = y - body.position.y
                const dist = Math.hypot(dx, dy) || 1
                const power = Math.min(18, Math.max(8, 1100 / dist))
                Body.setVelocity(body, {
                    x: body.velocity.x * 0.2 + (dx / dist) * power,
                    y: body.velocity.y * 0.2 + (dy / dist) * power,
                })
            })
            onInteractRef.current?.()
        }

        const painted = new Set<HTMLElement>()
        const paintAt = (clientX: number, clientY: number) => {
            const rect = box.getBoundingClientRect()
            const hits = Query.point(bodies, {
                x: clientX - rect.left,
                y: clientY - rect.top,
            })
            let changed = false
            hits.forEach((body) => {
                const el = (body as TagBody).el
                if (!el || painted.has(el)) return
                painted.add(el)
                const current = Number(el.dataset.paletteIndex ?? 0)
                applyPalette(el, (Number.isNaN(current) ? 0 : current) + 1)
                changed = true
            })
            if (changed) onInteractRef.current?.()
        }

        let erasing = false
        let blowing = false
        let attracting = false
        let painting = false
        let lastBlowX = 0
        let lastBlowY = 0

        const onPointerDown = (event: PointerEvent) => {
            if (fromTools(event)) return
            pointerStartX = event.clientX
            pointerStartY = event.clientY
            const activeTool = toolRef.current
            if (activeTool === "delete") {
                erasing = true
                eraseAt(event.clientX, event.clientY)
                return
            }
            if (activeTool === "blow") {
                blowing = true
                lastBlowX = event.clientX
                lastBlowY = event.clientY
                return
            }
            if (activeTool === "magnet") {
                attracting = true
                attractGroup(event.clientX, event.clientY)
                return
            }
            if (activeTool === "paint") {
                painting = true
                painted.clear()
                paintAt(event.clientX, event.clientY)
                return
            }
            if (activeTool === "create") return
            pointerOnSurface = event.target === box
            didDrag = false
        }
        const onPointerMove = (event: PointerEvent) => {
            if (fromTools(event)) return
            if (erasing) {
                eraseAt(event.clientX, event.clientY)
                return
            }
            if (blowing) {
                blowGroup(event.clientX - lastBlowX, event.clientY - lastBlowY)
                lastBlowX = event.clientX
                lastBlowY = event.clientY
                return
            }
            if (attracting) attractGroup(event.clientX, event.clientY)
            if (painting) paintAt(event.clientX, event.clientY)
        }
        const onPointerUp = (event: PointerEvent) => {
            const activeTool = toolRef.current
            if (activeTool === "delete" || activeTool === "blow" || activeTool === "magnet" || activeTool === "paint") {
                erasing = false
                blowing = false
                attracting = false
                painting = false
                painted.clear()
                return
            }
            if (event.currentTarget !== box || fromTools(event)) return
            const moved = Math.hypot(event.clientX - pointerStartX, event.clientY - pointerStartY)
            if (activeTool === "create") {
                if (moved <= 8) spawnTag(event.clientX, event.clientY)
                return
            }
            const startedOnSurface = pointerOnSurface
            pointerOnSurface = false
            if (!startedOnSurface || didDrag || moved > 8) return
            if (event.pointerType === "mouse" && event.button !== 0) return
            if (event.target !== box) return
            if (pointHitsCopy(event.clientX, event.clientY)) return
            spawnTag(event.clientX, event.clientY)
        }
        box.addEventListener("pointerdown", onPointerDown)
        box.addEventListener("pointermove", onPointerMove)
        box.addEventListener("pointerup", onPointerUp)
        window.addEventListener("pointerup", onPointerUp)

        // Arrastar com mouse: usa o container (box) para capturar eventos
        const mouse = Mouse.create(box)
        const mouseEvents = mouse as typeof mouse & {
            mousewheel: EventListener
            mousedown: EventListener
            mousemove: EventListener
            mouseup: EventListener
        }
        box.removeEventListener("wheel", mouseEvents.mousewheel)
        box.removeEventListener("touchstart", mouseEvents.mousedown)
        box.removeEventListener("touchmove", mouseEvents.mousemove)
        box.removeEventListener("touchend", mouseEvents.mouseup)
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

        // O cursor só pega uma tag com o botão pressionado. Passar o mouse não empurra nada.
        Events.on(engine, "beforeUpdate", () => {
            if (mouse.button !== 0) mConstraint.constraint.bodyB = null
        })

        // Toggle overlay while dragging to evitar interferência do conteúdo
        const onStartDrag = () => {
            if (toolRef.current) {
                mConstraint.constraint.bodyB = null
                return
            }
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
            box.removeEventListener("pointermove", onPointerMove)
            box.removeEventListener("pointerup", onPointerUp)
            window.removeEventListener("pointerup", onPointerUp)
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
            className="pointer-events-none absolute inset-0 z-10 select-none touch-pan-y"
            style={{ overflow: "hidden" }}
        >
            {/* Overlay para bloquear interação com conteúdo durante drag */}
            {dragging && (
                <div className="absolute inset-0 pointer-events-auto cursor-grabbing select-none touch-none" />
            )}
            <div
                data-tag-tools
                className="pointer-events-auto absolute left-4 top-4 z-30 hidden flex-col gap-2 sm:left-6 sm:top-5"
                onPointerDown={(event) => event.stopPropagation()}
                onMouseDown={(event) => event.stopPropagation()}
            >
                {(
                    [
                        ["create", hero.toolCreate, hero.toolCreateHint, Plus],
                        ["delete", hero.toolDelete, hero.toolDeleteHint, Trash2],
                        ["blow", hero.toolBlow, hero.toolBlowHint, Wind],
                        ["magnet", hero.toolMagnet, hero.toolMagnetHint, Magnet],
                        ["paint", hero.toolPaint, hero.toolPaintHint, Paintbrush],
                    ] as const
                ).map(([id, label, hint, Icon]) => (
                    <div key={id} className="group/tool relative">
                        <button
                            type="button"
                            aria-label={label}
                            aria-pressed={tool === id}
                            onClick={() => selectTool(id)}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${tool === id ? "border-foreground bg-foreground text-background" : "border-foreground/15 bg-background/80 text-foreground/80 hover:border-foreground/40"}`}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                        <div className="pointer-events-none absolute left-12 top-1/2 z-40 w-52 -translate-y-1/2 rounded-2xl border border-border/70 bg-background px-3 py-2 text-left opacity-0 shadow-[0_12px_28px_rgba(17,17,17,0.1)] transition-opacity duration-200 group-hover/tool:opacity-100 group-focus-within/tool:opacity-100">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">{label}</p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p>
                        </div>
                    </div>
                ))}
                <div className="group/tool relative">
                    <button
                        type="button"
                        aria-label={hero.toolGravity}
                        aria-pressed={gravityUp}
                        onClick={() => setGravityUp((current) => !current)}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${gravityUp ? "border-foreground bg-foreground text-background" : "border-foreground/15 bg-background/80 text-foreground/80 hover:border-foreground/40"}`}
                    >
                        {gravityUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    </button>
                    <div className="pointer-events-none absolute left-12 top-1/2 z-40 w-52 -translate-y-1/2 rounded-2xl border border-border/70 bg-background px-3 py-2 text-left opacity-0 shadow-[0_12px_28px_rgba(17,17,17,0.1)] transition-opacity duration-200 group-hover/tool:opacity-100 group-focus-within/tool:opacity-100">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">{hero.toolGravity}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{gravityUp ? hero.toolGravityHintUp : hero.toolGravityHint}</p>
                    </div>
                </div>
            </div>
            {activeTags.map((text, i) => {
                const palette = TAGS_PALETTE[i % TAGS_PALETTE.length]
                return (
                    <span
                        key={text}
                        data-physics-tag="true"
                        data-palette-index={i % TAGS_PALETTE.length}
                        ref={(el) => {
                            elsRef.current[i] = el
                        }}
                        style={tagShell()}
                    >
                        <span
                            data-tag-face
                            style={tagFace(palette, isMobile)}
                        >
                            {text}
                        </span>
                    </span>
                )
            })}
        </div>
    )
}
