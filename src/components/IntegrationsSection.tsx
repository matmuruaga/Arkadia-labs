// src/components/IntegrationsSection.tsx
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';
// AJUSTA ESTA LÍNEA CON EL NOMBRE Y RUTA DE TU ARCHIVO LOTTIE
import integrationsAnimationData from '../assets/integrations-lottie.json'; // Usando el nombre del archivo que subiste
import { Check, ArrowRight } from 'lucide-react'; // Añadido ArrowRight para el botón

const IntegrationsSection = () => {
  const lottieIntegrationsRef = useRef<LottieRefCurrentProps>(null);

  // English text content
  const sectionTitle = "Seamless Integrations: Connect Your Entire Ecosystem";
  const sectionDescription = "ElevAIte's AI agents are designed to operate at the heart of your existing tools. We natively integrate with your CRMs, communication platforms, calendars, and more, amplifying your workflows without disruption and boosting overall productivity.";
  const integrationExamples = [
    "Market-leading CRMs (Salesforce, HubSpot, etc.)",
    "Communication Platforms (Slack, Email, Microsoft Teams)",
    "Smart Calendar & Scheduling Tools",
    "Custom APIs & Internal Systems Integration",
    "Databases & Data Analysis Tools",
  ];

  const handleHowItWorksClick = () => {
    // Define la acción para este botón:
    // 1. Scroll a una sección: document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
    // 2. Navegar a otra página: window.location.href = '/how-it-works';
    // 3. Abrir un modal: (lógica para abrir modal)
    console.log('"How it works?" button clicked. Implement desired action.');
  };

  return (
    <section id="integrations" className="py-16 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Left Column: Lottie Animation */}
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

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-6 leading-tight">
              {sectionTitle}
            </h2>
            <p className="text-lg text-[#0D1B2A]/80 mb-8 leading-relaxed">
              {sectionDescription}
            </p>
            <ul className="space-y-3 mb-10"> {/* Añadido margen inferior a la lista */}
              {integrationExamples.map((example, index) => (
                <li key={index} className="flex items-start">
                  <Check size={22} className="text-[#1C7ED6] mr-3 mt-[3px] flex-shrink-0" strokeWidth={3}/>
                  <span className="text-md text-[#0D1B2A]/90">{example}</span>
                </li>
              ))}
            </ul>
            
            {/* Nuevo Botón CTA "How it works?" */}
            <div>
              <button 
                onClick={handleHowItWorksClick}
                className="bg-[#1C7ED6] hover:bg-[#1565C0] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50 inline-flex items-center group"
              >
                How it works?
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