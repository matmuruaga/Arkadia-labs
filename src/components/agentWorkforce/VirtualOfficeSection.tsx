import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import OfficeIllustration from './OfficeIllustration';
import { pillConfigs } from './agentWorkforce.data';

const VirtualOfficeSection: React.FC = () => {
  const { t } = useTranslation('home');
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-24"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Left: Office illustration with pills */}
        <div className="w-full lg:w-[58%] shrink-0">
          <OfficeIllustration pills={pillConfigs} />
        </div>

        {/* Right: Text */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] leading-tight">
            {t('agentWorkforce.officeTitle')}
          </h2>
          <p className="text-base md:text-lg text-[#0D1B2A]/70 leading-relaxed">
            {t('agentWorkforce.officeSubtitle')}
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            {['officeBullet1', 'officeBullet2', 'officeBullet3'].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1C7ED6] mt-2 shrink-0" />
                <span className="text-sm md:text-base text-[#0D1B2A]/70 leading-relaxed">
                  {t(`agentWorkforce.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default VirtualOfficeSection;
