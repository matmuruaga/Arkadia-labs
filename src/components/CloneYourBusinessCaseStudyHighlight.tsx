// src/components/CloneYourBusinessCaseStudyHighlight.tsx
// Featured case study highlight for /clone-your-business.
// Compact card: logo · quote · 3 KPI metrics · link to full case study.

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Quote, ArrowRight, TrendingUp } from 'lucide-react';
import { trackCaseStudyClick, trackSectionView } from '@/utils/dataLayer';

// ============================================================================
// Featured study data (ELSA Consulting — strongest metrics + testimonial)
// We reference existing caseStudies i18n keys for the case study content
// and add new cloneYourBusiness.caseStudyHighlight keys for section copy.
// ============================================================================

const FEATURED_SLUG = 'elsa-consulting';

const FEATURED_KPI_KEYS = [
  { value: '600%', labelKey: 'caseStudies.elsa-consulting.hero.kpis.0.label' },
  { value: '3.5x', labelKey: 'caseStudies.elsa-consulting.hero.kpis.1.label' },
  { value: '80%', labelKey: 'caseStudies.elsa-consulting.hero.kpis.2.label' },
] as const;

const LOGO_URL =
  'https://res.cloudinary.com/dwhidn4z1/image/upload/v1762353602/274eba1b-f596-40b9-8e4e-2e05d51d1048_yadkpm.png';

// ============================================================================
// Animation variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// ============================================================================
// Component
// ============================================================================

const CloneYourBusinessCaseStudyHighlight: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionView('case_study_highlight', 'clone_your_business');
          setTracked(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [tracked]);

  const handleCaseStudyClick = () => {
    trackCaseStudyClick('ELSA Consulting', 'Sales Consulting', 'clone_your_business_highlight');
  };

  return (
    <section
      ref={sectionRef}
      id="case-study-highlight"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="case-study-highlight-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* ── Section Header ── */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-semibold">
                {t('cloneYourBusiness.caseStudyHighlight.badge')}
              </span>
            </div>

            <h2
              id="case-study-highlight-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            >
              {t('cloneYourBusiness.caseStudyHighlight.title')}{' '}
              <span className="crafted-gradient-text">
                {t('cloneYourBusiness.caseStudyHighlight.titleAccent')}
              </span>
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('cloneYourBusiness.caseStudyHighlight.subtitle')}
            </p>
          </motion.div>

          {/* ── Featured Card ── */}
          <motion.div
            variants={itemVariants}
            className="
              bg-gradient-to-br from-slate-50 to-white
              border border-slate-200
              rounded-3xl
              shadow-xl shadow-slate-200/60
              overflow-hidden
            "
          >
            <div className="p-8 md:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:gap-12 lg:items-center">

              {/* ── Left: Quote + Author ── */}
              <div className="mb-8 lg:mb-0">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={LOGO_URL}
                    alt="ELSA Consulting logo"
                    className="h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote
                    className="absolute -top-1 -left-2 h-8 w-8 text-blue-200 rotate-180"
                    aria-hidden="true"
                  />
                  <blockquote className="pl-6 text-slate-700 text-base md:text-lg leading-relaxed italic">
                    {t('caseStudies.elsa-consulting.testimonial.quote')}
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 mt-5 pl-6">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    CC
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {t('caseStudies.elsa-consulting.testimonial.author')}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t('caseStudies.elsa-consulting.testimonial.role')}
                      {' · '}
                      {t('caseStudies.elsa-consulting.testimonial.company')}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Right: KPI Pills + CTA ── */}
              <div className="flex flex-col items-center gap-5 lg:min-w-[200px]">
                {/* KPI metrics */}
                {FEATURED_KPI_KEYS.map(({ value, labelKey }) => (
                  <div
                    key={labelKey}
                    className="
                      w-full lg:w-auto
                      flex lg:flex-col items-center justify-between lg:justify-center lg:text-center
                      gap-4 lg:gap-1
                      px-6 py-4 lg:px-8 lg:py-5
                      bg-white border border-slate-200 rounded-2xl
                      shadow-sm
                    "
                  >
                    <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-none">
                      {value}
                    </span>
                    <span className="text-sm font-medium text-slate-600 lg:mt-1 text-right lg:text-center max-w-[120px] lg:max-w-none leading-tight">
                      {t(labelKey)}
                    </span>
                  </div>
                ))}

                {/* CTA */}
                <Link
                  to={`/${currentLang}/case-studies/${FEATURED_SLUG}`}
                  onClick={handleCaseStudyClick}
                  className="
                    w-full
                    inline-flex items-center justify-center gap-2
                    px-6 py-3
                    text-sm font-semibold text-white
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    rounded-xl
                    hover:from-blue-500 hover:to-indigo-500
                    shadow-md shadow-blue-700/20
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                  "
                  aria-label={t('cloneYourBusiness.caseStudyHighlight.cta')}
                >
                  {t('cloneYourBusiness.caseStudyHighlight.cta')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── "View all" secondary link ── */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <Link
              to={`/${currentLang}/case-studies`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              onClick={() => trackCaseStudyClick('all', 'index', 'clone_your_business_highlight')}
            >
              {t('cloneYourBusiness.caseStudyHighlight.viewAll')}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessCaseStudyHighlight;
