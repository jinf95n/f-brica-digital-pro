import { Send, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: Send,
    number: "01",
    title: "Envío",
    description: "Nos pasás tu logo y fotos (o usamos las de tus redes).",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Construcción",
    description: "Nuestros expertos arman tu sitio profesional a medida.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Lanzamiento",
    description: "En 24hs tenés tu dominio .com.ar online y listo para vender.",
  },
];

const StepsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background" id="como-funciona">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="text-muted-foreground text-lg">
            3 pasos simples. Sin complicaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-border" />

          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-accent mb-2 block">PASO {step.number}</span>
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
