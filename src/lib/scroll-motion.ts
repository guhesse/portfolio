import { useEffect, type RefObject } from "react"
import { animate, createScope, createTimeline, onScroll, stagger } from "animejs"

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function once(target: Element) {
    return onScroll({
        target,
        enter: "bottom-=40 top",
        sync: "play pause",
        repeat: false,
    })
}

const rise = {
    opacity: { from: 0, ease: "linear" },
    y: { from: 10, ease: "out(2)" },
    duration: 420,
}

function motionHeading(root: HTMLElement) {
    const parts = ["eyebrow", "title", "body"]
        .map((name) => root.querySelector(`[data-motion='${name}']`))
        .filter((el): el is Element => Boolean(el))
    if (!parts.length) return
    const tl = createTimeline({ autoplay: once(root) })
    parts.forEach((el, index) => {
        tl.add(el, rise, index * 60)
    })
}

function motionStagger(trigger: HTMLElement) {
    const items = [...trigger.querySelectorAll<HTMLElement>("[data-motion-item]")].filter(
        (el) => !el.querySelector("[data-tilt]"),
    )
    if (!items.length) return
    animate(items, {
        ...rise,
        delay: stagger(40),
        autoplay: once(trigger),
    })
}

function motionPortrait(el: HTMLElement) {
    animate(el, { ...rise, duration: 480, autoplay: once(el) })
}

function motionSlide(el: HTMLElement) {
    animate(el, { ...rise, autoplay: once(el) })
}

function motionRise(el: HTMLElement) {
    animate(el, { ...rise, autoplay: once(el) })
}

function motionEnter(el: HTMLElement) {
    const marked = [...el.querySelectorAll<HTMLElement>("[data-motion-enter]")]
    const targets = marked.length ? marked : [...el.children]
    if (!targets.length) return
    animate(targets, {
        ...rise,
        delay: stagger(50),
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
