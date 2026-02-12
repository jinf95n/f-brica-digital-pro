import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const projects = [
  {
    image: portfolio1,
    title: "Pizzería Don Carlo",
    category: "Gastronomía",
    description: "Menú digital + pedidos por WhatsApp. Aumentó sus pedidos un 40%.",
  },
  {
    image: portfolio2,
    title: "Ferretería López",
    category: "Comercio",
    description: "Catálogo online con precios actualizados y consultas directas.",
  },
  {
    image: portfolio3,
    title: "Dr. Martínez",
    category: "Salud",
    description: "Turnos online y ficha médica profesional. Más pacientes nuevos.",
  },
  {
    image: portfolio4,
    title: "Barbería Vintage",
    category: "Estética",
    description: "Reservas online 24/7 y galería de trabajos. Agenda siempre llena.",
  },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-muted/30" id="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Negocios que ya <span className="text-accent">dieron el salto</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Mirá cómo transformamos negocios como el tuyo.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2 group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Ver proyecto</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
