// components/FloatingBubble.tsx
import { Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversionOrchestrator } from '@/hooks/useConversionOrchestrator';

const FloatingBubble = () => {
  const { state, scrollToCotizador } = useConversionOrchestrator();

  return (
    <AnimatePresence>
      {state.showFloatingBubble && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToCotizador}
          className="fixed bottom-6 right-6 z-30 bg-accent text-accent-foreground rounded-full p-4 shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all group"
        >
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
          
          <div className="relative flex items-center gap-3">
            <Calculator className="w-6 h-6" />
            <span className="hidden md:block font-bold text-sm pr-2 whitespace-nowrap">
              Cotizá tu sitio
            </span>
          </div>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-surface-dark text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
              Solo 30 segundos
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface-dark" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingBubble;