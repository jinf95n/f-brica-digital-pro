import { Check, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHATSAPP_LINK = "https://wa.me/5491100000000?text=Hola!%20Quiero%20mi%20sitio%20web";

const plans = [
  {
    name: "Plan Financiado",
    tagline: "Para empezar liviano",
    price: "$110.000",
    priceDetail: "x 2 cuotas (Setup)",
    extra: "+ Mantenimiento mensual",
    featured: false,
    features: [
      "Sitio web profesional",
      "Diseño responsive",
      "Certificado SSL",
      "Botón de WhatsApp",
      "Soporte por WhatsApp",
    ],
  },
  {
    name: "Plan Estándar",
    tagline: "Recomendado",
    price: "$200.000",
    priceDetail: "Pago único (Setup)",
    extra: "+ $25.000/mes mantenimiento",
    featured: true,
    features: [
      "Todo lo del Plan Financiado",
      "Dominio .com.ar incluido",
      "Hosting premium",
      "Cambios mensuales incluidos",
      "Optimización SEO básica",
      "Soporte prioritario",
    ],
  },
  {
    name: "Plan Anual",
    tagline: "Máximo ahorro",
    price: "$450.000",
    priceDetail: "Pago único",
    extra: "Todo incluido por 1 año",
    featured: false,
    features: [
      "Todo lo del Plan Estándar",
      "Congelás el precio 12 meses",
      "Sin pagos mensuales",
      "Ahorro total garantizado",
      "Soporte VIP",
    ],
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-muted/50" id="planes" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Precios</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Planes transparentes, sin letra chica
          </h2>
          <p className="text-muted-foreground text-lg">
            Elegí el que mejor se adapte a tu negocio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 md:scale-105 border-2 border-accent"
                  : "bg-card border border-border hover:shadow-lg"
              }`}
            >
              {plan.featured && (
                <div className="flex items-center gap-1.5 text-accent text-sm font-bold mb-4">
                  <Star className="w-4 h-4 fill-accent" />
                  RECOMENDADO
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.featured ? "text-primary-foreground" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.tagline}
              </p>
              <div className="mb-2">
                <span className={`text-3xl font-black ${plan.featured ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.price}
                </span>
              </div>
              <p className={`text-sm mb-1 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.priceDetail}
              </p>
              <p className={`text-sm font-medium mb-8 text-accent`}>
                {plan.extra}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 shrink-0 text-accent`} />
                    <span className={`text-sm ${plan.featured ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.featured
                    ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Elegir Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
