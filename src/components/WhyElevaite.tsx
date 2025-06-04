// src/components/WhyElevaiteJourney.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Elige iconos de lucide-react que representen cada etapa
import { ClipboardList, Blocks, Rocket, Eye } from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    title: 'Understanding Your Needs',
    subtitle: 'Discovery & Strategic Alignment',
    Icon: ClipboardList,
    description: "We start with a deep dive into your unique business processes, challenges, and strategic goals. This collaborative discovery phase is crucial for ensuring your AI solution is perfectly aligned with your vision and delivers maximum impact.",
    visualDescription: "Abstract visual of data points converging or a focused lens highlighting key information. Colors: #D0BFFF, #1C7ED6 (subtle).",
    // Aquí iría tu componente SVG real o un <img>
    VisualComponent: () => <div className="w-full h-48 bg-[#D0BFFF]/20 rounded-lg flex items-center justify-center p-4 border border-[#D0BFFF]/50"><p className="text-sm text-[#0D1B2A]/60">Visual: Data Analysis / Discovery</p></div>,
    themeColor: '#D0BFFF', // Light Purple
  },
  {
    id: 2,
    title: 'Crafting Your Custom AI',
    subtitle: 'Tailored Development & Design',
    Icon: Blocks,
    description: "Our experts design and build your AI agents from the ground up, integrating sophisticated logic and custom workflows. We don't use off-the-shelf templates; this is about tailor-made intelligence specifically for your operational demands.",
    visualDescription: "Abstract visual of interlocking modules or clean, geometric blocks forming a structure. Colors: #1C7ED6, #69DB7C.",
    VisualComponent: () => <div className="w-full h-48 bg-[#1C7ED6]/10 rounded-lg flex items-center justify-center p-4 border border-[#1C7ED6]/50"><p className="text-sm text-[#0D1B2A]/60">Visual: AI Core / Module Assembly</p></div>,
    themeColor: '#1C7ED6', // Bright Blue
  },
  {
    id: 3,
    title: 'Seamless Integration & Growth',
    subtitle: 'Deployment & Continuous Optimization',
    Icon: Rocket,
    description: "We ensure your new AI agents are smoothly deployed into your existing ecosystem. Post-launch, we focus on continuous optimization, ensuring your AI learns, adapts, and scales with your business for ongoing efficiency gains.",
    visualDescription: "Abstract visual of a network expanding or an upward trending graph with data trails. Colors: #69DB7C, #1C7ED6.",
    VisualComponent: () => <div className="w-full h-48 bg-[#69DB7C]/10 rounded-lg flex items-center justify-center p-4 border border-[#69DB7C]/50"><p className="text-sm text-[#0D1B2A]/60">Visual: Network Growth / Optimization</p></div>,
    themeColor: '#69DB7C', // Green
  },
];

const WhyElevaiteJourney = () => {
  const [activeStep, setActiveStep] = useState(journeySteps[0].id);

  const currentStepData = journeySteps.find(step => step.id === activeStep);

  const handleSeeInAction = () => {
    console.log('See in Action clicked');
  };

  return (
    <section id="why-elevaite-journey" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-3">
            ¿Why ElevAIte?
          </h2>
          <p className="text-base md:text-lg text-[#0D1B2A]/70 uppercase tracking-wider font-semibold">
            Our Crafted Approach {/* "Features" renombrado para encajar con el concepto de viaje */}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Navegación de Pasos (Vertical en móvil, podría ser Horizontal en Desktop) */}
          <motion.div 
            className="lg:w-1/3 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {journeySteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4
                  ${activeStep === step.id 
                    ? `bg-[${step.themeColor}]/20 shadow-lg` 
                    : 'hover:bg-slate-100'
                  }`}
                style={activeStep === step.id ? { borderColor: step.themeColor, borderWidth: '2px', borderStyle: 'solid' } : { borderColor: 'transparent', borderWidth: '2px', borderStyle: 'solid' }}
              >
                <step.Icon 
                  size={28} 
                  className={activeStep === step.id ? `text-[${step.themeColor}]` : 'text-[#0D1B2A]/50'} 
                  strokeWidth={activeStep === step.id ? 2.5 : 2}
                />
                <div>
                  <h3 className={`text-lg font-semibold ${activeStep === step.id ? `text-[${step.themeColor}]` : 'text-[#0D1B2A]'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${activeStep === step.id ? `text-[${step.themeColor}]/80` : 'text-[#0D1B2A]/60'}`}>
                    {step.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Contenido del Paso Activo */}
          <motion.div 
            className="lg:w-2/3 "
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {currentStepData && (
                <motion.div
                  key={currentStepData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 bg-[#F1F3F5] rounded-xl shadow-xl" // Fondo para el contenido del paso
                >
                  <div className="mb-6">
                    <currentStepData.VisualComponent />
                    {/* <p className="text-xs text-center italic text-[#0D1B2A]/50 mt-2">{currentStepData.visualDescription}</p> */}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-3" style={{color: currentStepData.themeColor}}>
                    {currentStepData.title}
                  </h3>
                  <p className="text-[#0D1B2A]/80 leading-relaxed">
                    {currentStepData.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleSeeInAction}
            className="bg-[#1C7ED6] hover:bg-[#1565C0] text-white px-10 py-3.5 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50 flex items-center mx-auto gap-2"
          >
            <Eye size={20} strokeWidth={2.5}/>
            SEE IN ACTION
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyElevaiteJourney;