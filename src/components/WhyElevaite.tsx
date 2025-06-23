// src/components/WhyElevaite.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Blocks, Users, Rocket, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Importar el hook

const journeyStepsData = [
  {
    id: 1,
    titleKey: 'whyElevaite.steps.s1.title',
    subtitleKey: 'whyElevaite.steps.s1.subtitle',
    descriptionKey: 'whyElevaite.steps.s1.description',
    Icon: ClipboardList,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749457637/u5837542839_Minimalist_3D_abstract_art_data_visualization_of__0feee8c7-ee56-45dd-8238-e3fab362ce8e_0_eryjst.png', 
    themeColor: '#D0BFFF',
  },
  {
    id: 2,
    titleKey: 'whyElevaite.steps.s2.title',
    subtitleKey: 'whyElevaite.steps.s2.subtitle',
    descriptionKey: 'whyElevaite.steps.s2.description',
    Icon: Blocks,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749457637/u5837542839_A_3D_illustration_of_abstract_geometric_blocks_an_94647f7b-8b15-4554-b25a-76a96263bfa5_1_se69bp.png',
    themeColor: '#1C7ED6',
  },
  {
    id: 3,
    titleKey: 'whyElevaite.steps.s3.title',
    subtitleKey: 'whyElevaite.steps.s3.subtitle',
    descriptionKey: 'whyElevaite.steps.s3.description',
    Icon: Users,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749474803/u5837542839_A_highly_detailed_3D_illustration_in_a_minimalist_e14be8a9-7360-4d9f-98cf-5bef51259afc_0_ivn7jx.png',
    themeColor: '#69DB7C',
  },
  {
    id: 4,
    titleKey: 'whyElevaite.steps.s4.title',
    subtitleKey: 'whyElevaite.steps.s4.subtitle',
    descriptionKey: 'whyElevaite.steps.s4.description',
    Icon: Rocket,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749457637/u5837542839_A_dynamic_3D_abstract_illustration_symbolizing_bu_10e8516b-f41c-4970-ab35-ca6c542d358c_0_yanqtx.png',
    themeColor: '#1C7ED6',
  },
  {
    id: 5,
    titleKey: 'whyElevaite.steps.s5.title',
    subtitleKey: 'whyElevaite.steps.s5.subtitle',
    descriptionKey: 'whyElevaite.steps.s5.description',
    Icon: TrendingUp,
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749475263/u5837542839_A_friendly_3D_illustration_in_a_minimalist_corpor_14637264-df72-425d-a6db-2ab9dce0fd74_1_nf4n6i.png',
    themeColor: '#D0BFFF',
  }
];

const WhyElevaite = () => {
  const { t } = useTranslation(); // 2. Inicializar el hook
  const [activeStep, setActiveStep] = useState(journeyStepsData[0].id);
  
  // Encontrar los datos del paso activo usando el id
  const activeStepData = journeyStepsData.find(step => step.id === activeStep);

  return (
    <section id="why-elevaite" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* 3. Usar la función t() para traducir */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-3">
            {t('whyElevaite.title')}
          </h2>
          <p className="text-base md:text-lg text-[#0D1B2A]/70 uppercase tracking-wider font-semibold">
            {t('whyElevaite.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="lg:w-1/3 space-y-3">
            {journeyStepsData.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 border-2
                  ${activeStep === step.id 
                    ? `shadow-lg` 
                    : 'border-transparent hover:bg-slate-100'
                  }`}
                style={activeStep === step.id ? { borderColor: step.themeColor, backgroundColor: `${step.themeColor}20` } : {}}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: (step.id - 1) * 0.05 }}
                viewport={{ once: true }}
              >
                <step.Icon 
                  size={28} 
                  style={{ color: activeStep === step.id ? step.themeColor : 'rgba(13, 27, 42, 0.5)' }} 
                  className="transition-colors duration-300 flex-shrink-0"
                  strokeWidth={activeStep === step.id ? 2.5 : 2}
                />
                <div>
                  <h3 className="text-lg font-semibold transition-colors duration-300" style={{ color: activeStep === step.id ? step.themeColor : '#0D1B2A' }}>
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-sm transition-colors duration-300" style={{ color: activeStep === step.id ? `${step.themeColor}CC` : 'rgba(13, 27, 42, 0.6)' }}>
                    {t(step.subtitleKey)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {activeStepData && (
                <motion.div
                  key={activeStepData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#F1F3F5] rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={activeStepData.imageUrl}
                      alt={t(activeStepData.titleKey)} // Usar texto traducido para el alt
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-semibold mb-3" style={{color: activeStepData.themeColor}}>
                      {t(activeStepData.titleKey)}
                    </h3>
                    <p className="text-[#0D1B2A]/80 leading-relaxed">
                      {t(activeStepData.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyElevaite;