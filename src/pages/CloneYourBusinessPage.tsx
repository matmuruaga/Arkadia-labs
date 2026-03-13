// src/pages/CloneYourBusinessPage.tsx
import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// SEO
import SEO from '@/components/SEO';

// Analytics
import { trackPageView } from '@/utils/dataLayer';

// Hero — above the fold, no lazy load
import CloneYourBusinessHero from '@/components/CloneYourBusinessHero';

// Below-the-fold sections — lazy loaded
const CloneYourBusinessProblem = lazy(() => import('@/components/CloneYourBusinessProblem'));

const SolutionPlaceholder = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('cloneYourBusiness.solution.title')}
        </h2>
        <p className="text-gray-600">
          {t('cloneYourBusiness.solution.subtitle')}
        </p>
      </div>
    </section>
  );
};

const CtaPlaceholder = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t('cloneYourBusiness.cta.title')}
        </h2>
        <p className="text-gray-600 mb-8">
          {t('cloneYourBusiness.cta.subtitle')}
        </p>
      </div>
    </section>
  );
};

const CloneYourBusinessPage = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Clone Your Business - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    <>
      <SEO
        titleKey="seo.cloneYourBusiness.title"
        descriptionKey="seo.cloneYourBusiness.description"
        path="/clone-your-business"
      />

      {/* Hero — above the fold */}
      <CloneYourBusinessHero />

      {/* Below-the-fold sections with Suspense boundaries */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CloneYourBusinessProblem />
      </Suspense>

      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <SolutionPlaceholder />
      </Suspense>

      <Suspense fallback={<div className="h-24 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CtaPlaceholder />
      </Suspense>
    </>
  );
};

export default CloneYourBusinessPage;
