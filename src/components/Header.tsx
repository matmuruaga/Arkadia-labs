// src/components/Header.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleGetStartedClick = () => {
    setIsMenuOpen(false);
    navigate(`/${i18n.language}/get-started`);
  };

  const linkClasses = "text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors font-medium cursor-pointer";
  const mobileLinkClasses = `block py-3 text-center text-lg ${linkClasses}`;
  
  // Estilos de los botones
  const primaryButtonClasses = "bg-[#1C7ED6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#155CB0] transition-all duration-300";
  // --- 1. NUEVO ESTILO PARA EL BOTÓN SECUNDARIO (LOGIN) ---
  const secondaryButtonClasses = "border border-[#1C7ED6] text-[#1C7ED6] px-6 py-2.5 rounded-full font-semibold hover:bg-[#1C7ED6]/10 transition-all duration-300";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolling ? "bg-[#F1F3F5]/80 backdrop-blur-md border-b border-slate-200 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to={`/${i18n.language}`} aria-label="Go to homepage">
            <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1749155603/Recurso_14_wwxduv.svg" alt="ElevAIte Labs Logo" className="h-8 w-auto"/>
        </Link>

        {/* --- 2. CAMBIOS EN EL MENÚ DE ESCRITORIO --- */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link to={`/${i18n.language}/#before-after`} className={linkClasses}>{t('header.features')}</Link>
          <Link to={`/${i18n.language}/#integrations`} className={linkClasses}>{t('header.integrations')}</Link>
          <Link to={`/${i18n.language}/#testimonials`} className={linkClasses}>{t('header.contact')}</Link>
          
          <div className="flex items-center gap-2">
            <button onClick={handleGetStartedClick} className={primaryButtonClasses}>
              {t('header.getStarted')}
            </button>
            <a
              href="https://app.elevaitelabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryButtonClasses} // <-- Estilo nuevo aplicado
            >
              {t('header.login')}
            </a>
          </div>

          <LanguageSwitcher />
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="text-[#0D1B2A]" size={28} /> : <Menu className="text-[#0D1B2A]" size={28} />}
          </button>
        </div>
      </div>

      {/* --- 3. CAMBIOS EN EL MENÚ MÓVIL --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="md:hidden bg-[#F1F3F5] border-t border-slate-300 shadow-lg"
          >
            <nav className="px-4 py-6">
              <div className="flex flex-col space-y-4">
                {/* Enlaces de Navegación */}
                <Link to={`/${i18n.language}/#before-after`} onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>{t('header.features')}</Link>
                <Link to={`/${i18n.language}/#integrations`} onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>{t('header.integrations')}</Link>
                <Link to={`/${i18n.language}/#testimonials`} onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>{t('header.contact')}</Link>

                {/* Contenedor para los botones de acción */}
                <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col space-y-3">
                  <button onClick={handleGetStartedClick} className={`w-full py-3 ${primaryButtonClasses}`}>
                      {t('header.getStarted')}
                  </button>
                  <a
                    href="https://app.elevaitelabs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-3 ${secondaryButtonClasses}`} // <-- Estilo nuevo aplicado
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('header.login')}
                  </a>
                </div>

                {/* Contenedor para el selector de idioma */}
                <div className="flex justify-center pt-4 mt-4 border-t border-slate-200">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;