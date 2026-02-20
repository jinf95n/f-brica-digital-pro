import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "¿Por qué pagar un mantenimiento?",
    answer:
      'Es como un empleado que trabaja 24/7. Incluye servidores seguros, actualizaciones de seguridad, certificado SSL renovado, backups y soporte técnico humano. Sin esto, tu sitio queda desprotegido y offline.',
  },
  {
    question: "¿El sitio es mío?",
    answer:
      "El dominio y el contenido son 100% tuyos. La tecnología (hosting, servidor, código) la ponemos nosotros como parte del servicio. Si decidís irte, te entregamos todo tu contenido.",
  },
  {
    question: "¿Tengo permanencia?",
    answer:
      "No. Podés darte de baja cuando quieras sin penalización. Creemos que te quedás porque estás conforme, no porque estás atrapado.",
  },
  {
    question: "¿Qué pasa si necesito cambios en mi sitio?",
    answer:
      "Los planes con mantenimiento incluyen cambios mensuales sin costo adicional. Actualizamos textos, fotos, información de contacto y más. Solo nos escribís por WhatsApp.",
  },
  {
    question: "¿Puedo ver ejemplos de sitios que hicieron?",
    answer:
      "¡Claro! Mirá nuestra sección de Portfolio más arriba o escribinos por WhatsApp y te mandamos ejemplos personalizados de negocios similares al tuyo.",
  },
  {
    question: "¿Qué incluye exactamente el dominio .com.ar?",
    answer:
      "Registramos tu dominio a tu nombre. Es tuyo. Incluimos la configuración de DNS, certificado SSL y todo lo necesario para que tu sitio funcione de forma segura.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background" id="faq" ref={ref}>
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Preguntas frecuentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Respondemos las dudas más comunes de nuestros clientes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
