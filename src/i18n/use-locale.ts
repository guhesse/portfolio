import { useLocation } from "react-router-dom"
import { localeFromPath, stripLocale, withLocale, type Locale } from "@/i18n/locale"
import { messages, type Messages } from "@/i18n/messages"
import { getSiteContent, type SiteContent } from "@/i18n/site-content"

export function useLocale() {
    const location = useLocation()
    const locale = localeFromPath(location.pathname)
    const isHome = stripLocale(location.pathname) === "/"

    const pathFor = (target: Locale) =>
        withLocale(stripLocale(location.pathname), target) + location.hash

    return {
        locale,
        isHome,
        pathFor,
        homePath: withLocale("/", locale),
    }
}

export function useUi(): Messages {
    const { locale } = useLocale()
    return messages[locale]
}

export function useSiteContent(): SiteContent {
    const { locale } = useLocale()
    return getSiteContent(locale)
}
