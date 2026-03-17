/**
 * Meta Pixel tracking layer — landing24
 *
 * El Pixel (ID 561464771632671) se inicializa en index.html.
 * Este módulo provee wrappers seguros para disparar eventos
 * desde componentes React, sin depender de la herramienta visual de Meta.
 *
 * Preparado para deduplicación futura con CAPI usando eventID.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

type FbqFn = (
  command: 'track' | 'trackCustom' | 'init',
  eventOrPixelId: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Genera un eventID único para deduplicación futura con CAPI.
 * Formato: {prefix}_{timestamp}_{random}
 */
export const generateEventId = (prefix = 'evt'): string => {
  const rand = Math.random().toString(36).slice(2, 9);
  return `${prefix}_${Date.now()}_${rand}`;
};

/**
 * Verifica que fbq esté disponible antes de disparar cualquier evento.
 * Evita errores en SSR o si el script de Meta no cargó.
 */
const isFbqReady = (): boolean =>
  typeof window !== 'undefined' && typeof window.fbq === 'function';

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * PageView — disparar en cambios de ruta SPA.
 * La carga inicial ya está cubierta en index.html.
 */
export const trackPageView = (): void => {
  if (!isFbqReady()) return;
  window.fbq!('track', 'PageView');
};

/**
 * Evento estándar de Meta (e.g. InitiateCheckout, Contact, CustomizeProduct).
 * Siempre incluye eventID para futura deduplicación con CAPI.
 */
export const trackStandardEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
): void => {
  if (!isFbqReady()) return;
  const eventID = options?.eventID ?? generateEventId(eventName);
  window.fbq!('track', eventName, params ?? {}, { eventID });
};

/**
 * Evento personalizado (custom event).
 * Siempre incluye eventID para futura deduplicación con CAPI.
 */
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
): void => {
  if (!isFbqReady()) return;
  const eventID = options?.eventID ?? generateEventId(eventName);
  window.fbq!('trackCustom', eventName, params ?? {}, { eventID });
};