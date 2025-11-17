// src/components/LogoCloud.tsx
import Marquee from "react-fast-marquee";
import { allIntegrationsLogos } from "../data/integrations";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const LogoCloud = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-50 py-16 md:py-20">
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('logoCloud.title')}</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('logoCloud.subtitle')}
          </p>
        </motion.div>
      
      <Marquee
        gradient={true}
        gradientColor="#F8FAFC"
        gradientWidth={100}
        speed={40}
        pauseOnHover={true}
      >
        {allIntegrationsLogos.map((logo) => (
          <div key={logo.id} className="mx-6 bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex items-center justify-center h-24 w-24">
            {/* Renderizamos el componente Icon directamente */}
            <logo.Icon className="h-10 w-10 text-gray-600" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};