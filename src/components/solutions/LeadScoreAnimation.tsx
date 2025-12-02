// src/components/solutions/LeadScoreAnimation.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate, MotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  User,
  MessageSquare,
  FileText,
  CheckCircle2,
} from 'lucide-react';

// ============================================================================
// Types & Constants
// ============================================================================

interface ValidationStep {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  shortLabelKey: string;
  defaultLabel: string;
  defaultShortLabel: string;
  threshold: number;
}

const validationSteps: ValidationStep[] = [
  {
    id: 'phone-rings',
    icon: Phone,
    labelKey: 'phoneRings',
    shortLabelKey: 'phoneRingsShort',
    defaultLabel: 'Phone rings',
    defaultShortLabel: 'Ring',
    threshold: 20,
  },
  {
    id: 'owner-verified',
    icon: User,
    labelKey: 'ownerVerified',
    shortLabelKey: 'ownerVerifiedShort',
    defaultLabel: 'Owner verified',
    defaultShortLabel: 'Verified',
    threshold: 40,
  },
  {
    id: 'call-answered',
    icon: Phone,
    labelKey: 'callAnswered',
    shortLabelKey: 'callAnsweredShort',
    defaultLabel: 'Call answered',
    defaultShortLabel: 'Answered',
    threshold: 60,
  },
  {
    id: 'engaged',
    icon: MessageSquare,
    labelKey: 'engaged',
    shortLabelKey: 'engagedShort',
    defaultLabel: 'Engaged in conversation',
    defaultShortLabel: 'Engaged',
    threshold: 80,
  },
  {
    id: 'requested-info',
    icon: FileText,
    labelKey: 'requestedInfo',
    shortLabelKey: 'requestedInfoShort',
    defaultLabel: 'Requested information',
    defaultShortLabel: 'Info',
    threshold: 100,
  },
];

// Get color based on score
const getScoreColor = (score: number): string => {
  if (score <= 30) return '#ef4444';
  if (score <= 60) return '#f97316';
  if (score <= 80) return '#eab308';
  return '#22c55e';
};

// Get status text based on score
const getStatusText = (score: number, t: (key: string, fallback: string) => string, solutionId: string): string => {
  if (score <= 30) return t(`solutions.${solutionId}.scoreAnimation.statusCold`, 'Cold Lead');
  if (score <= 60) return t(`solutions.${solutionId}.scoreAnimation.statusWarm`, 'Warm Lead');
  if (score <= 80) return t(`solutions.${solutionId}.scoreAnimation.statusHot`, 'Hot Lead');
  return t(`solutions.${solutionId}.scoreAnimation.statusQualified`, 'Qualified Lead');
};

// Get background gradient based on score
const getCardBackground = (score: number): string => {
  if (score <= 30) return 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
  if (score <= 60) return 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)';
  if (score <= 80) return 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)';
  return 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
};

// Get status background based on score
const getStatusBackground = (score: number): string => {
  if (score <= 30) return '#fef2f2';
  if (score <= 60) return '#fff7ed';
  if (score <= 80) return '#fefce8';
  return '#f0fdf4';
};

interface Props {
  solutionId: string;
}

// ============================================================================
// Shared Components
// ============================================================================

