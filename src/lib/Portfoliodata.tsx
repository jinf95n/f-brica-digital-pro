export type CategoryKey =
  | "all"
  | "construction"
  | "home_outdoor"
  | "legal_finance"
  | "health"
  | "wellness"
  | "beauty"
  | "education"
  | "events"
  | "food"
  | "retail"
  | "services"
  | "industrial"
  | "automotive"
  | "real_estate"
  | "corporate"
  | "personal_brand";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  all: "Todas",
  construction: "Construcción e Ingeniería",
  home_outdoor: "Hogar, Piscinas y Outdoor",
  legal_finance: "Legal, Contable y Finanzas",
  health: "Salud y Medicina",
  wellness: "Bienestar y Terapias",
  beauty: "Belleza y Estética",
  education: "Educación y Formación",
  events: "Eventos y Organización",
  food: "Gastronomía",
  retail: "Comercio y Tiendas",
  services: "Servicios Profesionales",
  industrial: "Industria y Técnicos",
  automotive: "Automotor y Transporte",
  real_estate: "Inmobiliaria y Desarrollos",
  corporate: "Empresas y Corporativo",
  personal_brand: "Marca Personal y Portfolio",
};

export type DemoItem = {
  title: string;
  categoryKey: Exclude<CategoryKey, "all">;
  href: string;
  cover: string;
  tags?: string[];
  summary?: string;
};

export const demos: DemoItem[] = [
  {
    title: "Steel Frame — Landing Premium",
    categoryKey: "construction",
    href: "https://steel-frame-builders.vercel.app/",
    cover: "src/assets/demos/steel.png",
    tags: ["Alta conversión", "WhatsApp"],
    summary: "Comparativa, garantías y CTA directo.",
  },
  {
    title: "Construcciones",
    categoryKey: "construction",
    href: "https://mcmconstrucciones.vercel.app/",
    cover: "src/assets/demos/ojeda.png",
    tags: ["Llave en mano", "Formulario"],
    summary: "Servicios, proceso y calificador de lead.",
  },
  {
    title: "Idiomas — Aprende Italiano",
    categoryKey: "education",
    href: "https://academia-idiomas-mcm.vercel.app/",
    cover: "src/assets/demos/italiano.png",
    tags: ["Idioma", "Confianza"],
    summary: "Hablá italiano desde la primera clase.",
  },
  {
    title: "Portfolio — CV Digital",
    categoryKey: "personal_brand",
    href: "https://juannaveda.vercel.app/",
    cover: "src/assets/demos/portfolioji.png",
    tags: ["CV", "Portfolio"],
    summary: "Soluciones técnicas, prolijas y medibles.",
  },
  {
    title: "Yanina Sarmiento Estética",
    categoryKey: "beauty",
    href: "https://yaninasarmiento.com.ar/",
    cover: "src/assets/demos/yanina.png",
    tags: ["Estética", "Belleza", "Agenda"],
    summary: "Estudio profesional de estética y tratamientos.",
  },
  {
    title: "Tecno Flores",
    categoryKey: "retail",
    href: "https://tecno-flores.vercel.app/",
    cover: "src/assets/demos/tecno.png",
    tags: ["Tecnología", "Servicios", "Flores"],
    summary: "Servicio técnico especializado para floristerías.",
  },
  {
    title: "Facu Montiel DJ",
    categoryKey: "events",
    href: "https://facu-montiel-demomcm.vercel.app/",
    cover: "src/assets/demos/dj.png",
    tags: ["DJ", "Eventos", "Música"],
    summary: "Productor y DJ para fiestas y eventos.",
  },
  {
    title: "I Love Courier",
    categoryKey: "services",
    href: "https://ilovecourier-demo-mcm.vercel.app/",
    cover: "src/assets/demos/courier.png",
    tags: ["Courier", "Logística", "Exportación"],
    summary: "Servicio de courier y comercio exterior.",
  },
  {
    title: "Constantine Ceremonias",
    categoryKey: "events",
    href: "https://constantine-demomcm.vercel.app/",
    cover: "src/assets/demos/ceremonias.png",
    tags: ["Ceremonias", "Bodas", "Laicas"],
    summary: "Oficiante profesional de ceremonias elegantes.",
  },
  {
    title: "WAN FIX Transporte",
    categoryKey: "automotive",
    href: "https://wanfix-demo-mcm.vercel.app/",
    cover: "src/assets/demos/wanfix.png",
    tags: ["Transporte", "Logística", "Mendoza"],
    summary: "Transporte confiable y profesional en Mendoza.",
  },
  {
    title: "Box Security",
    categoryKey: "services",
    href: "https://boxsecurity-demo-mcm.vercel.app/",
    cover: "src/assets/demos/box.png",
    tags: ["Seguridad", "Alarmas", "Monitoreo"],
    summary: "Protección total para tu hogar y negocio.",
  },
  {
    title: "El Descubridor Vinoteca",
    categoryKey: "food",
    href: "https://el-descubridor-vinoteca.vercel.app/",
    cover: "src/assets/demos/vinoteca.png",
    tags: ["Vinos", "Gastronomía", "Premium"],
    summary: "Vinoteca de autor con selección exclusiva.",
  },
  {
    title: "VISAM Salud Mental",
    categoryKey: "health",
    href: "https://demo-visam.vercel.app/",
    cover: "src/assets/demos/clinica.png",
    tags: ["Salud Mental", "Terapias", "Bienestar"],
    summary: "Espacio dedicado a tu salud mental.",
  },
  {
    title: "Meta Steel",
    categoryKey: "construction",
    href: "https://constructorametal-demomcm.vercel.app/",
    cover: "src/assets/demos/metal.png",
    tags: ["Construcción", "Desarrollos", "Steel Frame"],
    summary: "Constructora desarrollista premium en Córdoba.",
  },
  {
    title: "Carlos Mansilla",
    categoryKey: "personal_brand",
    href: "https://carlosmansilla.com.ar/",
    cover: "src/assets/demos/cm.png",
    tags: ["Growth Manager", "Project Manager", "Portfolio"],
    summary: "Growth & Project Manager profesional.",
  },
  {
    title: "MYC Steel Solutions",
    categoryKey: "construction",
    href: "https://myc-steel-solutions.vercel.app/",
    cover: "src/assets/demos/steel-metal.png",
    tags: ["Steel Frame", "Construcción", "Ingeniería"],
    summary: "Soluciones integrales en steel frame.",
  },
];