// src/pages/CaseStudiesIndexPage.tsx
import React from 'react';
import { caseStudies } from '../data/caseStudiesData';
import CaseStudyCard from '../components/CaseStudyCard';

const CaseStudiesIndexPage: React.FC = () => {
  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Casos de Estudio</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Descubre cómo hemos ayudado a empresas a transformar sus procesos de ventas con IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(caseStudies).map(([slug, study]) => (
              <CaseStudyCard key={slug} slug={slug} study={study} />
            ))}
             {/* Cuando añadas más casos de estudio, aparecerán automáticamente aquí */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudiesIndexPage;