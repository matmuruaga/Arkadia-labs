// src/pages/CaseStudiesIndexPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importar el hook
import { caseStudies } from '../data/caseStudiesData';
import CaseStudyCard from '../components/CaseStudyCard';

const CaseStudiesIndexPage: React.FC = () => {
  const { t } = useTranslation(); // 2. Inicializar el hook para obtener la función 't'

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center bg-gray-50 pt-24 pb-12">
      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            
            {/* --- 3. TEXTOS CONECTADOS AL SISTEMA DE TRADUCCIÓN --- */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('case_studies_index.title', 'Casos de Estudio')}
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('case_studies_index.subtitle', 'Descubre cómo hemos ayudado a empresas a transformar sus procesos de ventas con IA.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(caseStudies).map(([slug, study]) => (
              <CaseStudyCard key={slug} slug={slug} study={study} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesIndexPage;