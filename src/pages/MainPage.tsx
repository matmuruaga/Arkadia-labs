// src/pages/MainPage.tsx
import React from 'react';
// Ya no se importa Layout aquí
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
  // La lógica del widget, si es solo para esta página, se queda aquí.
  // Si moviste la lógica y el widget a App.tsx, puedes quitarla de aquí.
  
  return (
    // Ya no se necesita el componente <Layout> aquí
    <>
      <Hero />
      <BeforeAfterSection />
      <KpiSection />
      <WhyElevaite />
      <IntegrationsSection />
      <AnimatedSeparator />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
};

export default MainPage;