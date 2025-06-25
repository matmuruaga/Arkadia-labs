// src/components/IntegrationsHero.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const backgroundImageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1750796289/Gradient__42_klhn8c.jpg';

export const IntegrationsHero = () => {
  const { t } = useTranslation();

  return (
    <section 
      className="relative w-full text-white text-center py-24 md:py-32 overflow-hidden"
    >
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="absolute inset-0 w-full h-full bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
        >
          {t('integrationsHero.title')}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-200"
        >
          {t('integrationsHero.subtitle')}
        </motion.p>
      </div>
    </section>
  );
};