// src/components/Header.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // BrainCircuit no se usaba en el return, lo quité

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // scrollToPlans no se usa directamente en los enlaces del menú, puedes eliminarla o implementarla si es necesario.
  // const scrollToPlans = () => { ... }; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = "text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors";
  const mobileLinkClasses = `block py-2 ${linkClasses}`;
  
  // Opción 1: Botón "Get Started" con el cian original (var(--accent-old))
  // const buttonClasses = "bg-[#5CE1E6] text-[#0D1B2A] px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-80 transition-all duration-300";
  // Opción 2: Botón "Get Started" con el nuevo azul de acento
  const buttonClasses = "bg-[#1C7ED6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#1565C0] transition-all duration-300";


  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolling 
        ? "bg-[#F1F3F5]/80 backdrop-blur-md border-b border-slate-300 shadow-sm" 
        : "bg-transparent" // O bg-[#F1F3F5] si quieres que siempre tenga fondo
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
            <img
             src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1748199184/Recurso_1_ryyyrz.svg" // Asumo que este logo funciona bien en fondo claro
             alt="ElevAIte Labs Logo"
             className="h-8 w-auto" // Podrías necesitar un logo diferente para tema claro si este no contrasta bien
             />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <a href="#features" className={linkClasses}>Features</a>
          <a href="#subscription-plans" className={linkClasses}>Plans</a>
          <a href="#testimonials" className={linkClasses}>Testimonials</a>
          <a href="#contact" className={linkClasses}>Contact</a>
          <button
            onClick={() => window.location.href = "/get-started"}
            className={buttonClasses}
          >
            Get Started
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen 
              ? <X className="text-[#0D1B2A]" size={28} /> 
              : <Menu className="text-[#0D1B2A]" size={28} />}
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
            className="md:hidden bg-[#F1F3F5] border-t border-slate-300 shadow-lg" // Fondo claro para el menú móvil
          >
            <nav className="px-4 py-6 space-y-4">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Features</a>
              <a href="#subscription-plans" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Plans</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Testimonials</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Contact</a>
              <button
                  onClick={() => { window.location.href = "/get-started"; setIsMenuOpen(false); }}
                  className={`w-full mt-2 ${buttonClasses}`}
              >
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