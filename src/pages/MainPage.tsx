// src/pages/MainPage.tsx
import React, { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// SEO
import SEO from '@/components/SEO';

// Critical components - Load immediately (above the fold)
import HeroFramed from "@/components/HeroFramed";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import KpiSection from "@/components/KpiSection";

// Below-the-fold components - Lazy load for better initial performance
const WhyArkadia = lazy(() => import("@/components/WhyArkadia"));
const AgentConnectionHero = lazy(() => import("@/components/agentWorkforce/AgentConnectionHero"));
const AgentWorkforceBuilder = lazy(() => import("@/components/AgentWorkforceBuilder"));
const VirtualOfficeSection = lazy(() => import("@/components/agentWorkforce/VirtualOfficeSection"));
const IntegrationsSection = lazy(() => import("@/components/IntegrationsSection"));
const AnimatedSeparator = lazy(() => import("@/components/AnimatedSeparator"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const FinalCtaSection = lazy(() => import("@/components/FinalCtaSection"));

import { trackPageView } from '@/utils/dataLayer';

const MainPage = () => {
  const { i18n } = useTranslation('common');
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Home - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    <>
      <SEO titleKey="seo.home.title" descriptionKey="seo.home.description" path="" />
      {/* 1. Hero — Hook: what we do */}
      <HeroFramed />

      {/* 2. Agent Connection — "Train One AI. Scale an Entire Team." */}
      <Suspense fallback={<div className="h-32" />}>
        <AgentConnectionHero />
      </Suspense>

      {/* 3. Org Chart — "Your Company, Cloned" */}
      <Suspense fallback={<div className="h-16" />}>
        <AgentWorkforceBuilder />
      </Suspense>

      {/* 4. Virtual Office — "Your Virtual Office, Always Running" */}
      <Suspense fallback={<div className="h-16" />}>
        <VirtualOfficeSection />
      </Suspense>

      {/* 5. Before & After — proof of value by department */}
      <BeforeAfterSection />

      {/* 4. KPIs — measurable results */}
      <KpiSection />

      {/* 5. Why Arkadia — why us */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <WhyArkadia />
      </Suspense>

      {/* 6. Integrations — connects with your tools */}
      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading integrations...</div></div>}>
        <IntegrationsSection />
      </Suspense>

      {/* 7. Separator */}
      <Suspense fallback={<div className="h-16" />}>
        <AnimatedSeparator />
      </Suspense>

      {/* 8. Testimonials — social proof */}
      <Suspense fallback={<div className="h-48 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading testimonials...</div></div>}>
        <TestimonialsSection />
      </Suspense>

      {/* 9. FAQ — objection handling */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading FAQ...</div></div>}>
        <FaqSection />
      </Suspense>

      {/* 10. Final CTA — conversion */}
      <Suspense fallback={<div className="h-24 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <FinalCtaSection />
      </Suspense>
    </>
  );
};

export default MainPage;