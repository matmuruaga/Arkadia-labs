// src/pages/MainPage.tsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
// Ya no se importa Layout aquí
import Hero from "../components/Hero";
import WhyArkadia from "../components/WhyArkadia";
import KpiSection from "../components/KpiSection";
import BeforeAfterSection from "../components/BeforeAfterSection";
import IntegrationsSection from "../components/IntegrationsSection";
import AnimatedSeparator from "../components/AnimatedSeparator";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import FinalCtaSection from "../components/FinalCtaSection";
import { trackPageView } from '@/utils/dataLayer';

const MainPage = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Home - Arkadia Labs', i18n.language);
  }, [location.pathname, i18n.language]);

  return (
    // Ya no se necesita el componente <Layout> aquí
    <>
      <Hero />
      <BeforeAfterSection />
      <KpiSection />
      <WhyArkadia />
      <IntegrationsSection />
      <AnimatedSeparator />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
};

export default MainPage;