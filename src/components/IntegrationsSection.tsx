// src/components/IntegrationsSection.tsx
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importar hook
import integrationsAnimationData from '../assets/integrations-lottie.json';
import { Check, ArrowRight } from 'lucide-react';

// 2. Definir las claves para los ejemplos de integración
const integrationExampleKeys = [
  'integrations.examples.e1',
  'integrations.examples.e2',
  'integrations.examples.e3',
  'integrations.examples.e4',
  'integrations.examples.e5',
];

const IntegrationsSection = () => {
  const { t } = useTranslation(); // 3. Inicializar hook
  const lottieIntegrationsRef = useRef<LottieRefCurrentProps>(null);

  const handleHowItWorksClick = () => {
    console.log('"How it works?" button clicked. Implement desired action.');
  };

  return (
    <section id="integrations" className="py-16 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Columna Izquierda: Animación Lottie */}
          <motion.div
            className="w-full max-w-md mx-auto md:mx-0 md:max-w-full" 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Lottie
              lottieRef={lottieIntegrationsRef}
              animationData={integrationsAnimationData}
              loop={true} 
              autoplay={true} 
              style={{ width: '100%', height: 'auto' }} 
            />
          </motion.div>

          {/* Columna Derecha: Contenido de Texto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* 4. Usar la función t() para traducir */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-6 leading-tight">
              {t('integrations.title')}
            </h2>
            <p className="text-lg text-[#0D1B2A]/80 mb-8 leading-relaxed">
              {t('integrations.description')}
            </p>
            <ul className="space-y-3 mb-10">
              {integrationExampleKeys.map((key, index) => (
                <li key={index} className="flex items-start">
                  <Check size={22} className="text-[#1C7ED6] mr-3 mt-[3px] flex-shrink-0" strokeWidth={3}/>
                  <span className="text-md text-[#0D1B2A]/90">{t(key)}</span>
                </li>
              ))}
            </ul>
            
            <div>
              <button 
                onClick={handleHowItWorksClick}
                className="bg-[#1C7ED6] hover:bg-[#1565C0] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50 inline-flex items-center group"
              >
                {t('integrations.ctaButton')}
                <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;