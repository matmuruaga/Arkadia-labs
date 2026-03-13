// src/components/CloneYourBusinessDepartments.tsx
// Interactive grid of clonable departments for /clone-your-business landing page.
// Shows 4 department cards with agents, key functions, and hover-expanded details.

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Phone,
  Megaphone,
  Headphones,
  Settings,
  ChevronRight,
  Users,
  ArrowRight,
} from 'lucide-react';
import { trackSectionView, trackCtaClick } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Data
// ============================================================================

interface Agent {
  tKey: string;
}

interface Department {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tKey: string;
  color: string;
  bgGradient: string;
  iconBg: string;
  glowColor: string;
  borderColor: string;
  agents: Agent[];
}

const departments: Department[] = [
  {
    id: 'sales',
    icon: Phone,
    tKey: 'cloneYourBusiness.departments.sales',
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    iconBg: 'from-blue-500 to-indigo-600',
    glowColor: 'shadow-blue-500/25',
    borderColor: 'border-blue-100 hover:border-blue-200',
    agents: [
      { tKey: 'cloneYourBusiness.departments.sales.agents.salesAgent' },
      { tKey: 'cloneYourBusiness.departments.sales.agents.salesQualifier' },
      { tKey: 'cloneYourBusiness.departments.sales.agents.leadValidator' },
    ],
  },
  {
    id: 'marketing',
    icon: Megaphone,
    tKey: 'cloneYourBusiness.departments.marketing',
    color: 'text-teal-600',
    bgGradient: 'from-teal-50 to-emerald-50',
    iconBg: 'from-teal-500 to-emerald-600',
    glowColor: 'shadow-teal-500/25',
    borderColor: 'border-teal-100 hover:border-teal-200',
    agents: [
      { tKey: 'cloneYourBusiness.departments.marketing.agents.contentCreator' },
      { tKey: 'cloneYourBusiness.departments.marketing.agents.socialManager' },
    ],
  },
  {
    id: 'support',
    icon: Headphones,
    tKey: 'cloneYourBusiness.departments.support',
    color: 'text-green-600',
    bgGradient: 'from-green-50 to-lime-50',
    iconBg: 'from-green-500 to-emerald-600',
    glowColor: 'shadow-green-500/25',
    borderColor: 'border-green-100 hover:border-green-200',
    agents: [
      { tKey: 'cloneYourBusiness.departments.support.agents.virtualReceptionist' },
      { tKey: 'cloneYourBusiness.departments.support.agents.bookingAgent' },
    ],
  },
  {
    id: 'operations',
    icon: Settings,
    tKey: 'cloneYourBusiness.departments.operations',
    color: 'text-orange-600',
    bgGradient: 'from-orange-50 to-amber-50',
    iconBg: 'from-orange-500 to-amber-600',
    glowColor: 'shadow-orange-500/25',
    borderColor: 'border-orange-100 hover:border-orange-200',
    agents: [
      { tKey: 'cloneYourBusiness.departments.operations.agents.operationsAgent' },
    ],
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ============================================================================
// Sub-components
// ============================================================================

const DepartmentCard: React.FC<{ dept: Department }> = ({ dept }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const Icon = dept.icon;

  const handleExplore = () => {
    trackCtaClick('explore_solutions', `department_card_${dept.id}`, t(`${dept.tKey}.title`));
    navigate(`/${lang || 'en'}/solutions`);
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group relative rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        dept.bgGradient,
        dept.borderColor
      )}
    >
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={cn(
            'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg shrink-0',
            dept.iconBg,
            dept.glowColor
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {t(`${dept.tKey}.title`)}
          </h3>
          <p className="text-sm text-slate-500">
            {t(`${dept.tKey}.tagline`)}
          </p>
        </div>
      </div>

      {/* Key functions */}
      <ul className="space-y-2 mb-5">
        {[1, 2, 3].map((i) => {
          const key = `${dept.tKey}.functions.f${i}`;
          const value = t(key);
          if (value === key) return null;
          return (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
              <span>{value}</span>
            </li>
          );
        })}
      </ul>

      {/* Agents list */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t('cloneYourBusiness.departments.agentsLabel')}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {dept.agents.map((agent, idx) => (
            <span
              key={idx}
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                'bg-white/80 border border-white/60 text-slate-700 shadow-sm'
              )}
            >
              {t(agent.tKey)}
            </span>
          ))}
        </div>
      </div>

      {/* Hover-expanded details */}
      <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <div className="pt-4 border-t border-slate-200/60">
          <p className="text-sm text-slate-600 leading-relaxed">
            {t(`${dept.tKey}.expandedDescription`)}
          </p>
        </div>
      </div>

      {/* Explore CTA */}
      <button
        onClick={handleExplore}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors group/btn"
        aria-label={`${t(`${dept.tKey}.title`)} - ${t('cloneYourBusiness.departments.exploreCta')}`}
      >
        {t('cloneYourBusiness.departments.exploreCta')}
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </motion.div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessDepartments: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionView('clone_your_business_departments', 'clone_your_business');
          setTracked(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [tracked]);

  return (
    <section
      ref={sectionRef}
      id="departments-section"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="departments-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
              <Users className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t('cloneYourBusiness.departments.badge')}
              </span>
            </div>

            <h2
              id="departments-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('cloneYourBusiness.departments.title')}
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('cloneYourBusiness.departments.subtitle')}
            </p>
          </motion.div>

          {/* Departments Grid: 2 cols desktop, 1 col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} dept={dept} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessDepartments;
