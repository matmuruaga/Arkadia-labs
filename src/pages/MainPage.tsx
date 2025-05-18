import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Solutions from "../components/Solutions";
import CTA from "../components/CTA";
import Plans from "../components/Plans";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Features2 from "../components/Features2";
import SalesTeam from "../components/salesTeam";
import CTA2 from "../components/CTA2";
import Layout from "../components/Layout";

const MainPage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Features />
      <Solutions />
      <Features2 />
      <SalesTeam />
      <CTA />
      <Plans />
      <Testimonials />
      <FAQ />
      <CTA2 />
      <Footer />
    </Layout>
  );
};

export default MainPage;
