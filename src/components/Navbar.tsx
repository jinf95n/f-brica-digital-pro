import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { trackStandardEvent } from "@/lib/metaPixel";

const WHATSAPP_LINK = "https://wa.me/5493517311760?text=Hola!%20Quiero%20mi%20sitio%20web";

const links = [
  { label: "El Problema", href: "#problema" },
  { label: "Solución", href: "#solucion" },
  { label: "Demos", href: "#demos" },
  { label: "Precios", href: "#cotizador" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  /**
   * Botón "Contactar" de la Navbar (WhatsApp).
   * → Contact: el usuario inicia contacto desde la barra de navegación.
   */
  const handleContactClick = (placement: 'navbar_desktop' | 'navbar_mobile') => {
    trackStandardEvent('Contact', {
      button_name: 'contactar_navbar',
      placement,
      whatsapp_number: '5493517311760',
      source_component: 'Navbar',
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Fábrica Digital" className="h-9 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleContactClick('navbar_desktop')}
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 pb-4 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleContactClick('navbar_mobile')}
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;