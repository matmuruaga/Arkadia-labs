// src/components/CaseStudyWhyElevaite.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const features = [
  {
    icon: 'Award',
    title: 'Swiss-Made Quality',
    description: 'Precision engineering and reliability standards applied to AI development.',
    theme: 'red',
  },
  {
    icon: 'Rocket',
    title: 'Proven Track Record',
    description: '12 years sales experience scaling 3 startups from pre-seed to Series A.',
    theme: 'blue',
  },
  {
    icon: 'Settings2',
    title: 'Custom Solutions',
    description: 'Tailored AI agents designed specifically for your business requirements.',
    theme: 'purple',
  },
];

const themeStyles = {
  red: { circle: 'bg-red-500/10', icon: 'text-red-400', shadow: 'shadow-red-500/20' },
  blue: { circle: 'bg-blue-500/10', icon: 'text-blue-400', shadow: 'shadow-blue-500/20' },
  purple: { circle: 'bg-purple-500/10', icon: 'text-purple-400', shadow: 'shadow-purple-500/20' },
};

// CORRECCIÓN: Las variantes del contenedor ahora solo se encargan de la orquestación.
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const CaseStudyWhyElevaite = () => {
  return (
    <section className="bg-gray-900 py-24">
      <div className="container mx-auto px-4">
        {/* Título y Subtítulo con el nuevo estilo de cápsula */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            className="flex justify-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-lg">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Why ElevaiteLabs</h2>
            </div>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Swiss-made precision meets proven sales expertise
          </motion.p>
        </div>

        {/* Grid para las tarjetas de características */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature) => {
            const styles = themeStyles[feature.theme as keyof typeof themeStyles];
            return (
              // CORRECCIÓN: La animación de entrada ahora está en cada tarjeta individualmente.
              <motion.div
                key={feature.title}
                className="bg-white/5 backdrop-blur-md p-8 rounded-2xl text-center border border-white/10"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div className={`relative inline-block mb-6 p-5 rounded-full border border-white/10 ${styles.circle}`}>
                  <Icon name={feature.icon as any} className={`h-8 w-8 ${styles.icon}`} />
                  <div className={`absolute inset-0 rounded-full blur-xl ${styles.circle} ${styles.shadow} opacity-70`}></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyWhyElevaite;