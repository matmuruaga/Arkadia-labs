// src/components/CaseStudyCard.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CaseStudy } from '../data/caseStudiesData';
import { ArrowRight } from 'lucide-react';

interface Props {
  study: CaseStudy;
  slug: string;
}

const CaseStudyCard: React.FC<Props> = ({ study, slug }) => {
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'es';

  return (
    <Link
      to={`/${currentLang}/case-studies/${slug}`}
      // Cambio: Añadimos un fondo sutil y mejoramos las transiciones y sombras.
      className="block bg-white/50 border border-gray-200/80 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
    >
      <div className="p-6 flex flex-col h-full">
        {/* En el futuro, el logo del cliente aquí le daría un toque premium */}
        {/* <img src={study.client.logoUrl} alt={`${study.client.name} logo`} className="h-8 mb-4 self-start" /> */}
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.client.name}</h3>
        {/* Cambio: Ajustamos la altura para alinear las tarjetas */}
        <p className="text-gray-700 mb-5 text-base flex-grow">{study.hero.subtitle}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {/* Cambio: Estilo de las etiquetas más refinado */}
          <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {study.impact.kpis[0].value} ROI
          </span>
          <span className="text-xs font-bold bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {study.impact.kpis[1].value} Demos
          </span>
        </div>

        <div className="mt-auto text-blue-600 font-bold text-lg flex items-center">
          Ver caso de estudio
          <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;