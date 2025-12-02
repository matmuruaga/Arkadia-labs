// src/components/solutions/SolutionPlatform.tsx
import React, { useId, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  BarChart3,
  Phone,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  CheckCircle2,
  Activity,
  Users,
  Zap,
  Search,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SolutionPlatformPreview } from '@/data/solutions/types';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'bar-chart': BarChart3,
  'phone': Phone,
  'trending-up': TrendingUp,
  'clock': Clock,
  'dollar-sign': DollarSign,
  'target': Target,
  'check-circle': CheckCircle2,
  'activity': Activity,
  'users': Users,
  'zap': Zap,
  'search': Search,
  'refresh': RefreshCw,
};

interface Props {
  data: SolutionPlatformPreview;
  solutionId: string;
}

// Animated skeleton bar for charts
const SkeletonBar: React.FC<{ height: string; delay: number }> = ({ height, delay }) => (
  <motion.div
    className="w-full bg-gradient-to-t from-blue-500/80 to-blue-400/60 rounded-t-sm"
    initial={{ height: 0 }}
    animate={{ height }}
    transition={{ duration: 0.8, delay, ease: 'easeOut' }}
  />
);

// Animated number counter
const AnimatedNumber: React.FC<{ value: string; delay?: number }> = ({ value, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="tabular-nums"
    >
      {value}
    </motion.span>
  );
};

// KPI Card component
const KPICard: React.FC<{
  icon: string;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  delay: number;
}> = ({ icon, label, value, trend, trendUp, delay }) => {
  const IconComponent = iconMap[icon] || Activity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <IconComponent className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">
        <AnimatedNumber value={value} delay={delay + 0.2} />
      </div>
      {trend && (
        <div className={cn(
          "text-xs font-medium mt-1 flex items-center gap-1",
          trendUp ? "text-green-600" : "text-red-500"
        )}>
          <TrendingUp className={cn("h-3 w-3", !trendUp && "rotate-180")} />
          {trend}
        </div>
      )}
    </motion.div>
  );
};

