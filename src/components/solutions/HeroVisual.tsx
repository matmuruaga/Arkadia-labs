// src/components/solutions/HeroVisual.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Activity,
  Target,
  MessageSquare,
  DollarSign,
  Calendar,
  FileText,
  Radio,
  GitBranch,
  Wifi,
  BarChart2,
  AlertCircle,
  RefreshCw,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrustBadge } from '@/data/solutions/types';

// ---------------------------------------------------------------------------
// Icon map – keeps the same convention used throughout the solutions folder
// ---------------------------------------------------------------------------
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'clock': Clock,
  'phone': Phone,
  'star': Star,
  'trending-up': TrendingUp,
  'activity': Activity,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface HeroVisualProps {
  solutionId: string;
  heroImage?: string;
  primaryCtaAction?: string;
  heroVisualType?: string;
  /** 'connected' | 'disconnected' – used to drive waveform intensity */
  voiceStatus?: string;
  trustBadges: TrustBadge[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Detection helper
// ---------------------------------------------------------------------------
type VisualType =
  | 'voice-waveform'
  | 'image'
  | 'dashboard'
  | 'score-gauge'
  | 'conversation-flow'
  | 'revenue-ticker'
  | 'calendar-grid'
  | 'content-feed'
  | 'social-radar'
  | 'workflow-orchestrator';

function resolveVisualType(
  heroImage: string | undefined,
  primaryCtaAction: string | undefined,
  heroVisualType: string | undefined,
): VisualType {
  if (heroVisualType && heroVisualType !== 'auto') return heroVisualType as VisualType;
  if (heroImage) return 'image';
  if (primaryCtaAction === 'elevenlabs') return 'voice-waveform';
  return 'dashboard';
}

// ---------------------------------------------------------------------------
// Shared: Trust Badges Row
// ---------------------------------------------------------------------------
interface TrustBadgesRowProps {
  trustBadges: TrustBadge[];
  iconColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

const TrustBadgesRow: React.FC<TrustBadgesRowProps> = ({
  trustBadges,
  iconColor = 'text-sky-300',
  gradientFrom = 'from-sky-500/30',
  gradientTo = 'to-teal-500/30',
}) => (
  <div className="px-6 pb-6 grid grid-cols-3 gap-3">
    {trustBadges.slice(0, 3).map((badge, i) => {
      const IconComponent = iconMap[badge.icon] || Phone;
      return (
        <div
          key={i}
          className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
        >
          <div className="flex justify-center mb-1">
            <div
              className={cn(
                'w-6 h-6 rounded-lg bg-gradient-to-br flex items-center justify-center',
                gradientFrom,
                gradientTo,
              )}
            >
              <IconComponent className={cn('h-3.5 w-3.5', iconColor)} />
            </div>
          </div>
          <p className="text-sm font-bold text-white leading-none">{badge.value}</p>
          <p className="text-[10px] text-white/40 mt-0.5 leading-tight">{badge.label}</p>
        </div>
      );
    })}
  </div>
);

// ---------------------------------------------------------------------------
// Shared: Card Header
// ---------------------------------------------------------------------------
interface CardHeaderProps {
  statusColor?: string;
  statusLabel: string;
  pulseSpeed?: number;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  statusColor = 'bg-sky-400',
  statusLabel,
  pulseSpeed = 1.6,
}) => (
  <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.span
          className={cn('w-2.5 h-2.5 rounded-full', statusColor)}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: pulseSpeed, repeat: Infinity }}
        />
        <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
          {statusLabel}
        </span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component: Voice Waveform Visual
// ---------------------------------------------------------------------------
interface WaveformVisualProps {
  voiceStatus?: string;
  trustBadges: TrustBadge[];
}

const WAVEFORM_BARS = 7;

function getBarParams(index: number, isConnected: boolean) {
  const idleHeights = [24, 40, 56, 72, 56, 40, 24];
  const activeHeights = [40, 64, 88, 100, 88, 64, 40];
  const baseDurations = [0.9, 0.7, 0.8, 0.6, 0.8, 0.7, 0.9];
  const baseDelays = [0, 0.1, 0.2, 0, 0.15, 0.05, 0.1];

  const maxH = isConnected ? activeHeights[index] : idleHeights[index];
  const minH = Math.max(8, Math.round(maxH * 0.3));

  return {
    minHeight: minH,
    maxHeight: maxH,
    duration: isConnected ? baseDurations[index] * 0.6 : baseDurations[index],
    delay: baseDelays[index],
  };
}

const WaveformVisual: React.FC<WaveformVisualProps> = ({ voiceStatus, trustBadges }) => {
  const isConnected = voiceStatus === 'connected';

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="AI Receptionist voice waveform visualization"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-teal-500/10 pointer-events-none" />

        <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.span
                className={cn(
                  'w-2.5 h-2.5 rounded-full',
                  isConnected ? 'bg-green-400' : 'bg-sky-400',
                )}
                animate={{ opacity: isConnected ? [1, 0.4, 1] : [1, 0.6, 1] }}
                transition={{ duration: isConnected ? 0.8 : 1.6, repeat: Infinity }}
              />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
                {isConnected ? 'Live Call' : 'AI Receptionist'}
              </span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        <div className="relative px-6 py-10 flex flex-col items-center">
          <div
            className={cn(
              'absolute inset-0 pointer-events-none transition-opacity duration-700',
              isConnected ? 'opacity-100' : 'opacity-40',
            )}
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(14,165,233,0.18) 0%, transparent 70%)',
            }}
          />

          <div className="relative flex items-center gap-2 h-28">
            {Array.from({ length: WAVEFORM_BARS }).map((_, i) => {
              const { minHeight, maxHeight, duration, delay } = getBarParams(i, isConnected);
              return (
                <motion.div
                  key={i}
                  className="w-3 rounded-full"
                  style={{
                    background: 'linear-gradient(to top, #0ea5e9, #14b8a6)',
                    minHeight: `${minHeight}px`,
                  }}
                  animate={{ height: [`${minHeight}px`, `${maxHeight}px`, `${minHeight}px`] }}
                  transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
                />
              );
            })}
          </div>

          <p className="mt-6 text-sm font-medium text-white/50 tracking-wide">
            {isConnected ? 'Processing your request…' : 'Always on. Always professional.'}
          </p>
        </div>

        <TrustBadgesRow trustBadges={trustBadges} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
      >
        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckCircle className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900 leading-none">Call Resolved</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Guest inquiry handled</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
      >
        <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
          <Phone className="h-4 w-4 text-sky-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900 leading-none">+12 calls today</p>
          <p className="text-[10px] text-slate-500 mt-0.5">100% answered</p>
        </div>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: Hero Image Visual
