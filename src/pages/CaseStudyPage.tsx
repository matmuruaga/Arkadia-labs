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
  
  const studyData = caseStudies[slug]; //

  return (
    <>
      <CaseStudyHero data={study.hero} studyKey={slug} />
      <CaseStudyIntro client={study.client} studyKey={slug} challenge={study.challenge} />
      <CaseStudyChallenge data={study.challengeSection} studyKey={slug} />
      <CaseStudySolution data={study.solution} studyKey={slug} />
      <CaseStudyTimeline data={study.timeline} studyKey={slug} />
      <CaseStudyImpact data={study.impact} studyKey={slug} />
      <CaseStudyRoiAnalysis data={study.roiAnalysis} studyKey={slug} />
      <WhyElevaiteLabs />
      <FinalCtaSection />
      </>
  );
};

export default CaseStudyPage;