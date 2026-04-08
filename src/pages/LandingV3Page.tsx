import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import { trackPageView } from '@/utils/dataLayer';

const LandingV3Page = () => {
  const { i18n } = useTranslation('landingV3');
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Home v3 - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    <>
      <SEO titleKey="seo.home.title" descriptionKey="seo.home.description" path="/v3" />
      <div className="text-center py-40">
        <h1 className="text-4xl font-bold text-[#0D1B2A]">Landing v3 — Under Construction</h1>
        <p className="text-gray-500 mt-4">Sections will be added incrementally.</p>
      </div>
    </>
  );
};

export default LandingV3Page;
