// src/components/Header.tsx
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight, Phone, PhoneIncoming, Image, Share2, UserCheck, ShoppingCart, CalendarCheck, Cog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { trackNavigationClick, trackCtaClick, trackLoginClick, trackMobileMenuToggle } from '@/utils/dataLayer';

// Solutions menu data structure
const solutionsData = [
  {
    category: 'outbound',
    items: [
      { id: 'lead-validator', icon: Phone, translationKey: 'leadValidator' },
      { id: 'sales-qualifier', icon: PhoneIncoming, translationKey: 'salesQualifier' },
      { id: 'sales-agent', icon: ShoppingCart, translationKey: 'salesAgent' },
    ]
  },
  {
    category: 'inbound',
    items: [
      { id: 'virtual-receptionist', icon: UserCheck, translationKey: 'virtualReceptionist' },
      { id: 'booking-agent', icon: CalendarCheck, translationKey: 'bookingAgent' },
    ]
  },
  {
    category: 'marketing',
    items: [
      { id: 'content-creator', icon: Image, translationKey: 'contentCreator' },
      { id: 'social-manager', icon: Share2, translationKey: 'socialManager' },
    ]
  },
  {
    category: 'operations',
    items: [
      { id: 'operations-agent', icon: Cog, translationKey: 'operationsAgent' },
    ]
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
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

  // Close solutions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    if (isSolutionsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSolutionsOpen]);

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

  const linkClasses = "text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors font-medium cursor-pointer text-sm whitespace-nowrap";
  const mobileLinkClasses = `block py-3 text-center text-lg text-[#0D1B2A] hover:text-[#1C7ED6] transition-colors font-medium cursor-pointer`;
  const secondaryButtonClasses = "border border-[#1C7ED6] text-[#1C7ED6] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#1C7ED6]/10 transition-all duration-300 whitespace-nowrap";

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* --- DESKTOP: Cápsula completa con logo + navegación --- */}
        <div className={`hidden lg:flex items-center justify-between glass-nav-pill rounded-full px-5 py-2.5 ${
          scrolling ? 'scrolled' : ''
        }`}>
          <Link to={`/${i18n.language}`} aria-label="Go to homepage" className="flex-shrink-0">
              <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg" alt="Arkadia Labs Logo" className="h-7 w-auto"/>
          </Link>

          <nav className="flex items-center space-x-3 xl:space-x-5">
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

            {/* --- SOLUTIONS DROPDOWN --- */}
            <div
              ref={solutionsDropdownRef}
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button
                className={`${linkClasses} flex items-center gap-1`}
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                aria-expanded={isSolutionsOpen}
                aria-haspopup="true"
              >
                {t('header.solutions')}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isSolutionsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] z-50"
                  >
                    {/* Glassmorphism container */}
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] border border-slate-200/60 overflow-hidden">
                      {/* Subtle gradient accent at top */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400" />

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          {solutionsData.map((category) => (
                            <div key={category.category}>
                              <div className="flex items-center gap-1.5 mb-2 px-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  category.category === 'outbound' ? 'bg-sky-500' :
                                  category.category === 'inbound' ? 'bg-emerald-500' :
                                  category.category === 'marketing' ? 'bg-teal-500' :
                                  'bg-orange-500'
                                }`} />
                                <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                  {t(`header.solutionsCategories.${category.category}`)}
                                </h4>
                              </div>
                              <div className="space-y-0.5">
                                {category.items.map((item) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <Link
                                      key={item.id}
                                      to={`/${i18n.language}/solutions/${item.id}`}
                                      className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-gradient-to-r hover:from-sky-50/80 hover:to-cyan-50/80 transition-all duration-200 group"
                                      onClick={() => {
                                        handleNavigationClick(t(`header.solutionsItems.${item.translationKey}.name`), `/${i18n.language}/solutions/${item.id}`);
                                        setIsSolutionsOpen(false);
                                      }}
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                                        <IconComponent className="h-4 w-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-700 group-hover:text-sky-600 transition-colors truncate">
                                          {t(`header.solutionsItems.${item.translationKey}.name`)}
                                        </p>
                                        <p className="text-[10px] text-slate-400 truncate leading-tight">
                                          {t(`header.solutionsItems.${item.translationKey}.description`)}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-3 pt-3 border-t border-slate-100/80">
                          <Link
                            to={`/${i18n.language}/solutions`}
                            className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl shadow-md shadow-sky-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            onClick={() => {
                              handleNavigationClick(t('header.viewAllSolutions'), `/${i18n.language}/solutions`);
                              setIsSolutionsOpen(false);
                            }}
                          >
                            {t('header.viewAllSolutions')}
                            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to={`/${i18n.language}/case-studies`}
              className={linkClasses}
              onClick={() => handleNavigationClick(t('header.studyCase'), `/${i18n.language}/case-studies`)}
            >
              {t('header.studyCase')}
            </Link>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleGetStartedClick}
                className="relative bg-[#1C7ED6] text-white hover:bg-[#155CB0] h-[36px] px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden whitespace-nowrap
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

            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>

        {/* --- MOBILE: Navbar con navegación deslizante --- */}
        <div className="lg:hidden">
          <motion.div
            className={`glass-nav-pill px-6 py-3 ${scrolling ? 'scrolled' : ''}`}
            style={{
              borderRadius: "1.5rem",
              overflow: "hidden"
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
              style={{ overflow: isMobileSolutionsOpen ? "visible" : "hidden" }}
            >
              <div className="pt-6 pb-2 relative">
                {/* Container para las dos vistas */}
                <div className="relative" style={{ overflow: isMobileSolutionsOpen ? "visible" : "hidden" }}>
                  {/* Vista principal del menú */}
                  <motion.div
                    animate={{
                      x: isMobileSolutionsOpen ? '-100%' : '0%',
                      opacity: isMobileSolutionsOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="flex flex-col space-y-4"
                    style={{ display: isMobileSolutionsOpen ? 'none' : 'flex' }}
                  >
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

                    {/* --- SOLUTIONS SLIDE TRIGGER --- */}
                    <button
                      onClick={() => setIsMobileSolutionsOpen(true)}
                      className={`${mobileLinkClasses} w-full flex items-center justify-center gap-2`}
                      aria-expanded={isMobileSolutionsOpen}
                    >
                      {t('header.solutions')}
                      <ChevronRight className="h-5 w-5" />
                    </button>

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
                  </motion.div>

                  {/* Vista de Solutions */}
                  {isMobileSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    {/* Back button - fixed at top */}
                    <button
                      onClick={() => setIsMobileSolutionsOpen(false)}
                      className="flex items-center gap-2 py-3 px-2 text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors mb-2 flex-shrink-0"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      {t('header.back', 'Back')}
                    </button>

                    {/* Solutions content with scroll */}
                    <div className="max-h-[50vh] overflow-y-auto pb-4 -mx-2 px-2 overscroll-contain">
                      <div className="space-y-4">
                        {solutionsData.map((category) => (
                          <div key={category.category}>
                            <div className="flex items-center gap-2 mb-2 px-2">
                              <div className={`w-2 h-2 rounded-full ${
                                category.category === 'outbound' ? 'bg-sky-500' :
                                category.category === 'inbound' ? 'bg-emerald-500' :
                                category.category === 'marketing' ? 'bg-teal-500' :
                                'bg-orange-500'
                              }`} />
                              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {t(`header.solutionsCategories.${category.category}`)}
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link
                                    key={item.id}
                                    to={`/${i18n.language}/solutions/${item.id}`}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-sky-50 hover:to-cyan-50 active:bg-sky-100 transition-all duration-200"
                                    onClick={() => {
                                      handleNavigationClick(t(`header.solutionsItems.${item.translationKey}.name`), `/${i18n.language}/solutions/${item.id}`);
                                      setIsMobileSolutionsOpen(false);
                                      setIsMenuOpen(false);
                                    }}
                                  >
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 flex-shrink-0">
                                      <IconComponent className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                      <p className="text-sm font-semibold text-slate-800 truncate">
                                        {t(`header.solutionsItems.${item.translationKey}.name`)}
                                      </p>
                                      <p className="text-xs text-slate-500 truncate">
                                        {t(`header.solutionsItems.${item.translationKey}.description`)}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        {/* View All Solutions Link */}
                        <Link
                          to={`/${i18n.language}/solutions`}
                          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold bg-gradient-to-r from-sky-500 to-teal-500 text-white rounded-xl shadow-lg shadow-sky-500/20 transition-all duration-300 mt-4"
                          onClick={() => {
                            handleNavigationClick(t('header.viewAllSolutions'), `/${i18n.language}/solutions`);
                            setIsMobileSolutionsOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {t('header.viewAllSolutions')}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                  )}
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