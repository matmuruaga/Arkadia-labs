import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ComparisonSection: React.FC = () => {
  const { t } = useTranslation('landingV3');

  const rowKeys = ['builder', 'time', 'training', 'support', 'result'] as const;

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="flex flex-col items-center">

        {/* ---------------------------------------------------------------- */}
        {/* Centered headline                                                 */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          className="max-w-[600px] mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[#0D1B2A] text-2xl md:text-[34px] font-black leading-tight">
            {t('comparison.title')}
          </h2>
          <p className="text-[#0D1B2A]/55 text-base mt-3">
            {t('comparison.subtitle')}
          </p>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Comparison table                                                  */}
        {/* ---------------------------------------------------------------- */}
        <div className="max-w-[800px] mx-auto mt-10 overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header row */}
            <thead>
              <tr>
                <th className="w-[30%] py-3.5 px-5 text-left border-b border-gray-100" />
                <th className="w-[35%] py-3.5 px-5 text-left border-b border-gray-100">
                  <span className="text-gray-400 text-xs tracking-widest font-bold uppercase">
                    {t('comparison.headerDiy')}
                  </span>
                </th>
                <th className="w-[35%] py-3.5 px-5 text-left border-b border-gray-100">
                  <span className="text-sky-500 text-xs tracking-widest font-bold uppercase">
                    {t('comparison.headerArkadia')}
                  </span>
                </th>
              </tr>
            </thead>

            {/* Body rows */}
            <tbody>
              {rowKeys.map((rowKey, index) => (
                <motion.tr
                  key={rowKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <td className={cn(
                    'py-3.5 px-5 text-left border-b border-gray-100',
                    'text-[#0D1B2A] font-semibold text-sm'
                  )}>
                    {t(`comparison.rows.${rowKey}.criteria`)}
                  </td>
                  <td className={cn(
                    'py-3.5 px-5 text-left border-b border-gray-100',
                    'text-gray-500 text-sm'
                  )}>
                    {t(`comparison.rows.${rowKey}.diy`)}
                  </td>
                  <td className={cn(
                    'py-3.5 px-5 text-left border-b border-gray-100',
                    'text-teal-700 font-semibold text-sm'
                  )}>
                    {t(`comparison.rows.${rowKey}.arkadia`)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default ComparisonSection;
