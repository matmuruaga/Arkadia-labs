// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Youtube, Instagram, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Importar hook

const Footer = () => {
  const { t, i18n } = useTranslation(); // 2. Obtener i18n para acceder al idioma actual
  const socialLinkClasses = "text-gray-500 hover:text-[#1C7ED6] transition-colors";
  const navLinkClasses = "text-gray-600 hover:text-[#1C7ED6] transition-colors";

  // 3. Crear una variable para el idioma actual para simplificar
  const currentLang = i18n.language;

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Columna Logo & Descripción */}
          <div className="md:col-span-2 lg:col-span-1">
            {/* --- CORREGIDO --- */}
            <Link to={`/${currentLang}`} className="flex items-center mb-4 cursor-pointer">
              <img 
                src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1749155603/Recurso_14_wwxduv.svg" 
                alt={t('footer.altLogo')}
                className="h-8 w-auto mr-2"
              />
              <span className="text-xl font-bold text-[#0D1B2A]">{t('footer.companyName')}</span>
            </Link>
            <p className="text-gray-600 mb-6 text-sm">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a href="#" className={socialLinkClasses} aria-label={t('footer.social.linkedin')}><Linkedin size={20} /></a>
              <a href="#" className={socialLinkClasses} aria-label={t('footer.social.twitter')}><Twitter size={20} /></a>
              <a href="#" className={socialLinkClasses} aria-label={t('footer.social.youtube')}><Youtube size={20} /></a>
              <a href="#" className={socialLinkClasses} aria-label={t('footer.social.instagram')}><Instagram size={20} /></a>
            </div>
          </div>

          {/* Columna Quick Links */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">{t('footer.headings.quickLinks')}</h3>
            <ul className="space-y-2">
              {/* --- CORREGIDO --- */}
              <li><Link to={`/${currentLang}/#before-after`} className={navLinkClasses}>{t('footer.links.features')}</Link></li>
              <li><Link to={`/${currentLang}/#testimonials`} className={navLinkClasses}>{t('footer.links.caseStudies')}</Link></li>
            </ul>
          </div>

          {/* Columna Legal */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">{t('footer.headings.legal')}</h3>
            <ul className="space-y-2">
              {/* --- CORREGIDO --- */}
              <li><Link to={`/${currentLang}/privacy-policy`} className={navLinkClasses}>{t('footer.links.privacy')}</Link></li>
              <li><Link to={`/${currentLang}/terms-and-conditions`} className={navLinkClasses}>{t('footer.links.terms')}</Link></li>
              <li><Link to={`/${currentLang}/cookie-policy`} className={navLinkClasses}>{t('footer.links.cookies')}</Link></li>
            </ul>
          </div>

          {/* Columna Stay Updated */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">{t('footer.headings.stayUpdated')}</h3>
            <div className="relative mb-4">
              <input type="email" placeholder={t('footer.newsletter.placeholder')} className="w-full bg-white text-[#0D1B2A] rounded-full py-2.5 pl-4 pr-12 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:border-[#1C7ED6]" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C7ED6] hover:text-[#155CB0] transition-colors" aria-label={t('footer.newsletter.subscribe')}><Send size={20} /></button>
            </div>
            <p className="text-gray-600 text-xs">{t('footer.newsletter.description')}</p>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 text-center md:text-left">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {t('footer.companyName')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;