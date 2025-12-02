// src/pages/solutions/SolutionDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { getSolutionBySlug } from '@/data/solutions';
import { trackPageView, trackSectionView } from '@/utils/dataLayer';

// Import all solution section components
import SolutionHero from '@/components/solutions/SolutionHero';
import SolutionProblem from '@/components/solutions/SolutionProblem';
import SolutionHowItWorks from '@/components/solutions/SolutionHowItWorks';
import SolutionFeatures from '@/components/solutions/SolutionFeatures';
import SolutionMetrics from '@/components/solutions/SolutionMetrics';
import SolutionPlatform from '@/components/solutions/SolutionPlatform';
import LeadScoreAnimation from '@/components/solutions/LeadScoreAnimation';
import SolutionUseCases from '@/components/solutions/SolutionUseCases';
import SolutionIntegrations from '@/components/solutions/SolutionIntegrations';
import SolutionFAQ from '@/components/solutions/SolutionFAQ';
import SolutionCTA from '@/components/solutions/SolutionCTA';
import SolutionInlineCTA from '@/components/solutions/SolutionInlineCTA';

const SolutionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();

  // Get solution data
  const solution = slug ? getSolutionBySlug(slug) : undefined;

  // Track page view
  useEffect(() => {
    if (solution) {
      trackPageView(
        `/${i18n.language}/solutions/${slug}`,
        `${solution.seo.title} | Arkadia Labs`,
        i18n.language
      );
      trackSectionView('solution_page_loaded', `/${i18n.language}/solutions/${slug}`);
    }
  }, [solution, slug, i18n.language]);

  // If solution not found, redirect to solutions index
  if (!solution) {
    return <Navigate to={`/${i18n.language}/solutions`} replace />;
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(`solutions.${solution.id}.hero.title`, solution.hero.title),
    description: t(`solutions.${solution.id}.seo.description`, solution.seo.description),
    brand: {
      '@type': 'Brand',
      name: 'Arkadia Labs',
    },
    offers: {
      '@type': 'Offer',
      price: solution.pricing.startingPrice || 0,
      priceCurrency: solution.pricing.currency || 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{t(`solutions.${solution.id}.seo.title`, solution.seo.title)}</title>
        <meta
          name="description"
          content={t(`solutions.${solution.id}.seo.description`, solution.seo.description)}
        />
        <meta name="keywords" content={solution.seo.keywords.join(', ')} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={t(`solutions.${solution.id}.seo.title`, solution.seo.title)}
        />
        <meta
          property="og:description"
          content={t(`solutions.${solution.id}.seo.description`, solution.seo.description)}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://arkadialabs.io/${i18n.language}/solutions/${slug}`}
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={t(`solutions.${solution.id}.seo.title`, solution.seo.title)}
        />
        <meta
          name="twitter:description"
          content={t(`solutions.${solution.id}.seo.description`, solution.seo.description)}
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://arkadialabs.io/${i18n.language}/solutions/${slug}`}
        />

        {/* Hreflang for language alternatives */}
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://arkadialabs.io/en/solutions/${slug}`}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={`https://arkadialabs.io/es/solutions/${slug}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://arkadialabs.io/en/solutions/${slug}`}
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Page Sections */}
      <main>
        <SolutionHero data={solution.hero} solutionId={solution.id} />
        <SolutionProblem data={solution.problem} solutionId={solution.id} />
        <SolutionHowItWorks data={solution.howItWorks} solutionId={solution.id} />

        {/* Inline CTA after How It Works - compact dark variant */}
        <SolutionInlineCTA solutionId={solution.id} variant="compact" translationKey="inlineCta1" />

        <SolutionFeatures data={solution.features} solutionId={solution.id} />
        <SolutionMetrics data={solution.metrics} solutionId={solution.id} />
        {solution.scoreAnimation?.enabled && (
          <LeadScoreAnimation solutionId={solution.id} />
        )}
        {solution.platform && (
          <SolutionPlatform data={solution.platform} solutionId={solution.id} />
        )}

        {/* Featured CTA after Platform - prominent with stats */}
        <SolutionInlineCTA solutionId={solution.id} variant="featured" translationKey="inlineCta2" />

        <SolutionUseCases data={solution.useCases} solutionId={solution.id} />
        <SolutionIntegrations data={solution.integrations} solutionId={solution.id} />

        {/* Gradient CTA before FAQ - urgency banner */}
        <SolutionInlineCTA solutionId={solution.id} variant="gradient" translationKey="inlineCta3" />

        <SolutionFAQ data={solution.faq} solutionId={solution.id} />
        <SolutionCTA data={solution.cta} solutionId={solution.id} />
      </main>
    </>
  );
};

export default SolutionDetailPage;
