// src/components/IntegrationsSection.tsx
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // 1. Importamos useNavigate
import integrationsAnimationData from '../assets/integrations-lottie.json';
import { Check, ArrowRight } from 'lucide-react';

const integrationExampleKeys = [
  'integrationsComponent.examples.e1',
  'integrationsComponent.examples.e2',
  'integrationsComponent.examples.e3',
  'integrationsComponent.examples.e4',
  'integrationsComponent.examples.e5',
];

const IntegrationsSection = () => {
  const { t, i18n } = useTranslation('home');
  const navigate = useNavigate(); // 2. Inicializamos el hook
  const lottieIntegrationsRef = useRef<LottieRefCurrentProps>(null);

  // 3. Modificamos la función para que redirija a la página de integraciones
  const handleBrowseIntegrationsClick = () => {
    navigate(`/${i18n.language}/integrations`);
  };

  return (
    <section id="integrations" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100">
      {/* Geometric decorative background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Hexagonal grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0 L45 0 L60 26 L45 52 L15 52 L0 26Z' stroke='%230ea5e9' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 52px',
          }}
        />
        {/* Cross-hatch fine lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L40 40 M40 0 L0 40' stroke='%2314b8a6' stroke-width='0.4' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Top-right geometric glow */}
        <div
          className="absolute -top-10 -right-10 w-[500px] h-[500px] opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(14, 165, 233, 0.18) 0%, transparent 65%)' }}
        />
        {/* Bottom-left geometric glow */}
        <div
          className="absolute -bottom-10 -left-10 w-[450px] h-[450px] opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(20, 184, 166, 0.15) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
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

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-6 leading-tight">
              {t('integrationsComponent.title')}
            </h2>
            <p className="text-lg text-[#0D1B2A]/80 mb-8 leading-relaxed">
              {t('integrationsComponent.description')}
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
              {/* 4. Conectamos la nueva función al onClick del botón */}
              <button 
                onClick={handleBrowseIntegrationsClick}
                className="bg-[#1C7ED6] hover:bg-[#1565C0] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50 inline-flex items-center group"
              >
                {t('integrationsComponent.ctaButton')}
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