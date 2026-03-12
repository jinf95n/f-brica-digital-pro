import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
  MessageCircle,
  Target,
  Users,
  Sparkles,
  Calendar,
  Building2,
  AlertCircle,
  Globe,
  MapPin,
  Image,
  Calculator,
  ShoppingBag,
  Clock,
  Mail,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const WHATSAPP_NUMBER = "5493517311760";
const LANDING24_PRICE = 250000;

interface LandingType {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  examples: string;
  isLanding24: boolean;
}

interface AdditionalFeature {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

const landingTypes: LandingType[] = [
  {
    id: "services",
    name: "Vender Servicios",
    description: "Para profesionales y consultores",
    icon: Target,
    examples: "Abogados, médicos, coaches, agencias",
    isLanding24: true,
  },
  {
    id: "leads",
    name: "Captar Clientes",
    description: "Generación de leads y contactos",
    icon: Users,
    examples: "Formularios, descargas, registros",
    isLanding24: true,
  },
  {
    id: "products",
    name: "Mostrar Productos",
    description: "Catálogo visual de productos",
    icon: Sparkles,
    examples: "Portfolio, galería, catálogo simple",
    isLanding24: true,
  },
  {
    id: "event",
    name: "Evento/Lanzamiento",
    description: "Promocionar eventos o lanzamientos",
    icon: Calendar,
    examples: "Webinars, cursos, lanzamientos",
    isLanding24: true,
  },
  {
    id: "corporate",
    name: "Página Corporativa",
    description: "Información institucional",
    icon: Building2,
    examples: "Empresa, quiénes somos, contacto",
    isLanding24: true,
  },
  {
    id: "custom",
    name: "Otro Proyecto",
    description: "E-commerce, multi-página, sistemas",
    icon: Globe,
    examples: "Tiendas online, sitios complejos, plataformas",
    isLanding24: false,
  },
];

const additionalFeatures: AdditionalFeature[] = [
  {
    id: "multilanguage",
    name: "Multi-idioma",
    description: "Selector de español/inglés",
    icon: Globe,
  },
  {
    id: "maps",
    name: "Mapa Interactivo",
    description: "Google Maps embebido",
    icon: MapPin,
  },
  {
    id: "gallery",
    name: "Galería/Portfolio",
    description: "Showcase de trabajos",
    icon: Image,
  },
  {
    id: "calculator",
    name: "Cotizador",
    description: "Calculadora personalizada",
    icon: Calculator,
  },
  {
    id: "whatsapp-order",
    name: "Pedidos a WhatsApp",
    description: "Carrito simple → WhatsApp",
    icon: ShoppingBag,
  },
  {
    id: "calendar",
    name: "Calendario/Agenda",
    description: "Sistema de reservas básico",
    icon: Clock,
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Captura de emails",
    icon: Mail,
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Métricas visuales",
    icon: BarChart3,
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [managementPlan, setManagementPlan] = useState<
    "none" | "monthly" | "annual" | null
  >(null);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "installments">(
    "installments",
  );

  const isLanding24 =
    landingTypes.find((t) => t.id === selectedType)?.isLanding24 || false;

  const managementPriceMonthly = 25000;
  const managementPriceAnnual = managementPriceMonthly * 12 - 50000; // 2 meses gratis

  const goToStep = (newStep: number) => {
    setStep(newStep);
    document
      .getElementById("cotizador")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  const getWhatsAppMessage = () => {
    const type = landingTypes.find((t) => t.id === selectedType);

    if (!isLanding24) {
      return encodeURIComponent(
        `¡Hola! Completé el cotizador\n\n` +
          `📊 Necesito presupuesto para:\n` +
          `• Tipo: ${type?.name}\n` +
          `• Es un proyecto personalizado\n\n` +
          `¿Podemos agendar una llamada?`,
      );
    }

    const features = selectedFeatures
      .map((id) => additionalFeatures.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const managementText =
      managementPlan === "annual"
        ? "Plan Anual (2 meses gratis)"
        : managementPlan === "monthly"
          ? "Plan Mensual"
          : "No";

    let totalInvestment = LANDING24_PRICE;
    if (managementPlan === "annual") totalInvestment += managementPriceAnnual;
    if (managementPlan === "monthly") totalInvestment += managementPriceMonthly;

    return encodeURIComponent(
      `¡Hola! Completé el cotizador de Landing24\n\n` +
        `📊 Mi presupuesto:\n` +
        `• Tipo: ${type?.name}\n` +
        `• Features extra: ${features || "Solo lo básico"}\n` +
        `• Gestión técnica: ${managementText}\n` +
        `• Pago desarrollo: ${paymentMethod === "full" ? "Único" : "Financiado ($150k + $100k)"}\n` +
        `• Inversión desarrollo: $${LANDING24_PRICE.toLocaleString("es-AR")}\n` +
        (managementPlan !== "none"
          ? `• Gestión: $${(managementPlan === "annual" ? managementPriceAnnual : managementPriceMonthly).toLocaleString("es-AR")}\n`
          : "") +
        `\nQuiero arrancar!`,
    );
  };

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                ¿Cuál es tu objetivo?
              </h3>
              <p className="text-muted-foreground">
                Seleccioná el tipo que mejor se adapte a tu necesidad
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {landingTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;

                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTypeSelection(type.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all relative ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    {type.isLanding24 && (
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        24HS
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">
                          {type.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {type.description}
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          {type.examples}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={() => (isLanding24 ? goToStep(2) : goToStep(5))}
              disabled={!selectedType}
              className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                ¿Necesitás funcionalidades extra?
              </h3>
              <p className="text-muted-foreground">
                Seleccioná todo lo que necesites (opcional)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {additionalFeatures.map((feature) => {
                const Icon = feature.icon;
                const isSelected = selectedFeatures.includes(feature.id);

                return (
                  <motion.button
                    key={feature.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border hover:border-primary/30 bg-card"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-sm text-foreground mb-1">
                      {feature.name}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-primary mx-auto mt-2" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">
                💡 <strong className="text-foreground">Importante:</strong> 💡
                Estas opciones son orientativas para conocer tu proyecto. El
                alcance final lo armamos juntos a medida que trabajamos. Podés
                agregar o quitar lo que necesites..
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => goToStep(1)}
                className="flex-1 btn-outline py-4 text-lg font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>
              <button
                onClick={() => goToStep(3)}
                className="flex-1 btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2"
              >
                Siguiente
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
                ¿Querés delegar la gestión técnica?
              </h3>
              <p className="text-muted-foreground">
                Elegí cómo querés gestionar tu landing después de la entrega
              </p>
            </div>

            {/* Sin gestión — tarjeta advertencia */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setManagementPlan("none")}
              className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                managementPlan === "none"
                  ? "border-orange-400 bg-orange-500/10 shadow-md"
                  : "border-border bg-muted/50 hover:border-orange-300"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <h4 className="font-bold text-foreground">
                    Sin gestión (lo gestionás vos)
                  </h4>
                </div>
                {managementPlan === "none" && (
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4 ml-7">
                Te entregamos el sitio completo. Vos te encargás del hosting y mantenimiento técnico.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-muted-foreground mb-4 ml-7">
                <span className="flex items-start gap-1.5"><span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>Hosting a contratar con terceros</span>
                <span className="flex items-start gap-1.5"><span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>SSL y renovaciones a tu cargo</span>
                <span className="flex items-start gap-1.5"><span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>Backups y seguridad manuales</span>
                <span className="flex items-start gap-1.5"><span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>Cambios coordinados con un dev externo</span>
              </div>

              <div className="bg-orange-500/10 border border-orange-300/40 rounded-lg p-3 ml-7 flex items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    ⚠️ Costo estimado si lo hacés por tu cuenta:
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-foreground">~$50k+</span>
                    <span className="text-muted-foreground text-xs">/mes</span>
                  </div>
                  <p className="text-xs text-muted-foreground/70">Hosting + cambios + imprevistos</p>
                </div>
              </div>
            </motion.button>

            {/* Separador */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm font-semibold text-muted-foreground">O NOS ENCARGAMOS NOSOTROS</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Planes de servicio */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Plan Mensual */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setManagementPlan("monthly")}
                className={`p-6 rounded-2xl border-2 text-left transition-all h-full ${
                  managementPlan === "monthly"
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-foreground text-lg">Plan Mensual</h4>
                  {managementPlan === "monthly" && (
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-primary font-semibold mb-4">
                  Nos ocupamos de todo por vos
                </p>

                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Hosting premium incluido</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>SSL + backups automáticos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Seguridad y actualizaciones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Cambios mensuales incluidos</span>
                  </li>
                </ul>

                <div className="bg-card border border-border rounded-lg p-3 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-foreground">$25.OOO</span>
                    <span className="text-muted-foreground text-xs">/mes</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Desde el mes 2 • Sin permanencia
                  </p>
                </div>
              </motion.button>

              {/* Plan Anual */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setManagementPlan("annual")}
                className={`p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden h-full ${
                  managementPlan === "annual"
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border hover:border-primary/50 bg-card"
                }`}
              >
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  MÁS ELEGIDO
                </div>

                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-foreground text-lg">Plan Anual</h4>
                  {managementPlan === "annual" && (
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-primary font-semibold mb-4">
                  Nos ocupamos de todo por vos
                </p>

                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Todo del plan mensual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span><strong>2 meses gratis</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Precio congelado todo el año</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Atención premium</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Máximo ahorro</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3 mt-auto">
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-xs text-muted-foreground line-through">
                      ${(managementPriceMonthly * 12).toLocaleString("es-AR")}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-primary">
                      ${managementPriceAnnual.toLocaleString("es-AR")}
                    </span>
                    <span className="text-muted-foreground text-xs">/año</span>
                  </div>
                  <p className="text-xs font-semibold text-primary mt-1">
                    🎁 Ahorro $50.000 (2 meses gratis)
                  </p>
                </div>
              </motion.button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => goToStep(2)}
                className="flex-1 btn-outline py-4 text-lg font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>
              <button
                onClick={() => goToStep(4)}
                disabled={managementPlan === null}
                className="flex-1 btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        );

      case 4: {
        const developmentAmount = LANDING24_PRICE;
        const firstInstallment = 150000;
        const secondInstallment = 100000;

        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Resumen Dinámico */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-6 md:p-8 border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground">
                    Tu Landing24
                  </h3>
                  <p className="text-sm text-primary">
                    ⚡ Entrega en 24 horas hábiles
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Desarrollo */}
                <div className="bg-card rounded-xl p-5 border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-foreground">
                      Desarrollo Landing
                    </span>
                    <span className="text-2xl font-black text-foreground">
                      ${developmentAmount.toLocaleString("es-AR")}
                    </span>
                  </div>

                  {selectedFeatures.length > 0 && (
                    <div className="pt-3 border-t border-border mb-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        Incluye:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFeatures.map((featureId) => {
                          const feature = additionalFeatures.find(
                            (f) => f.id === featureId,
                          );
                          return (
                            <span
                              key={featureId}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                            >
                              {feature?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Forma de pago dinámica */}
                  <div className="space-y-2 pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Forma de pago:
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentMethod("full")}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          paymentMethod === "full"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-sm font-bold">Pago Único</span>
                          {paymentMethod === "full" && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className="text-lg font-black text-foreground">
                          ${developmentAmount.toLocaleString("es-AR")}
                        </span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("installments")}
                        className={`p-3 rounded-lg border-2 text-left transition-all relative ${
                          paymentMethod === "installments"
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          SIN INTERÉS
                        </div>
                        <div className="flex items-start justify-between mb-1">
                          <span className="text-sm font-bold">Financiado</span>
                          {paymentMethod === "installments" && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">
                            Hoy: ${firstInstallment.toLocaleString("es-AR")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            30 días: $
                            {secondInstallment.toLocaleString("es-AR")}
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cronograma de pagos */}
                <div className="bg-card rounded-xl p-5 border border-primary/20">
                  <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">
                    📅 Cronograma de pagos
                  </h4>

                  <div className="space-y-3">
                    {/* HOY */}
                    <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-primary uppercase mb-1">
                          Hoy
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {paymentMethod === "installments"
                            ? "Cuota 1 — Desarrollo"
                            : "Pago único — Desarrollo"}
                        </p>
                      </div>
                      <span className="text-2xl font-black text-foreground">
                        $
                        {(paymentMethod === "installments"
                          ? firstInstallment
                          : developmentAmount
                        ).toLocaleString("es-AR")}
                      </span>
                    </div>

                    {/* MES 2 */}
                    {(paymentMethod === "installments" ||
                      managementPlan !== "none") && (
                      <div className="bg-muted/60 rounded-lg p-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase mb-3">
                          Mes 2
                        </p>
                        <div className="space-y-2">
                          {paymentMethod === "installments" && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Cuota 2 — Desarrollo
                              </span>
                              <span className="font-semibold text-foreground">
                                ${secondInstallment.toLocaleString("es-AR")}
                              </span>
                            </div>
                          )}
                          {managementPlan === "annual" && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Plan Anual — Gestión técnica
                              </span>
                              <div className="text-right">
                                <span className="text-xs line-through text-muted-foreground/60 mr-1">
                                  $
                                  {(managementPriceMonthly * 12).toLocaleString(
                                    "es-AR",
                                  )}
                                </span>
                                <span className="font-semibold text-primary">
                                  $
                                  {managementPriceAnnual.toLocaleString(
                                    "es-AR",
                                  )}
                                </span>
                              </div>
                            </div>
                          )}
                          {managementPlan === "monthly" && (
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Gestión técnica mensual
                              </span>
                              <span className="font-semibold text-foreground">
                                $
                                {managementPriceMonthly.toLocaleString("es-AR")}
                                <span className="text-xs font-normal text-muted-foreground">
                                  /mes
                                </span>
                              </span>
                            </div>
                          )}
                          <div className="border-t border-border pt-2 flex justify-between font-bold text-sm">
                            <span>Total mes 2</span>
                            <span className="text-foreground">
                              $
                              {(
                                (paymentMethod === "installments"
                                  ? secondInstallment
                                  : 0) +
                                (managementPlan === "annual"
                                  ? managementPriceAnnual
                                  : managementPlan === "monthly"
                                    ? managementPriceMonthly
                                    : 0)
                              ).toLocaleString("es-AR")}
                              {managementPlan === "monthly" &&
                                paymentMethod === "full" && (
                                  <span className="text-xs font-normal text-muted-foreground">
                                    {" "}
                                    (y cada mes siguiente)
                                  </span>
                                )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Garantía */}
                    <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground">
                        <strong>Garantía total el 1er mes:</strong> trabajamos
                        hasta que quedes completamente conforme. Cambios y
                        ajustes ilimitados durante el primer mes.
                      </p>
                    </div>

                    {managementPlan === "annual" && (
                      <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-3">
                        <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-semibold text-primary">
                          2 meses gratis incluidos — Ahorro de $50.000 vs plan
                          mensual
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-surface-dark rounded-xl p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">
                      INVERSIÓN TOTAL
                    </span>
                    <div className="text-right">
                      <div className="text-4xl font-black text-primary">
                        $
                        {(
                          developmentAmount +
                          (managementPlan === "annual"
                            ? managementPriceAnnual
                            : 0)
                        ).toLocaleString("es-AR")}
                      </div>
                      <div className="text-xs text-white/50 mt-1">
                        {managementPlan === "none" && "Solo desarrollo"}
                        {managementPlan === "annual" &&
                          "Desarrollo + gestión 12 meses"}
                        {managementPlan === "monthly" &&
                          `Desarrollo + gestión desde mes 2`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Incluye */}
            <div className="bg-muted/50 rounded-2xl p-6">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Tu landing incluye:
              </h4>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Diseño profesional personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>100% responsive (mobile + desktop)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>WhatsApp integrado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Formularios de contacto</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>SEO optimizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Lista para publicar</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-6 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">
                ⏰ Oferta válida por
              </p>
              <p className="text-2xl font-black text-foreground mb-4">
                48 HORAS
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary py-5 text-xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all mb-3"
              >
                <MessageCircle className="w-6 h-6" />
                Confirmar por WhatsApp
              </a>
              <p className="text-xs text-muted-foreground">
                Sin compromiso • Te asesoramos personalmente
              </p>
            </div>

            <button
              onClick={() => goToStep(3)}
              className="w-full btn-outline py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
          </motion.div>
        );
      }

      case 5: {
        // Proyecto Custom
        const customType = landingTypes.find((t) => t.id === selectedType);
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-3xl p-8 border-2 border-blue-500/20 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-blue-500" />
              </div>

              <h3 className="text-2xl font-black text-foreground mb-3">
                Proyecto Personalizado
              </h3>

              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {customType?.name} requiere un análisis detallado para darte un
                presupuesto preciso.
              </p>

              <div className="bg-card rounded-xl p-6 mb-6 text-left max-w-lg mx-auto">
                <h4 className="font-bold text-foreground mb-4">
                  Para este tipo de proyecto necesitamos saber:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Alcance funcional específico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Integraciones necesarias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Volumen de productos/páginas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Pasarelas de pago (si aplica)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Diseño personalizado vs plantilla</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-xl p-5 mb-6 max-w-lg mx-auto">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tiempo estimado:</strong>{" "}
                  2-4 semanas
                  <br />
                  <strong className="text-foreground">Inversión:</strong> Desde
                  $350k según complejidad
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-md mx-auto btn-primary py-5 text-xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 mb-4"
              >
                <MessageCircle className="w-6 h-6" />
                Agendar Llamada
              </a>

              <p className="text-xs text-muted-foreground">
                Te contactamos en menos de 24hs para armar tu presupuesto
              </p>
            </div>

            <button
              onClick={() => goToStep(1)}
              className="w-full btn-outline py-3 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a opciones
            </button>
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-muted/50" id="cotizador" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Inversión
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">
            Cotizador Interactivo
          </h2>
          <p className="text-muted-foreground text-lg">
            Descubrí en minutos cuánto cuesta tu proyecto
          </p>
        </motion.div>

        {/* Progress Bar - Solo para Landing24 */}
        {isLanding24 && step !== 5 && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      s < step
                        ? "bg-accent text-accent-foreground"
                        : s === step
                          ? "bg-accent text-accent-foreground ring-4 ring-accent/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-1 w-12 md:w-20 transition-all ${
                        s < step ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-1">
              <span>Objetivo</span>
              <span className="hidden md:inline">Features</span>
              <span>Gestión</span>
              <span>Resumen</span>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
