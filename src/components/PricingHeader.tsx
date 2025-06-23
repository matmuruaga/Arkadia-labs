// src/components/PricingHeader.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // 1. Importar

const PricingHeader = () => {
  const { t } = useTranslation(); // 2. Inicializar

  return (
    // La sección completa del encabezado ahora vive en este componente
    <section className="py-20 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 3. Usar la función t() */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] mb-4">
            {t('pricing.header.title')}
          </h1>
          <p className="text-lg md:text-xl text-[#0D1B2A]/75 max-w-3xl mx-auto">
            {t('pricing.header.subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHeader;