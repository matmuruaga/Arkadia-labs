// src/pages/solutions/SolutionDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSolutionBySlug } from '@/data/solutions';
import { trackPageView, trackSectionView } from '@/utils/dataLayer';
import SEO from '@/components/SEO';
import { SITE_CONFIG } from '@/config/site';

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
  const { t, i18n } = useTranslation('solutions');

  // Get solution data
  const solution = slug ? getSolutionBySlug(slug) : undefined;

  // Scroll to top and track page view on mount (key={slug} forces remount)
  useEffect(() => {
    window.scrollTo(0, 0);
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
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t(`solutions.${solution.id}.seo.title`, solution.seo.title),
    description: t(`solutions.${solution.id}.seo.description`, solution.seo.description),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    dateModified: '2026-03-10',
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    ...(solution.pricing.startingPrice
      ? {
          offers: {
            '@type': 'Offer',
            price: solution.pricing.startingPrice,
            priceCurrency: solution.pricing.currency || 'USD',
            availability: 'https://schema.org/InStock',
          },
        }
      : {
          offers: {
            '@type': 'AggregateOffer',
            availability: 'https://schema.org/InStock',
            description: 'Custom pricing',
          },
        }),
  };

  // Key on slug forces full remount when navigating between solutions,
  // ensuring Framer Motion animations replay on each page transition
  return (
    <React.Fragment key={slug}>
      <SEO
        titleKey={`solutions.${solution.id}.seo.title`}
        descriptionKey={`solutions.${solution.id}.seo.description`}
        path={`/solutions/${slug}`}
        ogType="product"
        jsonLd={productJsonLd}
        breadcrumbs={[
          { name: t('seo.solutionsIndex.title', 'Solutions'), path: '/solutions' },
          { name: t(`solutions.${solution.id}.seo.title`, solution.seo.title), path: `/solutions/${slug}` },
        ]}
      />

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
    </React.Fragment>
  );
};

export default SolutionDetailPage;
