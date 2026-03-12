// src/components/AgentWorkforceBuilder.tsx
// Scroll-driven animation that builds an AI agent workforce org chart
// Desktop only — hidden on mobile via parent Suspense wrapper in MainPage

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

interface AgentNode {
  id: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  kpiValue: string;
  kpiLabel: string;
}

interface DepartmentNode {
  id: string;
  label: string;
  translationKey: string;
  color: string;        // Tailwind text color
  bgColor: string;      // Tailwind bg color
  accentHex: string;    // Hex for SVG strokes and glows
  agents: AgentNode[];
}

const departments: DepartmentNode[] = [
  {
    id: 'outbound',
    label: 'Sales & Outbound',
    translationKey: 'agentWorkforce.departments.outbound',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    accentHex: '#2563eb',
    agents: [
      { id: 'lead-validator', slug: 'lead-validator', icon: UserCheck, category: 'outbound', kpiValue: '94%', kpiLabel: 'accuracy' },
      { id: 'sales-qualifier', slug: 'sales-qualifier', icon: Phone, category: 'outbound', kpiValue: '3x', kpiLabel: 'meetings' },
      { id: 'sales-agent', slug: 'sales-agent', icon: ShoppingCart, category: 'outbound', kpiValue: '+35%', kpiLabel: 'revenue' },
    ],
  },
  {
    id: 'inbound',
    label: 'Customer Service',
    translationKey: 'agentWorkforce.departments.inbound',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    accentHex: '#16a34a',
    agents: [
      { id: 'virtual-receptionist', slug: 'virtual-receptionist', icon: PhoneIncoming, category: 'inbound', kpiValue: '99.9%', kpiLabel: 'answered' },
      { id: 'booking-agent', slug: 'booking-agent', icon: CalendarCheck, category: 'inbound', kpiValue: '+45%', kpiLabel: 'bookings' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Content',
    translationKey: 'agentWorkforce.departments.marketing',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    accentHex: '#0d9488',
    agents: [
      { id: 'content-creator', slug: 'content-creator', icon: Image, category: 'marketing', kpiValue: '10x', kpiLabel: 'output' },
      { id: 'social-manager', slug: 'social-manager', icon: Share2, category: 'marketing', kpiValue: '+73%', kpiLabel: 'engagement' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    translationKey: 'agentWorkforce.departments.operations',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    accentHex: '#ea580c',
    agents: [
      { id: 'operations-agent', slug: 'operations-agent', icon: Cog, category: 'operations', kpiValue: '-60%', kpiLabel: 'manual work' },
    ],
  },
];

const totalAgents = departments.reduce((sum, d) => sum + d.agents.length, 0);

// ============================================================================
// Sub-components
// ============================================================================

// Animated counter that subscribes to a MotionValue
const AnimatedCounter: React.FC<{ value: string; progress: MotionValue<number>; threshold: number }> = ({
  value,
  progress,
  threshold,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = progress.on('change', (v) => {
      setVisible(v >= threshold);
    });
    return unsubscribe;
  }, [progress, threshold]);

  if (!visible) return <span className="text-slate-300">--</span>;
  return <span>{value}</span>;
};

// Central hub node
const CentralNode: React.FC<{ opacity: MotionValue<number>; scale: MotionValue<number> }> = ({
  opacity,
  scale,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="relative flex flex-col items-center"
      style={{ opacity, scale }}
    >
      {/* Pulse ring */}
      <div className="absolute w-28 h-28 rounded-full border-2 border-blue-200 animate-ping opacity-20" />
      <div className="absolute w-36 h-36 rounded-full border border-blue-100 animate-pulse opacity-10" />

      {/* Main node */}
      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center z-10">
        <Building2 className="w-10 h-10 text-white" />
      </div>

      {/* Label */}
      <div className="mt-3 text-center">
        <p className="text-sm font-bold text-slate-900">
          {t('agentWorkforce.centralNode', 'Your Company')}
        </p>
        <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200">
          <Zap className="w-3 h-3 text-blue-500" />
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
            {t('agentWorkforce.centralBadge', 'AI-Powered')}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Department node
const DepartmentNodeComponent: React.FC<{
  dept: DepartmentNode;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}> = ({ dept, opacity, scale, y }) => {
  const { t } = useTranslation();
  const IconFirst = dept.agents[0]?.icon;

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ opacity, scale, y }}
    >
      <div
        className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border',
          dept.bgColor,
        )}
        style={{ borderColor: `${dept.accentHex}30` }}
      >
        {IconFirst && <IconFirst className={cn('w-6 h-6', dept.color)} />}
      </div>

      <div className="mt-2 text-center">
        <span
          className={cn(
            'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
            dept.bgColor,
            dept.color,
          )}
        >
          {t(dept.translationKey, dept.label)}
        </span>
      </div>
    </motion.div>
  );
};

