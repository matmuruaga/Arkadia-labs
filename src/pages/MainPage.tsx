import Hero from "../components/Hero";
import WhyElevaite from "../components/WhyElevaite"; 
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import FinalCtaSection from "../components/FinalCtaSection";
import Layout from "../components/Layout";
import KpiSection from "../components/KpiSection";
import BeforeAfterSection from "../components/BeforeAfterSection"
import IntegrationsSection from "../components/IntegrationsSection"

const MainPage = () => {
  return (
    <Layout>
      <Hero />
      <WhyElevaite /> 
      <KpiSection />
      <BeforeAfterSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </Layout>
  );
};

export default MainPage;