// ---------------------------------------------------------------------------
interface ImageVisualProps {
  heroImage: string;
  solutionId: string;
}

const ImageVisual: React.FC<ImageVisualProps> = ({ heroImage, solutionId }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    className="relative"
    role="img"
    aria-label={`${solutionId} solution hero image`}
  >
    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-sky-400/40 via-cyan-300/20 to-teal-400/40 blur-lg opacity-70 pointer-events-none" />

    <div className="relative rounded-2xl overflow-hidden border border-white/30 shadow-2xl">
      <img
        src={heroImage}
        alt={`${solutionId} solution`}
        loading="eager"
        className="w-full object-cover rounded-2xl"
      />
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 shadow-lg flex items-center justify-center hidden sm:flex"
    >
      <TrendingUp className="h-6 w-6 text-white" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.85 }}
      className="absolute -bottom-3 -left-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-slate-100 hidden sm:block"
    >
      <p className="text-xs font-semibold text-slate-800">AI-Powered</p>
      <p className="text-[10px] text-slate-500">24/7 automation</p>
    </motion.div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Sub-component: Dashboard Fallback Visual
// ---------------------------------------------------------------------------
const DASHBOARD_BARS = [55, 72, 45, 88, 62, 80, 50, 92, 68, 76];
const KPI_CARDS = [
  { label: 'Resolved', value: '89%', color: 'bg-green-100 text-green-700' },
  { label: 'Avg Handle', value: '2:34', color: 'bg-sky-100 text-sky-700' },
  { label: 'Satisfaction', value: '4.8★', color: 'bg-purple-100 text-purple-700' },
];

