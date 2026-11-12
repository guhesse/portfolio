import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

const stageCount = 4

type Piece = {
    object: THREE.Object3D
    appear: number
    span: number
    hideAfter?: number
    base: THREE.Vector3
}

function rand(n: number) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
    return x - Math.floor(x)
}

function smooth(value: number, edge0: number, edge1: number) {
    const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
    return t * t * (3 - 2 * t)
}

type Skin = { mesh: THREE.Mesh; lines: THREE.LineSegments }
type SharedForm = { material: THREE.Material; edges: THREE.EdgesGeometry; line: THREE.Material }

const markPoints = [
    new THREE.Vector3(-0.46, 1.34, 0.08),
    new THREE.Vector3(0.16, 1.8, 0.04),
    new THREE.Vector3(0.4, 1.1, 0.1),
]

export function HeroTree({
    hint,
    stages,
    marks,
    styleOutline,
    styleFill,
}: {
    hint: string
    stages: string[]
    marks: string[]
    styleOutline: string
    styleFill: string
}) {
    const mountRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const markRefs = useRef<(SVGGElement | null)[]>([])
    const targetRef = useRef(0)
    const spinRef = useRef(0.55)
    const pitchRef = useRef(0)
    const dragRef = useRef({ active: false, moved: false, x: 0, y: 0 })
    const styleRef = useRef<"outline" | "fill">("fill")
    const [stage, setStage] = useState(0)
    const [style, setStyle] = useState<"outline" | "fill">("fill")
    styleRef.current = style
    const stageName = stages[stage] ?? stages[0] ?? ""

    useEffect(() => {
        const mount = mountRef.current
        const canvas = canvasRef.current
        if (!mount || !canvas) return

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        renderer.setClearColor(0x000000, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 80)
        scene.add(new THREE.AmbientLight(0xfff6ea, 0.7))
        scene.add(new THREE.HemisphereLight(0xfff8ee, 0x86b072, 0.5))
        const sun = new THREE.DirectionalLight(0xffffff, 1.55)
        sun.position.set(4.4, 7.2, 3.2)
        scene.add(sun)
        const fillLight = new THREE.DirectionalLight(0xf3efe4, 0.35)
        fillLight.position.set(-3.2, 2.4, -2)
        scene.add(fillLight)

        const disposables: { dispose: () => void }[] = []
        const keep = <T extends { dispose: () => void }>(item: T) => {
            disposables.push(item)
            return item
        }
        const pieces: Piece[] = []
        const sway: THREE.Object3D[] = []
        const skins: Skin[] = []

        const form = (geometry: THREE.BufferGeometry, color: number, shared?: SharedForm) => {
            const material = shared?.material ?? keep(new THREE.MeshStandardMaterial({
                color,
                flatShading: true,
                roughness: 0.82,
                metalness: 0,
            }))
            const edges = shared?.edges ?? keep(new THREE.EdgesGeometry(geometry, 1))
            const line = shared?.line ?? keep(new THREE.LineBasicMaterial({ color }))
            const mesh = new THREE.Mesh(geometry, material)
            const lines = new THREE.LineSegments(edges, line)
            mesh.visible = true
            lines.visible = false
            const group = new THREE.Group()
            group.add(mesh, lines)
            skins.push({ mesh, lines })
            return { group, geometry, material, edges, line }
        }

        const add = (
            object: THREE.Object3D,
            appear: number,
            span = 0.4,
            hideAfter?: number,
            base = new THREE.Vector3(1, 1, 1),
        ) => {
            object.scale.copy(base).multiplyScalar(0.001)
            pieces.push({ object, appear, span, hideAfter, base })
            return object
        }

        const world = new THREE.Group()
        scene.add(world)
        const markers = markPoints.map((position) => {
            const marker = new THREE.Object3D()
            marker.position.copy(position)
            world.add(marker)
            return marker
        })
        const projected = new THREE.Vector3()

        const soil = form(keep(new THREE.CylinderGeometry(1.05, 1.32, 0.42, 10)), 0x6a9158).group
        const grass = form(keep(new THREE.CylinderGeometry(1.1, 1.12, 0.1, 10)), 0x9ed07a).group
        grass.position.y = 0.22
        const ground = new THREE.Group()
        ground.add(soil, grass)
        world.add(ground)

        const shadow = new THREE.Mesh(
            keep(new THREE.CircleGeometry(0.85, 20)),
            keep(new THREE.MeshBasicMaterial({ color: 0x6d8a58, transparent: true, opacity: 0.16, depthWrite: false })),
        )
        shadow.rotation.x = -Math.PI / 2
        shadow.position.y = 0.28
        shadow.visible = false
        world.add(shadow)
        add(shadow, 0.15, 0.8)

        for (let i = 0; i < 4; i += 1) {
            const rock = form(keep(new THREE.IcosahedronGeometry(0.08 + rand(i) * 0.05, 0)), 0xc4bfb2).group
            const angle = i * 1.5 + 0.4
            const radius = 0.72 + rand(i + 3) * 0.28
            rock.position.set(Math.cos(angle) * radius, 0.26, Math.sin(angle) * radius)
            rock.scale.set(1, 0.65, 1)
            rock.rotation.y = rand(i + 8) * Math.PI
            world.add(rock)
            add(rock, 0.4 + i * 0.25, 0.35)
        }

        const seed = form(keep(new THREE.IcosahedronGeometry(0.11, 0)), 0x8d5b38).group
        seed.position.y = 0.36
        world.add(seed)
        add(seed, -0.25, 0.2, 0.35)

        const leafSource = form(keep(new THREE.ConeGeometry(0.11, 0.32, 4)), 0x67b85a)
        ;[-0.7, 0.7].forEach((tilt, index) => {
            const leaf = index === 0 ? leafSource.group : form(leafSource.geometry, 0x67b85a, leafSource).group
            leaf.position.set(index === 0 ? -0.06 : 0.06, 0.48, 0)
            leaf.rotation.z = tilt
            world.add(leaf)
            add(leaf, 0.28, 0.35, 0.95)
        })

        const trunkSource = form(keep(new THREE.CylinderGeometry(0.07, 0.11, 0.32, 6)), 0x7a4e34)
        let trunkTop = 0.28
        for (let i = 0; i < 5; i += 1) {
            const segment = i === 0
                ? trunkSource.group
                : form(trunkSource.geometry, 0x7a4e34, trunkSource).group
            const lean = (i - 2) * 0.025
            segment.position.set(lean, trunkTop + 0.15, lean * 0.4)
            segment.rotation.z = lean * 0.8
            world.add(segment)
            add(segment, 0.45 + i * 0.28, 0.32)
            trunkTop += 0.26
        }

        const branchSource = form(keep(new THREE.CylinderGeometry(0.02, 0.035, 0.42, 5)), 0x6b4630)
        const branchSpots = [
            { y: 0.72, angle: 0.4, lift: 0.55 },
            { y: 0.9, angle: 2.2, lift: 0.48 },
            { y: 1.05, angle: 3.8, lift: 0.62 },
            { y: 1.22, angle: 5.3, lift: 0.5 },
            { y: 1.38, angle: 1.1, lift: 0.7 },
            { y: 1.5, angle: 4.4, lift: 0.58 },
        ]
        branchSpots.forEach((spot, index) => {
            const branch = index === 0
                ? branchSource.group
                : form(branchSource.geometry, 0x6b4630, branchSource).group
            branch.position.set(Math.cos(spot.angle) * 0.16, spot.y, Math.sin(spot.angle) * 0.16)
            branch.rotation.z = Math.cos(spot.angle) * spot.lift
            branch.rotation.x = Math.sin(spot.angle) * spot.lift
            world.add(branch)
            add(branch, 1.15 + index * 0.18, 0.3)
        })

        const greens = [0x3c8a46, 0x5aaa52, 0x7bc468, 0x2f6c3c, 0x98d27c]
        const blobGeometry = keep(new THREE.IcosahedronGeometry(0.2, 0))
        const blobSources = greens.map((color) => form(blobGeometry, color))
        const blobUsed = blobSources.map(() => false)
        const layers = [
            { y: 0.78, radius: 0.22, count: 4, size: 0.34, appear: 0.85 },
            { y: 1.02, radius: 0.42, count: 6, size: 0.32, appear: 1.2 },
            { y: 1.28, radius: 0.5, count: 7, size: 0.3, appear: 1.55 },
            { y: 1.52, radius: 0.4, count: 6, size: 0.26, appear: 1.9 },
            { y: 1.74, radius: 0.24, count: 4, size: 0.22, appear: 2.2 },
            { y: 1.94, radius: 0.08, count: 1, size: 0.2, appear: 2.45 },
        ]
        layers.forEach((layer, layerIndex) => {
            for (let i = 0; i < layer.count; i += 1) {
                const angle = (i / layer.count) * Math.PI * 2 + layerIndex * 0.45
                const colorIndex = (layerIndex + i) % blobSources.length
                const source = blobSources[colorIndex]
                const blob = blobUsed[colorIndex] ? form(blobGeometry, 0, source).group : source.group
                blobUsed[colorIndex] = true
                const jitter = 0.85 + rand(layerIndex * 10 + i) * 0.3
                blob.position.set(
                    Math.cos(angle) * layer.radius * jitter,
                    layer.y + (rand(i + 20 + layerIndex) - 0.5) * 0.08,
                    Math.sin(angle) * layer.radius * jitter,
                )
                const squash = 0.82 + rand(i + 40) * 0.3
                blob.scale.set(1, squash, 1)
                world.add(blob)
                sway.push(blob)
                add(blob, layer.appear + i * 0.03, 0.34, undefined, blob.scale.clone())
            }
        })

        for (let i = 0; i < 7; i += 1) {
            const tuft = form(keep(new THREE.ConeGeometry(0.035, 0.14, 3)), 0x6eaf5c).group
            const angle = rand(i + 70) * Math.PI * 2
            const radius = 0.45 + rand(i + 80) * 0.5
            tuft.position.set(Math.cos(angle) * radius, 0.32, Math.sin(angle) * radius)
            tuft.rotation.z = (rand(i + 90) - 0.5) * 0.4
            world.add(tuft)
            add(tuft, 0.55 + i * 0.12, 0.3)
        }

        const fitCamera = () => {
            const previousRotation = world.rotation.y
            world.rotation.y = 0
            const saved = pieces.map((piece) => ({
                scale: piece.object.scale.clone(),
                visible: piece.object.visible,
            }))
            const groundScale = ground.scale.x
            pieces.forEach((piece) => {
                piece.object.visible = true
                piece.object.scale.copy(piece.base)
            })
            ground.scale.setScalar(1)
            world.updateWorldMatrix(true, true)

            const box = new THREE.Box3().setFromObject(world)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())
            const samples: THREE.Vector3[] = []
            for (const x of [-size.x / 2, size.x / 2]) {
                for (const y of [-size.y / 2, size.y / 2]) {
                    for (const z of [-size.z / 2, size.z / 2]) samples.push(new THREE.Vector3(center.x + x, center.y + y, center.z + z))
                }
            }

            pieces.forEach((piece, index) => {
                piece.object.scale.copy(saved[index].scale)
                piece.object.visible = saved[index].visible
            })
            ground.scale.setScalar(groundScale)
            world.rotation.y = previousRotation

            const direction = new THREE.Vector3(0.62, 0.78, 1).normalize()
            const hero = camera.aspect > 1.05
            const boundsAt = (distance: number, shiftRight: number, shiftUp: number) => {
                camera.position.copy(center).add(direction.clone().multiplyScalar(distance))
                camera.lookAt(center)
                camera.updateMatrixWorld()
                const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
                const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)
                const pan = right.multiplyScalar(shiftRight).add(up.multiplyScalar(shiftUp))
                camera.position.add(pan)
                camera.lookAt(center.clone().add(pan))
                camera.updateMatrixWorld()
                camera.updateProjectionMatrix()
                let minX = Infinity
                let maxX = -Infinity
                let minY = Infinity
                let maxY = -Infinity
                for (const sample of samples) {
                    const projected = sample.clone().project(camera)
                    minX = Math.min(minX, projected.x)
                    maxX = Math.max(maxX, projected.x)
                    minY = Math.min(minY, projected.y)
                    maxY = Math.max(maxY, projected.y)
                }
                return { minX, maxX, minY, maxY }
            }

            let distance = 6
            const targetSpan = hero ? 2.2 : 1.7
            for (let step = 0; step < 18; step += 1) {
                const span = boundsAt(distance, 0, 0)
                const height = Math.max(0.2, span.maxY - span.minY)
                distance *= height / targetSpan
            }

            const framed = boundsAt(distance, 0, 0)
            const worldPerNdcX = size.x / Math.max(0.25, framed.maxX - framed.minX)
            const worldPerNdcY = size.y / Math.max(0.25, framed.maxY - framed.minY)
            const targetTop = hero ? 0.7 : 0.88
            const targetRight = hero ? 0.9 : 0.92
            let shiftRight = 0
            let shiftUp = 0
            for (let step = 0; step < 8; step += 1) {
                const placed = boundsAt(distance, shiftRight, shiftUp)
                shiftRight -= (targetRight - placed.maxX) * worldPerNdcX * 0.55
                shiftUp += (placed.maxY - targetTop) * worldPerNdcY * 0.55
            }
            boundsAt(distance, shiftRight, shiftUp)
            viewDistance = distance
            const viewDirection = new THREE.Vector3()
            camera.getWorldDirection(viewDirection)
            lookTarget.copy(camera.position).addScaledVector(viewDirection, viewDistance)
            baseOffset.copy(camera.position).sub(lookTarget)
            applyPitch()
        }

        const lookTarget = new THREE.Vector3()
        const baseOffset = new THREE.Vector3()
        const pitchedOffset = new THREE.Vector3()
        const pitchAxis = new THREE.Vector3()
        let viewDistance = 8
        const applyPitch = () => {
            pitchedOffset.copy(baseOffset)
            if (Math.abs(pitchRef.current) > 0.0001 && baseOffset.lengthSq() > 0.0001) {
                pitchAxis.set(0, 1, 0).cross(baseOffset)
                if (pitchAxis.lengthSq() > 0.0001) {
                    pitchAxis.normalize()
                    pitchedOffset.applyAxisAngle(pitchAxis, pitchRef.current)
                }
            }
            camera.position.copy(lookTarget).add(pitchedOffset)
            camera.lookAt(lookTarget)
        }

        const resize = () => {
            const width = mount.clientWidth
            const height = mount.clientHeight
            if (width === 0 || height === 0) return
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            fitCamera()
        }
        resize()
        const observer = new ResizeObserver(resize)
        observer.observe(mount)

        let growth = 0
        let frame = 0
        let last = performance.now()

        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            growth += (targetRef.current - growth) * (reduced ? 1 : Math.min(1, dt * 3))
            if (!reduced && !dragRef.current.active) spinRef.current += dt * 0.22
            world.rotation.y = spinRef.current
            applyPitch()

            ground.scale.setScalar(0.78 + smooth(growth, 0, 2.2) * 0.22)

            for (const piece of pieces) {
                let amount = smooth(growth, piece.appear, piece.appear + piece.span)
                if (piece.hideAfter !== undefined) {
                    amount *= 1 - smooth(growth, piece.hideAfter, piece.hideAfter + 0.4)
                }
                piece.object.visible = amount > 0.03
                piece.object.scale.copy(piece.base).multiplyScalar(Math.max(amount, 0.001))
            }
            const filled = styleRef.current === "fill"
            for (const skin of skins) {
                skin.mesh.visible = filled
                skin.lines.visible = !filled
            }
            if (!filled) shadow.visible = false
            if (!reduced) {
                const wave = Math.sin(now * 0.0014)
                sway.forEach((blob, index) => {
                    blob.rotation.z = wave * 0.04 * ((index % 3) - 1)
                })
            }

            renderer.render(scene, camera)

            const width = mount.clientWidth
            const height = mount.clientHeight
            const reveal = smooth(growth, 2.15, 2.75)
            let canopyLeft = Infinity
            let canopyRight = -Infinity
            let canopyTop = Infinity
            for (const blob of sway) {
                projected.setFromMatrixPosition(blob.matrixWorld)
                projected.project(camera)
                if (projected.z > 1) continue
                const sx = (projected.x * 0.5 + 0.5) * width
                const sy = (-projected.y * 0.5 + 0.5) * height
                canopyLeft = Math.min(canopyLeft, sx - 150)
                canopyRight = Math.max(canopyRight, sx + 140)
                canopyTop = Math.min(canopyTop, sy - 110)
            }
            const roomOnRight = canopyRight + 156 < width - 8
            markers.forEach((marker, index) => {
                const group = markRefs.current[index]
                if (!group) return
                projected.setFromMatrixPosition(marker.matrixWorld)
                projected.project(camera)
                const x = (projected.x * 0.5 + 0.5) * width
                const y = (-projected.y * 0.5 + 0.5) * height
                const inside = projected.z < 1 && x > -40 && x < width + 40 && y > -40 && y < height - 48
                group.style.opacity = inside ? String(reveal) : "0"
                if (!inside || reveal <= 0.02) return
                const circle = group.children[0] as SVGCircleElement
                const line = group.children[1] as SVGLineElement
                const text = group.children[2] as SVGTextElement
                const radius = 40
                const placeAbove = index === 1 && !roomOnRight
                const placeLeft = index === 0 || (index === 2 && !roomOnRight)
                circle.setAttribute("cx", String(x))
                circle.setAttribute("cy", String(y))
                circle.setAttribute("r", String(radius))
                if (placeAbove) {
                    const labelY = Math.max(18, canopyTop - 28)
                    line.setAttribute("x1", String(x))
                    line.setAttribute("y1", String(y - radius))
                    line.setAttribute("x2", String(x))
                    line.setAttribute("y2", String(labelY + 8))
                    text.setAttribute("x", String(x))
                    text.setAttribute("y", String(labelY))
                    text.setAttribute("text-anchor", "middle")
                    return
                }
                const lineStart = x + (placeLeft ? -radius : radius)
                const lineEnd = placeLeft ? Math.min(canopyLeft - 28, lineStart - 36) : Math.max(canopyRight + 22, lineStart + 36)
                line.setAttribute("x1", String(lineStart))
                line.setAttribute("y1", String(y))
                line.setAttribute("x2", String(lineEnd))
                line.setAttribute("y2", String(y))
                text.setAttribute("x", String(placeLeft ? lineEnd - 10 : lineEnd + 10))
                text.setAttribute("y", String(y + 4))
                text.setAttribute("text-anchor", placeLeft ? "end" : "start")
            })

            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(frame)
            observer.disconnect()
            disposables.forEach((item) => item.dispose())
            renderer.dispose()
        }
    }, [])

    const grow = () => {
        const next = (targetRef.current + 1) % stageCount
        targetRef.current = next
        setStage(next)
    }

    const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
        dragRef.current = { active: true, moved: false, x: event.clientX, y: event.clientY }
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
        const drag = dragRef.current
        if (!drag.active) return
        const dx = event.clientX - drag.x
        const dy = event.clientY - drag.y
        if (!drag.moved && dx * dx + dy * dy < 25) return
        drag.moved = true
        drag.x = event.clientX
        drag.y = event.clientY
        spinRef.current += dx * 0.008
        pitchRef.current = Math.min(0.55, Math.max(-0.45, pitchRef.current - dy * 0.0045))
    }

    const onPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
        dragRef.current.active = false
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }
    }

    const onClick = () => {
        if (dragRef.current.moved) {
            dragRef.current.moved = false
            return
        }
        grow()
    }

    const styleButton = (mode: "outline" | "fill", label: string) => (
        <button
            type="button"
            aria-pressed={style === mode}
            onClick={() => setStyle(mode)}
            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                style === mode
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background/80 text-muted-foreground"
            }`}
        >
            {label}
        </button>
    )

    return (
        <div className="relative h-full w-full">
        <button
            type="button"
            onClick={onClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative h-full w-full cursor-grab touch-none select-none bg-transparent text-left active:cursor-grabbing"
        >
            <div ref={mountRef} className="absolute inset-0">
                <canvas ref={canvasRef} className="pointer-events-none h-full w-full" />
            </div>
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible font-sans text-foreground" aria-hidden="true">
                {marks.map((label, index) => (
                    <g
                        key={label}
                        ref={(node) => {
                            markRefs.current[index] = node
                        }}
                        style={{ opacity: 0 }}
                    >
                        <circle r="42" fill="none" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2.5 3.5" />
                        <line stroke="currentColor" strokeWidth="1.25" strokeDasharray="2.5 3.5" />
                        <text fill="currentColor" fontSize="13" fontWeight="600" letterSpacing="1.6">
                            {label.toUpperCase()}
                        </text>
                    </g>
                ))}
            </svg>
            <span aria-live="polite" className="absolute bottom-4 left-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:bottom-10 md:left-2">
                {stageName}
                <span className="mx-2 text-border" aria-hidden="true">·</span>
                {hint}
            </span>
        </button>
        <div className="absolute right-3 top-3 z-20 flex gap-1.5 md:right-5 md:top-5">
            {styleButton("outline", styleOutline)}
            {styleButton("fill", styleFill)}
        </div>
        </div>
    )
}
