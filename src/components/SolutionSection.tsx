import { Zap, HeartHandshake, MessageSquare } from "lucide-react";

const solutions = [
  {
    icon: Zap,
    title: "Velocidad",
    description: "Entregamos tu sitio funcionando en 24 horas. Sin demoras, sin vueltas.",
  },
  {
    icon: HeartHandshake,
    title: "Cero Estrés",
    description: "Nosotros redactamos los textos, subimos las fotos y configuramos el servidor. Es un servicio llave en mano.",
  },
  {
    icon: MessageSquare,
    title: "Soporte Humano",
    description: "No sos un número. Tenés soporte técnico real vía WhatsApp cuando lo necesites.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-primary" id="solucion">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            La solución que tu negocio necesita
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            No vendemos tecnología, vendemos tranquilidad.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="text-center p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <solution.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary-foreground mb-3">{solution.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
