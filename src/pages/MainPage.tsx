import Hero from "../components/Hero";
import WhyElevaite from "../components/WhyElevaite"; 
import Solutions from "../components/Solutions";
import CTA from "../components/CTA";
import Plans from "../components/Plans";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Features2 from "../components/Features2";
import SalesTeam from "../components/salesTeam";
import CTA2 from "../components/CTA2";
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
      <Testimonials />
      <FAQ />
      <CTA2 />
    </Layout>
  );
};

export default MainPage;
