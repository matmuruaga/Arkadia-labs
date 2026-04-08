import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import { trackPageView } from '@/utils/dataLayer';
import HeroProduct from '@/components/landing/HeroProduct';

const LandingV3Page = () => {
  const { i18n } = useTranslation('landingV3');
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Home v3 - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    <>
      <SEO titleKey="seo.home.title" descriptionKey="seo.home.description" path="/v3" />
      <HeroProduct />
    </>
  );
};

export default LandingV3Page;
