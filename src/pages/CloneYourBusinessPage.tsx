// src/pages/CloneYourBusinessPage.tsx
import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

// SEO
import SEO from '@/components/SEO';
import { SITE_CONFIG } from '@/config/site';

// Analytics
import { trackPageView } from '@/utils/dataLayer';

// Hero — above the fold, no lazy load
import CloneYourBusinessHero from '@/components/CloneYourBusinessHero';

// Below-the-fold sections — lazy loaded
const CloneYourBusinessProblem = lazy(() => import('@/components/CloneYourBusinessProblem'));
const CloneYourBusinessHowItWorks = lazy(() => import('@/components/CloneYourBusinessHowItWorks'));
const CloneYourBusinessDepartments = lazy(() => import('@/components/CloneYourBusinessDepartments'));
const CloneYourBusinessBeforeAfter = lazy(() => import('@/components/CloneYourBusinessBeforeAfter'));
const CloneYourBusinessIntegrations = lazy(() => import('@/components/CloneYourBusinessIntegrations'));

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

const CLONE_KEYWORDS = [
  'AI agents',
  'business automation',
  'department cloning',
  'clone your business',
  'AI business processes',
  'automate departments',
  'intelligent automation',
  'enterprise AI',
  'workflow automation',
  'Arkadia Labs',
];

const buildJsonLd = (lang: string, title: string, description: string) => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.url}/${lang}/clone-your-business`,
    url: `${SITE_CONFIG.url}/${lang}/clone-your-business`,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_CONFIG.url}/`,
      url: `${SITE_CONFIG.url}/`,
      name: SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.logo,
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.url}/${lang}/clone-your-business#service`,
    name: title,
    description,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: 'AI Business Automation',
    category: 'Artificial Intelligence',
    areaServed: 'Worldwide',
    url: `${SITE_CONFIG.url}/${lang}/clone-your-business`,
  },
];

const CloneYourBusinessPage = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || SITE_CONFIG.defaultLocale;

  useEffect(() => {
    trackPageView(location.pathname, 'Clone Your Business - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  const pageTitle = `${t('seo.cloneYourBusiness.title')} | ${SITE_CONFIG.name}`;
  const pageDescription = t('seo.cloneYourBusiness.description');

  return (
    <>
      <SEO
        titleKey="seo.cloneYourBusiness.title"
        descriptionKey="seo.cloneYourBusiness.description"
        path="/clone-your-business"
        keywords={CLONE_KEYWORDS}
        jsonLd={buildJsonLd(currentLang, pageTitle, pageDescription)}
        breadcrumbs={[
          { name: t('seo.cloneYourBusiness.title'), path: '/clone-your-business' },
        ]}
      />

      {/* Hero — above the fold */}
      <CloneYourBusinessHero />

      {/* Below-the-fold sections with Suspense boundaries */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CloneYourBusinessProblem />
      </Suspense>

      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CloneYourBusinessHowItWorks />
      </Suspense>

      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CloneYourBusinessDepartments />
      </Suspense>

      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CloneYourBusinessBeforeAfter />
      </Suspense>

      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CloneYourBusinessIntegrations />
      </Suspense>

      <Suspense fallback={<div className="h-24 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <CtaPlaceholder />
      </Suspense>
    </>
  );
};

export default CloneYourBusinessPage;
