import { useEffect, type RefObject } from "react"
import { animate, createScope, createTimeline, onScroll, stagger } from "animejs"

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function once(target: Element) {
    return onScroll({
        target,
        enter: "bottom-=80 top",
        sync: "play pause",
        repeat: false,
    })
}

function motionHeading(root: HTMLElement) {
    const eyebrow = root.querySelector("[data-motion='eyebrow']")
    const title = root.querySelector("[data-motion='title']")
    const body = root.querySelector("[data-motion='body']")
    const tl = createTimeline({ autoplay: once(root) })
    if (eyebrow) {
        tl.add(eyebrow, {
            opacity: { from: 0, ease: "out(3)" },
            x: { from: -48, ease: "outExpo" },
            duration: 800,
        }, 0)
    }
    if (title) {
        tl.add(title, {
            opacity: { from: 0, ease: "out(3)" },
            y: { from: 64, ease: "outBack(1.7)" },
            rotate: { from: -3, ease: "outBack(1.4)" },
            duration: 1050,
        }, 120)
    }
    if (body) {
        tl.add(body, {
            opacity: { from: 0, ease: "out(2)" },
            y: { from: 32, ease: "outExpo" },
            duration: 800,
        }, 300)
    }
}

function motionStagger(trigger: HTMLElement) {
    const items = [...trigger.querySelectorAll<HTMLElement>("[data-motion-item]")].filter(
        (el) => !el.querySelector("[data-tilt]"),
    )
    if (!items.length) return
    const soft = trigger.dataset.motionStagger === "soft"
    animate(items, {
        ...(soft ? {} : { opacity: { from: 0, ease: "out(2)" } }),
        y: { from: soft ? 72 : 100, ease: soft ? "outBack(1.45)" : "outBack(1.9)" },
        rotate: { from: stagger(soft ? [-2.5, 2.5] : [-8, 8]), to: 0, ease: "outBack(1.5)" },
        scale: { from: soft ? 0.92 : 0.82, ease: "outBack(1.6)" },
        delay: stagger(soft ? 90 : 150),
        duration: soft ? 950 : 1200,
        autoplay: once(trigger),
    })
}

function motionPortrait(el: HTMLElement) {
    animate(el, {
        opacity: { from: 0, ease: "out(2)" },
        scale: { from: 0.55, ease: "outElastic(1, .6)" },
        rotate: { from: -12, ease: "outBack(1.7)" },
        duration: 1300,
        autoplay: once(el),
    })
}

function motionSlide(el: HTMLElement) {
    const fromRight = el.dataset.motionFrom === "right"
    animate(el, {
        opacity: { from: 0, ease: "out(2)" },
        x: { from: fromRight ? 72 : -72, ease: "outExpo" },
        duration: 950,
        autoplay: once(el),
    })
}

function motionRise(el: HTMLElement) {
    animate(el, {
        opacity: { from: 0, ease: "out(2)" },
        y: { from: 80, ease: "outBack(1.7)" },
        scale: { from: 0.94, ease: "outBack(1.4)" },
        duration: 1100,
        autoplay: once(el),
    })
}

function motionEnter(el: HTMLElement) {
    const marked = [...el.querySelectorAll<HTMLElement>("[data-motion-enter]")]
    const targets = marked.length ? marked : [...el.children]
    if (!targets.length) return
    animate(targets, {
        opacity: { from: 0, ease: "out(3)" },
        y: { from: 40, ease: "outExpo" },
        delay: stagger(110),
        duration: 900,
    })
}

function setupPageMotion(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>("[data-motion='heading']").forEach(motionHeading)
    root.querySelectorAll<HTMLElement>("[data-motion='stagger']").forEach(motionStagger)
    root.querySelectorAll<HTMLElement>("[data-motion='portrait']").forEach(motionPortrait)
    root.querySelectorAll<HTMLElement>("[data-motion='slide']").forEach(motionSlide)
    root.querySelectorAll<HTMLElement>("[data-motion='rise']").forEach(motionRise)
    root.querySelectorAll<HTMLElement>("[data-motion='enter']").forEach(motionEnter)
}

export function usePageMotion(ref: RefObject<HTMLElement | null>, replayKey = "page") {
    useEffect(() => {
        const root = ref.current
        if (!root || prefersReducedMotion()) return
        const scope = createScope({ root }).add(() => setupPageMotion(root))
        return () => scope.revert()
    }, [ref, replayKey])
}
