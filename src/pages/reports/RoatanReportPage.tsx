import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/dataLayer';
import ReportLayout from '@/components/reports/ReportLayout';
import ReportNav from '@/components/reports/ReportNav';
import ReportMasthead from '@/components/reports/ReportMasthead';
import ReportMarket from '@/components/reports/ReportMarket';
import { reportMeta, navSections } from '@/data/reports/roatan-seo-audit';

// Lazy load below-fold sections
const ReportScorecard = lazy(() => import('@/components/reports/ReportScorecard'));
const ReportCompanyCards = lazy(() => import('@/components/reports/ReportCompanyCards'));
const ReportKeywords = lazy(() => import('@/components/reports/ReportKeywords'));
const ReportCampaigns = lazy(() => import('@/components/reports/ReportCampaigns'));
const ReportBudget = lazy(() => import('@/components/reports/ReportBudget'));
const ReportCompetitors = lazy(() => import('@/components/reports/ReportCompetitors'));
const ReportContentPlan = lazy(() => import('@/components/reports/ReportContentPlan'));
const ReportSchema = lazy(() => import('@/components/reports/ReportSchema'));
const ReportRoadmap = lazy(() => import('@/components/reports/ReportRoadmap'));
const ReportFooter = lazy(() => import('@/components/reports/ReportFooter'));

const SectionFallback = () => (
  <div className="h-32 animate-pulse bg-[var(--rpt-border)] opacity-30" />
);

const RoatanReportPage = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Roatan SEO Audit Report', 'es');
  }, [location.pathname]);

  return (
    <ReportLayout title={reportMeta.title}>
      <ReportMasthead />
      <ReportNav sections={navSections} />
      <ReportMarket />

      <Suspense fallback={<SectionFallback />}>
        <ReportScorecard />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportCompanyCards />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportKeywords />
      </Suspense>

      {/* SEM section: campaigns + budget share one section wrapper */}
      <Suspense fallback={<SectionFallback />}>
        <section id="sem" className="py-12 md:py-16 border-b border-[var(--rpt-border)]">
          <div className="max-w-[1200px] mx-auto px-4 md:px-16">
            <ReportCampaigns />
            <ReportBudget />
          </div>
        </section>
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportCompetitors />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportContentPlan />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportSchema />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportRoadmap />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReportFooter />
      </Suspense>
    </ReportLayout>
  );
};

export default RoatanReportPage;
