// src/pages/solutions/SolutionsIndexPage.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Phone, PhoneIncoming, ShoppingCart, UserCheck, CalendarCheck,
  Image, Share2, Cog, ArrowRight, Sparkles
} from 'lucide-react';
import { trackPageView, trackCtaClick } from '@/utils/dataLayer';
import { getAllSolutions } from '@/data/solutions';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'lead-validator': Phone,
  'sales-qualifier': PhoneIncoming,
  'sales-agent': ShoppingCart,
  'virtual-receptionist': UserCheck,
  'booking-agent': CalendarCheck,
  'content-creator': Image,
  'social-manager': Share2,
  'operations-agent': Cog,
};

// Category labels and colors
const categoryConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  outbound: {
    label: 'Sales & Outbound',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  inbound: {
    label: 'Customer Service',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  marketing: {
    label: 'Marketing & Content',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  operations: {
    label: 'Operations',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
};

// All available solutions (even those not yet fully implemented)
const allSolutions = [
  { id: 'lead-validator', category: 'outbound', available: true },
  { id: 'sales-qualifier', category: 'outbound', available: false },
  { id: 'sales-agent', category: 'outbound', available: false },
  { id: 'virtual-receptionist', category: 'inbound', available: false },
  { id: 'booking-agent', category: 'inbound', available: false },
  { id: 'content-creator', category: 'marketing', available: false },
  { id: 'social-manager', category: 'marketing', available: false },
  { id: 'operations-agent', category: 'operations', available: false },
];

const SolutionsIndexPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const availableSolutions = getAllSolutions();

  useEffect(() => {
    trackPageView(`/${i18n.language}/solutions`, 'AI Solutions | Arkadia Labs', i18n.language);
  }, [i18n.language]);

  const handleSolutionClick = (solutionId: string) => {
    trackCtaClick('solution_card_click', 'solutions_index', solutionId);
  };

  return (
    <>
      <Helmet>
        <title>{t('solutions.index.seo.title', 'AI Agents & Solutions | Arkadia Labs')}</title>
        <meta
          name="description"
          content={t('solutions.index.seo.description', 'Discover our suite of AI agents designed to automate sales, customer service, marketing, and operations. Transform your business with intelligent automation.')}
        />
        <link rel="canonical" href={`https://arkadialabs.io/${i18n.language}/solutions`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-sky-50/30 to-cyan-50/40 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-200/50 px-4 py-1.5 rounded-full mb-6"
            >
              <Sparkles className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-semibold text-slate-700">
                {t('solutions.index.badge', 'AI-Powered Solutions')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
            >
              {t('solutions.index.title', 'AI Agents That Work For You')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto"
            >
              {t('solutions.index.subtitle', 'Specialized AI agents designed to automate every aspect of your business. From sales outreach to customer support, we have a solution for you.')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Group by category */}
            {Object.entries(categoryConfig).map(([category, config]) => {
              const categorySolutions = allSolutions.filter(s => s.category === category);
              if (categorySolutions.length === 0) return null;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-16 last:mb-0"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`px-4 py-1.5 rounded-full ${config.bgColor}`}>
                      <span className={`text-sm font-semibold ${config.color}`}>
                        {t(`header.solutionsCategories.${category}`, config.label)}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySolutions.map((solution, index) => {
                      const IconComponent = iconMap[solution.id] || Cog;
                      const solutionData = availableSolutions.find(s => s.id === solution.id);

                      return (
                        <motion.div
                          key={solution.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          {solution.available ? (
                            <Link
                              to={`/${i18n.language}/solutions/${solution.id}`}
                              onClick={() => handleSolutionClick(solution.id)}
                              className="group block h-full"
                            >
                              <div className="relative bg-white border border-slate-200 rounded-2xl p-6 h-full hover:shadow-xl hover:border-sky-200 hover:-translate-y-1 transition-all duration-300">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 mb-5 group-hover:scale-110 transition-transform">
                                  <IconComponent className="h-7 w-7" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                                  {t(`header.solutionsItems.${solution.id.replace(/-/g, '')}.name`, solutionData?.hero.title || solution.id)}
                                </h3>

                                <p className="text-slate-600 mb-4">
                                  {t(`header.solutionsItems.${solution.id.replace(/-/g, '')}.description`, solutionData?.hero.description || '')}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-sky-600 font-medium group-hover:gap-3 transition-all">
                                  <span>{t('solutions.index.learnMore', 'Learn more')}</span>
                                  <ArrowRight className="h-4 w-4" />
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className="relative bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full opacity-60">
                              {/* Coming soon badge */}
                              <div className="absolute top-4 right-4 bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-1 rounded-full">
                                {t('solutions.index.comingSoon', 'Coming Soon')}
                              </div>

                              {/* Icon */}
                              <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 mb-5">
                                <IconComponent className="h-7 w-7" />
                              </div>

                              {/* Content */}
                              <h3 className="text-xl font-bold text-slate-500 mb-2">
                                {t(`header.solutionsItems.${solution.id.replace(/-([a-z])/g, (_, l) => l.toUpperCase())}.name`, solution.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}
                              </h3>

                              <p className="text-slate-400">
                                {t(`header.solutionsItems.${solution.id.replace(/-([a-z])/g, (_, l) => l.toUpperCase())}.description`, '')}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              {t('solutions.index.cta.title', "Can't Find What You Need?")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-white/80 mb-10"
            >
              {t('solutions.index.cta.subtitle', 'We build custom AI agents tailored to your specific business needs. Tell us about your challenges and we\'ll design the perfect solution.')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to={`/${i18n.language}/contact`}
                className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('solutions.index.cta.button', 'Talk to Our Team')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SolutionsIndexPage;
