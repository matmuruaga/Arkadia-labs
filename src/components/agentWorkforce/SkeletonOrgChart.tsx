import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ---------------------------------------------------------------------------
// Aura node: a skeleton rectangle whose border is a rotating conic-gradient
// beam, giving an "AI energy" effect. All animation is pure CSS (no JS).
// ---------------------------------------------------------------------------

interface AuraNodeProps {
  /** Extra Tailwind classes for sizing/shape */
  className?: string;
  /** CSS animation-delay for staggered beam effect */
  delay?: string;
  style?: React.CSSProperties;
}

const AuraNode: React.FC<AuraNodeProps> = ({ className, delay = '0s', style }) => {
  return (
    <div
      className={cn('aura-node relative', className)}
      style={{
        // Rotating conic-gradient used as the border via background-clip trick.
        // The ::after pseudo-element fills the interior so the gradient only
        // shows through at the border.
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
        ...style,
      }}
    >
      {/* Interior fill — slightly transparent so the glow bleeds through */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{ background: 'rgba(241, 243, 245, 0.96)' }}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Connector line: a 1 px vertical line with a pulsing gradient shimmer
// ---------------------------------------------------------------------------

interface ConnectorProps {
  height?: number;
  delay?: string;
}

const Connector: React.FC<ConnectorProps> = ({ height = 20, delay = '0s' }) => (
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
// Horizontal branch: connects multiple dept nodes from a central stem
// ---------------------------------------------------------------------------

interface BranchProps {
  /** Number of columns (= number of dept nodes) */
  cols: number;
}

/**
 * Renders the horizontal connector bar that spans across all dept nodes.
 * Uses a CSS flex trick: invisible spacer cells keep the lines aligned
 * with the node centres.
 */
const HorizontalBranch: React.FC<BranchProps> = ({ cols }) => (
  <div className="relative flex w-full" aria-hidden="true">
    {Array.from({ length: cols }).map((_, i) => (
      <div key={i} className="flex-1 flex flex-col items-center">
        {/* Top stub — only for leftmost and rightmost cells, draw half-bar */}
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
// Main SkeletonOrgChart component
// ---------------------------------------------------------------------------

/**
 * Pure CSS skeleton org chart with an "AI aura" glowing border effect.
 *
 * Structure:
 *   [Director]
 *       │
 *   ┌───┼───┐
 * [D1][D2][D3][D4]
 *  │   │   │   │
 * [a] [a] [a] [a]
 * [a] [a] [a]
 * [a]
 *
 * No text, no icons — pure silhouettes with animated gradient borders.
 */
const SkeletonOrgChart: React.FC = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { lang = 'en' } = useParams<{ lang: string }>();

  // Agent counts per department: [3, 2, 2, 1]
  const deptAgents = [3, 2, 2, 1];

  const handleExploreCta = () => {
    trackCtaClick('explore_solutions', 'agent_workforce_skeleton', t('agentWorkforce.cta'));
    navigate(`/${lang}/solutions`);
  };

  return (
    <div className="flex flex-col items-center gap-4 select-none" aria-hidden="true">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-[var(--site-text-dark)] leading-tight">
        {t('agentWorkforce.title')}
      </h2>

      {/* Org chart skeleton */}
      <div className="flex flex-col items-center w-full max-w-sm">

        {/* Director node */}
        <AuraNode
          className="rounded-xl"
          style={{ width: 96, height: 44 }}
          delay="0s"
        />

        {/* Director → branch stem */}
        <Connector height={16} delay="0.1s" />

        {/* Horizontal branch bar */}
        <HorizontalBranch cols={4} />

        {/* Dept row */}
        <div className="flex w-full justify-around">
          {deptAgents.map((agentCount, deptIdx) => (
            <div key={deptIdx} className="flex flex-col items-center gap-0">
              {/* Dept node */}
              <AuraNode
                className="rounded-lg"
                style={{ width: 60, height: 30 }}
                delay={`${deptIdx * 0.3}s`}
              />

              {/* Dept → agents stem */}
              <Connector height={14} delay={`${deptIdx * 0.3 + 0.1}s`} />

              {/* Agent column */}
              <div className="flex flex-col items-center gap-[6px]">
                {Array.from({ length: agentCount }).map((_, agentIdx) => (
                  <AuraNode
                    key={agentIdx}
                    className="rounded-md"
                    style={{ width: 50, height: 24 }}
                    delay={`${deptIdx * 0.3 + agentIdx * 0.15}s`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="outline"
        size="sm"
        className="mt-2 border-[var(--site-accent-blue)] text-[var(--site-accent-blue)] hover:bg-[var(--site-accent-blue)] hover:text-white transition-colors"
        onClick={handleExploreCta}
        aria-label={t('agentWorkforce.cta')}
      >
        {t('agentWorkforce.cta')}
      </Button>
    </div>
  );
};

export default SkeletonOrgChart;
