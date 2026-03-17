// src/components/AgentWorkforceBuilder.tsx
// v6 — CSS-based connector layer replaces hardcoded SVG geometry.
//
// Changes from v5:
//   • SVG connector layer removed — replaced with CSS divs that
//     live inside the grid and align automatically with HTML elements.
//   • CSS connectors: horizontal bar below hub, vertical drops per
//     column, and per-department vertical lines between badge and cards.
//   • items-start on the dept+agents grid so columns don't stretch.
//   • Agent cards use w-full max-w-[176px] instead of hardcoded w-[176px].
//   • Badge whitespace-nowrap removed; max-w-full added.
//   • driftMag reduced to 0 to prevent badges drifting into cards.
//   • Hub upward drift removed (final hubY value 0 instead of -20).
//   • Summary section gets min-h and looser spacing.
//   • Removed hubLineLengths, lineLength from deptAnims, SVG constants,
//     and all eslint-disable react-hooks/rules-of-hooks comments for those.
//
// No new dependencies.
// ============================================================================

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useMotionValue,
  useSpring,
  animate,
  MotionValue,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Phone,
  PhoneIncoming,
  ShoppingCart,
  UserCheck,
  CalendarCheck,
  Image,
  Share2,
  Cog,
  Building2,
  Zap,
  ArrowRight,
  Bot,
  LayoutGrid,
  Clock,
} from 'lucide-react';
import { trackCtaClick, trackSectionView } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Data
// ============================================================================

interface AgentDef {
  id: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  kpiValue: string;
  kpiLabel: string;
}

interface DeptDef {
  id: string;
  label: string;
  tKey: string;
  color: string;
  bg: string;
  hex: string;
  agents: AgentDef[];
}

const depts: DeptDef[] = [
  {
    id: 'outbound',
    label: 'Sales & Outbound',
    tKey: 'agentWorkforce.departments.outbound',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hex: '#2563eb',
    agents: [
      { id: 'lead-validator', slug: 'lead-validator', icon: UserCheck, kpiValue: '94%', kpiLabel: 'accuracy' },
      { id: 'sales-qualifier', slug: 'sales-qualifier', icon: Phone, kpiValue: '3x', kpiLabel: 'meetings' },
      { id: 'sales-agent', slug: 'sales-agent', icon: ShoppingCart, kpiValue: '+35%', kpiLabel: 'revenue' },
    ],
  },
  {
    id: 'inbound',
    label: 'Customer Service',
    tKey: 'agentWorkforce.departments.inbound',
    color: 'text-green-600',
    bg: 'bg-green-50',
    hex: '#16a34a',
    agents: [
      { id: 'virtual-receptionist', slug: 'virtual-receptionist', icon: PhoneIncoming, kpiValue: '99.9%', kpiLabel: 'answered' },
      { id: 'booking-agent', slug: 'booking-agent', icon: CalendarCheck, kpiValue: '+45%', kpiLabel: 'bookings' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Content',
    tKey: 'agentWorkforce.departments.marketing',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    hex: '#0d9488',
    agents: [
      { id: 'content-creator', slug: 'content-creator', icon: Image, kpiValue: '10x', kpiLabel: 'output' },
      { id: 'social-manager', slug: 'social-manager', icon: Share2, kpiValue: '+73%', kpiLabel: 'engagement' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    tKey: 'agentWorkforce.departments.operations',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    hex: '#ea580c',
    agents: [
      { id: 'operations-agent', slug: 'operations-agent', icon: Cog, kpiValue: '-60%', kpiLabel: 'manual work' },
    ],
  },
];

// ============================================================================
// KPI Display — countUp animation + label beat delay + accent flash
// ============================================================================

interface KpiDisplayProps {
  value: string;
  label: string;
  progress: MotionValue<number>;
  threshold: number;
  accentColor: string;
  reducedMotion: boolean;
}

const parseKpi = (v: string) => {
  const m = v.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: '', num: 0, suffix: v, isDecimal: false };
  const num = parseFloat(m[2]);
  return { prefix: m[1], num, suffix: m[3], isDecimal: num % 1 !== 0 };
};

const KpiDisplay: React.FC<KpiDisplayProps> = ({
  value,
  label,
  progress,
  threshold,
  accentColor,
  reducedMotion,
}) => {
  const [display, setDisplay] = useState('--');
  const [showLabel, setShowLabel] = useState(false);
  const [flash, setFlash] = useState(false);
  const startedRef = useRef(false);
  const animCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = progress.on('change', (v) => {
      if (v >= threshold && !startedRef.current) {
        startedRef.current = true;

        if (reducedMotion) {
          setDisplay(value);
          setShowLabel(true);
          return;
        }

        const { prefix, num, suffix, isDecimal } = parseKpi(value);

        const labelTimer = window.setTimeout(() => setShowLabel(true), 400);
        let flashTimer = 0;

        const controls = animate(0, num, {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (current) => {
            const rounded = isDecimal
              ? current.toFixed(1)
              : Math.round(current).toString();
            setDisplay(`${prefix}${rounded}${suffix}`);
          },
          onComplete: () => {
            setDisplay(value);
            setFlash(true);
            flashTimer = window.setTimeout(() => setFlash(false), 600);
          },
        });

        animCleanupRef.current = () => {
          controls.stop();
          window.clearTimeout(labelTimer);
          window.clearTimeout(flashTimer);
        };
      }
    });
    return () => {
      unsub();
      animCleanupRef.current?.();
    };
  }, [progress, threshold, value, reducedMotion]);

  return (
    <div className="flex items-baseline gap-1 pl-0.5">
      <span
        className="text-lg font-black tracking-tight transition-colors duration-300"
        style={{ color: flash ? accentColor : 'rgb(15, 23, 42)' }}
      >
        {display}
      </span>
      <motion.span
        className="text-[10px] text-slate-500 font-medium leading-tight"
        initial={{ opacity: 0, y: 4 }}
        animate={showLabel ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {label}
      </motion.span>
    </div>
  );
};

// ============================================================================
// Summary Stat Card — staggered entrance + countUp + icon bounce + gradient border
// ============================================================================

interface SummaryStatCardProps {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  triggerOpacity: MotionValue<number>;
  y: MotionValue<number>;
  reducedMotion: boolean;
}

const SummaryStatCard: React.FC<SummaryStatCardProps> = ({
  value, label, icon: Icon, color, triggerOpacity, y, reducedMotion,
}) => {
  const { prefix, suffix } = parseKpi(value);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const [iconBounced, setIconBounced] = useState(false);
  const startedRef = useRef(false);
  const animCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const unsub = triggerOpacity.on('change', (v) => {
      if (v >= 0.65 && !startedRef.current) {
        startedRef.current = true;
        if (reducedMotion) {
          setDisplay(value);
          setIconBounced(true);
          return;
        }
        const { prefix: p, num, suffix: s } = parseKpi(value);
        const controls = animate(0, num, {
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (current) => setDisplay(`${p}${Math.round(current)}${s}`),
          onComplete: () => {
            setDisplay(value);
            setIconBounced(true);
          },
        });
        animCleanupRef.current = () => controls.stop();
      }
    });
    return () => {
      unsub();
      animCleanupRef.current?.();
    };
  }, [triggerOpacity, value, reducedMotion]);

  return (
    <motion.div
      className="relative flex flex-col items-center text-center px-5 py-2 overflow-hidden"
      style={{ y }}
    >
      <motion.div
        className="mb-1.5"
        animate={iconBounced ? { scale: [1, 1.3, 0.85, 1.1, 1], rotate: [0, -8, 6, -3, 0] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </motion.div>
      <p className="text-xl font-black text-slate-900 leading-none">{display}</p>
      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{label}</p>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `${color}1a` }}>
        {!reducedMotion && (
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// Magnetic CTA Button — cursor tracking + shimmer + glow
// ============================================================================

interface MagneticCTAButtonProps {
  onClick: () => void;
  label: string;
  reducedMotion: boolean;
}

const MagneticCTAButton: React.FC<MagneticCTAButtonProps> = ({ onClick, label, reducedMotion }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 180, damping: 12 });
  const springY = useSpring(my, { stiffness: 180, damping: 12 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      style={reducedMotion ? {} : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.div
        className="absolute -inset-3 rounded-full blur-xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'rgba(37, 99, 235, 0.35)' }}
        aria-hidden="true"
      />
      <motion.button
        onClick={onClick}
        className="relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-sm shadow-xl shadow-blue-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #1e40af 100%)' }}
        animate={reducedMotion ? {} : { scale: hovered ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        aria-label={label}
      >
        {!reducedMotion && (
          <motion.span
            className="absolute inset-0 w-[200%]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
            aria-hidden="true"
          />
        )}
        <span className="relative z-10">{label}</span>
        <motion.span
          className="relative z-10"
          animate={reducedMotion ? {} : { x: hovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

// ============================================================================
// Department Badge — border-drawing SVG + icon spring micro-animation
// ============================================================================

interface DeptBadgeAnims {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotateX: MotionValue<number>;
  filter: MotionValue<string>;
}

interface DeptBadgeProps {
  dept: DeptDef;
  anim: DeptBadgeAnims;
  reducedMotion: boolean;
  tLabel: string;
}

const DeptBadge: React.FC<DeptBadgeProps> = ({ dept, anim, reducedMotion, tLabel }) => {
  const DeptIcon = dept.agents[0]?.icon;
  const [iconEntered, setIconEntered] = useState(false);
  const iconEnteredRef = useRef(false);

  useEffect(() => {
    const unsub = anim.opacity.on('change', (v) => {
      if (v >= 0.65 && !iconEnteredRef.current) {
        iconEnteredRef.current = true;
        setIconEntered(true);
      }
    });
    return unsub;
  }, [anim.opacity]);

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{
        opacity: anim.opacity,
        y: anim.y,
        scale: anim.scale,
        rotateX: anim.rotateX,
        filter: anim.filter,
        transformPerspective: 800,
        willChange: 'transform, opacity',
      }}
    >
      {/* Icon block with drawing border */}
      <div
        className={cn('relative w-12 h-12 rounded-xl flex items-center justify-center shadow-md border-2', dept.bg)}
        style={{ borderColor: `${dept.hex}25`, boxShadow: `0 6px 20px ${dept.hex}18` }}
      >
        {!reducedMotion && (
          <svg
            className="absolute pointer-events-none"
            style={{ inset: '-3px', width: 'calc(100% + 6px)', height: 'calc(100% + 6px)' }}
            viewBox="0 0 54 54"
            overflow="visible"
            aria-hidden="true"
          >
            <motion.rect
              x="1.5" y="1.5"
              width="51" height="51"
              rx="12" ry="12"
              fill="none"
              stroke={dept.hex}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: anim.opacity }}
            />
          </svg>
        )}

        {DeptIcon && (
          <motion.div
            initial={reducedMotion ? false : { scale: 0.4, rotate: -15, opacity: 0 }}
            animate={iconEntered || reducedMotion
              ? { scale: 1, rotate: 0, opacity: 1 }
              : { scale: 0.4, rotate: -15, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 380, damping: 14 }}
          >
            <DeptIcon className={cn('w-5 h-5', dept.color)} />
          </motion.div>
        )}
      </div>

      {/* Department label — no whitespace-nowrap, allows wrapping */}
      <span
        className={cn(
          'mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border text-center max-w-full',
          dept.bg,
          dept.color,
        )}
        style={{ borderColor: `${dept.hex}20` }}
      >
        {tLabel}
      </span>
    </motion.div>
  );
};

// ============================================================================
// Agent Card — glassmorphism + ambient pulse glow + motion hover
// ============================================================================

interface AgentCardProps {
  agent: AgentDef;
  dept: DeptDef;
  progress: MotionValue<number>;
  revealThreshold: number;
  reducedMotion: boolean;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  dept,
  progress,
  revealThreshold,
  reducedMotion,
  onClick,
}) => {
  const { t } = useTranslation('home');
  const Icon = agent.icon;

  return (
    <div
      className="cursor-pointer group w-full max-w-[176px]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
    >
      <motion.div
        className="relative rounded-2xl border bg-white/80 backdrop-blur-md p-3 shadow-md shadow-slate-200/50"
        style={{ borderColor: `${dept.hex}35` }}
        whileHover={reducedMotion ? {} : { scale: 1.05, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {!reducedMotion && (
          <motion.div
            className="absolute -inset-1 rounded-2xl -z-10"
            style={{ background: `${dept.hex}0e` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{ background: `${dept.hex}22` }}
        />

        <div className="flex items-center gap-2 mb-2">
          <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shadow-sm shrink-0', dept.bg)}>
            <Icon className={cn('w-4 h-4', dept.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-900 leading-tight line-clamp-2">
              {t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
            </p>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
              {t('agentWorkforce.agentLabel', 'AI Agent')}
            </span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-emerald-600 uppercase">{t('agentWorkforce.liveLabel', 'Live')}</span>
          </div>
        </div>

        <KpiDisplay
          value={agent.kpiValue}
          label={t(`agentWorkforce.kpis.${agent.id}`, agent.kpiLabel)}
          progress={progress}
          threshold={revealThreshold}
          accentColor={dept.hex}
          reducedMotion={reducedMotion}
        />

        <ArrowRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </motion.div>
    </div>
  );
};

// ============================================================================
// Hub — gradient rotating ring + orbiting energy particles
// ============================================================================

interface HubCenterProps {
  hubOpacity: MotionValue<number>;
  hubY: MotionValue<number>;
  hubScale: MotionValue<number>;
  hubFilter: MotionValue<string>;
  reducedMotion: boolean;
  centralNode: string;
  centralBadge: string;
}

const HubCenter: React.FC<HubCenterProps> = ({
  hubOpacity,
  hubY,
  hubScale,
  hubFilter,
  reducedMotion,
  centralNode,
  centralBadge,
}) => (
  <motion.div
    className="flex flex-col items-center"
    style={{ opacity: hubOpacity, y: hubY, scale: hubScale, filter: hubFilter, willChange: 'transform, opacity' }}
  >
    <div className="relative flex flex-col items-center">

      {!reducedMotion && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 124, height: 124, top: -22, left: -22 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 20%, #3b82f655 40%, #06b6d470 55%, #3b82f655 70%, transparent 90%)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), white calc(100% - 1.5px))',
            }}
          />
        </motion.div>
      )}

      {!reducedMotion ? (
        <motion.div
          className="absolute rounded-full border border-blue-300/25 pointer-events-none"
          style={{ width: 152, height: 152, top: -36, left: -36 }}
          animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute w-36 h-36 rounded-full border border-slate-200/30 -top-6 -left-6" />
      )}

      {!reducedMotion && (
        <>
          <motion.div
            className="absolute pointer-events-none"
            style={{ width: 108, height: 108, top: -14, left: -14, borderRadius: '50%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/75 blur-[1px]"
              style={{ top: '2px', left: '50%', transform: 'translateX(-50%)' }}
            />
            <div
              className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
              style={{ top: '50%', right: '2px', transform: 'translateY(-50%)' }}
            />
            <div
              className="absolute w-1 h-1 rounded-full bg-blue-300/50"
              style={{ bottom: '8px', left: '12px' }}
            />
          </motion.div>
          <motion.div
            className="absolute pointer-events-none"
            style={{ width: 108, height: 108, top: -14, left: -14, borderRadius: '50%' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            aria-hidden="true"
          >
            <div
              className="absolute w-1 h-1 rounded-full bg-purple-400/50"
              style={{ top: '14%', right: '10%' }}
            />
          </motion.div>
        </>
      )}

      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl shadow-slate-900/25 flex items-center justify-center border border-slate-700/50">
        <Building2 className="w-9 h-9 text-white" />
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white shadow-md" />
      </div>

      <div className="mt-2.5 text-center">
        <p className="text-sm font-bold text-slate-900">{centralNode}</p>
        <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/5 border border-slate-200">
          <Zap className="w-2.5 h-2.5 text-blue-500" />
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
            {centralBadge}
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

// ============================================================================
// CSS Connector — vertical line between hub-row and a department column,
// and between badge and agent cards within each column.
// ============================================================================

interface ConnectorLineProps {
  color: string;
  reducedMotion: boolean;
  delay?: number;
}

/** Thin vertical connector line with breathing opacity animation. */
const ConnectorLine: React.FC<ConnectorLineProps & { className?: string }> = ({
  color,
  reducedMotion,
  delay = 0,
  className,
}) => (
  <motion.div
    className={cn('w-px', className)}
    style={{ background: color }}
    animate={reducedMotion ? { opacity: 0.4 } : { opacity: [0.25, 0.65, 0.25] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay }}
    aria-hidden="true"
  />
);

// ============================================================================
// Main Component
// ============================================================================

const AgentWorkforceBuilder: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);
  const reducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.03 && !trackedRef.current) {
        trackedRef.current = true;
        trackSectionView('agent_workforce_builder', 'homepage');
      }
    });
    return unsub;
  }, [scrollYProgress]);

  // ── Background orb parallax ────────────────────────────────────────────
  const orbBlueY   = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const orbTealY   = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const orbOrangeY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // ── Hub (Layer 3) ──────────────────────────────────────────────────────
  const hubOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const hubScale   = useTransform(scrollYProgress, [0, 0.08, 0.60], [0.72, 1, 0.96]);
  // Fix 5: removed upward drift at end — final value 0 instead of -20
  const hubY       = useTransform(scrollYProgress, [0, 0.08, 0.60], [-40, 0, 0]);
  const hubBlur    = useTransform(scrollYProgress, [0, 0.08], [8, 0]);
  const hubFilter  = useMotionTemplate`blur(${hubBlur}px)`;

  // ── Department badges (Layer 5) ────────────────────────────────────────
  // Fix 5: driftMag = 0 to prevent badges drifting into agent cards
  const deptAnims = depts.map((_, i) => {
    const start = 0.18 + i * 0.05;
    const end   = start + 0.10;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y       = useTransform(scrollYProgress, [start, end], [22, 0]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const scale   = useTransform(scrollYProgress, [start, end], [0.60, 1]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const rotateX = useTransform(scrollYProgress, [start, end], [25, 0]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const blurVal = useTransform(scrollYProgress, [start, end], [4, 0]);
    const filter  = useMotionTemplate`blur(${blurVal}px)`;
    return { opacity, y, scale, rotateX, filter };
  });

  // ── Agent cards (Layer 6) ──────────────────────────────────────────────
  const flatAgents: { agent: AgentDef; dept: DeptDef; deptIdx: number; agentIdx: number }[] = [];
  depts.forEach((dept, di) => {
    dept.agents.forEach((agent, ai) => {
      flatAgents.push({ agent, dept, deptIdx: di, agentIdx: ai });
    });
  });

  const agentAnims = flatAgents.map(({ deptIdx, agentIdx }) => {
    const start  = 0.38 + deptIdx * 0.07 + agentIdx * 0.045;
    const xStart = deptIdx === 0 ? 14 : deptIdx === 3 ? -14 : 0;
    return {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      opacity:  useTransform(scrollYProgress, [start, start + 0.07], [0, 1]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      y:        useTransform(scrollYProgress, [start, start + 0.07], [28, 0]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      x:        useTransform(scrollYProgress, [start, start + 0.07], [xStart, 0]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      rotateX:  useTransform(scrollYProgress, [start, start + 0.07], [15, 0]),
      revealThreshold: start + 0.07,
    };
  });

  // ── Summary / CTA (Layer 7) ────────────────────────────────────────────
  const summaryOpacity = useTransform(scrollYProgress, [0.67, 0.75], [0, 1]);
  const summaryScale   = useTransform(scrollYProgress, [0.67, 0.75], [0.94, 1]);
  const stat0Y         = useTransform(scrollYProgress, [0.67, 0.75], [24, 0]);
  const stat1Y         = useTransform(scrollYProgress, [0.69, 0.77], [24, 0]);
  const stat2Y         = useTransform(scrollYProgress, [0.72, 0.80], [24, 0]);
  const ctaOpacity     = useTransform(scrollYProgress, [0.74, 0.81], [0, 1]);
  const ctaY           = useTransform(scrollYProgress, [0.74, 0.81], [16, 0]);
  const ctaScale       = useTransform(scrollYProgress, [0.74, 0.81], [0.92, 1]);

  // ── Scroll hint ────────────────────────────────────────────────────────
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const goToAgent = (slug: string) => {
    trackCtaClick(`agent_card_${slug}`, 'agent_workforce_builder', slug);
    navigate(`/${lang || 'en'}/solutions/${slug}`);
  };

  const goToSolutions = () => {
    trackCtaClick('explore_solutions', 'agent_workforce_builder', 'Explore Solutions');
    navigate(`/${lang || 'en'}/solutions`);
  };

  return (
    <section
      ref={ref}
      className="relative hidden md:block"
      style={{ height: '300vh' }}
      aria-label={t('agentWorkforce.title', 'Build Your AI Workforce')}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background ───────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/60 to-white" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-[10%] left-[8%] w-[480px] h-[480px] bg-blue-100/25 rounded-full blur-[110px]"
            style={{ y: orbBlueY, willChange: 'transform' }}
          />
          <motion.div
            className="absolute bottom-[8%] right-[8%] w-[380px] h-[380px] bg-teal-100/25 rounded-full blur-[100px]"
            style={{ y: orbTealY, willChange: 'transform' }}
          />
          <motion.div
            className="absolute top-[40%] right-[25%] w-[280px] h-[280px] bg-orange-50/20 rounded-full blur-[80px]"
            style={{ y: orbOrangeY, willChange: 'transform' }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* ── HTML layout layer ─────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center">

          {/* Top spacing — clears the fixed header (~80px) */}
          <div className="h-24 shrink-0" />

          {/* ── Hub ─────────────────────────────────────────────── */}
          <HubCenter
            hubOpacity={hubOpacity}
            hubY={hubY}
            hubScale={hubScale}
            hubFilter={hubFilter}
            reducedMotion={reducedMotion}
            centralNode={t('agentWorkforce.centralNode', 'Your Company')}
            centralBadge={t('agentWorkforce.centralBadge', 'AI-Powered')}
          />

          {/* ── Hub → Dept connector: horizontal bar + vertical drops ─── */}
          <motion.div
            className="w-full max-w-[860px] px-4 pointer-events-none"
            style={{ opacity: hubOpacity }}
            aria-hidden="true"
          >
            <div className="relative h-8">
              {/* Horizontal connector bar */}
              <motion.div
                className="absolute top-0 h-px"
                style={{
                  left: '12.5%',
                  right: '12.5%',
                  background: `linear-gradient(90deg, ${depts[0].hex}55, ${depts[1].hex}55, ${depts[2].hex}55, ${depts[3].hex}55)`,
                }}
                animate={reducedMotion ? { opacity: 0.4 } : { opacity: [0.25, 0.65, 0.25] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Vertical drop for each dept column */}
              {depts.map((dept, di) => (
                <ConnectorLine
                  key={`hub-drop-${dept.id}`}
                  color={dept.hex}
                  reducedMotion={reducedMotion}
                  delay={di * 0.3}
                  className="absolute top-0 bottom-0"
                  style={{ left: `${12.5 + di * 25}%`, transform: 'translateX(-50%)' } as React.CSSProperties}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Departments + Agents (4-column grid) ─────────────── */}
          {/* Fix 2: items-start so columns don't stretch to tallest */}
          <div className="w-full max-w-[860px] px-4 grid grid-cols-4 gap-x-4 items-start">
            {depts.map((dept, di) => {
              const deptAnim = deptAnims[di];

              return (
                <div key={dept.id} className="flex flex-col items-center gap-0">

                  {/* Department badge */}
                  <DeptBadge
                    dept={dept}
                    anim={deptAnim}
                    reducedMotion={reducedMotion}
                    tLabel={t(dept.tKey, dept.label)}
                  />

                  {/* Vertical connector: badge → agent cards */}
                  <motion.div style={{ opacity: deptAnim.opacity }}>
                    <ConnectorLine
                      color={dept.hex}
                      reducedMotion={reducedMotion}
                      delay={di * 0.3 + 0.15}
                      className="h-2.5"
                    />
                  </motion.div>

                  {/* Agent cards for this department */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    {dept.agents.map((agent, ai) => {
                      const flatIdx = flatAgents.findIndex((fa) => fa.agent.id === agent.id);
                      const anim = agentAnims[flatIdx];

                      return (
                        <React.Fragment key={agent.id}>
                          {/* Inter-card connector (skip for first card — badge connector above handles it) */}
                          {ai > 0 && (
                            <ConnectorLine
                              color={dept.hex}
                              reducedMotion={reducedMotion}
                              delay={(di + ai) * 0.25}
                              className="h-0"
                            />
                          )}
                          <motion.div
                            style={{
                              opacity: anim.opacity,
                              y: anim.y,
                              x: anim.x,
                              rotateX: reducedMotion ? undefined : anim.rotateX,
                              transformPerspective: reducedMotion ? undefined : 900,
                              willChange: 'transform, opacity',
                            }}
                            className="w-full flex justify-center"
                          >
                            <AgentCard
                              agent={agent}
                              dept={dept}
                              progress={scrollYProgress}
                              revealThreshold={anim.revealThreshold}
                              reducedMotion={reducedMotion}
                              onClick={() => goToAgent(agent.slug)}
                            />
                          </motion.div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Summary stats + CTA ──────────────────────────── */}
          {/* Fix 6: min-h and looser spacing */}
          <div className="mt-auto mb-8 flex flex-col items-center gap-4 min-h-[140px]">
            <motion.div
              className="flex items-center bg-white/85 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-2 py-1 shadow-lg shadow-slate-200/30"
              style={{ opacity: summaryOpacity, scale: summaryScale }}
            >
              <SummaryStatCard
                value="8"
                label={t('agentWorkforce.summary.agents', 'AI Agents')}
                icon={Bot}
                color="#3b82f6"
                triggerOpacity={summaryOpacity}
                y={stat0Y}
                reducedMotion={reducedMotion}
              />
              <div className="w-px h-10 bg-slate-200/70 mx-1" />
              <SummaryStatCard
                value="4"
                label={t('agentWorkforce.summary.departments', 'Departments')}
                icon={LayoutGrid}
                color="#8b5cf6"
                triggerOpacity={summaryOpacity}
                y={stat1Y}
                reducedMotion={reducedMotion}
              />
              <div className="w-px h-10 bg-slate-200/70 mx-1" />
              <SummaryStatCard
                value="24/7"
                label={t('agentWorkforce.summary.availability', 'Availability')}
                icon={Clock}
                color="#10b981"
                triggerOpacity={summaryOpacity}
                y={stat2Y}
                reducedMotion={reducedMotion}
              />
            </motion.div>

            <motion.div style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}>
              <MagneticCTAButton
                onClick={goToSolutions}
                label={t('agentWorkforce.cta', 'Explore All Solutions')}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          </div>
        </div>

        {/* ── Scroll hint ──────────────────────────────────────── */}
        <motion.p
          className="absolute bottom-3 left-0 right-0 text-center text-slate-400/60 text-xs z-20 pointer-events-none"
          style={{ opacity: hintOpacity }}
          aria-hidden="true"
        >
          {t('agentWorkforce.scrollHint', '↓ Scroll to build your AI team ↓')}
        </motion.p>
      </div>
    </section>
  );
};

export default AgentWorkforceBuilder;