// Lead Card Component - Used by both mobile and desktop
const LeadCard: React.FC<{
  score: number;
  solutionId: string;
  circleRadius?: number;
}> = ({ score, solutionId, circleRadius = 58 }) => {
  const { t } = useTranslation();
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        className="absolute -inset-4 rounded-full blur-2xl opacity-40 transition-all duration-500"
        style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }}
      />

      {/* Main card */}
      <div
        className="relative rounded-3xl p-5 shadow-2xl border border-slate-200/60 transition-all duration-500"
        style={{ background: getCardBackground(score) }}
      >
        {/* Avatar with circular progress */}
        <div className="relative w-24 h-24 mx-auto mb-3">
          {/* Background circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="transition-all duration-500"
              style={{
                stroke: color,
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Avatar */}
          <div className="absolute inset-2.5 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
            <User className="w-10 h-10 text-slate-400" />
          </div>

          {/* Score badge */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full shadow-lg font-bold text-white text-sm transition-all duration-500"
            style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
          >
            {Math.round(score)}
          </div>
        </div>

        {/* Lead info */}
        <div className="text-center">
          <h3 className="text-base font-bold text-slate-900 mb-0.5">
            {t(`solutions.${solutionId}.scoreAnimation.leadName`, 'Marcus Chen')}
          </h3>
          <p className="text-slate-500 text-xs mb-2">
            {t(`solutions.${solutionId}.scoreAnimation.leadCompany`, 'TechFlow Inc.')}
          </p>

          {/* Status indicator */}
          <div
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium min-w-[120px] transition-all duration-500"
            style={{ background: getStatusBackground(score), color: color }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ background: color }}
            />
            {getStatusText(score, t, solutionId)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Mobile Version - Click-based interaction
// ============================================================================

const MobileValidationStep: React.FC<{
  step: ValidationStep;
  index: number;
  currentScore: number;
  onClick: () => void;
  solutionId: string;
}> = ({ step, index, currentScore, onClick, solutionId }) => {
  const { t } = useTranslation();
  const isActive = currentScore >= step.threshold;

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-200'
          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
      }`}
      aria-label={t(`solutions.${solutionId}.scoreAnimation.steps.${step.labelKey}`, step.defaultLabel)}
    >
      <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-600'}`}>
        {t(`solutions.${solutionId}.scoreAnimation.steps.${step.shortLabelKey}`, step.defaultShortLabel)}
      </span>
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-white/20' : 'bg-slate-100'
        }`}
      >
        <CheckCircle2 className={`w-3.5 h-3.5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-300'}`} />
      </div>
    </button>
  );
};

