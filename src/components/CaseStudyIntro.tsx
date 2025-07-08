// src/components/CaseStudyIntro.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.01, 0.05, 0.95], // Corregido para que sea válido
      staggerChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

interface Props {
  client: CaseStudy['client'];
  challenge: CaseStudy['challenge'];
}

const CaseStudyIntro: React.FC<Props> = ({ client, challenge }) => {
  if (!client || !challenge) return null;

  return (
    <section id="CaseStudyIntro" className="bg-gray-100 py-24">
      <div className="container mx-auto px-4">
        
        {/* --- La Tarjeta de Presentación Principal --- */}
        <motion.div 
          className="p-10 sm:p-12 md:p-16 rounded-3xl shadow-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-gray-200"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* --- Sección Superior: Título, Logo, Nombre y Descripción --- */}
          <div className="max-w-4xl">
            {/* --- CÁPSULA DE TÍTULO REDISEÑADA --- */}
            <motion.div variants={itemVariants}>
              <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-md">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Client Overview</h2>
              </div>
            </motion.div>
            
            {/* --- LOGO DEL CLIENTE INTEGRADO --- */}
            <motion.div variants={itemVariants}>
            <div className="mt-8">
              {/* 1. Logo más pequeño */}
              <img
                src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1751619752/zytlyn_logo_wotmqi.svg"
                alt={`${client.name} logo`}
                className="h-6"
              />
              {/* 2. Nombre y eslogan debajo del logo */}
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mt-4">
                {client.name} - {client.tagline}
              </h3>
            </div>
          </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-lg text-slate-600 mt-5 leading-relaxed">{client.description}</p>
            </motion.div>
          </div>

          {/* Línea divisoria elegante */}
          <motion.hr 
            className="my-12 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* --- Sección Inferior: Grid de Detalles y Desafíos --- */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, delay: 0.6 }}
          >
            {/* --- Columnas de Detalles del Cliente --- */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {client.details.map((detail) => (
                <motion.div key={detail.label} variants={itemVariants}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={detail.icon as any} className="h-6 w-6 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-500 tracking-wider uppercase">{detail.label}</h4>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">{detail.value}</p>
                </motion.div>
              ))}
            </div>

            {/* --- Columna de Desafíos --- */}
            <motion.div className="md:col-span-1" variants={itemVariants}>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{challenge.beforeTitle}</h3>
              <ul className="space-y-3">
                {challenge.points.map((point) => (
                  <li key={point} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1.5">—</span>
                    <span className="text-slate-600">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyIntro;