// src/components/Header.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Importa useLocation

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para saber en qué página estamos

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función de desplazamiento suave con JavaScript
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 90; // Altura aproximada de tu header en px. ¡Ajusta si es necesario!
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Manejador de clics para los enlaces de navegación
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setIsMenuOpen(false); // Cierra el menú móvil en cualquier caso
    if (location.pathname === '/') {
      // Si ya estamos en la página de inicio, usamos el scroll de JS
      e.preventDefault();
      scrollToSection(sectionId);
    }
    // Si estamos en otra página (ej. /pricing), no hacemos preventDefault().
    // Dejamos que el componente <Link> nos lleve a la página de inicio y
    // el navegador se encargará del ancla.
  };

  const handleGetStartedClick = () => {
    setIsMenuOpen(false);
    navigate('/get-started');
  };

  const linkClasses = "text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors font-medium cursor-pointer";
  const mobileLinkClasses = `block py-3 text-center text-lg ${linkClasses}`;
  const buttonClasses = "bg-[#1C7ED6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#155CB0] transition-all duration-300";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolling ? "bg-[#F1F3F5]/80 backdrop-blur-md border-b border-slate-200 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" aria-label="Go to homepage">
            <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1749155603/Recurso_14_wwxduv.svg" alt="ElevAIte Labs Logo" className="h-8 w-auto"/>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/#before-after" className={linkClasses} onClick={(e) => handleNavClick(e, 'before-after')}>Features</Link>
          <Link to="/pricing" className={linkClasses}>Plans</Link>
          <Link to="/#integrations" className={linkClasses} onClick={(e) => handleNavClick(e, 'integrations')}>Integrations</Link>
          <Link to="/#contact" className={linkClasses} onClick={(e) => handleNavClick(e, 'contact')}>Contact</Link>
          <button onClick={handleGetStartedClick} className={buttonClasses}>
            Get Started
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="text-[#0D1B2A]" size={28} /> : <Menu className="text-[#0D1B2A]" size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#F1F3F5] border-t border-slate-300 shadow-lg"
          >
            <nav className="px-4 py-6 space-y-4">
              <Link to="/#before-after" onClick={(e) => handleNavClick(e, 'before-after')} className={mobileLinkClasses}>Features</Link>
              <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Plans</Link>
              <Link to="/#integrations" onClick={(e) => handleNavClick(e, 'integrations')} className={mobileLinkClasses}>Integrations</Link>
              <Link to="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className={mobileLinkClasses}>Contact</Link>
              <button onClick={handleGetStartedClick} className={`w-full mt-4 py-3 ${buttonClasses}`}>
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;