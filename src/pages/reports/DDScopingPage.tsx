import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/dataLayer';
import ReportNav from '@/components/reports/ReportNav';
import { navSections } from '@/data/reports/dd-agent-scoping';

// Styles
import '@/styles/report-scoping.css';

// Above-fold sections (eager)
import ScopingHero from '@/components/reports/scoping/ScopingHero';
import ScopingExecutiveSummary from '@/components/reports/scoping/ScopingExecutiveSummary';

// Below-fold sections (lazy)
const ScopingProspect = lazy(() => import('@/components/reports/scoping/ScopingProspect'));
const ScopingScope = lazy(() => import('@/components/reports/scoping/ScopingScope'));
const ScopingFeasibility = lazy(() => import('@/components/reports/scoping/ScopingFeasibility'));
const ScopingTechnical = lazy(() => import('@/components/reports/scoping/ScopingTechnical'));
const ScopingEffort = lazy(() => import('@/components/reports/scoping/ScopingEffort'));
const ScopingPricing = lazy(() => import('@/components/reports/scoping/ScopingPricing'));
const ScopingRoi = lazy(() => import('@/components/reports/scoping/ScopingRoi'));
const ScopingRisk = lazy(() => import('@/components/reports/scoping/ScopingRisk'));
const ScopingDeliverables = lazy(() => import('@/components/reports/scoping/ScopingDeliverables'));
const ScopingGoNogo = lazy(() => import('@/components/reports/scoping/ScopingGoNogo'));
const ScopingNextSteps = lazy(() => import('@/components/reports/scoping/ScopingNextSteps'));
const ScopingFooter = lazy(() => import('@/components/reports/scoping/ScopingFooter'));

/** Minimal skeleton shown while lazy sections load */
const SectionFallback: React.FC = () => (
  <div className="h-32 animate-pulse opacity-20" style={{ background: '#334155' }} />
);

const DDScopingPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'DD Agent Scoping Report', 'cs');
  }, [location.pathname]);

  return (
    <div className="report-scoping">
      {/* Sticky nav */}
      <ReportNav sections={navSections} />

      {/* Hero / masthead */}
      <ScopingHero />

      {/* Section 1 — above fold, eager */}
      <ScopingExecutiveSummary />

      {/* Sections 2–12 — lazy loaded */}
      <Suspense fallback={<SectionFallback />}>
        <ScopingProspect />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingScope />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingFeasibility />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingTechnical />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingEffort />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingPricing />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingRoi />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingRisk />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingDeliverables />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingGoNogo />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingNextSteps />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ScopingFooter />
      </Suspense>
    </div>
  );
};

export default DDScopingPage;
