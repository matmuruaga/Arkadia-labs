// src/components/Header.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { trackNavigationClick, trackCtaClick, trackLoginClick, trackMobileMenuToggle } from '@/utils/dataLayer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Detectar si estamos en una página con hero oscuro
  const isDarkHeroPage = () => {
    const path = window.location.pathname;
    return path.includes('/integrations') ||
           path.includes('/contact') ||
           path.includes('/get-started');
  };

  const [hasDarkHero] = useState(isDarkHeroPage());

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleGetStartedClick = () => {
    trackCtaClick('get_started', 'header', t('header.getStarted'));
    setIsMenuOpen(false);
    navigate(`/${i18n.language}/contact`);
  };

  const handleMobileMenuToggle = () => {
    const newState = !isMenuOpen;
    trackMobileMenuToggle(newState ? 'open' : 'close');
    setIsMenuOpen(newState);
  };

  const handleNavigationClick = (linkName: string, destination: string) => {
    trackNavigationClick(linkName, destination);
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    trackLoginClick('header');
  };

  const linkClasses = "text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors font-medium cursor-pointer";
  const mobileLinkClasses = `block py-3 text-center text-lg ${linkClasses}`;
  
  const primaryButtonClasses = "bg-[#1C7ED6] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#155CB0] transition-all duration-300";
  const secondaryButtonClasses = "border border-[#1C7ED6] text-[#1C7ED6] px-6 py-2.5 rounded-full font-semibold hover:bg-[#1C7ED6]/10 transition-all duration-300";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      hasDarkHero || scrolling ? "" : "bg-transparent"
    }`}>
      {/* SVG Filter for liquid glass distortion effect */}
      <svg className="absolute" width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="liquid-glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
            {/* Turbulence for noise/distortion */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="2"
              result="turbulence"
            />
            {/* Displacement map for distortion effect */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />
            {/* Slight blur to smooth the distortion */}
            <feGaussianBlur in="displacement" stdDeviation="0.5" result="blur" />
            {/* Composite back with original for subtle effect */}
            <feComposite in="blur" in2="SourceGraphic" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* --- DESKTOP: Cápsula completa con logo + navegación --- */}
        <div className={`hidden md:flex items-center justify-between glass-nav-pill rounded-full px-6 py-3 ${
          scrolling ? 'scrolled' : ''
        }`}>
          <Link to={`/${i18n.language}`} aria-label="Go to homepage">
              <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg" alt="Arkadia Labs Logo" className="h-8 w-auto"/>
          </Link>

          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link
              to={`/${i18n.language}/#before-after`}
              className={linkClasses}
              onClick={() => handleNavigationClick(t('header.features'), `/${i18n.language}/#before-after`)}
            >
              {t('header.features')}
            </Link>
            <Link
              to={`/${i18n.language}/#integrations`}
              className={linkClasses}
              onClick={() => handleNavigationClick(t('header.integrations'), `/${i18n.language}/#integrations`)}
            >
              {t('header.integrations')}
            </Link>

            {/* --- ENLACE AÑADIDO --- */}
            <Link
              to={`/${i18n.language}/case-studies`}
              className={linkClasses}
              onClick={() => handleNavigationClick(t('header.studyCase'), `/${i18n.language}/case-studies`)}
            >
              {t('header.studyCase')}
            </Link>

            <div className="flex items-center gap-2">
              <button onClick={handleGetStartedClick} className={primaryButtonClasses}>
                {t('header.getStarted')}
              </button>
              <a
                href="https://app.arkadialabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryButtonClasses}
                onClick={handleLoginClick}
              >
                {t('header.login')}
              </a>
            </div>

            <LanguageSwitcher />
          </nav>
        </div>

        {/* --- MOBILE: Solo visible cuando el menú está cerrado --- */}
        {!isMenuOpen && (
          <div className={`md:hidden flex justify-between items-center glass-nav-pill rounded-full px-6 py-3 ${
            scrolling ? 'scrolled' : ''
          }`}>
            <Link to={`/${i18n.language}`} aria-label="Go to homepage">
                <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg" alt="Arkadia Labs Logo" className="h-8 w-auto"/>
            </Link>

            <button onClick={handleMobileMenuToggle} aria-label="Toggle menu">
              <Menu className="text-[#0D1B2A]" size={28} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="md:hidden px-4"
          >
            {/* Menú glass completo con logo, navegación y botón cerrar */}
            <nav className="glass-nav-pill rounded-[2rem] px-6 py-6">
              {/* Header del menú con logo y X */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/20">
                <Link to={`/${i18n.language}`} aria-label="Go to homepage" onClick={() => setIsMenuOpen(false)}>
                    <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg" alt="Arkadia Labs Logo" className="h-8 w-auto"/>
                </Link>
                <button onClick={handleMobileMenuToggle} aria-label="Close menu">
                  <X className="text-[#0D1B2A]" size={28} />
                </button>
              </div>

              {/* Contenido del menú */}
              <div className="flex flex-col space-y-4">
                <Link
                  to={`/${i18n.language}/#before-after`}
                  onClick={() => handleNavigationClick(t('header.features'), `/${i18n.language}/#before-after`)}
                  className={mobileLinkClasses}
                >
                  {t('header.features')}
                </Link>
                <Link
                  to={`/${i18n.language}/#integrations`}
                  onClick={() => handleNavigationClick(t('header.integrations'), `/${i18n.language}/#integrations`)}
                  className={mobileLinkClasses}
                >
                  {t('header.integrations')}
                </Link>

                {/* --- ENLACE AÑADIDO (MÓVIL) --- */}
                <Link
                  to={`/${i18n.language}/case-studies`}
                  onClick={() => handleNavigationClick(t('header.studyCase'), `/${i18n.language}/case-studies`)}
                  className={mobileLinkClasses}
                >
                  {t('header.studyCase')}
                </Link>

                <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col space-y-3">
                  <button onClick={handleGetStartedClick} className={`w-full py-3 ${primaryButtonClasses}`}>
                      {t('header.getStarted')}
                  </button>
                  <a
                    href="https://app.arkadialabs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center py-3 ${secondaryButtonClasses}`}
                    onClick={() => {
                      handleLoginClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    {t('header.login')}
                  </a>
                </div>

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