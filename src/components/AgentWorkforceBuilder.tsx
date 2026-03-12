// src/components/AgentWorkforceBuilder.tsx
// v2 — Cinematic scroll-driven animation: company icon starts huge, shrinks,
// then departments and agents deploy with macro-zoom effect.
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
  // Final position (% of viewport) for the department badge
  x: number; // % from left
  y: number; // % from top
  agents: (AgentDef & {
    // Final position for each agent card
    ax: number;
    ay: number;
  })[];
}

// Positions are carefully spread across the full viewport to avoid cramping.
// The company hub sits at ~(50%, 42%). Departments fan out around it.
// Agent cards radiate outward from their department.
const depts: DeptDef[] = [
  {
    id: 'outbound',
    label: 'Sales & Outbound',
    tKey: 'agentWorkforce.departments.outbound',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hex: '#2563eb',
    x: 16, y: 28,
    agents: [
      { id: 'lead-validator', slug: 'lead-validator', icon: UserCheck, kpiValue: '94%', kpiLabel: 'accuracy', ax: 3, ay: 14 },
      { id: 'sales-qualifier', slug: 'sales-qualifier', icon: Phone, kpiValue: '3x', kpiLabel: 'meetings', ax: 5, ay: 46 },
      { id: 'sales-agent', slug: 'sales-agent', icon: ShoppingCart, kpiValue: '+35%', kpiLabel: 'revenue', ax: 18, ay: 68 },
    ],
  },
  {
    id: 'inbound',
    label: 'Customer Service',
    tKey: 'agentWorkforce.departments.inbound',
    color: 'text-green-600',
    bg: 'bg-green-50',
    hex: '#16a34a',
    x: 38, y: 18,
    agents: [
      { id: 'virtual-receptionist', slug: 'virtual-receptionist', icon: PhoneIncoming, kpiValue: '99.9%', kpiLabel: 'answered', ax: 28, ay: 5 },
      { id: 'booking-agent', slug: 'booking-agent', icon: CalendarCheck, kpiValue: '+45%', kpiLabel: 'bookings', ax: 42, ay: 68 },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Content',
    tKey: 'agentWorkforce.departments.marketing',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    hex: '#0d9488',
    x: 62, y: 18,
    agents: [
      { id: 'content-creator', slug: 'content-creator', icon: Image, kpiValue: '10x', kpiLabel: 'output', ax: 58, ay: 68 },
      { id: 'social-manager', slug: 'social-manager', icon: Share2, kpiValue: '+73%', kpiLabel: 'engagement', ax: 72, ay: 5 },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    tKey: 'agentWorkforce.departments.operations',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    hex: '#ea580c',
    x: 84, y: 28,
    agents: [
      { id: 'operations-agent', slug: 'operations-agent', icon: Cog, kpiValue: '-60%', kpiLabel: 'manual work', ax: 82, ay: 62 },
    ],
  },
];

// ============================================================================
// Sub-components
// ============================================================================

// Animated KPI that appears when threshold is reached
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
  return show ? <span>{value}</span> : <span className="text-slate-300">--</span>;
};

// Agent card — compact, clickable, with macro-zoom entrance
const AgentCard: React.FC<{
  agent: AgentDef;
  dept: DeptDef;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  progress: MotionValue<number>;
  threshold: number;
  onClick: () => void;
}> = ({ agent, dept, opacity, scale, progress, threshold, onClick }) => {
  const { t } = useTranslation();
  const Icon = agent.icon;

  return (
    <motion.div
      className="cursor-pointer group"
      style={{ opacity, scale }}
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl border bg-white/90 backdrop-blur-sm p-3.5 shadow-md shadow-slate-200/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-300/50 group-hover:-translate-y-1 w-[190px]"
        style={{ borderColor: `${dept.hex}25` }}
      >
        {/* Glow on hover */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{ background: `${dept.hex}15` }}
        />

        {/* Header: icon + name + active */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shadow-sm', dept.bg)}>
            <Icon className={cn('w-[18px] h-[18px]', dept.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-slate-900 leading-tight truncate">
              {t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
            </p>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
              AI Agent
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-emerald-600 uppercase">Live</span>
          </div>
        </div>

        {/* KPI */}
        <div className="flex items-baseline gap-1.5 pl-0.5">
          <span className="text-xl font-black text-slate-900 tracking-tight">
            <KpiCounter value={agent.kpiValue} progress={progress} threshold={threshold} />
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            {t(`agentWorkforce.kpis.${agent.id}`, agent.kpiLabel)}
          </span>
        </div>

        {/* Hover arrow */}
        <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </div>
    </motion.div>
  );
};

// SVG bezier connector with animated pathLength
const Connector: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  color: string;
  pathLength: MotionValue<number>;
}> = ({ x1, y1, x2, y2, color, pathLength }) => {
  const cx1 = x1;
  const cy1 = y1 + (y2 - y1) * 0.5;
  const cx2 = x2;
  const cy2 = y1 + (y2 - y1) * 0.5;
  const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  return (
    <g>
      <path d={d} fill="none" stroke={`${color}10`} strokeWidth="2" />
      <motion.path
        d={d} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" style={{ pathLength }} strokeDasharray="0 1"
      />
      <motion.path
        d={d} fill="none" stroke={color} strokeWidth="8"
        strokeLinecap="round" opacity="0.08" style={{ pathLength }} strokeDasharray="0 1"
      />
    </g>
  );
};

// Data pulse dot traveling along connections
const Pulse: React.FC<{
  x1: number; y1: number; x2: number; y2: number;
  color: string; progress: MotionValue<number>;
}> = ({ x1, y1, x2, y2, color, progress }) => {
  const cx = useTransform(progress, [0, 1], [x1, x2]);
  const cy = useTransform(progress, [0, 1], [y1, y2]);
  const r = useTransform(progress, [0, 0.5, 1], [2, 5, 2]);

  return (
    <motion.circle cx={cx} cy={cy} r={r} fill={color} opacity="0.7" />
  );
};

// ============================================================================
// Main Component
// ============================================================================

const AgentWorkforceBuilder: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const ref = useRef<HTMLDivElement>(null);
  const [tracked, setTracked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Track section view
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.03 && !tracked) {
        trackSectionView('agent_workforce_builder', 'homepage');
        setTracked(true);
      }
    });
    return unsub;
  }, [scrollYProgress, tracked]);

  // =========================================================================
  // PHASE 1 (0% → 12%): Company icon — starts at scale 4 (massive, centered),
  // shrinks to scale 1 and moves to final position. Title stays fixed.
  // =========================================================================
  const hubScale = useTransform(scrollYProgress, [0, 0.12], [3.5, 1]);
  const hubOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
  // Hub moves from center (50%, 45%) to final (50%, 38%)
  const hubY = useTransform(scrollYProgress, [0, 0.12], [50, 38]);
  // Glow ring that pulses after hub settles
  const hubGlowOpacity = useTransform(scrollYProgress, [0.10, 0.14], [0, 0.3]);

  // =========================================================================
  // PHASE 2 (12% → 30%): Department badges deploy with macro-zoom.
  // Each starts at scale 3 centered on the hub, then shrinks + moves to its position.
  // =========================================================================
  const deptAnimations = depts.map((dept, i) => {
    const start = 0.13 + i * 0.04;
    const end = start + 0.10;
    return {
      opacity: useTransform(scrollYProgress, [start, start + 0.04], [0, 1]),
      scale: useTransform(scrollYProgress, [start, end], [2.5, 1]),
      x: useTransform(scrollYProgress, [start, end], [50, dept.x]),
      y: useTransform(scrollYProgress, [start, end], [38, dept.y]),
      lineProgress: useTransform(scrollYProgress, [start + 0.02, end], [0, 1]),
    };
  });

  // =========================================================================
  // PHASE 3 (30% → 75%): Agent cards deploy from their dept's position with
  // macro-zoom (scale 2.5 → 1). Each has staggered timing.
  // =========================================================================
  const flatAgents: {
    agent: AgentDef & { ax: number; ay: number };
    dept: DeptDef;
    deptIdx: number;
  }[] = [];
  depts.forEach((dept, di) => {
    dept.agents.forEach((agent) => {
      flatAgents.push({ agent, dept, deptIdx: di });
    });
  });

  const agentAnims = flatAgents.map((fa, i) => {
    const start = 0.30 + i * 0.055;
    const end = start + 0.10;
    return {
      opacity: useTransform(scrollYProgress, [start, start + 0.04], [0, 1]),
      scale: useTransform(scrollYProgress, [start, end], [2.2, 1]),
      x: useTransform(scrollYProgress, [start, end], [fa.dept.x, fa.agent.ax]),
      y: useTransform(scrollYProgress, [start, end], [fa.dept.y, fa.agent.ay]),
      lineProgress: useTransform(scrollYProgress, [start, end - 0.02], [0, 1]),
      cardEnd: end,
    };
  });

  // =========================================================================
  // PHASE 4 (75% → 85%): Data pulses travel through all connections
  // =========================================================================
  const pulseProgress = useTransform(scrollYProgress, [0.75, 0.88], [0, 1]);
  const pulseOpacity = useTransform(scrollYProgress, [0.75, 0.78, 0.85, 0.88], [0, 1, 1, 0]);

  // =========================================================================
  // PHASE 5 (85% → 95%): Summary stats + CTA fade in at bottom
  // =========================================================================
  const summaryOpacity = useTransform(scrollYProgress, [0.85, 0.92], [0, 1]);
  const summaryY = useTransform(scrollYProgress, [0.85, 0.92], [40, 0]);

  // Scroll hint fades out early
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  // ---- Navigation ----
  const goToAgent = (slug: string) => {
    trackCtaClick(`agent_card_${slug}`, 'agent_workforce_builder', slug);
    navigate(`/${lang || 'en'}/solutions/${slug}`);
  };

  const goToSolutions = () => {
    trackCtaClick('explore_solutions', 'agent_workforce_builder', 'Explore Solutions');
    navigate(`/${lang || 'en'}/solutions`);
  };

  // ---- SVG coordinate helpers ----
  // Convert % positions to SVG viewBox coords
  const SVG_W = 1000;
  const SVG_H = 700;
  const pct = (xp: number, yp: number) => ({ sx: (xp / 100) * SVG_W, sy: (yp / 100) * SVG_H });

  const hubSvg = pct(50, 38);

  return (
    <section
      ref={ref}
      className="relative hidden md:block"
      style={{ height: '450vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ambient blobs */}
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-teal-100/20 rounded-full blur-[100px]" />
          <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] bg-orange-50/20 rounded-full blur-[80px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Fixed title (always visible at top) */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-2">
              {t('agentWorkforce.title', 'Build Your AI Workforce')}
            </h2>
            <p className="text-base lg:text-lg text-slate-500 max-w-xl mx-auto">
              {t('agentWorkforce.subtitle', 'Scroll to see how 8 specialized AI agents form a complete team across every department')}
            </p>
          </motion.div>
        </div>

        {/* SVG connections layer */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Hub → Department connectors */}
          {depts.map((dept, i) => {
            const dp = pct(dept.x, dept.y);
            return (
              <Connector
                key={`c-hub-${dept.id}`}
                x1={hubSvg.sx} y1={hubSvg.sy + 25}
                x2={dp.sx} y2={dp.sy}
                color={dept.hex}
                pathLength={deptAnimations[i].lineProgress}
              />
            );
          })}

          {/* Department → Agent connectors */}
          {flatAgents.map((fa, i) => {
            const dp = pct(fa.dept.x, fa.dept.y);
            const ap = pct(fa.agent.ax, fa.agent.ay);
            return (
              <Connector
                key={`c-agent-${fa.agent.id}`}
                x1={dp.sx} y1={dp.sy + 15}
                x2={ap.sx} y2={ap.sy}
                color={fa.dept.hex}
                pathLength={agentAnims[i].lineProgress}
              />
            );
          })}

          {/* Phase 4: data pulses */}
          <motion.g style={{ opacity: pulseOpacity }}>
            {depts.map((dept, i) => {
              const dp = pct(dept.x, dept.y);
              return (
                <Pulse
                  key={`p-${dept.id}`}
                  x1={hubSvg.sx} y1={hubSvg.sy + 25}
                  x2={dp.sx} y2={dp.sy}
                  color={dept.hex}
                  progress={pulseProgress}
                />
              );
            })}
          </motion.g>
        </svg>

        {/* HTML elements layer */}
        <div className="absolute inset-0 z-10">
          {/* ---- COMPANY HUB ---- */}
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: useTransform(hubY, (v) => `${v}%`),
              x: '-50%',
              y: '-50%',
              opacity: hubOpacity,
              scale: hubScale,
            }}
          >
            <div className="relative flex flex-col items-center">
              {/* Glow rings */}
              <motion.div
                className="absolute w-32 h-32 rounded-full border-2 border-blue-300/50 -top-4 -left-4"
                style={{ opacity: hubGlowOpacity, scale: useTransform(scrollYProgress, [0.10, 0.90], [1, 1.3]) }}
              />
              <motion.div
                className="absolute w-40 h-40 rounded-full border border-purple-200/30 -top-8 -left-8"
                style={{ opacity: hubGlowOpacity, scale: useTransform(scrollYProgress, [0.10, 0.90], [1, 1.5]) }}
              />

              {/* Main icon */}
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl shadow-slate-900/30 flex items-center justify-center border border-slate-700/50">
                <Building2 className="w-10 h-10 text-white" />
                {/* Corner accent */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white shadow-lg" />
              </div>

              {/* Label */}
              <div className="mt-3 text-center whitespace-nowrap">
                <p className="text-sm font-bold text-slate-900">
                  {t('agentWorkforce.centralNode', 'Your Company')}
                </p>
                <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-slate-900/5 border border-slate-200">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {t('agentWorkforce.centralBadge', 'AI-Powered')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---- DEPARTMENT NODES ---- */}
          {depts.map((dept, i) => {
            const anim = deptAnimations[i];
            const Icon = dept.agents[0]?.icon;
            return (
              <motion.div
                key={dept.id}
                className="absolute"
                style={{
                  left: useTransform(anim.x, (v) => `${v}%`),
                  top: useTransform(anim.y, (v) => `${v}%`),
                  x: '-50%',
                  y: '-50%',
                  opacity: anim.opacity,
                  scale: anim.scale,
                }}
              >
                <div className="flex flex-col items-center whitespace-nowrap">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-2',
                      dept.bg,
                    )}
                    style={{ borderColor: `${dept.hex}30`, boxShadow: `0 8px 30px ${dept.hex}15` }}
                  >
                    {Icon && <Icon className={cn('w-6 h-6', dept.color)} />}
                  </div>
                  <span
                    className={cn(
                      'mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
                      dept.bg, dept.color,
                    )}
                    style={{ borderColor: `${dept.hex}20` }}
                  >
                    {t(dept.tKey, dept.label)}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* ---- AGENT CARDS ---- */}
          {flatAgents.map((fa, i) => {
            const anim = agentAnims[i];
            return (
              <motion.div
                key={fa.agent.id}
                className="absolute"
                style={{
                  left: useTransform(anim.x, (v) => `${v}%`),
                  top: useTransform(anim.y, (v) => `${v}%`),
                  x: '-50%',
                  y: '-50%',
                  opacity: anim.opacity,
                  scale: anim.scale,
                }}
              >
                <AgentCard
                  agent={fa.agent}
                  dept={fa.dept}
                  opacity={anim.opacity}
                  scale={anim.scale}
                  progress={scrollYProgress}
                  threshold={anim.cardEnd}
                  onClick={() => goToAgent(fa.agent.slug)}
                />
              </motion.div>
            );
          })}

          {/* ---- SUMMARY + CTA ---- */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4"
            style={{ opacity: summaryOpacity, y: summaryY }}
          >
            <div className="flex items-center gap-8 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-8 py-4 shadow-lg shadow-slate-200/30">
              {[
                { v: '8', l: t('agentWorkforce.summary.agents', 'AI Agents') },
                { v: '4', l: t('agentWorkforce.summary.departments', 'Departments') },
                { v: '24/7', l: t('agentWorkforce.summary.availability', 'Availability') },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-black text-slate-900">{s.v}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{s.l}</p>
                </div>
              ))}
            </div>

            <button
              onClick={goToSolutions}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('agentWorkforce.cta', 'Explore All Solutions')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Scroll hint — fades out */}
        <motion.p
          className="absolute bottom-4 left-0 right-0 text-center text-slate-400/60 text-xs z-20"
          style={{ opacity: hintOpacity }}
        >
          {t('agentWorkforce.scrollHint', '↓ Scroll to build your AI team ↓')}
        </motion.p>
      </div>
    </section>
  );
};

export default AgentWorkforceBuilder;
