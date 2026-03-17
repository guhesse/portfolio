/**
 * Hook centralizado para rastreamento de eventos no Google Analytics 4.
 * Usar este hook em vez de chamar window.gtag diretamente.
 */

import { trackEvent, trackExternalLink, type GaEventParams } from "@/lib/analytics"

export type { GaEventParams }

export function useAnalytics() {
  const track = (eventName: string, params?: GaEventParams) => {
    trackEvent(eventName, params)
  }

  const trackLink = (url: string, label: string, location: string) => {
    trackExternalLink(url, label, location)
  }

  return { track, trackLink }
}
