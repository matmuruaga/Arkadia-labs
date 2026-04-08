import { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import { trackPageView } from '@/utils/dataLayer';

// New landing components (S1, S2, S4, S8)
import { HeroProduct, TheShiftSection, ProductDemo, ComparisonSection } from '@/components/landing';

// Reused components - imported directly (S3, S5)
import AgentWorkforceSection from '@/components/agentWorkforce/AgentWorkforceSection';
import VirtualOfficeSection from '@/components/agentWorkforce/VirtualOfficeSection';

// Below-the-fold - lazy loaded (S6, S7, S9, S10, S11, S12)
const BeforeAfterSection = lazy(() => import('@/components/BeforeAfterSection'));
const WhyArkadia = lazy(() => import('@/components/WhyArkadia'));
const KpiSection = lazy(() => import('@/components/KpiSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const FaqSection = lazy(() => import('@/components/FaqSection'));
const FinalCtaSection = lazy(() => import('@/components/FinalCtaSection'));
const AgentConnectionHero = lazy(() => import('@/components/agentWorkforce/AgentConnectionHero'));

const SectionFallback = ({ height = 'h-32' }: { height?: string }) => (
  <div className={`${height} flex items-center justify-center`}>
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
);

const LandingV3Page = () => {
  const { i18n } = useTranslation('landingV3');
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Home v3 - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    <>
      <SEO titleKey="seo.home.title" descriptionKey="seo.home.description" path="/v3" />

      {/* S1: Hero */}
      <HeroProduct />

      {/* S2: The Shift — Before/After */}
      <TheShiftSection />

      {/* S3: Your Company, Cloned (reused) */}
      <AgentWorkforceSection />

      {/* S4: Product Demo — Command Center */}
      <ProductDemo />

      {/* S5: Virtual Office (reused) */}
      <VirtualOfficeSection />

      {/* S6: Use Cases by Department (reused - uses home namespace) */}
      <Suspense fallback={<SectionFallback height="h-96" />}>
        <BeforeAfterSection />
      </Suspense>

      {/* S7: How It Works — 3 Steps (reused - uses home namespace) */}
      <Suspense fallback={<SectionFallback />}>
        <WhyArkadia />
      </Suspense>

      {/* S8: Differentiation — DIY vs Arkadia */}
      <ComparisonSection />

      {/* S9: Results — KPIs + Testimonials (reused) */}
      <Suspense fallback={<SectionFallback height="h-48" />}>
        <KpiSection />
      </Suspense>
      <Suspense fallback={<SectionFallback height="h-48" />}>
        <TestimonialsSection />
      </Suspense>

      {/* S10: FAQ (reused) */}
      <Suspense fallback={<SectionFallback />}>
        <FaqSection />
      </Suspense>

      {/* S11: Final CTA (reused) */}
      <Suspense fallback={<SectionFallback />}>
        <FinalCtaSection />
      </Suspense>

      {/* S12: Train One AI — visual closer (reused, moved to end) */}
      <Suspense fallback={<SectionFallback />}>
        <AgentConnectionHero />
      </Suspense>
    </>
  );
};

export default LandingV3Page;
