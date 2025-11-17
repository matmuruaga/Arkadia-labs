// src/components/IntegrationsHero.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const backgroundImageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1750796289/Gradient__42_klhn8c.jpg';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

interface IntegrationsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const IntegrationsHero = ({ searchQuery, onSearchChange }: IntegrationsHeroProps) => {
  const { t } = useTranslation();

  return (
    <section
      className="relative w-full text-white text-center py-16 md:py-24 overflow-hidden"
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
          className="text-lg md:text-xl text-gray-200 mb-8"
        >
          {t('integrationsHero.subtitle')}
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={t('integrations.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition"
          />
        </motion.div>
      </div>
    </section>
  );
};