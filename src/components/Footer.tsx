const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-primary-foreground">Fábrica Digital</h3>
            <p className="text-primary-foreground/60 text-sm mt-1">
              Tu negocio merece verse profesional.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Política de Privacidad
            </a>
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
