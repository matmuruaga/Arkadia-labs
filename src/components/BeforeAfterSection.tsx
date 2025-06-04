// src/components/BeforeAfterSection.tsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

// Ensure this path and filename are correct for your Lottie JSON
import fireworksAnimationData from '../assets/fireworks-animation.json'; // Using the uploaded filename

import { XCircle, CheckCircle2, ListChecks, Bot, BarChartHorizontalBig, Users } from 'lucide-react';

const beforeAfterData = [
  {
    beforeTitle: 'Reactive Task Management',
    beforeDescription: 'Endless lists, missed deadlines, and constant oversights due to a lack of proactive insight.',
    beforeIcon: XCircle,
    afterTitle: 'AI-Powered Task Planner',
    afterDescription: 'Automatic task creation and prioritization. Your agent ensures nothing slips and optimizes your workflow.',
    afterIcon: CheckCircle2,
  },
  {
    beforeTitle: 'Rigid Operational Processes',
    beforeDescription: 'Manual, error-prone workflows that are difficult to follow and consume valuable time.',
    beforeIcon: ListChecks,
    afterTitle: 'AI-Powered Process Orchestrator',
    afterDescription: 'Flexible automation of complex workflows based on your SOPs, dynamically adapting to needs.',
    afterIcon: CheckCircle2,
  },
  {
    beforeTitle: 'Fragmented Data Analysis',
    beforeDescription: 'Hours spent collecting and cross-referencing information, resulting in delayed reports.',
    beforeIcon: BarChartHorizontalBig,
    afterTitle: 'AI-Powered Analytics Assistant',
    afterDescription: 'Real-time data aggregation, processing, and visualization for instant, informed decisions.',
    afterIcon: CheckCircle2,
  },
  {
    beforeTitle: 'Generic Customer Support',
    beforeDescription: 'Slow, standardized responses that fail to address specific customer needs effectively.',
    beforeIcon: Users,
    afterTitle: 'Personalized AI Support Agents',
    afterDescription: '24/7 instant, contextual, and personalized support that elevates customer satisfaction.',
    afterIcon: CheckCircle2,
  }
];

const BeforeAfterSection = () => {
  const lottieSolutionsRef = useRef<LottieRefCurrentProps>(null);

  const handleAutomateProcesses = () => {
    console.log('Button "Automate Your Processes" clicked');
    // Example action: window.location.href = '/get-started';
  };

  const playFireworks = () => {
    lottieSolutionsRef.current?.stop();
    lottieSolutionsRef.current?.play();
  };

  const stopFireworks = () => {
    // Optional: lottieSolutionsRef.current?.stop();
  };

  return (
    <section 
      id="before-after" 
      className="py-16 md:py-24 bg-[#D0BFFF]/20" // Light purple tint background
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            The ElevAIte Transformation: Before & After
          </h2>
          <p className="text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">
            Discover how our custom AI agents outperform traditional tools and boost your operational efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* "Before" Column */}
          <motion.div 
            className="bg-slate-100 p-6 md:p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#0D1B2A]/80 mb-6 text-center">The Manual Challenge</h3>
            <ul className="space-y-6">
              {beforeAfterData.map((item, index) => (
                <li key={`before-${index}`} className="flex items-start gap-3">
                  <item.beforeIcon className="text-slate-400 mt-1 flex-shrink-0" size={22} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-semibold text-[#0D1B2A]">{item.beforeTitle}</h4>
                    <p className="text-sm text-[#0D1B2A]/70">{item.beforeDescription}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* "After" Column - WITH LOTTIE ANIMATION ON HOVER */}
          <motion.div 
            className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-2 border-[#1C7ED6] relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onHoverStart={playFireworks}
            onHoverEnd={stopFireworks}
          >
            {/* Lottie Animation Container - Behind content */}
            <div
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center"
            >
              <Lottie
                lottieRef={lottieSolutionsRef}
                animationData={fireworksAnimationData} // Using the imported Lottie JSON
                loop={false}
                autoplay={false}
                style={{ 
                  width: '120%', 
                  height: '120%',
                  maxWidth: '400px', 
                  opacity: 0.6,     
                }}
                onComplete={() => {
                  lottieSolutionsRef.current?.stop();
                }}
              />
            </div>
            
            {/* Content of "After" Column - Above Lottie animation */}
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-semibold text-[#1C7ED6] mb-6 text-center">The ElevAIte Solution</h3>
              <ul className="space-y-6">
                {beforeAfterData.map((item, index) => (
                  <li key={`after-${index}`} className="flex items-start gap-3">
                    <item.afterIcon className="text-[#69DB7C] mt-1 flex-shrink-0" size={22} strokeWidth={2} /> 
                    <div>
                      <h4 className="font-semibold text-[#0D1B2A]">{item.afterTitle}</h4>
                      <p className="text-sm text-[#0D1B2A]/70">{item.afterDescription}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4}} // From original BeforeAfterSection
          viewport={{ once: true }}
        >
          <button
            onClick={handleAutomateProcesses}
            className="bg-[#1C7ED6] hover:bg-[#1565C0] text-white px-10 py-3.5 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50"
          >
            Automate Your Processes
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;