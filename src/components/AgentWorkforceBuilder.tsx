// src/components/AgentWorkforceBuilder.tsx
// v3 — Clean grid-based scroll animation.
// Layout: hub (top-center) → 4 department columns → agent cards below each dept.
// No macro-zoom, no percentage-based absolute positioning.
// Desktop only — hidden on mobile via `hidden md:block`.

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
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
// Sub-components
// ============================================================================

/**
 * KPI value — renders placeholder until scroll reaches threshold,
 * then swaps in the real value.
 */
const KpiCounter: React.FC<{
  value: string;
  progress: MotionValue<number>;
  threshold: number;
}> = ({ value, progress, threshold }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const unsub = progress.on('change', (v) => setShow(v >= threshold));
    return unsub;
  }, [progress, threshold]);
  return <span>{show ? value : '--'}</span>;
};

/** Individual agent card with hover state and click navigation. */
const AgentCard: React.FC<{
  agent: AgentDef;
  dept: DeptDef;
  progress: MotionValue<number>;
  revealThreshold: number;
  onClick: () => void;
}> = ({ agent, dept, progress, revealThreshold, onClick }) => {
  const { t } = useTranslation('home');
  const Icon = agent.icon;

  return (
    <div
      className="cursor-pointer group w-[176px]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
    >
      <div
        className="relative rounded-2xl border bg-white/95 backdrop-blur-sm p-3 shadow-md shadow-slate-200/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/50 group-hover:-translate-y-1"
        style={{ borderColor: `${dept.hex}30` }}
      >
        {/* Ambient glow on hover */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{ background: `${dept.hex}18` }}
        />

        {/* Header: icon + name + live badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shadow-sm shrink-0', dept.bg)}>
            <Icon className={cn('w-4 h-4', dept.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-900 leading-tight line-clamp-2">
              {t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
            </p>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
              AI Agent
            </span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-emerald-600 uppercase">Live</span>
          </div>
        </div>

        {/* KPI */}
        <div className="flex items-baseline gap-1 pl-0.5">
          <span className="text-lg font-black text-slate-900 tracking-tight">
            <KpiCounter value={agent.kpiValue} progress={progress} threshold={revealThreshold} />
          </span>
          <span className="text-[10px] text-slate-500 font-medium leading-tight">
            {t(`agentWorkforce.kpis.${agent.id}`, agent.kpiLabel)}
          </span>
        </div>

        {/* Hover arrow */}
        <ArrowRight className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const AgentWorkforceBuilder: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const [tracked, setTracked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Track section view on first scroll into the section
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.03 && !tracked) {
        trackSectionView('agent_workforce_builder', 'homepage');
        setTracked(true);
      }
    });
    return unsub;
  }, [scrollYProgress, tracked]);

  // ── Animation timeline ────────────────────────────────────────────────────
  //
  // 0%  –  8%  : Hub fades + slides in from above
  // 8%  – 20%  : Hub→Dept connector lines draw down
  // 18% – 40%  : Department badges appear (staggered)
  // 38% – 75%  : Agent cards appear below their dept (staggered)
  // 80% – 92%  : Summary stats + CTA fade in
  // 0%  –  5%  : Scroll hint fades out
  // ─────────────────────────────────────────────────────────────────────────

  // Hub
  const hubOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const hubY = useTransform(scrollYProgress, [0, 0.08], [-30, 0]);

  // Hub → dept lines (one per dept, staggered slightly)
  const hubLineLengths = depts.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0.08 + i * 0.01, 0.22 + i * 0.01], [0, 1])
  );

  // Department badge animations (staggered)
  const deptAnims = depts.map((_, i) => {
    const start = 0.18 + i * 0.05;
    return {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      opacity: useTransform(scrollYProgress, [start, start + 0.07], [0, 1]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      y: useTransform(scrollYProgress, [start, start + 0.07], [18, 0]),
      // Dept → agent connector line length
      // eslint-disable-next-line react-hooks/rules-of-hooks
      lineLength: useTransform(scrollYProgress, [start + 0.06, start + 0.16], [0, 1]),
    };
  });

  // Agent card animations — flat list ordered by dept index
  const flatAgents: { agent: AgentDef; dept: DeptDef; deptIdx: number; agentIdx: number }[] = [];
  depts.forEach((dept, di) => {
    dept.agents.forEach((agent, ai) => {
      flatAgents.push({ agent, dept, deptIdx: di, agentIdx: ai });
    });
  });

  const agentAnims = flatAgents.map(({ deptIdx, agentIdx }) => {
    // Stagger: first by dept, then by agent position within dept
    const start = 0.38 + deptIdx * 0.06 + agentIdx * 0.04;
    return {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      opacity: useTransform(scrollYProgress, [start, start + 0.07], [0, 1]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      y: useTransform(scrollYProgress, [start, start + 0.07], [20, 0]),
      revealThreshold: start + 0.07,
    };
  });

  // Summary / CTA
  const summaryOpacity = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]);
  const summaryY = useTransform(scrollYProgress, [0.80, 0.90], [24, 0]);

  // Scroll hint
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Navigation helpers
  const goToAgent = (slug: string) => {
    trackCtaClick(`agent_card_${slug}`, 'agent_workforce_builder', slug);
    navigate(`/${lang || 'en'}/solutions/${slug}`);
  };

  const goToSolutions = () => {
    trackCtaClick('explore_solutions', 'agent_workforce_builder', 'Explore Solutions');
    navigate(`/${lang || 'en'}/solutions`);
  };

  // ── SVG connector geometry ─────────────────────────────────────────────
  // We render a 1000×800 SVG and position connectors using known column centers.
  // Column layout (4 depts, equal width):
  //   Col 0 center: 125px   Col 1: 375px   Col 2: 625px   Col 3: 875px
  // Hub center X: 500px
  // Hub bottom Y:  ~185px  (top-area hub)
  // Dept top Y:    ~260px
  // Dept bottom Y: ~300px
  // Agent card area starts Y: ~350px
  const SVG_W = 1000;
  const SVG_H = 780;

  // Hub center in SVG coords
  const HUB_CX = 500;
  const HUB_BOTTOM = 188;

  // Department column centers
  const DEPT_COLS = [125, 375, 625, 875];
  const DEPT_TOP = 258;
  const DEPT_BOTTOM = 302;

  // Agent row start Y — each agent card is ~86px tall + 10px gap
  const AGENT_TOP = 352;
  const AGENT_ROW_H = 96;

  return (
    <section
      ref={ref}
      className="relative hidden md:block"
      style={{ height: '350vh' }}
      aria-label={t('agentWorkforce.title', 'Build Your AI Workforce')}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/60 to-white" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[8%] w-[480px] h-[480px] bg-blue-100/25 rounded-full blur-[110px]" />
          <div className="absolute bottom-[8%] right-[8%] w-[380px] h-[380px] bg-teal-100/25 rounded-full blur-[100px]" />
          <div className="absolute top-[40%] right-[25%] w-[280px] h-[280px] bg-orange-50/20 rounded-full blur-[80px]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* ── Section heading ──────────────────────────────────────────── */}
        <div className="absolute top-6 left-0 right-0 z-20 text-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-[2.6rem] font-bold text-slate-900 mb-1.5 leading-tight">
              {t('agentWorkforce.title', 'Build Your AI Workforce')}
            </h2>
            <p className="text-sm lg:text-base text-slate-500 max-w-lg mx-auto">
              {t('agentWorkforce.subtitle', 'Scroll to see how 8 specialized AI agents form a complete team across every department')}
            </p>
          </motion.div>
        </div>

        {/* ── SVG connector lines layer ────────────────────────────────── */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {depts.map((dept, di) => {
            const cx = DEPT_COLS[di];

            // Hub → department: vertical line from hub bottom to dept top
            const hubToDeptPath = `M ${HUB_CX} ${HUB_BOTTOM} C ${HUB_CX} ${(HUB_BOTTOM + DEPT_TOP) / 2}, ${cx} ${(HUB_BOTTOM + DEPT_TOP) / 2}, ${cx} ${DEPT_TOP}`;

            return (
              <g key={`lines-${dept.id}`}>
                {/* Hub → dept line */}
                <path
                  d={hubToDeptPath}
                  fill="none"
                  stroke={`${dept.hex}12`}
                  strokeWidth="2"
                />
                <motion.path
                  d={hubToDeptPath}
                  fill="none"
                  stroke={dept.hex}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ pathLength: hubLineLengths[di], strokeDasharray: '0 1' }}
                />

                {/* Dept → each agent: straight vertical lines */}
                {dept.agents.map((agent, ai) => {
                  const agentY = AGENT_TOP + ai * AGENT_ROW_H;
                  const deptToAgentPath = `M ${cx} ${DEPT_BOTTOM} L ${cx} ${agentY}`;
                  return (
                    <g key={`line-agent-${agent.id}`}>
                      <path
                        d={deptToAgentPath}
                        fill="none"
                        stroke={`${dept.hex}12`}
                        strokeWidth="2"
                      />
                      <motion.path
                        d={deptToAgentPath}
                        fill="none"
                        stroke={dept.hex}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        style={{ pathLength: deptAnims[di].lineLength, strokeDasharray: '0 1' }}
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* ── HTML layout layer ────────────────────────────────────────── */}
        <div className="absolute inset-0 z-10 flex flex-col items-center">

          {/* Spacer to push content below heading */}
          <div className="h-[112px] shrink-0" />

          {/* ── Hub ───────────────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-center"
            style={{ opacity: hubOpacity, y: hubY }}
          >
            <div className="relative flex flex-col items-center">
              {/* Subtle pulsing rings */}
              <div
                className="absolute w-28 h-28 rounded-full border border-blue-200/40 -top-2 -left-2 animate-ping"
                style={{ animationDuration: '3s' }}
              />
              <div className="absolute w-36 h-36 rounded-full border border-slate-200/30 -top-6 -left-6" />

              {/* Icon block */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl shadow-slate-900/25 flex items-center justify-center border border-slate-700/50">
                <Building2 className="w-9 h-9 text-white" />
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white shadow-md" />
              </div>

              {/* Label */}
              <div className="mt-2.5 text-center">
                <p className="text-sm font-bold text-slate-900">
                  {t('agentWorkforce.centralNode', 'Your Company')}
                </p>
                <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/5 border border-slate-200">
                  <Zap className="w-2.5 h-2.5 text-blue-500" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {t('agentWorkforce.centralBadge', 'AI-Powered')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Departments + Agents (4-column grid) ─────────────────── */}
          <div className="mt-8 w-full max-w-[860px] px-4 grid grid-cols-4 gap-x-4">
            {depts.map((dept, di) => {
              const DeptIcon = dept.agents[0]?.icon;
              const deptAnim = deptAnims[di];

              return (
                <div key={dept.id} className="flex flex-col items-center gap-2.5">

                  {/* Department badge */}
                  <motion.div
                    className="flex flex-col items-center"
                    style={{ opacity: deptAnim.opacity, y: deptAnim.y }}
                  >
                    <div
                      className={cn('w-12 h-12 rounded-xl flex items-center justify-center shadow-md border-2', dept.bg)}
                      style={{ borderColor: `${dept.hex}25`, boxShadow: `0 6px 20px ${dept.hex}18` }}
                    >
                      {DeptIcon && <DeptIcon className={cn('w-5 h-5', dept.color)} />}
                    </div>
                    <span
                      className={cn(
                        'mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border text-center whitespace-nowrap',
                        dept.bg,
                        dept.color,
                      )}
                      style={{ borderColor: `${dept.hex}20` }}
                    >
                      {t(dept.tKey, dept.label)}
                    </span>
                  </motion.div>

                  {/* Agent cards for this department */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    {dept.agents.map((agent) => {
                      // Find this agent's index in the flat list for animation lookup
                      const flatIdx = flatAgents.findIndex((fa) => fa.agent.id === agent.id);
                      const anim = agentAnims[flatIdx];

                      return (
                        <motion.div
                          key={agent.id}
                          style={{ opacity: anim.opacity, y: anim.y }}
                        >
                          <AgentCard
                            agent={agent}
                            dept={dept}
                            progress={scrollYProgress}
                            revealThreshold={anim.revealThreshold}
                            onClick={() => goToAgent(agent.slug)}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Summary stats + CTA ──────────────────────────────────── */}
          <motion.div
            className="mt-auto mb-6 flex flex-col items-center gap-3"
            style={{ opacity: summaryOpacity, y: summaryY }}
          >
            <div className="flex items-center gap-6 bg-white/85 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-7 py-3.5 shadow-lg shadow-slate-200/30">
              {[
                { v: '8', l: t('agentWorkforce.summary.agents', 'AI Agents') },
                { v: '4', l: t('agentWorkforce.summary.departments', 'Departments') },
                { v: '24/7', l: t('agentWorkforce.summary.availability', 'Availability') },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-xl font-black text-slate-900">{s.v}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{s.l}</p>
                </div>
              ))}
            </div>

            <button
              onClick={goToSolutions}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5"
              aria-label={t('agentWorkforce.cta', 'Explore All Solutions')}
            >
              {t('agentWorkforce.cta', 'Explore All Solutions')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* ── Scroll hint ──────────────────────────────────────────────── */}
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
