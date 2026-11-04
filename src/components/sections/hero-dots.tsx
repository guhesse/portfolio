import { useLayoutEffect, useRef } from "react"

const GAP = 15
const REST = 0.55
const PEAK = 3.2
const LIFT = 5
const REACH = 86
const TRAIL_MS = 680
const LEVELS = 8

function fillFor(level: number) {
    const t = level / (LEVELS - 1)
    const red = Math.round(37 + (30 - 37) * t)
    const green = Math.round(40 + (32 - 40) * t)
    const blue = Math.round(43 + (34 - 43) * t)
    const alpha = 0.5 + t * 0.22
    return `rgba(${red},${green},${blue},${alpha})`
}

export function HeroDots() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        const canvas = canvasRef.current
        const parent = canvas?.parentElement
        if (!canvas || !parent) return
        const context = canvas.getContext("2d")
        if (!context) return

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const trail: { x: number; y: number; time: number }[] = []

        const draw = () => {
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            const now = performance.now()
            while (trail.length && now - trail[0].time > TRAIL_MS) trail.shift()

            context.clearRect(0, 0, width, height)
            const paths = Array.from({ length: LEVELS }, () => new Path2D())

            for (let y = GAP / 2; y < height; y += GAP) {
                for (let x = GAP / 2; x < width; x += GAP) {
                    let lift = 0
                    for (let i = trail.length - 1; i >= 0; i--) {
                        const sample = trail[i]
                        const distance = Math.hypot(x - sample.x, y - sample.y)
                        if (distance >= REACH) continue
                        const near = 1 - distance / REACH
                        const age = 1 - (now - sample.time) / TRAIL_MS
                        const force = near * near * age
                        if (force > lift) lift = force
                    }
                    const level = lift <= 0 ? 0 : Math.min(LEVELS - 1, Math.ceil(lift * (LEVELS - 1)))
                    const radius = REST + (level / (LEVELS - 1)) * (PEAK - REST)
                    const raised = y - (level / (LEVELS - 1)) * LIFT
                    const path = paths[level]
                    path.moveTo(x + radius, raised)
                    path.arc(x, raised, radius, 0, Math.PI * 2)
                }
            }

            for (let level = 0; level < LEVELS; level++) {
                context.fillStyle = fillFor(level)
                context.fill(paths[level])
            }
        }

        const resize = () => {
            const width = parent.clientWidth
            const height = parent.clientHeight
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.max(1, Math.floor(width * pixelRatio))
            canvas.height = Math.max(1, Math.floor(height * pixelRatio))
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            draw()
        }

        let frame = 0
        let running = false
        const loop = () => {
            draw()
            if (trail.length) {
                frame = window.requestAnimationFrame(loop)
                return
            }
            running = false
        }
        const kick = () => {
            if (running) return
            running = true
            frame = window.requestAnimationFrame(loop)
        }

        const onPointerMove = (event: PointerEvent) => {
            const rect = parent.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            const now = performance.now()
            const last = trail[trail.length - 1]
            if (last && Math.hypot(last.x - x, last.y - y) < 8) {
                last.x = x
                last.y = y
                last.time = now
            } else {
                trail.push({ x, y, time: now })
            }
            kick()
        }

        resize()
        const observer = new ResizeObserver(resize)
        observer.observe(parent)
        if (!reduced) parent.addEventListener("pointermove", onPointerMove)

        return () => {
            observer.disconnect()
            parent.removeEventListener("pointermove", onPointerMove)
            window.cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
    )
}
