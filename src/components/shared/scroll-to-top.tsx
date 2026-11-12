import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { stripLocale } from "@/i18n/locale"

export function ScrollToTop() {
    const { pathname, hash } = useLocation()
    const bare = stripLocale(pathname)

    useEffect(() => {
        let frame = 0
        let attempts = 0
        const tick = () => {
            const target = hash ? document.getElementById(hash.slice(1)) : null
            if (target) {
                target.scrollIntoView({ block: "start" })
                return
            }
            if (hash && attempts < 20) {
                attempts += 1
                frame = requestAnimationFrame(tick)
                return
            }
            window.scrollTo({ top: 0, behavior: "instant" })
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [bare, hash])

    return null
}
