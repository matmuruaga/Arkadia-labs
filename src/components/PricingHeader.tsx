// src/components/PricingHeader.tsx
import { motion } from 'framer-motion';

const PricingHeader = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] mb-4">
            Find the Perfect AI Partner for Your Business
          </h1>
          <p className="text-lg md:text-xl text-[#0D1B2A]/75 max-w-3xl mx-auto">
            Simple, transparent pricing to help you scale. Choose the plan that fits your growth ambitions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHeader;