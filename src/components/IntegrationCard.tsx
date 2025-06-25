// src/components/IntegrationCard.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Integration } from '../data/integrations';

interface IntegrationCardProps {
  integration: Integration;
}

export const IntegrationCard = ({ integration }: IntegrationCardProps) => {
  const navigate = useNavigate();
  // Ahora también necesitamos la función t()
  const { t, i18n } = useTranslation();
  
  // Extraemos las claves del objeto de integración
  const { Icon, nameKey, descriptionKey } = integration;

  const handleGetStarted = () => {
    navigate(`/${i18n.language}/contact`);
  };

  return (
    <motion.div 
      className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 text-center flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      <Icon className="h-12 w-12 mx-auto mb-4 text-gray-700" />
      {/* Usamos t() para mostrar el texto traducido */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{t(nameKey)}</h3>
      {descriptionKey && (
        <p className="text-gray-600 text-sm flex-grow mb-6">{t(descriptionKey)}</p>
      )}
      <button 
        onClick={handleGetStarted}
        className="mt-auto bg-slate-200 text-slate-700 font-semibold px-6 py-2 rounded-lg hover:bg-slate-300 transition-colors"
      >
        {t('integrationCard.cta')}
      </button>
    </motion.div>
  );
};