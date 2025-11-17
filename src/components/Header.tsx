// src/components/Header.tsx
import { useEffect, useState, useCallback, useRef } from "react";
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

  // Ref for requestAnimationFrame throttling
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  // Detectar si estamos en una página con hero oscuro
  const isDarkHeroPage = () => {
    const path = window.location.pathname;
    return path.includes('/integrations') ||
           path.includes('/contact') ||
           path.includes('/get-started');
  };

  const [hasDarkHero] = useState(isDarkHeroPage());

  // Optimized scroll handler with requestAnimationFrame throttling
  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous frame if it exists
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update for next frame
      rafRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
          const isScrolled = currentScrollY > 10;
          setScrolling(isScrolled);
          lastScrollY.current = currentScrollY;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Memoized handlers to prevent recreation on every render
  const handleGetStartedClick = useCallback(() => {
    trackCtaClick('get_started', 'header', t('header.getStarted'));
    setIsMenuOpen(false);
    navigate(`/${i18n.language}/contact`);
  }, [navigate, i18n.language, t]);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      trackMobileMenuToggle(newState ? 'open' : 'close');
      return newState;
    });
  }, []);

  const handleNavigationClick = useCallback((linkName: string, destination: string) => {
    trackNavigationClick(linkName, destination);
    setIsMenuOpen(false);
  }, []);

  const handleLoginClick = useCallback(() => {
    trackLoginClick('header');
  }, []);

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
              <button
                onClick={handleGetStartedClick}
                className="relative bg-[#1C7ED6] text-white hover:bg-[#155CB0] h-[42px] px-6 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden
                  shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.4),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.4),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.3),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.3),inset_0_0_6px_6px_rgba(255,255,255,0.08)]
                  hover:shadow-[0_0_8px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.5),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.5),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.4),inset_0_0_8px_8px_rgba(255,255,255,0.1)]"
              >
                <span className="relative z-10">{t('header.getStarted')}</span>
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

        {/* --- MOBILE: Navbar con expansión tipo acordeón --- */}
        <div className="md:hidden">
          <motion.div
            className={`glass-nav-pill px-6 py-3 ${scrolling ? 'scrolled' : ''}`}
            style={{
              borderRadius: "1.5rem",
              overflow: isMenuOpen ? "visible" : "hidden"
            }}
          >
            {/* Header siempre visible */}
            <div className="flex justify-between items-center">
              <Link to={`/${i18n.language}`} aria-label="Go to homepage">
                <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg" alt="Arkadia Labs Logo" className="h-8 w-auto"/>
              </Link>

              <button onClick={handleMobileMenuToggle} aria-label="Toggle menu">
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMenuOpen ? (
                    <X className="text-[#0D1B2A]" size={28} />
                  ) : (
                    <Menu className="text-[#0D1B2A]" size={28} />
                  )}
                </motion.div>
              </button>
            </div>

            {/* Menú expandible con animación de altura */}
            <motion.div
              initial={false}
              animate={{
                height: isMenuOpen ? "auto" : 0,
                opacity: isMenuOpen ? 1 : 0
              }}
              transition={{
                height: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              style={{ overflow: "hidden" }}
            >
              <div className="pt-6 pb-2">
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

                  <Link
                    to={`/${i18n.language}/case-studies`}
                    onClick={() => handleNavigationClick(t('header.studyCase'), `/${i18n.language}/case-studies`)}
                    className={mobileLinkClasses}
                  >
                    {t('header.studyCase')}
                  </Link>

                  <div className="pt-4 mt-4 border-t border-slate-200 flex flex-col space-y-3">
                    <button
                      onClick={handleGetStartedClick}
                      className="relative w-full bg-[#1C7ED6] text-white hover:bg-[#155CB0] h-[48px] rounded-full font-semibold transition-all duration-300 overflow-hidden
                        shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.4),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.4),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.3),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.3),inset_0_0_6px_6px_rgba(255,255,255,0.08)]
                        hover:shadow-[0_0_8px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.5),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.5),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.4),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.4),inset_0_0_8px_8px_rgba(255,255,255,0.1)]"
                    >
                      <span className="relative z-10">{t('header.getStarted')}</span>
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;