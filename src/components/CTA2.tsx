import { motion } from "framer-motion";
import AnimatedLines from "../components/AnimatedLines";

const CTA2 = () => {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/hello-elevaitelabs/30min"
      });
    }
  };

  return (
    <section className="relative px-4 py-20 bg-[#0C0F3F] overflow-hidden text-center">
      <AnimatedLines />

      <motion.h2
        className="text-3xl md:text-5xl font-bold gradient-text mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Ready to Skyrocket Your Revenue?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <button
          onClick={openCalendly}
          className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 neon-border"
        >
          Book a Demo
        </button>
      </motion.div>
    </section>
  );
};

export default CTA2;