// Agent card
const AgentCard: React.FC<{
  agent: AgentNode;
  dept: DepartmentNode;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  x: MotionValue<number>;
  progress: MotionValue<number>;
  threshold: number;
  onClick: () => void;
}> = ({ agent, dept, opacity, scale, x, progress, threshold, onClick }) => {
  const { t } = useTranslation();
  const IconComp = agent.icon;

  return (
    <motion.div
      className="relative cursor-pointer group"
      style={{ opacity, scale, x }}
      onClick={onClick}
    >
      <div
        className="relative rounded-xl border bg-white p-3 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5"
        style={{
          borderColor: `${dept.accentHex}20`,
        }}
      >
        {/* Top row: icon + name + status */}
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className={cn('w-8 h-8 rounded-lg flex items-center justify-center', dept.bgColor)}
          >
            <IconComp className={cn('w-4 h-4', dept.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              {t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
            </p>
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
              AI Agent
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-medium text-green-600">Active</span>
          </div>
        </div>

        {/* KPI */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-slate-900">
            <AnimatedCounter value={agent.kpiValue} progress={progress} threshold={threshold} />
          </span>
          <span className="text-[10px] text-slate-500">
            {t(`agentWorkforce.kpis.${agent.id}`, agent.kpiLabel)}
          </span>
        </div>

        {/* Hover arrow */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </motion.div>
  );
};

// SVG connection line with animated dash
const ConnectionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  pathLength: MotionValue<number>;
}> = ({ x1, y1, x2, y2, color, pathLength }) => {
  // Create a smooth bezier curve
  const midY = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return (
    <g>
      {/* Background path */}
      <path
        d={d}
        fill="none"
        stroke={`${color}15`}
        strokeWidth="2"
      />
      {/* Animated path */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength }}
        strokeDasharray="0 1"
      />
      {/* Glow */}
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.15"
        style={{ pathLength }}
        strokeDasharray="0 1"
      />
    </g>
  );
};

// Data pulse traveling along a path
const DataPulse: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  pulseProgress: MotionValue<number>;
}> = ({ x1, y1, x2, y2, color, pulseProgress }) => {
  const cx = useTransform(pulseProgress, [0, 1], [x1, x2]);
  const cy = useTransform(pulseProgress, [0, 1], [y1, y2]);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="4"
      fill={color}
      opacity="0.8"
    >
      <animate
        attributeName="r"
        values="3;5;3"
        dur="1.5s"
        repeatCount="indefinite"
      />
    </motion.circle>
  );
};

// Stats summary panel
const SummaryPanel: React.FC<{
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}> = ({ opacity, y }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const stats = [
    { value: '8', label: t('agentWorkforce.summary.agents', 'AI Agents') },
    { value: '4', label: t('agentWorkforce.summary.departments', 'Departments') },
    { value: '24/7', label: t('agentWorkforce.summary.availability', 'Availability') },
  ];

  const handleCta = () => {
    trackCtaClick('explore_solutions', 'agent_workforce_builder', t('agentWorkforce.cta', 'Explore Solutions'));
    navigate(`/${lang || 'en'}/solutions`);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-5"
      style={{ opacity, y }}
    >
      {/* Stats row */}
      <div className="flex items-center gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleCta}
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
      >
        {t('agentWorkforce.cta', 'Explore All Solutions')}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const AgentWorkforceBuilder: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTracked, setHasTracked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track section view once
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v > 0.05 && !hasTracked) {
        trackSectionView('agent_workforce_builder', 'homepage');
        setHasTracked(true);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, hasTracked]);

  // ---- Scroll-to-animation mappings ----

  // Phase 1: Central node appears (0% - 8%)
  const centralOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const centralScale = useTransform(scrollYProgress, [0, 0.06], [0.5, 1]);

  // Phase 2: Department lines draw + nodes appear (8% - 25%)
  const deptLineProgress = [
    useTransform(scrollYProgress, [0.08, 0.18], [0, 1]),
    useTransform(scrollYProgress, [0.10, 0.20], [0, 1]),
    useTransform(scrollYProgress, [0.12, 0.22], [0, 1]),
    useTransform(scrollYProgress, [0.14, 0.24], [0, 1]),
  ];

  const deptOpacity = [
    useTransform(scrollYProgress, [0.15, 0.20], [0, 1]),
    useTransform(scrollYProgress, [0.17, 0.22], [0, 1]),
    useTransform(scrollYProgress, [0.19, 0.24], [0, 1]),
    useTransform(scrollYProgress, [0.21, 0.26], [0, 1]),
  ];

  const deptScale = [
    useTransform(scrollYProgress, [0.15, 0.20], [0.6, 1]),
    useTransform(scrollYProgress, [0.17, 0.22], [0.6, 1]),
    useTransform(scrollYProgress, [0.19, 0.24], [0.6, 1]),
    useTransform(scrollYProgress, [0.21, 0.26], [0.6, 1]),
  ];

  const deptY = [
    useTransform(scrollYProgress, [0.15, 0.20], [20, 0]),
    useTransform(scrollYProgress, [0.17, 0.22], [20, 0]),
    useTransform(scrollYProgress, [0.19, 0.24], [20, 0]),
    useTransform(scrollYProgress, [0.21, 0.26], [20, 0]),
  ];

  // Phase 3: Agent lines + cards appear (25% - 72%)
  // Flatten agents with their scroll ranges
  const agentAnimations: {
    agent: AgentNode;
    dept: DepartmentNode;
    deptIndex: number;
    agentIndex: number;
    lineStart: number;
    lineEnd: number;
    cardStart: number;
    cardEnd: number;
  }[] = [];

  let agentCounter = 0;
  departments.forEach((dept, deptIndex) => {
    dept.agents.forEach((agent, agentIndex) => {
      const base = 0.26 + agentCounter * 0.055;
      agentAnimations.push({
        agent,
        dept,
        deptIndex,
        agentIndex,
        lineStart: base,
        lineEnd: base + 0.06,
        cardStart: base + 0.03,
        cardEnd: base + 0.08,
      });
      agentCounter++;
    });
  });

  const agentLineProgress = agentAnimations.map((a) =>
    useTransform(scrollYProgress, [a.lineStart, a.lineEnd], [0, 1])
  );

  const agentOpacity = agentAnimations.map((a) =>
    useTransform(scrollYProgress, [a.cardStart, a.cardEnd], [0, 1])
  );

  const agentScale = agentAnimations.map((a) =>
    useTransform(scrollYProgress, [a.cardStart, a.cardEnd], [0.7, 1])
  );

  const agentX = agentAnimations.map((a) =>
    useTransform(scrollYProgress, [a.cardStart, a.cardEnd], [30, 0])
  );

  // Phase 4: Data pulses (72% - 82%)
  const pulseProgress = useTransform(scrollYProgress, [0.72, 0.82], [0, 1]);

  // Phase 5: Summary panel (82% - 92%)
  const summaryOpacity = useTransform(scrollYProgress, [0.82, 0.90], [0, 1]);
  const summaryY = useTransform(scrollYProgress, [0.82, 0.90], [30, 0]);

  // Scroll hint fades out
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // ---- Layout positions for SVG connections ----
  // We use a fixed coordinate system for the SVG overlay
  // Central: (500, 60), Departments spread horizontally, agents below each dept

  const SVG_W = 1000;
  const SVG_H = 620;
  const CENTRAL_X = SVG_W / 2;
  const CENTRAL_Y = 60;

  const deptPositions = [
    { x: 130, y: 200 },  // outbound
    { x: 370, y: 200 },  // inbound
    { x: 620, y: 200 },  // marketing
    { x: 870, y: 200 },  // operations
  ];

  // Agent positions: stacked vertically below each department
  const getAgentPos = (deptIdx: number, agentIdx: number) => {
    const deptX = deptPositions[deptIdx].x;
    const baseY = 310;
    return { x: deptX, y: baseY + agentIdx * 90 };
  };

  const handleAgentClick = (slug: string) => {
    trackCtaClick(`agent_card_${slug}`, 'agent_workforce_builder', slug);
    navigate(`/${lang || 'en'}/solutions/${slug}`);
  };

  return (
    <section
      ref={containerRef}
      className="relative hidden md:block"
      style={{ height: '350vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-3">
                {t('agentWorkforce.title', 'Build Your AI Workforce')}
              </h2>
              <p className="text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
                {t('agentWorkforce.subtitle', 'Scroll to see how 8 specialized AI agents form a complete team across every department')}
              </p>
            </motion.div>

            {/* Main animation area */}
            <div className="relative" style={{ height: '520px' }}>
              {/* SVG connection lines overlay */}
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Central → Department lines */}
                {departments.map((dept, i) => (
                  <ConnectionLine
                    key={`line-central-${dept.id}`}
                    x1={CENTRAL_X}
                    y1={CENTRAL_Y + 40}
                    x2={deptPositions[i].x}
                    y2={deptPositions[i].y - 20}
                    color={dept.accentHex}
                    pathLength={deptLineProgress[i]}
                  />
                ))}

                {/* Department → Agent lines */}
                {agentAnimations.map((a, globalIdx) => {
                  const agentPos = getAgentPos(a.deptIndex, a.agentIndex);
                  return (
                    <ConnectionLine
                      key={`line-agent-${a.agent.id}`}
                      x1={deptPositions[a.deptIndex].x}
                      y1={deptPositions[a.deptIndex].y + 30}
                      x2={agentPos.x}
                      y2={agentPos.y - 10}
                      color={a.dept.accentHex}
                      pathLength={agentLineProgress[globalIdx]}
                    />
                  );
                })}

                {/* Data pulses on central → dept lines */}
                {departments.map((dept, i) => (
                  <DataPulse
                    key={`pulse-${dept.id}`}
                    x1={CENTRAL_X}
                    y1={CENTRAL_Y + 40}
                    x2={deptPositions[i].x}
                    y2={deptPositions[i].y - 20}
                    color={dept.accentHex}
                    pulseProgress={pulseProgress}
                  />
                ))}
              </svg>

              {/* HTML overlay for nodes and cards */}
              <div className="absolute inset-0 z-10">
                {/* Central node */}
                <div
                  className="absolute"
                  style={{
                    left: `${(CENTRAL_X / SVG_W) * 100}%`,
                    top: `${(CENTRAL_Y / SVG_H) * 100}%`,
                    transform: 'translate(-50%, -20%)',
                  }}
                >
                  <CentralNode opacity={centralOpacity} scale={centralScale} />
                </div>

                {/* Department nodes */}
                {departments.map((dept, i) => (
                  <div
                    key={dept.id}
                    className="absolute"
                    style={{
                      left: `${(deptPositions[i].x / SVG_W) * 100}%`,
                      top: `${(deptPositions[i].y / SVG_H) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <DepartmentNodeComponent
                      dept={dept}
                      opacity={deptOpacity[i]}
                      scale={deptScale[i]}
                      y={deptY[i]}
                    />
                  </div>
                ))}

                {/* Agent cards */}
                {agentAnimations.map((a, globalIdx) => {
                  const agentPos = getAgentPos(a.deptIndex, a.agentIndex);
                  return (
                    <div
                      key={a.agent.id}
                      className="absolute w-[180px]"
                      style={{
                        left: `${(agentPos.x / SVG_W) * 100}%`,
                        top: `${(agentPos.y / SVG_H) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <AgentCard
                        agent={a.agent}
                        dept={a.dept}
                        opacity={agentOpacity[globalIdx]}
                        scale={agentScale[globalIdx]}
                        x={agentX[globalIdx]}
                        progress={scrollYProgress}
                        threshold={a.cardEnd}
                        onClick={() => handleAgentClick(a.agent.slug)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Summary panel at bottom center */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
              >
                <SummaryPanel opacity={summaryOpacity} y={summaryY} />
              </div>
            </div>

            {/* Scroll hint */}
            <motion.p
              className="text-center text-slate-400 text-sm mt-4"
              style={{ opacity: hintOpacity }}
            >
              {t('agentWorkforce.scrollHint', '↓ Scroll to build your AI team ↓')}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentWorkforceBuilder;
