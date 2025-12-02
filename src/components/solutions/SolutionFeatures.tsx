// src/components/solutions/SolutionFeatures.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  MailCheck, PhoneCall, Database, Target, Copy, Star,
  CheckCircle, Shield, Zap, Settings, Building, Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SolutionFeatures as SolutionFeaturesType } from '@/data/solutions/types';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'mail-check': MailCheck,
  'phone-check': PhoneCall,
  'database': Database,
  'target': Target,
  'copy': Copy,
  'star': Star,
  'check-circle': CheckCircle,
  'shield': Shield,
  'zap': Zap,
  'settings': Settings,
  'building': Building,
};

interface Props {
  data: SolutionFeaturesType;
  solutionId: string;
}

// Desktop Feature Card with floating icon effect
const DesktopFeatureCard: React.FC<{
  icon: string;
  title: string;
  index: number;
  isHighlighted?: boolean;
}> = ({ icon, title, index, isHighlighted = false }) => {
  const IconComponent = iconMap[icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      {/* Main card */}
      <div className={`
        relative bg-white rounded-3xl p-6 h-full
        border border-slate-200/60
        shadow-sm hover:shadow-xl
        transition-all duration-500
        ${isHighlighted ? 'ring-2 ring-sky-500/20' : ''}
      `}>
        {/* Floating icon - positioned to "break out" of the card */}
        <div className="absolute -top-5 left-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`
              w-12 h-12 rounded-2xl
              flex items-center justify-center
              shadow-lg
              ${isHighlighted
                ? 'bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-sky-500/30'
                : 'bg-white border border-slate-200 text-slate-700 group-hover:border-sky-300 group-hover:text-sky-600'
              }
              transition-all duration-300
            `}
          >
            <IconComponent className="h-5 w-5" />
          </motion.div>
        </div>

        {/* Content - minimal */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
            {title}
          </h3>
        </div>

        {/* Subtle corner accent */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

// Mobile Feature Pill - compact horizontal design
const MobileFeaturePill: React.FC<{
  icon: string;
  title: string;
  index: number;
}> = ({ icon, title, index }) => {
  const IconComponent = iconMap[icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-3 bg-white rounded-full px-4 py-2.5 border border-slate-200/60 shadow-sm"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white flex-shrink-0">
        <IconComponent className="h-4 w-4" />
      </div>
      <span className="text-sm font-medium text-slate-700 truncate">{title}</span>
    </motion.div>
  );
};

const SolutionFeatures: React.FC<Props> = ({ data, solutionId }) => {
  const { t } = useTranslation();

  // Take only first 6 features to keep it clean
  const displayFeatures = data.features.slice(0, 6);

  // Highlight first 2 features as "main" features
  const highlightedIndices = [0, 1];

  return (
    <section className="relative py-16 md:py-32 overflow-hidden bg-white">
      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Main container with elegant frame */}
        <div className="max-w-5xl mx-auto">

          {/* Framed content area */}
          <div className="relative">
            {/* Watercolor background - behind everything, slightly larger */}
            <div
              className="absolute -inset-4 md:-inset-12 rounded-[2rem] md:rounded-[3rem] bg-cover bg-center bg-no-repeat opacity-90"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dntco2fcz/image/upload/v1764608051/u5837542839_dreamy_watercolor_landscape_of_misty_mountains_at_89b2f300-f984-441a-a7fc-116aecd89b10_0_2_slr8if.png')`,
              }}
            />

            {/* Outer decorative frame - hidden on mobile */}
            <div className="hidden md:block absolute -inset-4 md:-inset-8 border border-slate-200/40 rounded-[2.5rem] pointer-events-none" />

            {/* Inner content */}
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-12 lg:p-16 bg-white/90 md:bg-white/85 backdrop-blur-sm border border-white/80 shadow-xl md:shadow-2xl shadow-slate-900/10 overflow-hidden">

              {/* Floating badge - breaks out of frame */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2"
              >
                <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg border border-slate-100">
                  <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-sky-500" />
                  <span className="text-xs md:text-sm font-semibold text-slate-700">
                    {t(`solutions.${solutionId}.features.badge`, 'Features')}
                  </span>
                </div>
              </motion.div>

              {/* Header - centered, minimal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 md:mb-16 mt-2 md:mt-0"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-3 leading-tight">
                  {t(`solutions.${solutionId}.features.title`, data.title)}
                </h2>

                {/* Subtle decorative line */}
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full mx-auto" />
              </motion.div>

              {/* Mobile: Pills layout */}
              <div className="md:hidden space-y-2.5">
                {displayFeatures.map((feature, index) => (
                  <MobileFeaturePill
                    key={feature.id}
                    icon={feature.icon}
                    title={t(`solutions.${solutionId}.features.features.${index}.title`, feature.title)}
                    index={index}
                  />
                ))}
              </div>

              {/* Desktop: Grid layout */}
              <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {displayFeatures.map((feature, index) => (
                  <DesktopFeatureCard
                    key={feature.id}
                    icon={feature.icon}
                    title={t(`solutions.${solutionId}.features.features.${index}.title`, feature.title)}
                    index={index}
                    isHighlighted={highlightedIndices.includes(index)}
                  />
                ))}
              </div>

            </div>

            {/* Bottom accent - floating element (outside overflow-hidden container) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-3 md:-bottom-4 right-4 md:right-16 z-10"
            >
              <div className="flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg shadow-sky-500/25 text-xs md:text-sm font-medium">
                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>+{data.features.length > 6 ? data.features.length - 6 : 0} more</span>
              </div>
            </motion.div>

            {/* Decorative corner elements - hidden on mobile */}
            <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-sky-300/50 rounded-tl-xl" />
            <div className="hidden md:block absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-teal-300/50 rounded-tr-xl" />
            <div className="hidden md:block absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-sky-300/50 rounded-bl-xl" />
            <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-300/50 rounded-br-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFeatures;
