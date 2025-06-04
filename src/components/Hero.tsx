// src/components/Hero.tsx
import { motion } from 'framer-motion';
import AccumulatingTypingEffect, { PhraseWithEmoji } from './AccumulatingTypingEffect';
// El icono Brain ya no se usa para este botón, se reemplaza por la imagen.
// Si necesitas otros iconos de Lucide en otra parte, mantenlos.

const Hero = () => {
  const handleLetsTalkClick = () => {
    console.log("Floating button 'I'm ready to talk' clicked. Implement action.");
    // Lógica para chat, Calendly, etc.
  };

  const aiAgentPhrases: PhraseWithEmoji[] = [
    { emoji: "📈", text: "Marketing Agent driving growth..." },
    { emoji: "⚙️", text: "Automation Agent streamlining tasks..." },
    { emoji: "💁‍♀️", text: "Receptionist Agent managing inquiries..." },
    { emoji: "💼", text: "Sales AI Assistant boosting deals..." },
    { emoji: "💬", text: "Support Agent AI enhancing CX..." },
    { emoji: "📊", text: "Data Analyst Agent uncovering insights..." }
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 bg-[#F1F3F5] relative"
    >
      <div className="container mx-auto mt-10 md:mt-0">
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12"> {/* md:items-start para alinear con H1 */}
          
          {/* Columna de Texto (Izquierda) */}
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left pt-0 md:pt-2 lg:pt-4">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-6 text-[#0D1B2A] leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Beyond Off-the-Shelf: Get AI Agents{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF]">
                Crafted
              </span>
              {' '}For Your Business.
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-[#0D1B2A]/80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Automate complex tasks and achieve superior operational efficiency with truly personalized AI solutions.
            </motion.p>
          </div>

          {/* Columna del Elemento Visual (Derecha) - Typing Effect Box */}
          <motion.div 
            className="md:w-1/2 lg:w-2/5 w-full mt-6 md:mt-0 flex justify-center md:justify-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="w-full max-w-md xl:max-w-lg bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-200 min-h-[180px] sm:min-h-[220px] md:min-h-[260px] flex flex-col justify-start overflow-hidden">
              <AccumulatingTypingEffect
                phrases={aiAgentPhrases}
                lineClassName="text-lg sm:text-xl md:text-2xl text-[#0D1B2A] mb-1.5 font-mono"
                typingSpeed={80}
                pauseBetweenLines={1500}
                maxVisibleLines={4}
                cursorClassName="inline-block w-[2px] h-[1.2em] ml-1 bg-[#0D1B2A] animate-blink align-middle"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Conjunto de Botón Flotante Modificado */}
      <div 
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-4" // w-full y px-4 para que el texto no se corte en móviles
      >
        {/* Botón Circular Flotante con Gradiente e Imagen */}
        <motion.button
          onClick={handleLetsTalkClick}
          aria-label="Let's talk about AI solutions"
          // Gradiente de tu paleta, de Morado Claro a Azul Brillante
          className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#D0BFFF] to-[#1C7ED6] rounded-full flex items-center justify-center shadow-xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#B3A2FF]/70 transition-all duration-300 p-3 sm:p-4" // Padding para la imagen interna
          animate={{ y: [0, -8, 0] }} 
          transition={{
            duration: 2.0,          
            repeat: Infinity,     
            ease: "easeInOut",    
            repeatDelay: 0.2,
          }}
          whileHover={{ scale: 1.05 }} // Sutil efecto de escala al hover
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1749075688/technical-support_nzdkqo.png" 
            alt="Talk to AI expert" 
            className="w-full h-full object-contain" // Para que la imagen se ajuste bien
          />
        </motion.button>

        {/* Caja Gris Oscura con Texto Debajo */}
        <motion.div
          onClick={handleLetsTalkClick} 
          className="mt-3 bg-[#0D1B2A] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-md shadow-lg cursor-pointer hover:bg-opacity-90 transition-opacity"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} 
        >
          I'm ready to talk!
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;