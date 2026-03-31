import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackPageView } from '@/utils/dataLayer';
import ReportNav from '@/components/reports/ReportNav';
import '@/styles/report-dd.css';
import { reportMeta, navSections } from '@/data/reports/dd-dataroom-analyza';

import DDHero from '@/components/reports/dd/DDHero';
import DDAlertBanner from '@/components/reports/dd/DDAlertBanner';
import DDInventory from '@/components/reports/dd/DDInventory';
import DDGapAnalysis from '@/components/reports/dd/DDGapAnalysis';
import DDFindings from '@/components/reports/dd/DDFindings';
import DDArchitecture from '@/components/reports/dd/DDArchitecture';
import DDOcr from '@/components/reports/dd/DDOcr';
import DDPlatformComparison from '@/components/reports/dd/DDPlatformComparison';
import DDScoring from '@/components/reports/dd/DDScoring';
import DDRecommendation from '@/components/reports/dd/DDRecommendation';
import DDImplementationPlan from '@/components/reports/dd/DDImplementationPlan';

import DDRoi from '@/components/reports/dd/DDRoi';
import DDBlockers from '@/components/reports/dd/DDBlockers';
import DDFooter from '@/components/reports/dd/DDFooter';

const DDDataroomPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'DD Dataroom Platform Analysis', 'cs');
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{reportMeta.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="report-dd min-h-screen">
        <DDHero />
        <ReportNav sections={navSections} />
        <DDAlertBanner />
        <DDInventory />
        <DDGapAnalysis />
        <DDFindings />
        <DDArchitecture />
        <DDOcr />
        <DDPlatformComparison />
        <DDScoring />
        <DDRecommendation />
        <DDImplementationPlan />

        <DDRoi />
        <DDBlockers />
        <DDFooter />
      </div>
    </>
  );
};

export default DDDataroomPage;
