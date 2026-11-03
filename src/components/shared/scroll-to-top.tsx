import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { stripLocale } from "@/i18n/locale"

export function ScrollToTop() {
    const { pathname } = useLocation()
    const bare = stripLocale(pathname)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" })
    }, [bare])

    return null
}
