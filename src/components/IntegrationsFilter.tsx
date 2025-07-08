import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importar el hook de traducción
import { allIntegrations, type Integration } from '../data/integrations.data';

// --- Sub-componentes ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// 2. Modificar la tarjeta para que use el hook de traducción
const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation(); // Hook para traducir

  return (
    <div className="group flex flex-col p-6 bg-slate-800/50 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-purple-500 transition-all duration-300 min-h-[170px]">
      <div className="flex-shrink-0">
        <img src={integration.logoUrl} alt={t(integration.nameKey)} className="h-14 w-14 object-contain" />
      </div>
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-bold text-white">{t(integration.nameKey)}</h3>
        {integration.descriptionKey && <p className="mt-1 text-sm text-gray-400">{t(integration.descriptionKey)}</p>}
      </div>
    </div>
  );
};

// 3. Modificar el filtro de categorías
const CategoryFilter: React.FC<{
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, selectedCategory, onSelectCategory }) => {
  const { t } = useTranslation();

  return (
    <aside className="w-full md:w-60 lg:w-64 flex-shrink-0">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{t('integrations.categoriesTitle')}</h3>
      <ul className="space-y-1">
        <li>
          <button onClick={() => onSelectCategory('Todas')} className={`flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 ${selectedCategory === 'Todas' ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
            <span className="flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full border-gray-500">
              {selectedCategory === 'Todas' && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
            </span>
            {t('integrations.allApplications')}
          </button>
        </li>
        {categories.map(categoryKey => (
          <li key={categoryKey}>
            <button onClick={() => onSelectCategory(categoryKey)} className={`flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 ${selectedCategory === categoryKey ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-slate-800'}`}>
              <span className="flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full border-gray-500">
                {selectedCategory === categoryKey && <span className="w-2 h-2 bg-purple-500 rounded-full"></span>}
              </span>
              {t(`categories.${categoryKey}`)}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

// --- Componente Principal ---
const ITEMS_PER_PAGE = 16;

const IntegrationsFilter: React.FC = () => {
  const { t } = useTranslation(); // Hook principal para títulos y párrafos
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const categories = useMemo(() =>
    [...new Set(allIntegrations.map(i => i.categoryKey))].sort(),
    []
  );

  const filteredIntegrations = useMemo(() => {
    return allIntegrations
      .filter(integration =>
        selectedCategory === 'Todas' || integration.categoryKey === selectedCategory
      )
      .filter(integration =>
        t(integration.nameKey).toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [selectedCategory, searchQuery, t]);
  
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedCategory, searchQuery]);

  const integrationsToShow = filteredIntegrations.slice(0, visibleCount);

  return (
    <div className="bg-slate-900 text-gray-300 min-h-screen">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight title-gradient">
            {t('integrations.title')}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            {t('integrations.subtitle')}
          </p>
          <div className="relative mt-8 max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder={t('integrations.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400">{t('integrations.count', { count: filteredIntegrations.length })}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {integrationsToShow.map(integration => (
                <IntegrationCard key={integration.id} integration={integration} />
              ))}
            </div>
            
            {visibleCount < filteredIntegrations.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE)}
                  className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  {t('integrations.showMore')}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntegrationsFilter;