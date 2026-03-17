import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { trackPageView } from "@/lib/metaPixel";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terminos from "./pages/Terminos";
import Privacypolicy from "./pages/Privacypolicy";

const queryClient = new QueryClient();

/**
 * ScrollToTop + PageView SPA
 *
 * El PageView inicial ya está disparado en index.html al cargar el script.
 * Este componente cubre los cambios de ruta dentro de la SPA
 * (/, /terminos, /privacidad) para que cada visita quede registrada.
 *
 * Se usa el pathname como dependencia para evitar disparos duplicados
 * en re-renders sin cambio de ruta.
 */
const RouteTracker = () => {
  const { pathname } = useLocation();

  // Scroll al top en cada cambio de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // PageView en cada cambio de ruta SPA (excepto carga inicial,
  // ya cubierta por el snippet de index.html)
  useEffect(() => {
    // Evitar el disparo en la primera carga (ya lo hace index.html)
    // Solo disparar en navegaciones internas posteriores.
    const isFirstLoad = sessionStorage.getItem('app_loaded') !== 'true';
    if (isFirstLoad) {
      sessionStorage.setItem('app_loaded', 'true');
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacypolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;