// src/pages/MainPage.tsx
import React from 'react';
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import WhyElevaite from "../components/WhyElevaite";
import KpiSection from "../components/KpiSection";
import BeforeAfterSection from "../components/BeforeAfterSection";
import IntegrationsSection from "../components/IntegrationsSection";
import AnimatedSeparator from "../components/AnimatedSeparator";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import FinalCtaSection from "../components/FinalCtaSection";

const MainPage = () => {
  // Ya no se necesita ninguna lógica de JavaScript (useRef, useEffect, etc.) para el widget.

  return (
    <Layout>
      <Hero />
      <BeforeAfterSection />
      <KpiSection />
      <WhyElevaite />
      <IntegrationsSection />
      <AnimatedSeparator />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </Layout>
  );
};

export default MainPage;