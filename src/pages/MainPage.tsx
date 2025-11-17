// src/pages/MainPage.tsx
import React, { useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Critical components - Load immediately (above the fold)
import Hero from "../components/Hero";
import BeforeAfterSection from "../components/BeforeAfterSection";
import KpiSection from "../components/KpiSection";

// Below-the-fold components - Lazy load for better initial performance
const WhyArkadia = lazy(() => import("../components/WhyArkadia"));
const IntegrationsSection = lazy(() => import("../components/IntegrationsSection"));
const AnimatedSeparator = lazy(() => import("../components/AnimatedSeparator"));
const TestimonialsSection = lazy(() => import("../components/TestimonialsSection"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const FinalCtaSection = lazy(() => import("../components/FinalCtaSection"));

import { trackPageView } from '@/utils/dataLayer';

const MainPage = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Home - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    <>
      {/* Critical above-the-fold content - loaded immediately */}
      <Hero />
      <BeforeAfterSection />
      <KpiSection />

      {/*
        Below-the-fold content - lazy loaded with individual Suspense boundaries
        This allows progressive loading and prevents waterfall effects
        Each component loads independently for better UX
      */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <WhyArkadia />
      </Suspense>

      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading integrations...</div></div>}>
        <IntegrationsSection />
      </Suspense>

      <Suspense fallback={<div className="h-16" />}>
        <AnimatedSeparator />
      </Suspense>

      <Suspense fallback={<div className="h-48 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading testimonials...</div></div>}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading FAQ...</div></div>}>
        <FaqSection />
      </Suspense>

      <Suspense fallback={<div className="h-24 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>}>
        <FinalCtaSection />
      </Suspense>
    </>
  );
};

export default MainPage;