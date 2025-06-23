// src/components/KpiSection.tsx
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';
import { useTranslation } from 'react-i18next'; // <-- 1. Importa el hook
import { TrendingUp, Zap, BarChart4, CheckCircle } from 'lucide-react';

// 2. La data ahora contiene las CLAVES de traducción, no el texto fijo.
const kpiData = [
  {
    Icon: TrendingUp,
    numericValue: 75,
    suffix: "%",
    descriptionKey: "kpi.cards.kpi1.description",
    labelKey: "kpi.cards.kpi1.label",
    accentColor: "#69DB7C",
  },
  {
    Icon: Zap,
    numericValue: 3,
    suffix: "x",
    descriptionKey: "kpi.cards.kpi2.description",
    labelKey: "kpi.cards.kpi2.label",
    accentColor: "#1C7ED6",
  },
  {
    Icon: BarChart4,
    numericValue: 40,
    suffix: "%",
    descriptionKey: "kpi.cards.kpi3.description",
    labelKey: "kpi.cards.kpi3.label",
    accentColor: "#D0BFFF",
  },
  {
    Icon: CheckCircle,
    numericValue: 90,
    suffix: "%",
    descriptionKey: "kpi.cards.kpi4.description",
    labelKey: "kpi.cards.kpi4.label",
    accentColor: "#1C7ED6",
  },
];

const KpiSection = () => {
  const { t } = useTranslation(); // <-- 3. Usa el hook para obtener la función de traducción

  return (
    <section 
      id="kpis" 
      className="py-16 md:py-24 bg-gradient-to-br from-[#1C7ED6]/[0.15] via-[#D0BFFF]/[0.10] to-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* 4. Reemplaza el texto fijo con la función t() */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] mb-4">
            {t('kpi.title')}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">
            {t('kpi.subtitle')}
          </p>
        </motion.div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={index}
              className="text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div 
                className="inline-block p-4 rounded-full mb-5" 
                style={{ backgroundColor: `${kpi.accentColor}25` }}
              >
                <kpi.Icon size={36} strokeWidth={2} style={{ color: kpi.accentColor }} />
              </div>
 
              <p className="text-sm text-[#0D1B2A]/80 mb-3 mx-auto max-w-[200px] min-h-24">
                  {t(kpi.descriptionKey)}
              </p>
              
              <AnimatedNumber
                targetValue={kpi.numericValue}
                suffix={kpi.suffix}
                className="block text-6xl sm:text-7xl md:text-8xl font-extrabold py-1" 
                style={{ color: kpi.accentColor }}
                duration={2 + index * 0.2}
              />
              
              <p className="text-md font-semibold text-[#0D1B2A] mt-2 capitalize">
                {t(kpi.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
export default KpiSection;