const MobileLeadScoreAnimation: React.FC<{ solutionId: string }> = ({ solutionId }) => {
  const { t } = useTranslation();
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [displayScore, setDisplayScore] = useState(0);

  // Calculate target score based on active step
  const targetScore = activeStepIndex >= 0 ? validationSteps[activeStepIndex].threshold : 0;

  // Animate score smoothly when target changes
  useEffect(() => {
    const duration = 400;
    const startScore = displayScore;
    const startTime = Date.now();

    const animateScore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentScore = startScore + (targetScore - startScore) * easeProgress;

      setDisplayScore(Math.round(currentScore));

      if (progress < 1) {
        requestAnimationFrame(animateScore);
      }
    };

    requestAnimationFrame(animateScore);
  }, [targetScore]);

  const handleStepClick = useCallback((index: number) => {
    // Toggle: if clicking same step, go to previous step (or -1 if first)
    // If clicking different step, go to that step
    if (index === activeStepIndex) {
      setActiveStepIndex(index > 0 ? index - 1 : -1);
    } else {
      setActiveStepIndex(index);
    }
  }, [activeStepIndex]);

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {t(`solutions.${solutionId}.scoreAnimation.title`, 'Watch Lead Qualification in Real-Time')}
          </h2>
          <p className="text-sm text-slate-600">
            {t(`solutions.${solutionId}.scoreAnimation.mobileHint`, 'Tap each step to see the score change')}
          </p>
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="flex items-center gap-4 max-w-md mx-auto">
          {/* Left: Lead Card */}
          <div className="flex-shrink-0">
            <LeadCard score={displayScore} solutionId={solutionId} circleRadius={48} />
          </div>

          {/* Right: Validation Steps - Compact vertical list */}
          <div className="flex-1 grid grid-cols-1 gap-2">
            {validationSteps.map((step, index) => (
              <MobileValidationStep
                key={step.id}
                step={step}
                index={index}
                currentScore={displayScore}
                onClick={() => handleStepClick(index)}
                solutionId={solutionId}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${displayScore}%` }}
              />
            </div>
            <span className="text-sm text-slate-500 font-medium w-10 text-right">{displayScore}%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// Desktop Version - Scroll-based interaction
// ============================================================================

// Desktop Validation Step - Uses MotionValue for smooth scroll-linked animations
const DesktopValidationStepItem: React.FC<{
  step: ValidationStep;
  index: number;
  score: MotionValue<number>;
  solutionId: string;
  isLast: boolean;
}> = ({ step, index, score, solutionId, isLast }) => {
  const { t } = useTranslation();
  const IconComponent = step.icon;
  const prevThreshold = index > 0 ? validationSteps[index - 1].threshold : 0;
  const pointsEarned = step.threshold - prevThreshold;

  const bgColor = useTransform(score, (s) => s >= step.threshold ? '#f0fdf4' : '#ffffff');
  const borderColor = useTransform(score, (s) => s >= step.threshold ? '#86efac' : '#e2e8f0');
  const iconBg = useTransform(score, (s) =>
    s >= step.threshold ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#f1f5f9'
  );
  const iconColor = useTransform(score, (s) => s >= step.threshold ? '#ffffff' : '#94a3b8');
  const textColor = useTransform(score, (s) => s >= step.threshold ? '#166534' : '#64748b');
  const subTextColor = useTransform(score, (s) => s >= step.threshold ? '#15803d' : '#94a3b8');
  const checkBg = useTransform(score, (s) => s >= step.threshold ? '#22c55e' : '#e2e8f0');
  const checkOpacity = useTransform(score, (s) => s >= step.threshold ? 1 : 0.5);

  return (
    <div className="relative">
      {/* Connection line */}
      {!isLast && (
        <div className="absolute left-6 top-14 w-0.5 h-6 bg-slate-200" />
      )}

      <motion.div
        className="flex items-center gap-4 p-4 rounded-2xl border transition-colors duration-300"
        style={{
          background: bgColor,
          borderColor: borderColor,
        }}
      >
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
          style={{ background: iconBg }}
        >
          <motion.div style={{ color: iconColor }}>
            <IconComponent className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <div className="flex-1">
          <motion.p className="font-semibold transition-colors duration-300" style={{ color: textColor }}>
            {t(`solutions.${solutionId}.scoreAnimation.steps.${step.labelKey}`, step.defaultLabel)}
          </motion.p>
          <motion.p className="text-sm transition-colors duration-300" style={{ color: subTextColor }}>
            +{pointsEarned} {t(`solutions.${solutionId}.scoreAnimation.points`, 'points')}
          </motion.p>
        </div>

        {/* Check indicator */}
        <motion.div
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: checkBg, opacity: checkOpacity }}
        >
          <CheckCircle2 className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Desktop Score Display - Subscribes to MotionValue changes
const DesktopScoreDisplay: React.FC<{ score: MotionValue<number> }> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const unsubscribe = score.on('change', (latest) => {
      setDisplayScore(Math.round(Math.max(0, Math.min(100, latest))));
    });
    return unsubscribe;
  }, [score]);

  return <span>{displayScore}</span>;
};

// Desktop Status Text - Subscribes to MotionValue changes
const DesktopStatusText: React.FC<{ score: MotionValue<number>; solutionId: string }> = ({ score, solutionId }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('Cold Lead');

  useEffect(() => {
    const unsubscribe = score.on('change', (s) => {
      setStatus(getStatusText(s, t, solutionId));
    });
    return unsubscribe;
  }, [score, t, solutionId]);

  return <span>{status}</span>;
};

// Desktop Progress Indicator
const DesktopProgressIndicator: React.FC<{ score: MotionValue<number> }> = ({ score }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = score.on('change', (s) => {
      setProgress(Math.round(Math.max(0, Math.min(100, s))));
    });
    return unsubscribe;
  }, [score]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-slate-500 font-medium">{progress}%</span>
    </div>
  );
};

// Desktop Lead Card - Uses MotionValue for smooth animations
const DesktopLeadCard: React.FC<{
  score: MotionValue<number>;
  solutionId: string;
}> = ({ score, solutionId }) => {
  const { t } = useTranslation();
  const circleRadius = 58;
  const circumference = 2 * Math.PI * circleRadius;

  const strokeColor = useTransform(score, getScoreColor);
  const strokeDashoffset = useTransform(score, (s) =>
    circumference - (Math.max(0, Math.min(100, s)) / 100) * circumference
  );
  const glowColor = useTransform(score, (s) => {
    const color = getScoreColor(s);
    return `radial-gradient(circle, ${color}40 0%, transparent 70%)`;
  });
  const cardBg = useTransform(score, getCardBackground);
  const badgeBg = useTransform(score, (s) => {
    const color = getScoreColor(s);
    return `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
  });
  const statusBg = useTransform(score, getStatusBackground);
  const statusColor = useTransform(score, getScoreColor);
  const dotColor = useTransform(score, getScoreColor);

  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-full blur-2xl opacity-40"
        style={{ background: glowColor }}
      />

      {/* Main card */}
      <motion.div
        className="relative rounded-3xl p-6 lg:p-8 shadow-2xl border border-slate-200/60"
        style={{ background: cardBg }}
      >
        {/* Avatar with circular progress */}
        <div className="relative w-28 h-28 lg:w-36 lg:h-36 mx-auto mb-4 lg:mb-6">
          {/* Background circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              style={{
                stroke: strokeColor,
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Avatar */}
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
            <User className="w-12 h-12 lg:w-16 lg:h-16 text-slate-400" />
          </div>

          {/* Score badge */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full shadow-lg font-bold text-white text-base lg:text-lg"
            style={{ background: badgeBg }}
          >
            <DesktopScoreDisplay score={score} />
          </motion.div>
        </div>

        {/* Lead info */}
        <div className="text-center">
          <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-1">
            {t(`solutions.${solutionId}.scoreAnimation.leadName`, 'Marcus Chen')}
          </h3>
          <p className="text-slate-500 text-xs lg:text-sm mb-3 lg:mb-4">
            {t(`solutions.${solutionId}.scoreAnimation.leadCompany`, 'TechFlow Inc.')}
          </p>

          {/* Status indicator - min-width prevents layout shift */}
          <motion.div
            className="inline-flex items-center justify-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium min-w-[140px] lg:min-w-[160px]"
            style={{ background: statusBg, color: statusColor }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: dotColor }}
            />
            <DesktopStatusText score={score} solutionId={solutionId} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const DesktopLeadScoreAnimation: React.FC<{ solutionId: string }> = ({ solutionId }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0-1) to score (0-100)
  const score = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50"
      style={{ height: '300vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 lg:mb-12"
            >
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-3">
                {t(`solutions.${solutionId}.scoreAnimation.title`, 'Watch Lead Qualification in Real-Time')}
              </h2>
              <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto mb-4">
                {t(`solutions.${solutionId}.scoreAnimation.subtitle`, 'Scroll to see how our AI validates and scores leads based on multiple criteria')}
              </p>
              <div className="flex justify-center">
                <DesktopProgressIndicator score={score} />
              </div>
            </motion.div>

            {/* Main Animation Container */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Lead Card with Score */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center lg:justify-end"
              >
                <DesktopLeadCard score={score} solutionId={solutionId} />
              </motion.div>

              {/* Right: Validation Steps */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3 lg:space-y-4"
              >
                {validationSteps.map((step, index) => (
                  <DesktopValidationStepItem
                    key={step.id}
                    step={step}
                    index={index}
                    score={score}
                    solutionId={solutionId}
                    isLast={index === validationSteps.length - 1}
                  />
                ))}
              </motion.div>
            </div>

            {/* Bottom instruction */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center text-slate-400 text-sm mt-6 lg:mt-8"
            >
              {t(`solutions.${solutionId}.scoreAnimation.scrollHint`, '↓ Keep scrolling to see the validation process ↓')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// Main Component - Renders appropriate version based on viewport
// ============================================================================

const LeadScoreAnimation: React.FC<Props> = ({ solutionId }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated to avoid SSR/CSR mismatch
    setIsHydrated(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Debounced resize handler
    let timeoutId: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Show nothing until hydrated to prevent flash
  if (!isHydrated) {
    return null;
  }

  // Render appropriate version based on viewport
  return isMobile ? (
    <MobileLeadScoreAnimation solutionId={solutionId} />
  ) : (
    <DesktopLeadScoreAnimation solutionId={solutionId} />
  );
};

export default LeadScoreAnimation;
