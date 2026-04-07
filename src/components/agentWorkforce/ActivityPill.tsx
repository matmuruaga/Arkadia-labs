import { useTranslation } from 'react-i18next';
import type { PillConfig } from './agentWorkforce.data';

const TypingDots = () => (
  <span className="flex gap-0.5" aria-hidden="true">
    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
  </span>
);

interface ActivityPillProps {
  pill: PillConfig;
}

const ActivityPill: React.FC<ActivityPillProps> = ({ pill }) => {
  const { t } = useTranslation('home');
  const Icon = pill.icon;

  return (
    <div
      className="absolute z-10 animate-pill-appear"
      style={{
        left: pill.left,
        top: pill.top,
        animationDelay: `${pill.delay}s`,
        transform: 'translateX(-50%)',
      }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 shadow-md border border-slate-200/60 whitespace-nowrap">
        <Icon className="w-3 h-3 text-blue-500 shrink-0" />
        <span className="text-[10px] font-medium text-slate-700">
          {t(pill.labelKey)}
        </span>
        <TypingDots />
      </div>
    </div>
  );
};

export default ActivityPill;
