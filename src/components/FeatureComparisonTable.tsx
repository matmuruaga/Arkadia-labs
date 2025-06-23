// src/components/FeatureComparisonTable.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // 1. Importar
import { Check, X, Crown, Calculator } from 'lucide-react';

// 2. Definir las claves de traducción para la tabla
const featureRowKeys = [
  "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"
];

const planNameKeys = [
  { key: "featureComparison.tableHeader.plan1", recommended: false },
  { key: "featureComparison.tableHeader.plan2", recommended: true },
  { key: "featureComparison.tableHeader.plan3", recommended: false }
];

interface FeatureTableProps {
  onOpenCalculator: () => void;
}

const FeatureComparisonTable: React.FC<FeatureTableProps> = ({ onOpenCalculator }) => {
  const { t } = useTranslation(); // 3. Inicializar hook
  const checkIcon = <Check className="text-green-500" size={24} />;
  const xIcon = <X className="text-red-400" size={24} />;

  const getFeatureValue = (value: string | boolean) => {
    // Si el valor es booleano, devuelve el icono correspondiente
    if (typeof value === 'boolean') {
      return value ? checkIcon : xIcon;
    }
    // Si es un string 'true' o 'false', también devuelve el icono (para los datos que no son strings)
    if (value === 'true') return checkIcon;
    if (value === 'false') return xIcon;

    // De lo contrario, devuelve el texto
    return <span className="text-sm font-semibold text-[#0D1B2A]">{value}</span>;
  };

  return (
    <section id="feature-comparison" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} 
        >
          {/* 4. Usar la función t() para traducir los textos */}
          <h2 className="text-4xl font-bold text-[#0D1B2A]">{t('featureComparison.title')}</h2>
          <p className="text-lg text-[#0D1B2A]/75 mt-2">{t('featureComparison.subtitle')}</p>
        </motion.div>
        
        <motion.div
          className="w-full overflow-x-auto rounded-lg border border-slate-200 shadow-md"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }} 
        >
          <table className="w-full min-w-[700px] border-collapse text-center">
            <thead>
              <tr>
                <th className="p-4 text-left font-bold text-lg text-[#0D1B2A] w-1/3">{t('featureComparison.tableHeader.features')}</th>
                {planNameKeys.map(plan => (
                  <th key={plan.key} className={`p-4 border-b-2 ${plan.recommended ? 'border-[#1C7ED6]' : 'border-slate-200'}`}>
                    <span className={`text-lg font-bold ${plan.recommended ? 'text-[#1C7ED6]' : 'text-[#0D1B2A]'}`}>{t(plan.key)}</span>
                    {plan.recommended && <Crown className="inline-block ml-2 text-yellow-500 fill-yellow-400" size={20}/>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRowKeys.map((featureKey) => (
                <tr key={featureKey} className="border-b border-slate-200 last:border-b-0">
                  <td className="p-4 text-left font-medium text-gray-700">{t(`featureComparison.features.${featureKey}.name`)}</td>
                  <td className="p-4"><div className="flex justify-center">{getFeatureValue(t(`featureComparison.features.${featureKey}.plan1`))}</div></td>
                  <td className="p-4 bg-blue-500/5"><div className="flex justify-center">{getFeatureValue(t(`featureComparison.features.${featureKey}.plan2`))}</div></td>
                  <td className="p-4"><div className="flex justify-center">{getFeatureValue(t(`featureComparison.features.${featureKey}.plan3`))}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={onOpenCalculator}
            className="bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#1C7ED6]/20 flex items-center justify-center gap-2 mx-auto"
          >
            <Calculator size={20} className="text-[#1C7ED6]" />
            {t('featureComparison.roiButton')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureComparisonTable;