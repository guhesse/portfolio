export type Locale = "pt" | "en"

export function localeFromPath(pathname: string): Locale {
    return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt"
}

export function stripLocale(pathname: string): string {
    if (pathname === "/en") return "/"
    if (pathname.startsWith("/en/")) return pathname.slice(3) || "/"
    return pathname
}

export function withLocale(path: string, locale: Locale): string {
    const hashIndex = path.indexOf("#")
    const hash = hashIndex >= 0 ? path.slice(hashIndex) : ""
    const pathname = (hashIndex >= 0 ? path.slice(0, hashIndex) : path) || "/"
    const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`

    if (locale === "pt") return `${normalized}${hash}`
    if (normalized === "/") return `/en${hash}`
    return `/en${normalized}${hash}`
}

export function navHref(href: string, locale: Locale): string {
    if (href.startsWith("#")) return `${withLocale("/", locale)}${href}`
    return withLocale(href, locale)
}

export function whatsappUrl(locale: Locale): string {
    const text = locale === "en"
        ? "Hi, I'd like to talk about a visual identity."
        : "Olá, tudo bem? Gostaria de conversar sobre minha identidade visual."
    return `https://wa.me/5511970981101?text=${encodeURIComponent(text)}`
}
