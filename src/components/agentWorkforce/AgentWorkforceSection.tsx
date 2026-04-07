import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trackSectionView } from '@/utils/dataLayer';
import OfficeIllustration from './OfficeIllustration';
import SkeletonOrgChart from './SkeletonOrgChart';
import { pillConfigs } from './agentWorkforce.data';

const AgentWorkforceSection: React.FC = () => {
  const { t } = useTranslation('home');
  const reducedMotion = useReducedMotion() ?? false;
  const trackedRef = useRef(false);

  const handleViewportEnter = () => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      trackSectionView('agent_workforce', 'homepage');
    }
  };

  return (
    <motion.section
      className="hidden lg:flex items-center gap-8 max-w-7xl mx-auto px-4 py-16"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
      onViewportEnter={handleViewportEnter}
      aria-label={t('agentWorkforce.title')}
    >
      {/* Left: Office illustration (60%) */}
      <div className="w-[60%] shrink-0">
        <OfficeIllustration pills={pillConfigs} />
      </div>

      {/* Right: Org chart (45%) */}
      <div className="flex-1 min-w-0">
        <SkeletonOrgChart />
      </div>
    </motion.section>
  );
};

export default AgentWorkforceSection;
