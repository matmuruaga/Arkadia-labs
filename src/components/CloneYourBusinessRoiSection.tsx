// src/components/CloneYourBusinessRoiSection.tsx
// Inline ROI Calculator section for /clone-your-business.
// Users enter number of employees + avg monthly cost → see estimated savings.
// CTA: "Discover how much you can save" / "Descubre cuánto puedes ahorrar".

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Calculator, Users, DollarSign, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import {
  trackRoiCalculatorStart,
  trackRoiInputChange,
  trackCtaClick,
  trackSectionView,
} from '@/utils/dataLayer';
import CalScheduler from '@/components/CalScheduler';

// ============================================================================
// Constants
// ============================================================================

// Average automation rate applied to repetitive tasks
const AUTOMATION_EFFICIENCY = 0.62; // 62% of repetitive hours recovered

// ============================================================================
// Animation variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// ============================================================================
// Helpers
// ============================================================================

const formatCurrency = (value: number, lang: string): string => {
  const locale = lang === 'es' ? 'es-ES' : lang === 'cs' ? 'cs-CZ' : 'en-US';
  const currency = lang === 'en' ? 'USD' : 'EUR';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// ============================================================================
// ResultCard sub-component
// ============================================================================

interface ResultCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accentClass: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ icon, label, value, accentClass }) => (
  <motion.div
    key={value}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35 }}
    className="flex flex-col items-center justify-center gap-1 py-5 px-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm"
  >
    <div className={`mb-1 ${accentClass}`}>{icon}</div>
    <p className={`text-2xl md:text-3xl font-extrabold leading-none ${accentClass}`}>{value}</p>
    <p className="text-xs text-slate-300 font-medium text-center leading-snug mt-1">{label}</p>
  </motion.div>
);

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessRoiSection: React.FC = () => {
  const { t, i18n } = useTranslation('clone-your-business');
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  const [employees, setEmployees] = useState(10);
  const [monthlyCostPerEmployee, setMonthlyCostPerEmployee] = useState(3000);
  const [repetitiveTasksPct, setRepetitiveTasksPct] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const [tracked, setTracked] = useState(false);

  const currentLang = lang ?? i18n.language ?? 'en';

  // Section-view tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionView('roi_calculator_section', 'clone_your_business');
          setTracked(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [tracked]);

  // Derived calculations
  const results = useMemo(() => {
    const totalMonthlyCost = employees * monthlyCostPerEmployee;
    const repetitiveCost = totalMonthlyCost * (repetitiveTasksPct / 100);
    const monthlySavings = repetitiveCost * AUTOMATION_EFFICIENCY;
    const hoursPerEmployee = 160; // avg working hours/month
    const hoursSavedTotal = employees * hoursPerEmployee * (repetitiveTasksPct / 100) * AUTOMATION_EFFICIENCY;
    const annualSavings = monthlySavings * 12;
    return { monthlySavings, hoursSavedTotal, annualSavings };
  }, [employees, monthlyCostPerEmployee, repetitiveTasksPct]);

  // Interaction handlers
  const handleInteraction = () => {
    if (!interacted) {
      trackRoiCalculatorStart();
      setInteracted(true);
    }
  };

  const handleEmployeesChange = (value: number) => {
    handleInteraction();
    trackRoiInputChange('employees', value);
    setEmployees(value);
  };

  const handleCostChange = (value: number) => {
    handleInteraction();
    trackRoiInputChange('monthly_cost_per_employee', value);
    setMonthlyCostPerEmployee(value);
  };

  const handleRepetitiveChange = (value: number) => {
    handleInteraction();
    trackRoiInputChange('repetitive_tasks_pct', value);
    setRepetitiveTasksPct(value);
  };

  const handleCtaClick = () => {
    trackCtaClick('discover_savings', 'clone_your_business_roi_section', t('cloneYourBusiness.roiSection.cta'));
  };

  return (
    <section
      ref={sectionRef}
      id="roi-calculator-section"
      className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#070B14]"
      aria-labelledby="roi-section-heading"
    >
      {/* ── Background decoration ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/12 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          {/* ── Section Header ── */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-5">
              <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
              {t('cloneYourBusiness.roiSection.badge')}
            </span>

            <h2
              id="roi-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
            >
              {t('cloneYourBusiness.roiSection.title')}{' '}
              <span className="crafted-gradient-text">
                {t('cloneYourBusiness.roiSection.titleAccent')}
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {t('cloneYourBusiness.roiSection.subtitle')}
            </p>
          </motion.div>

          {/* ── Calculator Card ── */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* ── Inputs ── */}
              <div className="space-y-8">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  {t('cloneYourBusiness.roiSection.inputsHeading')}
                </h3>

                {/* Employees slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="roi-employees" className="flex items-center gap-1.5 text-sm font-medium text-gray-300">
                      <Users className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      {t('cloneYourBusiness.roiSection.inputs.employees')}
                    </label>
                    <span className="text-xl font-bold text-blue-400">{employees}</span>
                  </div>
                  <input
                    id="roi-employees"
                    type="range"
                    min="1"
                    max="500"
                    step="1"
                    value={employees}
                    onChange={(e) => handleEmployeesChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    aria-label={t('cloneYourBusiness.roiSection.inputs.employees')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span><span>500</span>
                  </div>
                </div>

                {/* Monthly cost slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="roi-cost" className="flex items-center gap-1.5 text-sm font-medium text-gray-300">
                      <DollarSign className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      {t('cloneYourBusiness.roiSection.inputs.monthlyCost')}
                    </label>
                    <span className="text-xl font-bold text-blue-400">
                      {formatCurrency(monthlyCostPerEmployee, currentLang)}
                    </span>
                  </div>
                  <input
                    id="roi-cost"
                    type="range"
                    min="500"
                    max="20000"
                    step="100"
                    value={monthlyCostPerEmployee}
                    onChange={(e) => handleCostChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    aria-label={t('cloneYourBusiness.roiSection.inputs.monthlyCost')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatCurrency(500, currentLang)}</span>
                    <span>{formatCurrency(20000, currentLang)}</span>
                  </div>
                </div>

                {/* Repetitive tasks % slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="roi-repetitive" className="flex items-center gap-1.5 text-sm font-medium text-gray-300">
                      <TrendingUp className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      {t('cloneYourBusiness.roiSection.inputs.repetitiveTasks')}
                    </label>
                    <span className="text-xl font-bold text-blue-400">{repetitiveTasksPct}%</span>
                  </div>
                  <input
                    id="roi-repetitive"
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={repetitiveTasksPct}
                    onChange={(e) => handleRepetitiveChange(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    aria-label={t('cloneYourBusiness.roiSection.inputs.repetitiveTasks')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span><span>90%</span>
                  </div>
                </div>
              </div>

              {/* ── Results ── */}
              <div className="flex flex-col justify-between gap-6">
                <h3 className="text-white font-semibold text-lg">
                  {t('cloneYourBusiness.roiSection.resultsHeading')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 flex-1">
                  <ResultCard
                    icon={<DollarSign className="w-5 h-5" />}
                    label={t('cloneYourBusiness.roiSection.results.monthlySavings')}
                    value={formatCurrency(results.monthlySavings, currentLang)}
                    accentClass="text-emerald-400"
                  />
                  <ResultCard
                    icon={<Users className="w-5 h-5" />}
                    label={t('cloneYourBusiness.roiSection.results.hoursSaved')}
                    value={`${Math.round(results.hoursSavedTotal).toLocaleString()}h`}
                    accentClass="text-blue-400"
                  />
                  <ResultCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    label={t('cloneYourBusiness.roiSection.results.annualSavings')}
                    value={formatCurrency(results.annualSavings, currentLang)}
                    accentClass="text-indigo-400"
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 text-center">
                  {t('cloneYourBusiness.roiSection.disclaimer')}
                </p>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-300 mb-5 text-base font-medium">
                {t('cloneYourBusiness.roiSection.ctaSubtext')}
              </p>
              <CalScheduler
                buttonText={t('cloneYourBusiness.roiSection.cta')}
                namespace="30min-roi-section"
                onClick={handleCtaClick}
                buttonClassName="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4
                  text-base font-semibold text-white
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-blue-500 hover:to-indigo-500
                  shadow-lg shadow-blue-700/30
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                "
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessRoiSection;
