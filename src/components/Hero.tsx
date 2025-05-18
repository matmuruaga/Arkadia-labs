import { motion } from 'framer-motion';
import AnimatedLines from '../components/AnimatedLines';

const Hero = () => {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/hello-elevaitelabs/30min"
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skyrocket Your Revenue with Adaptive AI Systems
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Close more deals, scale faster, and dominate your market with custom-built AI sales employees.
        </motion.p>
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={openCalendly}
            className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 neon-border"
          >
            Book a Call
          </button>
          <p className="text-gray-400">See Our AI Systems in Action.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
