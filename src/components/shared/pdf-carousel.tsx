import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getDocument, GlobalWorkerOptions, type PDFDocumentLoadingTask, type PDFDocumentProxy, type RenderTask } from "pdfjs-dist"
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"
import { useAnalytics } from "@/hooks/use-analytics"
import { useUi } from "@/i18n/use-locale"

GlobalWorkerOptions.workerSrc = workerSrc

function padFrame(index: number) {
    return String(index).padStart(2, "0")
}

async function rasterThumb(pdf: PDFDocumentProxy, pageNumber: number) {
    const page = await pdf.getPage(pageNumber)
    const base = page.getViewport({ scale: 1 })
    const viewport = page.getViewport({ scale: 220 / base.width })
    const canvas = document.createElement("canvas")
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    await page.render({ canvas, viewport }).promise
    return canvas.toDataURL("image/jpeg", 0.72)
}

export function PdfCarousel({ src, title, projectSlug }: { src: string; title: string; projectSlug?: string }) {
    const [pageCount, setPageCount] = useState(0)
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)
    const [thumbs, setThumbs] = useState<string[]>([])
    const [ratio, setRatio] = useState(16 / 9)
    const [failed, setFailed] = useState(false)
    const [fit, setFit] = useState({ w: 0, h: 0 })
    const stageRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pdfRef = useRef<PDFDocumentProxy | null>(null)
    const renderTask = useRef<RenderTask | null>(null)
    const renderChain = useRef(Promise.resolve())
    const stripRef = useRef<HTMLDivElement>(null)
    const dragStart = useRef<number | null>(null)
    const currentRef = useRef(0)
    const enqueueRender = useCallback(<T,>(work: () => Promise<T>) => {
        const run = renderChain.current.then(work, work)
        renderChain.current = run.then(() => undefined, () => undefined)
        return run
    }, [])

    const { track } = useAnalytics()
    const { project: copy } = useUi()

    const goTo = useCallback((index: number) => {
        const next = Math.max(0, Math.min(index, pageCount - 1))
        if (next === currentRef.current) return
        setDirection(next > currentRef.current ? 1 : -1)
        currentRef.current = next
        setCurrent(next)
        track("gallery_image_view", { project_name: title, project_slug: projectSlug, image_index: next + 1 })
    }, [pageCount, title, projectSlug, track])

    useEffect(() => {
        let cancelled = false
        let loadingTask: PDFDocumentLoadingTask | null = null

        ;(async () => {
            loadingTask = getDocument({ url: src })
            const pdf = await loadingTask.promise
            if (cancelled) {
                void loadingTask.destroy()
                return
            }
            pdfRef.current = pdf
            const first = await pdf.getPage(1)
            if (!cancelled) {
                const box = first.getViewport({ scale: 1 })
                setRatio(box.width / box.height)
                setPageCount(pdf.numPages)
            }
            const rendered: string[] = []
            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
                if (cancelled) return
                const thumb = await enqueueRender(() => rasterThumb(pdf, pageNumber))
                if (cancelled) return
                rendered.push(thumb)
                setThumbs([...rendered])
            }
        })().catch(() => {
            if (!cancelled) setFailed(true)
        })

        return () => {
            cancelled = true
            renderTask.current?.cancel()
            void loadingTask?.destroy()
            pdfRef.current = null
        }
    }, [src])

    useEffect(() => {
        const stage = stageRef.current
        if (!stage) return
        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect
            setFit((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }))
        })
        observer.observe(stage)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const pdf = pdfRef.current
        const canvas = canvasRef.current
        if (!pdf || !canvas || fit.w < 8 || fit.h < 8) return
        let cancelled = false

        void enqueueRender(async () => {
            const page = await pdf.getPage(current + 1)
            if (cancelled) return
            const base = page.getViewport({ scale: 1 })
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.max(1, Math.floor(fit.w * dpr))
            canvas.height = Math.max(1, Math.floor(fit.h * dpr))
            canvas.style.width = "100%"
            canvas.style.height = "100%"
            const scale = Math.max(canvas.width / base.width, canvas.height / base.height)
            const viewport = page.getViewport({ scale })
            renderTask.current?.cancel()
            const task = page.render({ canvas, viewport })
            renderTask.current = task
            try {
                await task.promise
            } catch (error) {
                const name = error instanceof Error ? error.name : ""
                if (name !== "RenderingCancelledException" && !cancelled) setFailed(true)
            }
        })

        return () => {
            cancelled = true
        }
    }, [current, fit.h, fit.w, pageCount])

    useEffect(() => {
        const strip = stripRef.current
        const active = strip?.querySelector<HTMLElement>("[data-active='true']")
        if (!strip || !active) return
        const left = active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2
        strip.scrollTo({ left, behavior: "smooth" })
    }, [current, pageCount])

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return
        dragStart.current = event.clientX
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (dragStart.current == null) return
        const delta = event.clientX - dragStart.current
        dragStart.current = null
        if (delta <= -56) goTo(current + 1)
        else if (delta >= 56) goTo(current - 1)
    }

    const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") {
            event.preventDefault()
            goTo(current + 1)
        } else if (event.key === "ArrowLeft") {
            event.preventDefault()
            goTo(current - 1)
        }
    }

    const arrowClass = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-foreground/15 bg-background text-foreground transition-colors hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-25"

    return (
        <div className="bg-foreground/[0.08] p-px">
            <div
                ref={stageRef}
                role="region"
                aria-roledescription="carousel"
                aria-label={copy.manual}
                tabIndex={0}
                onKeyDown={onKeyDown}
                style={{ aspectRatio: ratio }}
                className="group relative w-full overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
                <div
                    className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => { dragStart.current = null }}
                >
                    {failed ? (
                        <p className="flex h-full items-center justify-center px-8 text-center text-[13px] leading-relaxed text-muted-foreground">
                            {copy.pdfError}
                        </p>
                    ) : (
                        <div key={current} data-dir={direction} className="gallery-settle absolute inset-0">
                            <canvas
                                ref={canvasRef}
                                aria-label={`${title} — ${padFrame(current + 1)}`}
                                className="h-full w-full"
                            />
                        </div>
                    )}
                </div>

                {pageCount > 0 && (
                    <div className="pointer-events-none absolute bottom-0 left-0 flex items-baseline gap-2 bg-foreground px-4 py-2.5 text-background">
                        <span className="font-display text-2xl leading-none">{padFrame(current + 1)}</span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-background/70">
                            / {padFrame(pageCount)}
                        </span>
                    </div>
                )}

                {pageCount > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() => goTo(current - 1)}
                            disabled={current === 0}
                            title={copy.previousPage}
                            className={`${arrowClass} left-3`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => goTo(current + 1)}
                            disabled={current === pageCount - 1}
                            title={copy.nextPage}
                            className={`${arrowClass} right-3`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            {pageCount > 1 && (
                <div
                    ref={stripRef}
                    className="mt-px flex gap-px overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {Array.from({ length: pageCount }, (_, index) => {
                        const active = index === current
                        const thumb = thumbs[index]
                        return (
                            <button
                                key={index}
                                type="button"
                                data-active={active}
                                onClick={() => goTo(index)}
                                title={copy.pageThumb(index + 1)}
                                className="min-w-[4.75rem] flex-1 bg-background text-left"
                            >
                                <span className="relative block overflow-hidden bg-white" style={{ aspectRatio: ratio }}>
                                    {thumb ? (
                                        <img
                                            src={thumb}
                                            alt=""
                                            draggable={false}
                                            className={`h-full w-full object-contain transition-opacity duration-300 ${active ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
                                        />
                                    ) : null}
                                </span>
                                <span className={`block px-2.5 py-2 text-[10px] font-medium tabular-nums tracking-[0.16em] ${active ? "bg-foreground text-background" : "text-foreground/55"}`}>
                                    {padFrame(index + 1)}
                                </span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
