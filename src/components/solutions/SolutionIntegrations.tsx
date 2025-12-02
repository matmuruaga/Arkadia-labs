// src/components/solutions/SolutionIntegrations.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Plug, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SolutionIntegrations as SolutionIntegrationsType } from '@/data/solutions/types';
import { trackCtaClick } from '@/utils/dataLayer';
import { allIntegrations } from '@/data/integrations.data';

// Build integration logos map from the source of truth
const integrationLogos: Record<string, { name: string; logo: string }> = {};

// Map allIntegrations to our format
allIntegrations.forEach((integration) => {
  // Extract clean name from nameKey (e.g., 'integrations.hubspot.name' -> 'HubSpot')
  const nameParts = integration.nameKey.split('.');
  const rawName = nameParts[1] || integration.id;
  const displayName = rawName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  integrationLogos[integration.id] = {
    name: displayName,
    logo: integration.logoUrl,
  };
});

// Add custom integrations not in the main list
integrationLogos['webhooks'] = {
  name: 'GitHub',
  logo: 'https://cdn.brandfetch.io/github.com/w/512/h/502/symbol?c=1idlz7Gfw8u57og_9Pu',
};
integrationLogos['zapier'] = {
  name: 'Zapier',
  logo: 'https://cdn.brandfetch.io/zapier.com/w/400/h/400?c=1idlz7Gfw8u57og_9Pu',
};
integrationLogos['twilio'] = {
  name: 'Twilio',
  logo: 'https://cdn.brandfetch.io/twilio.com/w/512/h/512/symbol?c=1idlz7Gfw8u57og_9Pu',
};
integrationLogos['calendly'] = {
  name: 'Calendly',
  logo: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751366238/google_calendar_nqrijg.svg', // Using Google Calendar as placeholder
};

interface Props {
  data: SolutionIntegrationsType;
  solutionId: string;
}

const SolutionIntegrations: React.FC<Props> = ({ data, solutionId }) => {
  const { t, i18n } = useTranslation();

  const handleViewAllClick = () => {
    trackCtaClick('view_all_integrations', `solution_integrations_${solutionId}`, 'View All Integrations');
  };

  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full mb-4">
              <Plug className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t(`solutions.${solutionId}.integrations.badge`, 'Integrations')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t(`solutions.${solutionId}.integrations.title`, data.title)}
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t(`solutions.${solutionId}.integrations.subtitle`, data.subtitle)}
            </p>
          </motion.div>

          {/* Integrations Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-4 md:p-12 shadow-sm"
          >
            {/* Mobile: Single row with small icons */}
            <div className="flex md:hidden justify-center items-center gap-3 flex-wrap">
              {data.integrationIds.map((id, index) => {
                const integration = integrationLogos[id];
                if (!integration) return null;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop: Full grid */}
            <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-6">
              {data.integrationIds.map((id, index) => {
                const integration = integrationLogos[id];
                if (!integration) return null;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-16 h-16 mb-3 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110">
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors text-center">
                      {integration.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Link */}
            <div className="mt-6 md:mt-10 text-center border-t border-slate-100 pt-4 md:pt-8">
              <Link
                to={`/${i18n.language}/integrations`}
                onClick={handleViewAllClick}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
              >
                {t(`solutions.${solutionId}.integrations.viewAll`, 'View all 500+ integrations')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionIntegrations;
