// src/components/FinalCtaSection.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

// --- DEFINICIÓN DE DATOS ---
// Esta constante se define aquí, FUERA del componente.
// Esto asegura que siempre esté disponible y no se recree innecesariamente.
const cyclingWords = [
  { text: "Sales", colorClass: "from-[#1C7ED6] to-[#69DB7C]" },
  { text: "Marketing", colorClass: "from-[#69DB7C] to-[#D0BFFF]" },
  { text: "Operations", colorClass: "from-[#D0BFFF] to-[#1C7ED6]" },
  { text: "Support", colorClass: "from-[#1C7ED6] to-[#D0BFFF]" },
  { text: "Growth", colorClass: "from-[#69DB7C] to-[#1C7ED6]" }
];

const FinalCtaSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []); // El array vacío es correcto para que el intervalo se configure una sola vez.

  const handlePrimaryCtaClick = () => {
    console.log("Primary CTA clicked - e.g., Get Your Custom AI Solution");
  };

  const handleSecondaryCtaClick = () => {
    console.log("Secondary CTA clicked - e.g., Book a Consultation");
  };

  // Define los colores para el resplandor del hover
  const purpleGlow = 'rgba(208, 191, 255, 0.4)'; // #D0BFFF
  const blueGlow = 'rgba(28, 126, 214, 0.3)';    // #1C7ED6
  const greenGlow = 'rgba(105, 219, 124, 0.3)';   // #69DB7C

  return (
    <section id="final-cta" className="py-20 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* La CÁPSULA con efecto de retroiluminación optimizado */}
        <motion.div
          className="relative"
          initial="initial"
          whileHover="hover"
        >
          {/* El Resplandor (Glow) */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-2 sm:-inset-4 md:-inset-6 bg-gradient-to-br from-[#D0BFFF] via-[#1C7ED6] to-[#69DB7C] rounded-[3rem] blur-2xl -z-10"
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              hover: { opacity: 0.7, scale: 1.05 }
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          {/* La Cápsula de Contenido */}
          <div 
            className="relative z-10 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-xl 
                       bg-gradient-to-br from-violet-100 via-sky-100 to-emerald-100"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1B2A] leading-tight mb-10">
              <div className="flex flex-col items-center">
                <span>Supercharge Your</span>
                <div 
                  className="relative my-1"
                  style={{ height: '1.2em' }} 
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={cyclingWords[currentIndex].text}
                      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${cyclingWords[currentIndex].colorClass}`}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {cyclingWords[currentIndex].text}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span>with Crafted AI Agents</span>
              </div>
            </h2>

            <p className="text-lg md:text-xl text-[#0D1B2A]/75 max-w-2xl mx-auto mb-10">
              Ready to unlock unprecedented efficiency and scale with AI agents built for your unique business needs? Let's build your future, together.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <button
                onClick={handlePrimaryCtaClick}
                className="w-full sm:w-auto bg-[#1C7ED6] hover:bg-[#155CB0] text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#1C7ED6]/30 flex items-center justify-center gap-2"
              >
                Get Your Custom AI Solution
                <ArrowRight size={20} strokeWidth={2.5}/>
              </button>
              <button
                onClick={handleSecondaryCtaClick}
                className="w-full sm:w-auto border-2 border-[#0D1B2A]/30 hover:border-[#1C7ED6] text-[#0D1B2A] hover:text-[#1C7ED6] px-8 py-3.5 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-[#1C7ED6]/10 focus:outline-none focus:ring-4 focus:ring-[#1C7ED6]/20 flex items-center justify-center gap-2"
              >
                 <MessageCircle size={20} strokeWidth={2.5}/>
                Book a Consultation
              </button>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default FinalCtaSection;