// Mini chart visualization
const MiniChart: React.FC<{ title: string; delay: number }> = ({ title, delay }) => {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm"
    >
      <h4 className="text-sm font-semibold text-slate-700 mb-3">{title}</h4>
      <div className="flex items-end gap-1 h-16">
        {bars.map((height, i) => (
          <SkeletonBar key={i} height={`${height}%`} delay={delay + i * 0.05} />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-slate-400">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </motion.div>
  );
};

// Lead Scoring Table with contacts
const LeadScoringTable: React.FC<{ delay: number }> = ({ delay }) => {
  const leads = [
    { name: 'Sarah Mitchell', score: 94, company: 'TechFlow Inc', role: 'VP of Sales' },
    { name: 'James Rodriguez', score: 87, company: 'CloudNine SaaS', role: 'Director' },
    { name: 'Emily Chen', score: 82, company: 'DataPulse', role: 'Head of Ops' },
    { name: 'Michael Foster', score: 76, company: 'GrowthLab', role: 'CEO' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700';
    if (score >= 80) return 'bg-emerald-100 text-emerald-700';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-slate-700">Lead Scoring</h4>
        <span className="text-[10px] text-slate-400">Top leads today</span>
      </div>
      <div className="space-y-2">
        {leads.map((lead, index) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + 0.1 + index * 0.08 }}
            className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-[10px] font-medium text-slate-600 flex-shrink-0">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-800 truncate">{lead.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{lead.role} · {lead.company}</p>
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getScoreColor(lead.score)}`}>
              {lead.score}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Activity feed item
const ActivityItem: React.FC<{
  icon: string;
  text: string;
  time: string;
  status: 'success' | 'pending' | 'processing';
  delay: number;
}> = ({ icon, text, time, status, delay }) => {
  const IconComponent = iconMap[icon] || Activity;
  const statusColors = {
    success: 'bg-green-100 text-green-600',
    pending: 'bg-yellow-100 text-yellow-600',
    processing: 'bg-blue-100 text-blue-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3 py-2"
    >
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", statusColors[status])}>
        <IconComponent className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700 truncate">{text}</p>
        <p className="text-xs text-slate-400">{time}</p>
      </div>
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === 'success' && "bg-green-500",
        status === 'pending' && "bg-yellow-500",
        status === 'processing' && "bg-blue-500 animate-pulse"
      )} />
    </motion.div>
  );
};

// Lead score gauge
const LeadScoreGauge: React.FC<{ score: number; delay: number; gradientId: string }> = ({ score, delay, gradientId }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative w-28 h-28"
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-500">Score</span>
      </div>
    </motion.div>
  );
};

const SolutionPlatform: React.FC<Props> = React.memo(({ data, solutionId }) => {
  const { t } = useTranslation();
  const gaugeGradientId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile/tablet with debounced resize handler
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();

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

  // Scroll-based transforms for 3D effect (desktop only)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Glass gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50" />

      {/* Aurora gradient blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/40 via-cyan-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-teal-200/30 via-blue-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-100/20 via-cyan-50/30 to-teal-100/20 rounded-full blur-3xl rotate-12" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-teal-500/10 border border-sky-200/50 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <Zap className="h-4 w-4 text-sky-600" />
              <span className="text-sm font-semibold text-slate-700">
                {t(`solutions.${solutionId}.platform.badge`, data.badge || 'Platform Preview')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {t(`solutions.${solutionId}.platform.title`, data.title)}
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t(`solutions.${solutionId}.platform.subtitle`, data.subtitle)}
            </p>
          </motion.div>

          {/* Browser Frame with 3D Scroll Effect - Desktop only */}
          <div
            className="relative"
            style={{ perspective: isMobile ? 'none' : '1200px' }}
          >
            {/* 3D Transform wrapper - applies scroll-based rotation on desktop */}
            <motion.div
              style={!isMobile ? {
                rotateX: rotate,
                scale,
                opacity: scrollOpacity,
                transformStyle: 'preserve-3d',
              } : undefined}
              initial={isMobile ? { opacity: 0, y: 40 } : undefined}
              whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
              viewport={isMobile ? { once: true } : undefined}
              transition={isMobile ? { duration: 0.8, delay: 0.2 } : undefined}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/20 via-cyan-500/15 to-teal-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              {/* Browser Chrome */}
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 flex items-center gap-2 text-sm text-slate-500 min-w-[300px]">
                      <Search className="h-3.5 w-3.5" />
                      <span>app.arkadialabs.io/dashboard</span>
                    </div>
                  </div>
                  <div className="w-16" />
                </div>

                {/* Dashboard Content - Bento Grid */}
                <div className="p-6 bg-slate-50/50">
                  {/* Top KPIs Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {data.kpis.map((kpi, index) => (
                      <KPICard
                        key={kpi.label}
                        icon={kpi.icon}
                        label={t(`solutions.${solutionId}.platform.kpis.${index}.label`, kpi.label)}
                        value={kpi.value}
                        trend={kpi.trend}
                        trendUp={kpi.trendUp}
                        delay={0.1 + index * 0.1}
                      />
                    ))}
                  </div>

                  {/* Main Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Large Chart Card - Spans 2 columns */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="md:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {t(`solutions.${solutionId}.platform.mainChart.title`, data.mainChart?.title || 'Performance Overview')}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {t(`solutions.${solutionId}.platform.mainChart.subtitle`, data.mainChart?.subtitle || 'Last 30 days')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                            {t('solutions.platform.daily', 'Daily')}
                          </span>
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-full">
                            {t('solutions.platform.weekly', 'Weekly')}
                          </span>
                        </div>
                      </div>

                      {/* Chart Area */}
                      <div className="h-48 flex items-end gap-2">
                        {[35, 55, 40, 70, 45, 80, 60, 75, 50, 85, 65, 90, 55, 95, 70].map((height, i) => (
                          <div key={i} className="flex-1 h-full flex flex-col justify-end">
                            <motion.div
                              className="w-full bg-gradient-to-t from-sky-500 to-teal-400 rounded-t-sm"
                              initial={{ height: 0 }}
                              whileInView={{ height: `${height}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.4 + i * 0.05, ease: 'easeOut' }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-3 text-xs text-slate-400">
                        {['1', '5', '10', '15', '20', '25', '30'].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Lead Score Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col items-center justify-center"
                    >
                      <h3 className="font-semibold text-slate-900 mb-4">
                        {t(`solutions.${solutionId}.platform.scoreCard.title`, 'Lead Quality Score')}
                      </h3>
                      <LeadScoreGauge score={data.scoreCard?.score || 87} delay={0.5} gradientId={gaugeGradientId} />
                      <p className="text-sm text-slate-500 mt-3 text-center">
                        {t(`solutions.${solutionId}.platform.scoreCard.description`, data.scoreCard?.description || 'Above target threshold')}
                      </p>
                    </motion.div>

                    {/* Activity Feed */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-900">
                          {t(`solutions.${solutionId}.platform.activity.title`, 'Recent Activity')}
                        </h3>
                        <RefreshCw className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        {data.activityFeed?.slice(0, 4).map((item, index) => (
                          <ActivityItem
                            key={index}
                            icon={item.icon}
                            text={t(`solutions.${solutionId}.platform.activity.items.${index}`, item.text)}
                            time={item.time}
                            status={item.status as 'success' | 'pending' | 'processing'}
                            delay={0.6 + index * 0.1}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Lead Scoring Table & Conversion Chart */}
                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                      <LeadScoringTable delay={0.6} />
                      <MiniChart
                        title={t(`solutions.${solutionId}.platform.charts.conversion`, 'Conversion Trend')}
                        delay={0.7}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements for depth */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl border border-slate-200 p-3 shadow-lg hidden lg:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">Lead Validated</p>
                    <p className="text-[10px] text-slate-500">Score: 94/100</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -right-4 bottom-1/3 bg-white rounded-xl border border-slate-200 p-3 shadow-lg hidden lg:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">+23% This Week</p>
                    <p className="text-[10px] text-slate-500">Qualified leads</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

SolutionPlatform.displayName = 'SolutionPlatform';

export default SolutionPlatform;
