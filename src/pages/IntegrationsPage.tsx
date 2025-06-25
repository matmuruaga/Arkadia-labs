// src/pages/IntegrationsPage.tsx
import { IntegrationsHero } from '../components/IntegrationsHero';
import { FeaturedIntegrations } from '../components/FeaturedIntegrations';
import { LogoCloud } from '../components/LogoCloud';
import  HowItWorks  from '../components/HowItWorks';
import { CtaSection } from '../components/CtaSection' ;

export const IntegrationsPage = () => {
  return (
    <div className="bg-slate-50">
      <IntegrationsHero />
      <FeaturedIntegrations />
      <LogoCloud />
      <HowItWorks />
      <CtaSection />
    </div>
  );
};