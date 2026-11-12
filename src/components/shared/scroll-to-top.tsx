import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { stripLocale } from "@/i18n/locale"

export function ScrollToTop() {
    const { pathname, hash } = useLocation()
    const bare = stripLocale(pathname)

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            const target = hash ? document.getElementById(hash.slice(1)) : null
            if (target) {
                target.scrollIntoView({ block: "start" })
                return
            }
            window.scrollTo({ top: 0, behavior: "instant" })
        })
        return () => cancelAnimationFrame(frame)
    }, [bare, hash])

    return null
}
