import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bot } from 'lucide-react';
import { trackCtaClick } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Aura node: a skeleton card with rotating conic-gradient border beam
// ---------------------------------------------------------------------------

interface AuraNodeProps {
  className?: string;
  delay?: string;
  children?: React.ReactNode;
}

const AuraNode: React.FC<AuraNodeProps> = ({ className, delay = '0s', children }) => (
  <div
    className={cn('aura-node relative', className)}
    style={{
      background:
        'conic-gradient(from var(--border-angle), transparent 60%, #1C7ED6 75%, #22d3ee 80%, #1C7ED6 85%, transparent 95%)',
      border: '1.5px solid transparent',
      backgroundOrigin: 'border-box',
      backgroundClip: 'border-box',
      animationName: 'border-rotate',
      animationDuration: '3s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDelay: delay,
    }}
  >
    {/* Layer 1: opaque fill — completely blocks the conic gradient from showing inside */}
    <div
      className="absolute inset-[1.5px] rounded-[inherit]"
      style={{ background: '#F1F3F5' }}
    />
    {/* Layer 2: glassmorphism on top — semi-transparent white + blur + shadow */}
    <div
      className="absolute inset-[1.5px] rounded-[inherit] backdrop-blur-sm"
      style={{ background: 'rgba(255, 255, 255, 0.45)', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)' }}
    />
    {/* Content layer */}
    {children && <div className="relative z-10">{children}</div>}
  </div>
);

// ---------------------------------------------------------------------------
// Skeleton content: circle avatar + text lines placeholder
// ---------------------------------------------------------------------------

interface SkeletonContentProps {
  size: 'lg' | 'md' | 'sm';
}

const SkeletonContent: React.FC<SkeletonContentProps> = ({ size }) => {
  const avatarSize = size === 'lg' ? 'w-10 h-10' : size === 'md' ? 'w-8 h-8' : 'w-6 h-6';
  const lineWidth1 = size === 'lg' ? 'w-20' : size === 'md' ? 'w-16' : 'w-12';
  const lineWidth2 = size === 'lg' ? 'w-14' : size === 'md' ? 'w-10' : 'w-8';
  const lineH = size === 'sm' ? 'h-1.5' : 'h-2';
  const gap = size === 'sm' ? 'gap-1' : 'gap-1.5';

  return (
    <div className={cn('flex items-center', gap, size === 'sm' ? 'px-2.5 py-2' : 'px-3 py-3')}>
      {/* Avatar circle */}
      <div className={cn('rounded-full bg-slate-300/50 shrink-0', avatarSize)} />
      {/* Text lines */}
      <div className={cn('flex flex-col', gap === 'gap-1' ? 'gap-1' : 'gap-1.5')}>
        <div className={cn('rounded-full bg-slate-300/50', lineH, lineWidth1)} />
        <div className={cn('rounded-full bg-slate-300/35', lineH, lineWidth2)} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Connector line with pulsing gradient
// ---------------------------------------------------------------------------

const Connector: React.FC<{ height?: number; delay?: string }> = ({ height = 20, delay = '0s' }) => (
  <div
    className="aura-line mx-auto"
    style={{
      width: 1,
      height,
      background: 'linear-gradient(180deg, transparent, #1C7ED640, transparent)',
      backgroundSize: '100% 200%',
      animationName: 'line-pulse',
      animationDuration: '2s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      animationDelay: delay,
    }}
  />
);

// ---------------------------------------------------------------------------
// Horizontal branch bar
// ---------------------------------------------------------------------------

const HorizontalBranch: React.FC<{ cols: number }> = ({ cols }) => (
  <div className="relative flex w-full" aria-hidden="true">
    {Array.from({ length: cols }).map((_, i) => (
      <div key={i} className="flex-1 flex flex-col items-center">
        <div
          style={{
            height: 1,
            width: '100%',
            background:
              i === 0
                ? 'linear-gradient(to right, transparent 50%, #1C7ED630 100%)'
                : i === cols - 1
                  ? 'linear-gradient(to right, #1C7ED630 0%, transparent 50%)'
                  : '#1C7ED630',
          }}
        />
      </div>
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Main SkeletonOrgChart
// ---------------------------------------------------------------------------

const SkeletonOrgChart: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { lang = 'en' } = useParams<{ lang: string }>();

  // 3 department columns with agent counts
  const deptAgents = [3, 2, 2];

  const handleExploreCta = () => {
    trackCtaClick('explore_solutions', 'agent_workforce_skeleton', t('agentWorkforce.cta'));
    navigate(`/${lang}/solutions`);
  };

  return (
    <div className="flex flex-col items-center gap-5 select-none">
      {/* Org chart skeleton */}
      <div className="flex flex-col items-center w-full" aria-hidden="true">

        {/* Director node */}
        <AuraNode className="rounded-xl w-full max-w-[200px]" delay="0s">
          <SkeletonContent size="lg" />
        </AuraNode>

        <Connector height={20} delay="0.1s" />

        {/* Horizontal branch */}
        <HorizontalBranch cols={3} />

        {/* Department columns */}
        <div className="flex w-full justify-around gap-3">
          {deptAgents.map((agentCount, deptIdx) => (
            <div key={deptIdx} className="flex flex-col items-center gap-0 flex-1">
              {/* Vertical drop */}
              <Connector height={16} delay={`${deptIdx * 0.25}s`} />

              {/* Dept node */}
              <AuraNode
                className="rounded-lg w-full max-w-[160px]"
                delay={`${deptIdx * 0.3}s`}
              >
                <SkeletonContent size="md" />
              </AuraNode>

              {/* Dept → agents stem */}
              <Connector height={14} delay={`${deptIdx * 0.3 + 0.1}s`} />

              {/* Agent cards */}
              <div className="flex flex-col items-center gap-2 w-full">
                {Array.from({ length: agentCount }).map((_, agentIdx) => (
                  <AuraNode
                    key={agentIdx}
                    className="rounded-md w-full max-w-[140px]"
                    delay={`${deptIdx * 0.3 + agentIdx * 0.15}s`}
                  >
                    <SkeletonContent size="sm" />
                  </AuraNode>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SkeletonOrgChart;
