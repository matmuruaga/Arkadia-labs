// src/components/WhyArkadia.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Blocks, Users, Rocket, TrendingUp } from 'lucide-react';

const journeyStepsData = [
  { id: 1, titleKey: 'whyElevaite.steps.s1.title', subtitleKey: 'whyElevaite.steps.s1.subtitle', descriptionKey: 'whyElevaite.steps.s1.description', Icon: ClipboardList, imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752406272/u5837542839_Dynamic_cinematic_scene_with_a_clear_visual_flow__9d915daa-29e1-44e7-9d8f-67f0c2cea8aa_3_1_jvwcnt.png', themeColor: '#D0BFFF' },
  { id: 2, titleKey: 'whyElevaite.steps.s2.title', subtitleKey: 'whyElevaite.steps.s2.subtitle', descriptionKey: 'whyElevaite.steps.s2.description', Icon: Blocks, imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752406271/u5837542839_A_high-end_3D_presentation._The_blue_robot_stands_c278517f-af98-4cfb-a270-1fe995c5ffcc_3_1_s3jpab.png', themeColor: '#1C7ED6' },
  { id: 3, titleKey: 'whyElevaite.steps.s3.title', subtitleKey: 'whyElevaite.steps.s3.subtitle', descriptionKey: 'whyElevaite.steps.s3.description', Icon: Users, imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752408609/u5837542839_a_high-end_3d_presentation_graphic_with_a_split-s_8659e140-4dc5-4d32-a3d8-c98253659116_2_magbpd.png', themeColor: '#69DB7C' },
  { id: 4, titleKey: 'whyElevaite.steps.s4.title', subtitleKey: 'whyElevaite.steps.s4.subtitle', descriptionKey: 'whyElevaite.steps.s4.description', Icon: Rocket, imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752406778/u5837542839_A_clean_3D_render_of_the_blue_robot_with_a_wide_j_c6685b39-2069-4650-b25d-7e519c60c282_0_mhqxiy.png', themeColor: '#1C7ED6' },
  { id: 5, titleKey: 'whyElevaite.steps.s5.title', subtitleKey: 'whyElevaite.steps.s5.subtitle', descriptionKey: 'whyElevaite.steps.s5.description', Icon: TrendingUp, imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752407519/u5837542839_In_a_3D_art_style_the_blue_robot_stands_proudly_i_1ce319e5-9405-4a83-a69a-de315d04921d_3_w90bzt.png', themeColor: '#D0BFFF' }
];

const WhyArkadia = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(journeyStepsData[0].id);
  const activeStepData = journeyStepsData.find(step => step.id === activeStep);

  return (
    <section id="why-arkadia" className="py-16 md:py-24 pb-24 md:pb-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-3">{t('whyElevaite.title')}</h2>
          <p className="text-base md:text-lg text-[#0D1B2A]/70 uppercase tracking-wider font-semibold">{t('whyElevaite.subtitle')}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Columna Izquierda (los botones) - Sin cambios */}
          <div className="lg:w-1/3 space-y-3">
            {journeyStepsData.map((step) => (
              <motion.button
                key={step.id} onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 border-2 ${activeStep === step.id ? `shadow-lg` : 'border-transparent hover:bg-slate-100'}`}
                style={activeStep === step.id ? { borderColor: step.themeColor, backgroundColor: `${step.themeColor}20` } : {}}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: (step.id - 1) * 0.05 }} viewport={{ once: true }}
              >
                <step.Icon size={28} style={{ color: activeStep === step.id ? step.themeColor : 'rgba(13, 27, 42, 0.5)' }} className="transition-colors duration-300 flex-shrink-0" strokeWidth={activeStep === step.id ? 2.5 : 2}/>
                <div>
                  <h3 className="text-lg font-semibold transition-colors duration-300" style={{ color: activeStep === step.id ? step.themeColor : '#0D1B2A' }}>{t(step.titleKey)}</h3>
                  <p className="text-sm transition-colors duration-300" style={{ color: activeStep === step.id ? `${step.themeColor}CC` : 'rgba(13, 27, 42, 0.6)' }}>{t(step.subtitleKey)}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* --- COLUMNA DERECHA - Crossfade fluido entre imágenes --- */}
          <div className="lg:w-2/3 relative min-h-[500px]">
            <AnimatePresence initial={false}>
              {activeStepData && (
                <motion.div
                  key={activeStepData.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 right-0"
                >
                  <div className="bg-[#F1F3F5] rounded-xl shadow-xl overflow-hidden">
                    {/* Imagen con aspect ratio fijo */}
                    <div className="relative w-full bg-gray-200" style={{ paddingBottom: '56.25%' }}>
                      <img
                        src={activeStepData.imageUrl}
                        alt={t(activeStepData.titleKey)}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    {/* Contenido del texto */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-semibold mb-3" style={{color: activeStepData.themeColor}}>
                        {t(activeStepData.titleKey)}
                      </h3>
                      <p className="text-[#0D1B2A]/80 leading-relaxed">
                        {t(activeStepData.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Spacer para mantener la altura mientras las imágenes hacen crossfade */}
            <div className="invisible">
              <div className="bg-[#F1F3F5] rounded-xl shadow-xl overflow-hidden">
                <div className="relative w-full bg-gray-200" style={{ paddingBottom: '56.25%' }}></div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-semibold mb-3">Placeholder</h3>
                  <p className="text-[#0D1B2A]/80 leading-relaxed">Placeholder text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyArkadia;