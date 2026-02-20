import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, FileLock2, CreditCard, Clock, Wrench, LifeBuoy, AlertTriangle } from "lucide-react";

type SlaRow = {
  level: "P1" | "P2" | "P3";
  label: string;
  definition: string;
  response: string;
  channel: string;
};

const sla: SlaRow[] = [
  {
    level: "P1",
    label: "Crítico",
    definition:
      "Sitio caído/offline. Error 500/404. Dominio no resuelve. Certificado SSL vencido.",
    response: "< 4 horas (guardia 24/7)",
    channel: 'WhatsApp (keyword: "URGENCIA")',
  },
  {
    level: "P2",
    label: "Estándar",
    definition:
      "Solicitudes de cambio: precios, fotos, textos, horarios. Consultas administrativas.",
    response: "24 a 48 hs hábiles",
    channel: "Formulario/Portal de Soporte",
  },
  {
    level: "P3",
    label: "Excluido",
    definition:
      "Problemas ajenos a la web (WiFi, correo en celular, redes sociales, hardware).",
    response: "No aplica",
    channel: "Se rechaza amablemente",
  },
];

const IconBubble = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
    {children}
  </div>
);

const LegalTerms = () => {
  return (
    <section id="marco-legal" className="py-20 px-4 bg-card">
      <div className="container">
        {/* Header */}
        <div className="text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Marco legal y reglas del servicio
          </p>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-card-foreground">
            Términos de contratación y soporte (SLA)
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            Resumen claro para clientes. Estos términos se consideran aceptados al abonar el setup o la primera cuota.
          </p>
        </div>

        {/* Quick summary cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Card className="border-border/60">
            <CardContent className="p-7">
              <div className="flex items-start gap-4">
                <IconBubble>
                  <FileLock2 className="h-5 w-5" />
                </IconBubble>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-card-foreground">
                    Propiedad y licencia
                  </h3>
                  <p className="mt-2 text-card-foreground/80">
                    El servicio se brinda bajo modalidad <strong>SaaS</strong>: el cliente tiene licencia de uso mientras mantenga el abono al día.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardContent className="p-7">
              <div className="flex items-start gap-4">
                <IconBubble>
                  <CreditCard className="h-5 w-5" />
                </IconBubble>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-card-foreground">
                    Pagos y continuidad
                  </h3>
                  <p className="mt-2 text-card-foreground/80">
                    Abono mensual por adelantado. Mora prolongada implica suspensión automática y eventual baja definitiva.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardContent className="p-7">
              <div className="flex items-start gap-4">
                <IconBubble>
                  <LifeBuoy className="h-5 w-5" />
                </IconBubble>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-card-foreground">
                    Soporte con SLA
                  </h3>
                  <p className="mt-2 text-card-foreground/80">
                    Priorizamos incidentes críticos del sitio y gestionamos cambios por tickets, con tiempos de respuesta definidos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Accordion with the important terms */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-card-foreground">
                  Términos clave
                </h2>
              </div>

              <Accordion type="single" collapsible className="mt-5">
                <AccordionItem value="ip">
                  <AccordionTrigger>Propiedad intelectual y derechos de uso</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-card-foreground/80">
                      <li>
                        <strong>Propiedad del cliente:</strong> identidad de marca (nombre/logos), contenido provisto (fotos/textos/videos) y titularidad del dominio.
                      </li>
                      <li>
                        <strong>Propiedad de la agencia:</strong> código fuente, estructura tecnológica, integraciones, automatizaciones y diseño UI/UX desarrollados.
                      </li>
                      <li>
                        <strong>Licencia de uso (SaaS):</strong> el sitio se utiliza mientras el abono mensual esté al día.
                      </li>
                      <li>
                        <strong>Restricción:</strong> no se entrega el código fuente ni se migran archivos/proyectos a hosting externo; no existe opción de “compra del código”.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="billing">
                  <AccordionTrigger>Pagos, facturación y ajustes</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-card-foreground/80">
                      <li>
                        <strong>Ciclo:</strong> el abono se paga <strong>mensual por adelantado</strong> (del día 1 al 10).
                      </li>
                      <li>
                        <strong>Ajustes:</strong> el abono puede ajustarse <strong>trimestralmente</strong> (ej. IPC/mercado), notificando con <strong>15 días</strong>.
                      </li>
                      <li>
                        <strong>Suspensión por mora:</strong> si al día 15 no se registra el pago, el sitio puede mostrarse como “Mantenimiento Administrativo”.
                      </li>
                      <li>
                        <strong>Reactivación:</strong> pago del mes adeudado + costo administrativo de reconexión.
                      </li>
                      <li>
                        <strong>Baja definitiva:</strong> pasado un período prolongado de impago, se procede a la baja y eliminación de datos de servidores.
                      </li>
                    </ul>
                    <div className="mt-4 rounded-lg border border-border/60 bg-background p-4">
                      <p className="text-sm text-muted-foreground">
                        Nota: estas reglas buscan garantizar continuidad del servicio, calidad de infraestructura y previsibilidad operativa.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="exclusions">
                  <AccordionTrigger>Exclusiones (se cotiza aparte)</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-card-foreground/80">
                      <li>
                        El abono cubre <strong>mantenimiento de lo existente</strong>. Cualquier desarrollo nuevo se cotiza por separado.
                      </li>
                      <li>
                        No incluye: <strong>rediseños estructurales</strong>, nuevas páginas internas, carrito de compra, campañas publicitarias (Google Ads) ni redacción de artículos SEO.
                      </li>
                      <li>
                        No incluye soporte externo: hardware, internet del local, impresoras, o recuperación de contraseñas de redes sociales personales.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* SLA + Fair Use */}
          <Card className="border-border/60">
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-card-foreground">
                  Soporte y SLA
                </h2>
              </div>

              <div className="mt-5 space-y-4 text-card-foreground/80">
                <p>
                  El soporte es <strong>asincrónico y escalable</strong>. El alcance se limita a infraestructura, disponibilidad y contenido del sitio provisto.
                </p>

                <div className="rounded-xl border border-border/60 overflow-hidden">
                  <div className="grid grid-cols-12 bg-background px-4 py-3 text-xs font-medium text-muted-foreground">
                    <div className="col-span-2">Nivel</div>
                    <div className="col-span-5">Definición</div>
                    <div className="col-span-3">Respuesta</div>
                    <div className="col-span-2">Canal</div>
                  </div>
                  {sla.map((row) => (
                    <div
                      key={row.level}
                      className="grid grid-cols-12 gap-2 border-t border-border/60 px-4 py-3 text-sm"
                    >
                      <div className="col-span-2">
                        <Badge
                          variant="secondary"
                          className={
                            row.level === "P1"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : row.level === "P2"
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-muted text-muted-foreground border-border/60"
                          }
                        >
                          {row.level}
                        </Badge>
                      </div>
                      <div className="col-span-5">
                        <p className="font-medium text-card-foreground">{row.label}</p>
                        <p className="text-muted-foreground">{row.definition}</p>
                      </div>
                      <div className="col-span-3 text-card-foreground">{row.response}</div>
                      <div className="col-span-2 text-muted-foreground">{row.channel}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-border/60 bg-background p-5">
                  <div className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-card-foreground">Fair Use (cupo de cambios)</p>
                      <ul className="mt-2 space-y-2 text-card-foreground/80">
                        <li>
                          Incluye <strong>1 (una) solicitud de cambios por mes</strong> (puede agrupar varios cambios si se envían en un solo pedido).
                        </li>
                        <li>
                          Si necesitás más cambios en el mismo mes: se agenda al mes siguiente (sin cargo) o se cotiza un <strong>pack adicional</strong>.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-border/60 bg-background p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-card-foreground">Canales y circuito de soporte</p>
                      <ul className="mt-2 space-y-2 text-card-foreground/80">
                        <li>
                          Las solicitudes de cambio (P2) ingresan por <strong>Formulario/Portal de Soporte</strong>.
                        </li>
                        <li>
                          Urgencias (P1) se atienden por WhatsApp con la keyword <strong>“URGENCIA”</strong>.
                        </li>
                        <li>
                          El proceso: recepción → clasificación → ejecución → notificación de cierre.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Este resumen no reemplaza el documento completo; funciona como guía rápida para clientes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optional: client-friendly footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Tenés dudas sobre alcance, cambios o soporte? Pedinos aclaraciones antes de confirmar el alta.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegalTerms;
