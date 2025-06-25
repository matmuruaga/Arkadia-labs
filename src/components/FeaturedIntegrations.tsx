// src/components/FeaturedIntegrations.tsx
import { featuredIntegrations } from '../data/integrations';
import { IntegrationCard } from './IntegrationCard';
import { motion } from 'framer-motion';

export const FeaturedIntegrations = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold bg-blue-100 px-4 py-1 rounded-full">Integrations</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Integra tus Herramientas Existentes</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            En ElevaiteLabs conectamos con las aplicaciones que tu equipo ya utiliza todos los días.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredIntegrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <IntegrationCard integration={integration} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};