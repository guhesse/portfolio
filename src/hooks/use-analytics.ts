/**
 * Hook centralizado para rastreamento de eventos no Google Analytics 4.
 * Usar este hook em vez de chamar window.gtag diretamente.
 */

type GaEventParams = {
  // Parâmetros comuns
  label?: string
  location?: string
  // Navegação
  section?: string
  // Projetos
  project_name?: string
  project_slug?: string
  project_type?: "internal" | "external"
  // Carrossel / Galeria
  direction?: "left" | "right"
  image_index?: number
  // Social / Links externos
  platform?: string
  url?: string
  // Scroll
  scroll_depth?: number
  // Genérico extra
  [key: string]: unknown
}

export function useAnalytics() {
  const track = (eventName: string, params?: GaEventParams) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params)
    }
  }

  return { track }
}
