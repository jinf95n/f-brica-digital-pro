import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Fábrica Digital" className="h-10 w-auto" />
            <div>
              <p className="text-primary-foreground/60 text-sm">
                Tu negocio merece verse profesional.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            <Link to="/terminos" className="hover:text-primary-foreground transition-colors">
              Términos y Condiciones
            </Link>
            <Link to="/privacidad" className="hover:text-primary-foreground transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Fábrica Digital. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
