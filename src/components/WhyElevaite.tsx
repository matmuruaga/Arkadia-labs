// src/components/WhyElevaite.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Añadidos los nuevos iconos
import { ClipboardList, Blocks, Users, Rocket, TrendingUp } from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    title: 'Understanding Your Needs',
    subtitle: 'Discovery & Strategic Alignment',
    Icon: ClipboardList,
    description: "We start with a deep dive into your unique business processes, challenges, and strategic goals. This collaborative discovery phase is crucial for ensuring your AI solution is perfectly aligned with your vision and delivers maximum impact.",
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749457637/u5837542839_Minimalist_3D_abstract_art_data_visualization_of__0feee8c7-ee56-45dd-8238-e3fab362ce8e_0_eryjst.png', 
    themeColor: '#D0BFFF', // Purple
  },
  {
    id: 2,
    title: 'Crafting Your Custom AI',
    subtitle: 'Tailored Development & Design',
    Icon: Blocks,
    description: "Our experts design and build your AI agents from the ground up, integrating sophisticated logic and custom workflows. We don't use off-the-shelf templates; this is about tailor-made intelligence specifically for your operational demands.",
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749457637/u5837542839_A_3D_illustration_of_abstract_geometric_blocks_an_94647f7b-8b15-4554-b25a-76a96263bfa5_1_se69bp.png',
    themeColor: '#1C7ED6', // Blue
  },
  { // --- NUEVO PASO 3 ---
    id: 3,
    title: 'Onboarding & Training',
    subtitle: 'Empowering Your Team for Success',
    Icon: Users,
    description: "We don't just hand over the technology. We provide comprehensive onboarding for your team to ensure everyone knows how to leverage the new AI agents effectively and track their performance from day one.",
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749474803/u5837542839_A_highly_detailed_3D_illustration_in_a_minimalist_e14be8a9-7360-4d9f-98cf-5bef51259afc_0_ivn7jx.png', // <-- REEMPLAZA ESTO
    themeColor: '#69DB7C', // Green
  },
  { // Antiguo paso 3, ahora es el 4
    id: 4,
    title: 'Boosting Your Performance',
    subtitle: 'Integration & Impact',
    Icon: Rocket,
    description: "The final step is seamlessly integrating the AI into your environment and measuring its impact. We ensure a smooth launch and provide ongoing support to maximize your ROI and drive continuous improvement.",
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749457637/u5837542839_A_dynamic_3D_abstract_illustration_symbolizing_bu_10e8516b-f41c-4970-ab35-ca6c542d358c_0_yanqtx.png',
    themeColor: '#1C7ED6', // Reutilizando el Azul
  },
  { // --- NUEVO PASO 5 ---
    id: 5,
    title: 'Optimization & Scaling',
    subtitle: 'A Partnership for Continuous Growth',
    Icon: TrendingUp,
    description: "Our partnership extends beyond launch. We continuously monitor your AI agents' performance, providing optimizations and strategic recommendations to ensure your solutions scale seamlessly as your business grows.",
    imageUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1749475263/u5837542839_A_friendly_3D_illustration_in_a_minimalist_corpor_14637264-df72-425d-a6db-2ab9dce0fd74_1_nf4n6i.png', // <-- REEMPLAZA ESTO
    themeColor: '#D0BFFF', // Reutilizando el Morado
  }
];

// El nombre del componente coincide con el de tu archivo
const WhyElevaite = () => {
  const [activeStep, setActiveStep] = useState(journeySteps[0].id);
  const currentStepData = journeySteps.find(step => step.id === activeStep);

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-3">
          The ElevAIte Launchpad: Your Journey to Automation
          </h2>
          <p className="text-base md:text-lg text-[#0D1B2A]/70 uppercase tracking-wider font-semibold">
            Our Crafted Approach
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Navegación de Pasos (Ahora 5) */}
          <div className="lg:w-1/3 space-y-3">
            {journeySteps.map((step) => (
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
                transition={{ duration: 0.5, delay: (step.id -1) * 0.05 }} // Ajustado delay para 5 items
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
                    {step.title}
                  </h3>
                  <p className="text-sm transition-colors duration-300" style={{ color: activeStep === step.id ? `${step.themeColor}CC` : 'rgba(13, 27, 42, 0.6)' }}>
                    {step.subtitle}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Contenido del Paso Activo */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {currentStepData && (
                <motion.div
                  key={currentStepData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#F1F3F5] rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={currentStepData.imageUrl}
                      alt={currentStepData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-semibold mb-3" style={{color: currentStepData.themeColor}}>
                      {currentStepData.title}
                    </h3>
                    <p className="text-[#0D1B2A]/80 leading-relaxed">
                      {currentStepData.description}
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