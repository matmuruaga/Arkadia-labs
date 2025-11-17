// src/pages/IntegrationsPage.tsx
import { useState } from 'react';
import { IntegrationsHero } from '../components/IntegrationsHero';
import { FeaturedIntegrations } from '../components/FeaturedIntegrations';
import { LogoCloud } from '../components/LogoCloud';
import  HowItWorks  from '../components/HowItWorks';
import { CtaSection } from '../components/CtaSection' ;
import IntegrationsFilter from '../components/IntegrationsFilter';

export const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-slate-50">
      {/* Spacer to account for fixed header */}
      <div className="h-24" aria-hidden="true" />
      <IntegrationsHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <IntegrationsFilter searchQuery={searchQuery} />
      <FeaturedIntegrations />
      <LogoCloud />
      <HowItWorks />
      <CtaSection />
    </div>
  );
};