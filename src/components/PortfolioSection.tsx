import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type CategoryKey =
  | "all"
  | "construction"
  | "legal"
  | "health"
  | "home"
  | "food"
  | "retail"
  | "beauty";

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  all: "Todas",
  construction: "Construcción y Obras",
  legal: "Legal y Estudios",
  health: "Salud y Bienestar",
  home: "Hogar y Outdoor",
  food: "Gastronomía",
  retail: "Comercio y Servicios",
  beauty: "Belleza y Estética",
};

type DemoItem = {
  title: string;
  categoryKey: Exclude<CategoryKey, "all">;
  href: string;
  cover: string; // ✅ URL o ruta desde /public (ej: "/demos/ojeda.png")
  tags?: string[]; // opcional: ["Alta conversión", "WhatsApp", ...]
  // Texto corto, no overlay grande.
  summary?: string;
};

const demos: DemoItem[] = [
  {
    title: "Steel Frame — Landing Premium",
    categoryKey: "construction",
    href: "https://steel-frame-builders.vercel.app/",
    cover: "src/assets/demos/steel.png",
    tags: ["Alta conversión", "WhatsApp"],
    summary: "Comparativa, garantías y CTA directo.",
  },
  {
    title: "Ojeda Construcciones",
    categoryKey: "construction",
    href: "https://ojeda-construcciones.vercel.app/",
    cover: "src/assets/demos/ojeda.png",
    tags: ["Llave en mano", "Formulario"],
    summary: "Servicios, proceso y calificador de lead.",
  },
  {
    title: "Psicología — Agenda & Turnos",
    categoryKey: "health",
    href: "https://tu-demo.com/psicologia",
    cover: "/demos/psicologia.jpg",
    tags: ["Turnos", "Confianza"],
    summary: "Presentación + reserva de turnos.",
  },
  {
    title: "Piscinas — Catálogo + WhatsApp",
    categoryKey: "home",
    href: "https://tu-demo.com/piscinas",
    cover: "/demos/piscinas.jpg",
    tags: ["Catálogo", "WhatsApp"],
    summary: "Modelos y proceso de instalación.",
  },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState<CategoryKey>("all");

  const categories = useMemo(() => {
    const keys = Array.from(new Set(demos.map((d) => d.categoryKey)));
    return ["all", ...keys] as CategoryKey[];
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return demos;
    return demos.filter((d) => d.categoryKey === active);
  }, [active]);

  return (
    <section className="py-20 md:py-28 bg-muted/30" id="demos" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Demos en Acción
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
           Explora nuestros desarrollos{" "}
            <span className="text-accent">según la industria y el rubro de tu negocio.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Selecciona una categoría y abre cada demo en una pestaña nueva para visualizar la experiencia completa.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((key) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`
                  rounded-full px-4 py-2 text-sm font-semibold transition-all border
                  ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background/70 text-foreground border-border hover:bg-background"
                  }
                `}
              >
                {CATEGORY_LABELS[key]}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((demo, i) => (
            <motion.div
              key={`${demo.title}-${demo.href}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="rounded-2xl border border-border/60 bg-background/70 overflow-hidden"
            >
              {/* Preview */}
              <a
                href={demo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={demo.cover}
                    alt={`Demo ${demo.title}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Overlay MINIMAL */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                        {CATEGORY_LABELS[demo.categoryKey]}
                      </span>
                      {/* Tags opcionales (máximo 2) */}
                      {demo.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="hidden sm:inline-flex rounded-full bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-2 text-base sm:text-lg font-semibold text-white leading-snug line-clamp-1">
                      {demo.title}
                    </h3>
                  </div>
                </div>
              </a>

              {/* Info debajo (limpia y corta) */}
              <div className="p-5">
                {demo.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {demo.summary}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <a
                    href={demo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    Ver demo <ExternalLink className="h-4 w-4" />
                  </a>

                  {/* (Opcional) “copiar link” si querés después */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Nota: Los proyectos presentados son prototipos funcionales sujetos a actualizaciones y ajustes de diseño según los requerimientos finales.
        </p>
      </div>
    </section>
  );
};

export default PortfolioSection;
