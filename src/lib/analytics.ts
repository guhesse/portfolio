export type GaEventParams = {
  label?: string
  location?: string
  section?: string
  project_name?: string
  project_slug?: string
  project_type?: "internal" | "external"
  direction?: "left" | "right"
  image_index?: number
  platform?: string
  url?: string
  scroll_depth?: number
  [key: string]: unknown
}

/**
 * Envia um evento customizado para o Google Analytics 4.
 * Pode ser usado fora de componentes React (ex: utilitários puros).
 */
export function trackEvent(action: string, params?: GaEventParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params)
  }
}

/**
 * Atalho para rastrear cliques em links externos com parâmetros padronizados.
 */
export function trackExternalLink(url: string, label: string, location: string) {
  trackEvent("external_link_click", { url, label, location })
}
