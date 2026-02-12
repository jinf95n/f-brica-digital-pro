import { ShieldAlert, SearchX, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: ShieldAlert,
    title: "Terreno Alquilado",
    description: "Si Instagram cambia el algoritmo o te bloquea, perdés tus clientes de un día para el otro.",
  },
  {
    icon: SearchX,
    title: "Invisible en Google",
    description: "El 40% de la gente busca en Google Maps antes de comprar. Si no tenés web, no existís.",
  },
  {
    icon: AlertTriangle,
    title: "Falta de Confianza",
    description: "Una web oficial le dice a tu cliente que tu negocio es serio y no una estafa.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background" id="problema">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por qué Instagram <span className="text-accent">no es suficiente</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Depender de una sola red social es un riesgo enorme para tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <problem.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
