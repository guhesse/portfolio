import { useLayoutEffect, useRef } from "react"

const GAP = 28
const RADIUS = 0.7
const DOT = "rgba(46, 44, 41, 0.16)"

export function HeroDots() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useLayoutEffect(() => {
        const canvas = canvasRef.current
        const parent = canvas?.parentElement
        if (!canvas || !parent) return
        const context = canvas.getContext("2d")
        if (!context) return

        const draw = () => {
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            context.clearRect(0, 0, width, height)
            context.fillStyle = DOT
            for (let y = GAP / 2; y < height; y += GAP) {
                for (let x = GAP / 2; x < width; x += GAP) {
                    context.beginPath()
                    context.arc(x, y, RADIUS, 0, Math.PI * 2)
                    context.fill()
                }
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

        resize()
        const observer = new ResizeObserver(resize)
        observer.observe(parent)
        return () => observer.disconnect()
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
    )
}
