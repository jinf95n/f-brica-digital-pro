import { MessageCircle, ArrowRight, TrendingUp, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const WHATSAPP_LINK = "https://wa.me/5491100000000?text=Hola!%20Quiero%20mi%20sitio%20web";

const stats = [
  { icon: Users, value: "200+", label: "Negocios potenciados" },
  { icon: Clock, value: "24hs", label: "Entrega promedio" },
  { icon: TrendingUp, value: "3x", label: "Más visibilidad" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/75" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-accent/5"
            initial={{ x: `${20 * i}%`, y: "100%", opacity: 0 }}
            animate={{ y: "-20%", opacity: [0, 0.3, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 px-4 py-1.5 text-sm text-accent-foreground mb-8"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            Más de 200 negocios potenciados
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-primary-foreground leading-[1.1] mb-6"
          >
            Transformamos tu Negocio en una{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-400">
              Marca Profesional
            </span>{" "}
            en menos de 24 horas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl leading-relaxed"
          >
            Tu sitio web moderno, rápido y seguro sin que tengas que ocuparte de nada.
            Dejá de depender solo de Instagram y empezá a aparecer en Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5" />
              Quiero mi Sitio Ya
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-accent" />
                <span className="text-2xl md:text-3xl font-black text-primary-foreground">{stat.value}</span>
              </div>
              <p className="text-xs md:text-sm text-primary-foreground/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
