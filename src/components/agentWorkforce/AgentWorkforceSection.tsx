import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { trackSectionView, trackCtaClick } from '@/utils/dataLayer';
import SkeletonOrgChart from './SkeletonOrgChart';

const AgentWorkforceSection: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { lang = 'en' } = useParams<{ lang: string }>();
  const reducedMotion = useReducedMotion() ?? false;
  const trackedRef = useRef(false);

  const handleViewportEnter = () => {
    if (!trackedRef.current) {
      trackedRef.current = true;
      trackSectionView('agent_workforce', 'homepage');
    }
  };

  const handleExploreCta = () => {
    trackCtaClick('explore_solutions', 'agent_workforce', t('agentWorkforce.cta'));
    navigate(`/${lang}/solutions`);
  };

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 py-24"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
      onViewportEnter={handleViewportEnter}
      aria-label={t('agentWorkforce.title2')}
    >
      <div className="relative flex flex-col lg:flex-row items-center gap-10">
        {/* Ray beam image — desktop only, positioned between text column and org chart */}
        {/* The wrapper handles positioning + flip; the img carries the opacity pulse animation */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute z-0 pointer-events-none w-[375px] -top-[15%] right-0"
        >
          <img
            src="https://res.cloudinary.com/dntco2fcz/image/upload/q_auto/f_auto/v1775577495/Gemini_Generated_Image_4huq644huq644huq_copia_q2lcyg.webp"
            alt=""
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Left: Text */}
        <div className="flex-1 min-w-0 flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <Bot className="h-4 w-4 text-sky-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {t('agentWorkforce.centralBadge')}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] leading-tight">
            {t('agentWorkforce.title2')}
          </h2>

          <p className="text-base md:text-lg text-[#0D1B2A]/70 leading-relaxed">
            {t('agentWorkforce.subtitle2')}
          </p>

          <ul className="flex flex-col gap-3 mt-2">
            {['cloneBullet1', 'cloneBullet2', 'cloneBullet3'].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#1C7ED6] mt-2 shrink-0" />
                <span className="text-sm md:text-base text-[#0D1B2A]/70 leading-relaxed">
                  {t(`agentWorkforce.${key}`)}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleExploreCta}
            className="mt-2 bg-[#1C7ED6] hover:bg-[#155CB0] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:ring-opacity-50 inline-flex items-center gap-2 cursor-pointer"
          >
            {t('agentWorkforce.cta')}
          </button>
        </div>

        {/* Right: Org chart skeleton */}
        <div className="w-full lg:w-[50%] shrink-0">
          <SkeletonOrgChart />
        </div>
      </div>
    </motion.section>
  );
};

export default AgentWorkforceSection;