const DashboardFallback: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    className="relative"
    role="img"
    aria-label="AI solution dashboard preview"
  >
    <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 flex items-center gap-2 text-xs text-slate-400 border border-slate-200">
          <span>app.elevaitelabs.io/dashboard</span>
        </div>
      </div>

      <div className="p-4 bg-slate-50 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {KPI_CARDS.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm"
            >
              <p className={cn('text-sm font-bold px-1.5 py-0.5 rounded-md inline-block mb-1', kpi.color)}>
                {kpi.value}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">{kpi.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-700">Performance Overview</p>
            <span className="text-[10px] text-sky-600 font-medium bg-sky-50 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {DASHBOARD_BARS.map((h, i) => (
              <div key={i} className="flex-1 h-full flex flex-col justify-end">
                <motion.div
                  className="w-full rounded-t-sm bg-gradient-to-t from-sky-500 to-teal-400"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.04, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
          {[
            { text: 'Call resolved: Guest inquiry handled', dot: 'bg-green-500' },
            { text: 'Appointment booked: 3 PM tomorrow', dot: 'bg-sky-500 animate-pulse' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
              className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0"
            >
              <span className={cn('w-2 h-2 rounded-full flex-shrink-0', item.dot)} />
              <p className="text-xs text-slate-600 truncate">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 1 }}
      className="absolute -right-4 top-1/3 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2"
    >
      <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
        <Activity className="h-4 w-4 text-sky-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900">99.9% Uptime</p>
        <p className="text-[10px] text-slate-500">Enterprise grade</p>
      </div>
    </motion.div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Sub-component 1: ScoreGaugeVisual (lead-validator)
// ---------------------------------------------------------------------------
interface ScoreGaugeVisualProps {
  trustBadges: TrustBadge[];
}

// SVG arc parameters for a 180-degree semicircle
const GAUGE_R = 70;
const GAUGE_CX = 100;
const GAUGE_CY = 90;
const GAUGE_CIRCUMFERENCE = Math.PI * GAUGE_R; // half circumference for semicircle

const ScoreGaugeVisual: React.FC<ScoreGaugeVisualProps> = ({ trustBadges }) => {
  const targetScore = 85;
  const dashOffset = GAUGE_CIRCUMFERENCE * (1 - targetScore / 100);

  // Color stops: 0-40 red, 40-70 amber, 70-100 green
  const gaugeColor = '#22c55e'; // target is 85, solidly green

  const pills = [
    { label: 'Email', delay: 1.0 },
    { label: 'Phone', delay: 1.2 },
    { label: 'Company', delay: 1.4 },
  ];

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Lead score gauge visualization"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-sky-500/10 pointer-events-none" />

        <CardHeader statusColor="bg-green-400" statusLabel="Lead Scoring" pulseSpeed={1.4} />

        {/* Gauge area */}
        <div className="relative px-6 py-6 flex flex-col items-center">
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(34,197,94,0.15) 0%, transparent 70%)',
            }}
          />

          {/* SVG semicircle gauge */}
          <div className="relative">
            <svg width="200" height="110" viewBox="0 0 200 110" aria-hidden="true">
              {/* Track */}
              <path
                d={`M ${GAUGE_CX - GAUGE_R} ${GAUGE_CY} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${GAUGE_CX + GAUGE_R} ${GAUGE_CY}`}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Colored arc */}
              <motion.path
                d={`M ${GAUGE_CX - GAUGE_R} ${GAUGE_CY} A ${GAUGE_R} ${GAUGE_R} 0 0 1 ${GAUGE_CX + GAUGE_R} ${GAUGE_CY}`}
                fill="none"
                stroke={gaugeColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={GAUGE_CIRCUMFERENCE}
                initial={{ strokeDashoffset: GAUGE_CIRCUMFERENCE }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.6, delay: 0.6, ease: 'easeOut' }}
              />
            </svg>

            {/* Center score text */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <motion.span
                className="text-4xl font-extrabold text-white leading-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                85
              </motion.span>
              <span className="text-xs text-white/40 mt-0.5">/100</span>
            </div>
          </div>

          <p className="text-sm font-semibold text-white/60 mt-1 mb-4 uppercase tracking-widest">
            Lead Score
          </p>

          {/* Validation pills */}
          <div className="flex gap-2">
            {pills.map(({ label, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay }}
                className="flex items-center gap-1 bg-green-500/15 border border-green-500/30 rounded-full px-2.5 py-1"
              >
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span className="text-[11px] font-semibold text-green-300">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <TrustBadgesRow
          trustBadges={trustBadges}
          iconColor="text-green-300"
          gradientFrom="from-green-500/30"
          gradientTo="to-teal-500/30"
        />
      </motion.div>

      {/* Floating badge – top right */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
      >
        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
          <Target className="h-4 w-4 text-green-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900 leading-none">92% Accuracy</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Verified leads</p>
        </div>
      </motion.div>

      {/* Floating badge – bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
      >
        <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
          <Clock className="h-4 w-4 text-sky-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-900 leading-none">3.2s avg</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Score time</p>
        </div>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component 2: ConversationFlowVisual (sales-qualifier)
// ---------------------------------------------------------------------------
interface ConversationFlowVisualProps {
  trustBadges: TrustBadge[];
}

const CHAT_MESSAGES = [
  { role: 'ai', text: "What's your team size?", delay: 0.6 },
  { role: 'user', text: 'Around 50 people', delay: 1.2 },
  { role: 'ai', text: "What's your main challenge?", delay: 1.9 },
  { role: 'user', text: 'Lead response time', delay: 2.5 },
];

const ConversationFlowVisual: React.FC<ConversationFlowVisualProps> = ({ trustBadges }) => (
  <div
    className="relative w-full"
    role="img"
    aria-label="AI sales qualification conversation visualization"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <CardHeader statusColor="bg-sky-400" statusLabel="AI Qualifier" pulseSpeed={1.2} />

      {/* Chat area */}
      <div className="relative px-5 py-5 space-y-3 min-h-[180px]">
        {CHAT_MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'ai' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: msg.delay }}
            className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'rounded-2xl px-4 py-2.5 max-w-[78%]',
                msg.role === 'ai'
                  ? 'bg-sky-500/20 border border-sky-500/30 rounded-tl-sm'
                  : 'bg-white/10 border border-white/10 rounded-tr-sm',
              )}
            >
              <p className="text-xs text-white/90 leading-snug">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {/* Qualified pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 3.1 }}
          className="flex justify-center pt-1"
        >
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-semibold text-green-300">Qualified — Meeting Booked</span>
          </div>
        </motion.div>
      </div>

      <TrustBadgesRow
        trustBadges={trustBadges}
        iconColor="text-sky-300"
        gradientFrom="from-sky-500/30"
        gradientTo="to-purple-500/30"
      />
    </motion.div>

    {/* Floating badge – top right */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
        <MessageSquare className="h-4 w-4 text-sky-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">5+ min avg</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Conversation depth</p>
      </div>
    </motion.div>

    {/* Floating badge – bottom left */}
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">89% qualified</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Qualification rate</p>
      </div>
    </motion.div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component 3: RevenueTickerVisual (sales-agent)
// ---------------------------------------------------------------------------
interface RevenueTickerVisualProps {
  trustBadges: TrustBadge[];
}

const TRANSACTIONS = [
  { label: 'Enterprise Plan', amount: '$4,200', delay: 1.0 },
  { label: 'Upsell: Premium', amount: '$890', delay: 1.3 },
  { label: 'Renewal', amount: '$2,100', delay: 1.6 },
];

// Deterministic animated revenue digits — counted up via animation
const REVENUE_DIGITS = '$142,850';

const RevenueTickerVisual: React.FC<RevenueTickerVisualProps> = ({ trustBadges }) => (
  <div
    className="relative w-full"
    role="img"
    aria-label="AI sales agent revenue ticker visualization"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-teal-500/10 pointer-events-none" />

      <CardHeader statusColor="bg-green-400" statusLabel="Revenue Live" pulseSpeed={0.8} />

      {/* Revenue counter area */}
      <div className="relative px-6 py-5 flex flex-col items-center">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,197,94,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Revenue number */}
        <motion.p
          className="text-4xl font-extrabold text-white tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {REVENUE_DIGITS}
        </motion.p>

        {/* Hourly delta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex items-center gap-1.5 mt-2 mb-5"
        >
          <TrendingUp className="h-3.5 w-3.5 text-green-400" />
          <span className="text-sm font-semibold text-green-400">+$2,340 this hour</span>
        </motion.div>

        {/* Transaction list */}
        <div className="w-full space-y-2">
          {TRANSACTIONS.map(({ label, amount, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay }}
              className="flex items-center justify-between bg-white/5 border border-white/8 rounded-xl px-4 py-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="text-xs text-white/70">{label}</span>
              </div>
              <span className="text-xs font-bold text-green-300">{amount}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <TrustBadgesRow
        trustBadges={trustBadges}
        iconColor="text-green-300"
        gradientFrom="from-green-500/30"
        gradientTo="to-teal-500/30"
      />
    </motion.div>

    {/* Floating badge – top right */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
        <Clock className="h-4 w-4 text-green-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">24/7 selling</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Always active</p>
      </div>
    </motion.div>

    {/* Floating badge – bottom left */}
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
        <TrendingUp className="h-4 w-4 text-teal-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">+34% deal size</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Avg uplift</p>
      </div>
    </motion.div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component 4: CalendarGridVisual (booking-agent)
// ---------------------------------------------------------------------------
interface CalendarGridVisualProps {
  trustBadges: TrustBadge[];
}

// 5 rows x 7 cols = 35 slots. Deterministic fill pattern.
const CALENDAR_COLS = 7;
const CALENDAR_ROWS = 5;
const TOTAL_SLOTS = CALENDAR_COLS * CALENDAR_ROWS;
// Filled indices (deterministic, simulating an 87% occupancy)
const FILLED_SLOTS = new Set([
  0, 1, 2, 3, 4, 5,
  7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 33, 34,
]);
// Pending (amber) indices
const PENDING_SLOTS = new Set([6, 17, 32]);
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const CalendarGridVisual: React.FC<CalendarGridVisualProps> = ({ trustBadges }) => (
  <div
    className="relative w-full"
    role="img"
    aria-label="AI booking agent calendar visualization"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-teal-500/10 pointer-events-none" />

      {/* Header with occupancy */}
      <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-sky-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
              Booking Agent
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs font-bold text-sky-300"
          >
            87% Occupancy
          </motion.div>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="px-5 py-5">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-[10px] text-white/30 font-semibold">
              {d}
            </div>
          ))}
        </div>

        {/* Slot grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
            const isFilled = FILLED_SLOTS.has(i);
            const isPending = PENDING_SLOTS.has(i);
            const delay = 0.5 + i * 0.018;

            return (
              <motion.div
                key={i}
                className={cn(
                  'h-5 rounded-sm',
                  isFilled
                    ? 'bg-gradient-to-br from-sky-500 to-teal-500'
                    : isPending
                    ? 'bg-amber-500/70'
                    : 'bg-white/5',
                )}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay, ease: 'easeOut' }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-sky-500 to-teal-500" />
            <span className="text-[10px] text-white/40">Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-amber-500/70" />
            <span className="text-[10px] text-white/40">Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-white/5 border border-white/10" />
            <span className="text-[10px] text-white/40">Open</span>
          </div>
        </div>

        {/* Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-sm font-semibold text-white/60 mt-3"
        >
          12 bookings today
        </motion.p>
      </div>

      <TrustBadgesRow
        trustBadges={trustBadges}
        iconColor="text-sky-300"
        gradientFrom="from-sky-500/30"
        gradientTo="to-teal-500/30"
      />
    </motion.div>

    {/* Floating badge – top right */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
        <Calendar className="h-4 w-4 text-sky-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">Zero no-shows</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Auto reminders</p>
      </div>
    </motion.div>

    {/* Floating badge – bottom left */}
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
        <TrendingUp className="h-4 w-4 text-teal-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">+35% bookings</p>
        <p className="text-[10px] text-slate-500 mt-0.5">vs. manual</p>
      </div>
    </motion.div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component 5: ContentFeedVisual (content-creator)
// ---------------------------------------------------------------------------
interface ContentFeedVisualProps {
  trustBadges: TrustBadge[];
}

const CONTENT_CARDS = [
  {
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-purple-500',
    platform: 'Instagram',
    platformColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    delay: 0.6,
    type: 'image',
  },
  {
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-sky-500',
    platform: 'LinkedIn',
    platformColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    delay: 1.0,
    type: 'image',
  },
  {
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-500',
    platform: 'TikTok',
    platformColor: 'bg-slate-500/20 text-slate-300 border-slate-400/30',
    delay: 1.4,
    type: 'video',
  },
];

const ContentFeedVisual: React.FC<ContentFeedVisualProps> = ({ trustBadges }) => (
  <div
    className="relative w-full"
    role="img"
    aria-label="AI content creator feed visualization"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      {/* Header with progress */}
      <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-purple-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
              Content Creator
            </span>
          </div>
          <span className="text-xs font-bold text-purple-300">3/5 ready</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 to-purple-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '60%' }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Content cards */}
      <div className="px-5 py-4 space-y-2.5">
        {CONTENT_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: card.delay }}
            className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5"
          >
            {/* Thumbnail */}
            <div
              className={cn(
                'w-10 h-10 rounded-lg bg-gradient-to-br flex-shrink-0 flex items-center justify-center',
                card.gradientFrom,
                card.gradientTo,
              )}
            >
              {card.type === 'video' && (
                <span className="text-white text-xs font-bold">▶</span>
              )}
            </div>
            {/* Text skeleton */}
            <div className="flex-1 space-y-1.5">
              <div className="h-2 bg-white/20 rounded-full w-4/5" />
              <div className="h-2 bg-white/10 rounded-full w-3/5" />
            </div>
            {/* Platform badge */}
            <div
              className={cn(
                'text-[10px] font-semibold border rounded-full px-2 py-0.5 flex-shrink-0',
                card.platformColor,
              )}
            >
              {card.platform}
            </div>
          </motion.div>
        ))}

        {/* Shimmer generating card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{ duration: 1.5, delay: 1.8, repeat: Infinity }}
          className="flex items-center gap-3 bg-white/3 border border-dashed border-white/15 rounded-xl px-3 py-2.5"
        >
          <div className="w-10 h-10 rounded-lg bg-white/10 flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 bg-white/10 rounded-full w-3/5" />
            <div className="h-2 bg-white/5 rounded-full w-2/5" />
          </div>
          <span className="text-[10px] text-white/30 italic">generating…</span>
        </motion.div>
      </div>

      <TrustBadgesRow
        trustBadges={trustBadges}
        iconColor="text-purple-300"
        gradientFrom="from-sky-500/30"
        gradientTo="to-purple-500/30"
      />
    </motion.div>

    {/* Floating badge – top right */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
        <FileText className="h-4 w-4 text-purple-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">5 platforms</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Simultaneous</p>
      </div>
    </motion.div>

    {/* Floating badge – bottom left */}
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
        <TrendingUp className="h-4 w-4 text-sky-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">3x engagement</p>
        <p className="text-[10px] text-slate-500 mt-0.5">vs. manual posts</p>
      </div>
    </motion.div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component 6: SocialRadarVisual (social-manager)
// ---------------------------------------------------------------------------
interface SocialRadarVisualProps {
  trustBadges: TrustBadge[];
}

// Deterministic dot positions on 3 rings (angle in degrees, ring radius)
const RADAR_DOTS = [
  { angle: 30, ring: 44, platform: 'X', color: 'bg-sky-400', delay: 0.7 },
  { angle: 100, ring: 66, platform: 'IG', color: 'bg-pink-400', delay: 0.9 },
  { angle: 165, ring: 44, platform: 'LI', color: 'bg-blue-400', delay: 1.1 },
  { angle: 230, ring: 66, platform: 'FB', color: 'bg-indigo-400', delay: 1.0 },
  { angle: 300, ring: 44, platform: 'YT', color: 'bg-red-400', delay: 0.8 },
  { angle: 350, ring: 66, platform: 'TK', color: 'bg-slate-300', delay: 1.2 },
];

const RADAR_CX = 90;
const RADAR_CY = 90;

function dotPosition(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: RADAR_CX + radius * Math.cos(rad),
    y: RADAR_CY + radius * Math.sin(rad),
  };
}

const NOTIFICATIONS = [
  { text: 'New mention on X', dot: 'bg-sky-400', delay: 1.5 },
  { text: 'DM replied on IG', dot: 'bg-green-400', delay: 1.9 },
];

const SocialRadarVisual: React.FC<SocialRadarVisualProps> = ({ trustBadges }) => (
  <div
    className="relative w-full"
    role="img"
    aria-label="Social media monitoring radar visualization"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-teal-500/10 pointer-events-none" />

      <CardHeader statusColor="bg-teal-400" statusLabel="Social Monitor" pulseSpeed={1.0} />

      {/* Radar visualization */}
      <div className="relative px-5 py-4 flex flex-col items-center">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true">
            {/* Concentric rings */}
            {[22, 44, 66].map((r) => (
              <motion.circle
                key={r}
                cx={RADAR_CX}
                cy={RADAR_CY}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
            ))}

            {/* Cross lines */}
            <line x1={RADAR_CX} y1={RADAR_CY - 70} x2={RADAR_CX} y2={RADAR_CY + 70} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <line x1={RADAR_CX - 70} y1={RADAR_CY} x2={RADAR_CX + 70} y2={RADAR_CY} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

            {/* Platform dots */}
            {RADAR_DOTS.map(({ angle, ring, platform, delay }, i) => {
              const pos = dotPosition(angle, ring);
              return (
                <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay }}>
                  <circle cx={pos.x} cy={pos.y} r={9} fill="rgba(14,165,233,0.15)" />
                  <circle cx={pos.x} cy={pos.y} r={5} fill="rgba(14,165,233,0.4)" />
                  <text x={pos.x} y={pos.y + 3.5} textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">
                    {platform}
                  </text>
                </motion.g>
              );
            })}

            {/* Center icon */}
            <circle cx={RADAR_CX} cy={RADAR_CY} r={14} fill="rgba(14,165,233,0.2)" />
            <circle cx={RADAR_CX} cy={RADAR_CY} r={10} fill="rgba(14,165,233,0.35)" />
          </svg>

          {/* Pulse ring animation */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/30"
            animate={{ width: [0, 160], height: [0, 160], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          />
        </div>

        {/* Mention counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-sm font-semibold text-white/60 mb-3"
        >
          23 mentions today
        </motion.p>

        {/* Notification items */}
        <div className="w-full space-y-2">
          {NOTIFICATIONS.map(({ text, dot, delay }) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay }}
              className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2"
            >
              <span className={cn('w-2 h-2 rounded-full flex-shrink-0', dot)} />
              <span className="text-xs text-white/70">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <TrustBadgesRow
        trustBadges={trustBadges}
        iconColor="text-teal-300"
        gradientFrom="from-sky-500/30"
        gradientTo="to-teal-500/30"
      />
    </motion.div>

    {/* Floating badge – top right */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
        <Radio className="h-4 w-4 text-sky-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">&lt;30s response</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Avg reply time</p>
      </div>
    </motion.div>

    {/* Floating badge – bottom left */}
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
        <Wifi className="h-4 w-4 text-teal-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">100% coverage</p>
        <p className="text-[10px] text-slate-500 mt-0.5">All channels</p>
      </div>
    </motion.div>
  </div>
);

// ---------------------------------------------------------------------------
// Sub-component 7: WorkflowOrchestratorVisual (operations-agent)
// ---------------------------------------------------------------------------
interface WorkflowOrchestratorVisualProps {
  trustBadges: TrustBadge[];
}

const WORKFLOW_NODES = [
  { id: 'data-in', label: 'Data In', icon: Database, color: 'from-sky-500 to-sky-600', x: 18, y: 50, delay: 0.5 },
  { id: 'process', label: 'Process', icon: RefreshCw, color: 'from-teal-500 to-teal-600', x: 44, y: 50, delay: 0.7 },
  { id: 'report', label: 'Report', icon: BarChart2, color: 'from-purple-500 to-purple-600', x: 70, y: 25, delay: 0.9 },
  { id: 'alert', label: 'Alert', icon: AlertCircle, color: 'from-amber-500 to-amber-600', x: 70, y: 75, delay: 1.0 },
];

// SVG coordinate space: 100 x 100 viewBox
// Paths from data-in → process, process → report, process → alert
const PATHS = [
  { d: 'M 30 50 L 42 50', delay: 0.8 },
  { d: 'M 56 50 L 60 35 L 68 28', delay: 1.0 },
  { d: 'M 56 50 L 60 65 L 68 72', delay: 1.0 },
];

// Animated packet positions along each path (deterministic t values)
const PACKETS = [
  { path: 0, t: 0.5, color: '#0ea5e9', delay: 1.2 },
  { path: 1, t: 0.6, color: '#a855f7', delay: 1.6 },
  { path: 2, t: 0.6, color: '#f59e0b', delay: 1.8 },
];

const WorkflowOrchestratorVisual: React.FC<WorkflowOrchestratorVisualProps> = ({ trustBadges }) => (
  <div
    className="relative w-full"
    role="img"
    aria-label="AI workflow orchestrator visualization"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-[#0D1B2A] rounded-2xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-sm lg:max-w-none"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <CardHeader statusColor="bg-teal-400" statusLabel="Operations Agent" pulseSpeed={1.3} />

      {/* Workflow visualization */}
      <div className="px-5 py-5">
        {/* SVG flow diagram */}
        <div className="relative bg-white/3 border border-white/8 rounded-xl p-3 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-28" aria-hidden="true">
            {/* Connection paths */}
            {PATHS.map(({ d, delay }, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay }}
              />
            ))}

            {/* Animated data packets traveling along paths */}
            {/* Packet on path 0: horizontal line */}
            <motion.circle
              r="2"
              fill="#0ea5e9"
              initial={{ cx: 30, cy: 50, opacity: 0 }}
              animate={{ cx: [30, 42], cy: [50, 50], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, delay: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
            />
            {/* Packet on path 1: data-in → report branch */}
            <motion.circle
              r="2"
              fill="#a855f7"
              initial={{ opacity: 0 }}
              animate={{
                cx: [56, 60, 68],
                cy: [50, 35, 28],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.0, delay: 1.6, repeat: Infinity, repeatDelay: 1.8 }}
            />
            {/* Packet on path 2: data-in → alert branch */}
            <motion.circle
              r="2"
              fill="#f59e0b"
              initial={{ opacity: 0 }}
              animate={{
                cx: [56, 60, 68],
                cy: [50, 65, 72],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 1.0, delay: 1.8, repeat: Infinity, repeatDelay: 1.8 }}
            />

            {/* Nodes */}
            {WORKFLOW_NODES.map(({ id, label, icon: Icon, x, y, delay }) => (
              <motion.g
                key={id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay }}
              >
                <rect
                  x={x - 10}
                  y={y - 10}
                  width="20"
                  height="20"
                  rx="4"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.9)">
                  {id === 'data-in' ? '⇥' : id === 'process' ? '↻' : id === 'report' ? '▤' : '⚑'}
                </text>
                <text x={x} y={y + 16} textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.4)">
                  {label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.0, repeat: Infinity }}
            />
            <span className="text-xs text-white/60 font-semibold">3 workflows active</span>
          </div>
          <span className="text-[10px] text-white/30">Last sync: 2 min ago</span>
        </div>
      </div>

      <TrustBadgesRow
        trustBadges={trustBadges}
        iconColor="text-teal-300"
        gradientFrom="from-teal-500/30"
        gradientTo="to-purple-500/30"
      />
    </motion.div>

    {/* Floating badge – top right */}
    <motion.div
      initial={{ opacity: 0, x: 20, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
        <GitBranch className="h-4 w-4 text-teal-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">20+ hrs saved</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Per week</p>
      </div>
    </motion.div>

    {/* Floating badge – bottom left */}
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95 }}
      className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl border border-slate-200 px-3 py-2 shadow-lg hidden sm:flex items-center gap-2 z-10"
    >
      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="h-4 w-4 text-purple-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-900 leading-none">Zero dropped</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Tasks guaranteed</p>
      </div>
    </motion.div>
  </div>
);

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------
const HeroVisual: React.FC<HeroVisualProps> = ({
  solutionId,
  heroImage,
  primaryCtaAction,
  heroVisualType,
  voiceStatus,
  trustBadges,
  className,
}) => {
  const visualType = resolveVisualType(heroImage, primaryCtaAction, heroVisualType);

  return (
    <div className={cn('relative w-full py-4 sm:py-6 lg:py-8', className)}>
      {visualType === 'voice-waveform' && (
        <WaveformVisual voiceStatus={voiceStatus} trustBadges={trustBadges} />
      )}
      {visualType === 'image' && heroImage && (
        <ImageVisual heroImage={heroImage} solutionId={solutionId} />
      )}
      {visualType === 'dashboard' && <DashboardFallback />}
      {visualType === 'score-gauge' && <ScoreGaugeVisual trustBadges={trustBadges} />}
      {visualType === 'conversation-flow' && (
        <ConversationFlowVisual trustBadges={trustBadges} />
      )}
      {visualType === 'revenue-ticker' && (
        <RevenueTickerVisual trustBadges={trustBadges} />
      )}
      {visualType === 'calendar-grid' && (
        <CalendarGridVisual trustBadges={trustBadges} />
      )}
      {visualType === 'content-feed' && (
        <ContentFeedVisual trustBadges={trustBadges} />
      )}
      {visualType === 'social-radar' && (
        <SocialRadarVisual trustBadges={trustBadges} />
      )}
      {visualType === 'workflow-orchestrator' && (
        <WorkflowOrchestratorVisual trustBadges={trustBadges} />
      )}
    </div>
  );
};

export default HeroVisual;
