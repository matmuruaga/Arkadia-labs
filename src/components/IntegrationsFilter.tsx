import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { allIntegrations, type Integration } from '../data/integrations.data';

const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => {
  const { t } = useTranslation();

  return (
    <div className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl hover:border-[#1C7ED6] hover:shadow-lg transition-all duration-300 min-h-[170px]">
      <div className="flex-shrink-0">
        <img src={integration.logoUrl} alt={t(integration.nameKey)} className="h-14 w-14 object-contain" />
      </div>
      <div className="mt-4 flex-grow">
        <h3 className="text-lg font-bold text-[#0D1B2A]">{t(integration.nameKey)}</h3>
        {integration.descriptionKey && <p className="mt-1 text-sm text-gray-600">{t(integration.descriptionKey)}</p>}
      </div>
    </div>
  );
};

const CategoryFilter: React.FC<{
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}> = ({ categories, selectedCategory, onSelectCategory }) => {
  const { t } = useTranslation();

  return (
    <aside className="w-full md:w-60 lg:w-64 flex-shrink-0">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">{t('integrations.categoriesTitle')}</h3>
      <ul className="space-y-1">
        <li>
          <button onClick={() => onSelectCategory('Todas')} className={`flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 ${selectedCategory === 'Todas' ? 'text-[#1C7ED6] bg-[#1C7ED6]/10' : 'text-gray-600 hover:text-[#1C7ED6] hover:bg-gray-50'}`}>
            <span className="flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full border-gray-400">
              {selectedCategory === 'Todas' && <span className="w-2 h-2 bg-[#1C7ED6] rounded-full"></span>}
            </span>
            {t('integrations.allApplications')}
          </button>
        </li>
        {categories.map(categoryKey => (
          <li key={categoryKey}>
            <button onClick={() => onSelectCategory(categoryKey)} className={`flex items-center w-full text-left p-2 rounded-md transition-colors duration-200 ${selectedCategory === categoryKey ? 'text-[#1C7ED6] bg-[#1C7ED6]/10' : 'text-gray-600 hover:text-[#1C7ED6] hover:bg-gray-50'}`}>
              <span className="flex items-center justify-center w-5 h-5 mr-3 border-2 rounded-full border-gray-400">
                {selectedCategory === categoryKey && <span className="w-2 h-2 bg-[#1C7ED6] rounded-full"></span>}
              </span>
              {t(`categories.${categoryKey}`)}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const ITEMS_PER_PAGE = 16;

interface IntegrationsFilterProps {
  searchQuery: string;
}

const IntegrationsFilter: React.FC<IntegrationsFilterProps> = ({ searchQuery }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
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
    <div className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{t('integrations.count', { count: filteredIntegrations.length })}</p>
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
                  className="bg-[#1C7ED6] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#155CB0] transition-colors duration-300"
                >
                  {t('integrations.showMore')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsFilter;