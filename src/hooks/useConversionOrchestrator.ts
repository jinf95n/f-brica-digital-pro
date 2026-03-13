// hooks/useConversionOrchestrator.ts
import { useState, useEffect } from 'react';

interface ConversionState {
  hasScrolled: boolean;
  hasInteracted: boolean;
  hasSeenCotizador: boolean;
  hasSubmittedCotizador: boolean; // ⭐ NUEVO
  timeOnPage: number;
  scrollDepth: number;
  showStickyBar: boolean;
  showFloatingBubble: boolean;
  showExitModal: boolean;
}

export const useConversionOrchestrator = () => {
  const [state, setState] = useState<ConversionState>({
    hasScrolled: false,
    hasInteracted: false,
    hasSeenCotizador: false,
    hasSubmittedCotizador: false, // ⭐ NUEVO
    timeOnPage: 0,
    scrollDepth: 0,
    showStickyBar: false,
    showFloatingBubble: false,
    showExitModal: false,
  });

  const stickyDismissed = sessionStorage.getItem('sticky_dismissed') === 'true';
  const modalDismissed = sessionStorage.getItem('modal_dismissed') === 'true';

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({ ...prev, timeOnPage: prev.timeOnPage + 1 }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const depth = Math.round((scrolled / windowHeight) * 100);
      
      setState(prev => ({ 
        ...prev, 
        hasScrolled: scrolled > 100,
        scrollDepth: depth 
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cotizador observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({
            ...prev,
            hasSeenCotizador: true,
            showStickyBar: false, // Ocultar sticky cuando ve el cotizador
            showFloatingBubble: false, // Ocultar bubble cuando ve el cotizador
            // NO ocultamos exit modal aquí - solo cuando hace submit
          }));
        }
      },
      { threshold: 0.3 }
    );

    const cotizador = document.getElementById('cotizador');
    if (cotizador) observer.observe(cotizador);

    return () => {
      if (cotizador) observer.unobserve(cotizador);
    };
  }, []);

  // Sticky Bar (3 seg)
  useEffect(() => {
    if (stickyDismissed || state.hasSeenCotizador) return;

    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, showStickyBar: true }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [state.hasSeenCotizador, stickyDismissed]);

  // Floating Bubble
  useEffect(() => {
    if (state.hasScrolled && !state.hasSeenCotizador) {
      setState(prev => ({ ...prev, showFloatingBubble: true }));
    } else {
      setState(prev => ({ ...prev, showFloatingBubble: false }));
    }
  }, [state.hasScrolled, state.hasSeenCotizador]);

  // Exit Intent - ⭐ LÓGICA MEJORADA
  useEffect(() => {
    // No mostrar si:
    // - Ya lo cerró manualmente
    // - Ya hizo submit del cotizador
    // - Es mobile
    if (modalDismissed || state.hasSubmittedCotizador || window.innerWidth < 768) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Solo si el mouse sale por arriba
      if (e.clientY <= 0) {
        // ⭐ NUEVA LÓGICA: Mostrar si vio el cotizador PERO no hizo submit
        // O si ni siquiera vio el cotizador (todavía más perdido)
        if (!state.hasSubmittedCotizador) {
          setState(prev => ({ ...prev, showExitModal: true }));
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [state.hasSubmittedCotizador, modalDismissed]);

  // Actions
  const dismissStickyBar = () => {
    setState(prev => ({ ...prev, showStickyBar: false }));
    sessionStorage.setItem('sticky_dismissed', 'true');
  };

  const dismissExitModal = () => {
    setState(prev => ({ ...prev, showExitModal: false }));
    sessionStorage.setItem('modal_dismissed', 'true');
  };

  const markInteraction = () => {
    setState(prev => ({ ...prev, hasInteracted: true }));
  };

  // ⭐ NUEVA FUNCIÓN
  const markCotizadorSubmitted = () => {
    setState(prev => ({ 
      ...prev, 
      hasSubmittedCotizador: true,
      showExitModal: false // Cerrar exit modal si está abierto
    }));
  };

  const scrollToCotizador = () => {
    markInteraction();
    document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    state,
    dismissStickyBar,
    dismissExitModal,
    markInteraction,
    markCotizadorSubmitted, // ⭐ EXPORTAR
    scrollToCotizador,
  };
};