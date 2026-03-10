// src/pages/CaseStudyPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies, CaseStudy } from '../data/caseStudiesData';
import SEO from '@/components/SEO';
import { SITE_CONFIG } from '@/config/site';

// Componentes Reutilizables Existentes
import FinalCtaSection from '../components/FinalCtaSection';

// Nuevos Componentes Específicos para el Caso de Estudio (los crearemos a continuación)
import CaseStudyHero from '../components/CaseStudyHero';
import CaseStudyIntro from '../components/CaseStudyIntro';
import CaseStudySolution from '../components/CaseStudySolution';
import CaseStudyTimeline from '../components/CaseStudyTimeline';
import CaseStudyImpact from '../components/CaseStudyImpact';
import CaseStudyRoiAnalysis from '../components/CaseStudyRoiAnalysis';
import CaseStudyChallenge from '../components/CaseStudyChallenge';
import WhyArkadiaLabs from '../components/CaseStudyWhyArkadia';


const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? caseStudies[slug] : undefined;

  if (!study) {
    // Podríamos redirigir a una página 404
    return (
        <>
        <div className="text-center py-20">
          <h1>Caso de Estudio no encontrado</h1>
        </div>
        </>
    );
  }
  
  const studyData = caseStudies[slug]; //

  return (
    <>
      <SEO
        title={study.hero.title.replace(/\*/g, '')}
        description={study.hero.subtitle}
        path={`/case-studies/${slug}`}
        ogType="article"
        breadcrumbs={[
          { name: 'Case Studies', path: '/case-studies' },
          { name: study.hero.title.replace(/\*/g, ''), path: `/case-studies/${slug}` },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: study.hero.title.replace(/\*/g, ''),
          description: study.hero.subtitle,
          dateModified: '2026-03-10',
          author: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
            logo: { '@type': 'ImageObject', url: SITE_CONFIG.logo },
          },
        }}
      />
      <CaseStudyHero data={study.hero} studyKey={slug} />
      <CaseStudyIntro client={study.client} challenge={study.challenge} studyKey={slug!} />
      <CaseStudyChallenge data={study.challengeSection} studyKey={slug} />
      <CaseStudySolution data={study.solution} studyKey={slug} />
      <CaseStudyTimeline data={study.timeline} studyKey={slug} />
      <CaseStudyImpact data={study.impact} studyKey={slug} />
      <CaseStudyRoiAnalysis data={study.roiAnalysis} studyKey={slug} />
      <WhyArkadiaLabs />
      <FinalCtaSection />
      </>
  );
};

export default CaseStudyPage;