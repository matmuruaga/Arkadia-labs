// src/pages/CaseStudyPage.tsx

import React from 'react';
import { useParams } from 'react-router-dom'; // Usaremos esto para obtener el 'slug' del caso de estudio
import { caseStudies, CaseStudy } from '../data/caseStudiesData';

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
import WhyElevaiteLabs from '../components/CaseStudyWhyElevaite';


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

  return (
    <>
      <CaseStudyHero data={study.hero} />
      <CaseStudyIntro client={study.client} challenge={study.challenge} />
      <CaseStudyChallenge data={study.challengeSection} />
      <CaseStudySolution data={study.solution} />
      <CaseStudyTimeline data={study.timeline} />
      <CaseStudyImpact data={study.impact} />
      <CaseStudyRoiAnalysis data={study.roiAnalysis} />
      <WhyElevaiteLabs />
      <FinalCtaSection />
      </>
  );
};

export default CaseStudyPage;