// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Linkedin, Twitter, Youtube, Instagram, Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackSocialClick, trackNavigationClick, trackFormStart, trackFormSubmit, trackFormSuccess } from '@/utils/dataLayer';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const socialLinkClasses = "text-gray-500 hover:text-[#1C7ED6] transition-colors";
  const navLinkClasses = "text-gray-600 hover:text-[#1C7ED6] transition-colors";

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newsletterStarted, setNewsletterStarted] = useState(false);

  const handleNewsletterInteraction = () => {
    if (!newsletterStarted) {
      trackFormStart('newsletter_form', 'footer');
      setNewsletterStarted(true);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage('');

    // Track form submit
    trackFormSubmit('newsletter_form', { formLocation: 'footer' });

    try {
      const webhookUrl = 'https://n8n-elevaitelabs-u48215.vm.elestio.app/webhook/b8866b0b-beb2-4f71-b268-94a9663bfbc8';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          formulario: 'footer'
        }),
      });

      if (!response.ok) {
        throw new Error('Hubo un error al procesar tu solicitud.');
      }

      // Track form success
      trackFormSuccess('newsletter_form', 'footer');

      setMessage('¡Gracias por suscribirte!');
      setEmail('');

    } catch (error) {
      setMessage('Error. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform, url, 'footer');
  };

  const handleNavigationClick = (linkName: string, destination: string) => {
    trackNavigationClick(linkName, destination);
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          <div className="md:col-span-2 lg:col-span-1">
            <Link to={`/${currentLang}`} className="flex items-center mb-4 cursor-pointer">
              <img src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg" alt={t('footer.altLogo')} className="h-8 w-auto mr-2" />
            </Link>
            <p className="text-gray-600 mb-6 text-sm">{t('footer.description')}</p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/elevaite-labs-io/"
                className={socialLinkClasses}
                aria-label={t('footer.social.linkedin')}
                onClick={() => handleSocialClick('linkedin', 'https://www.linkedin.com/company/elevaite-labs-io/')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className={socialLinkClasses}
                aria-label={t('footer.social.twitter')}
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialClick('twitter', '#');
                }}
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className={socialLinkClasses}
                aria-label={t('footer.social.youtube')}
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialClick('youtube', '#');
                }}
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className={socialLinkClasses}
                aria-label={t('footer.social.instagram')}
                onClick={(e) => {
                  e.preventDefault();
                  handleSocialClick('instagram', '#');
                }}
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">{t('footer.headings.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={`/${currentLang}/#before-after`}
                  className={navLinkClasses}
                  onClick={() => handleNavigationClick(t('footer.links.features'), `/${currentLang}/#before-after`)}
                >
                  {t('footer.links.features')}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLang}/#testimonials`}
                  className={navLinkClasses}
                  onClick={() => handleNavigationClick(t('footer.links.caseStudies'), `/${currentLang}/#testimonials`)}
                >
                  {t('footer.links.caseStudies')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">{t('footer.headings.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={`/${currentLang}/privacy-policy`}
                  className={navLinkClasses}
                  onClick={() => handleNavigationClick(t('footer.links.privacy'), `/${currentLang}/privacy-policy`)}
                >
                  {t('footer.links.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLang}/terms-and-conditions`}
                  className={navLinkClasses}
                  onClick={() => handleNavigationClick(t('footer.links.terms'), `/${currentLang}/terms-and-conditions`)}
                >
                  {t('footer.links.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${currentLang}/cookie-policy`}
                  className={navLinkClasses}
                  onClick={() => handleNavigationClick(t('footer.links.cookies'), `/${currentLang}/cookie-policy`)}
                >
                  {t('footer.links.cookies')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">{t('footer.headings.stayUpdated')}</h3>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="relative mb-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="w-full bg-white text-[#0D1B2A] rounded-full py-2.5 pl-4 pr-12 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:border-[#1C7ED6]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleNewsletterInteraction}
                  required
                  disabled={loading}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1C7ED6] hover:text-[#155CB0] transition-colors p-1" 
                  aria-label={t('footer.newsletter.subscribe')}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin" size={20}/> : <Send size={20} />}
                </button>
              </div>
            </form>
            {message && <p className="text-gray-600 text-xs px-4">{message}</p>}
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