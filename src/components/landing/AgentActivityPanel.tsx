import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AgentActivityPanelProps {
  className?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const agentConfig = [
  { key: 'pm', icon: '📊', gradient: 'from-amber-400 to-orange-500' },
  { key: 'research', icon: '🔍', gradient: 'from-teal-500 to-sky-500' },
  { key: 'content', icon: '✍️', gradient: 'from-violet-500 to-indigo-500' },
  { key: 'calendar', icon: '📅', gradient: 'from-slate-400 to-slate-500' },
] as const;

const activityEntries = [
  { key: 'entry1', dotClass: 'bg-teal-500' },
  { key: 'entry2', dotClass: 'bg-sky-500' },
  { key: 'entry3', dotClass: 'bg-amber-500' },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type StatusMeta = {
  dotClass: string;
  textClass: string;
  label: string;
};

const getStatusMeta = (status: string): StatusMeta => {
  switch (status) {
    case 'Active':
    case 'Activo':
      return { dotClass: 'bg-teal-500', textClass: 'text-teal-500', label: status };
    case 'Completed':
    case 'Completado':
      return { dotClass: 'bg-teal-500', textClass: 'text-teal-500', label: status };
    case 'Working':
    case 'Trabajando':
      return { dotClass: 'bg-sky-500 animate-pulse', textClass: 'text-sky-500', label: status + '...' };
    case 'Queued':
    case 'En cola':
    default:
      return { dotClass: 'bg-gray-400', textClass: 'text-gray-400', label: status };
  }
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AgentActivityPanel: React.FC<AgentActivityPanelProps> = ({ className }) => {
  const { t } = useTranslation('landingV3');

  return (
    <div className={cn('bg-[#f8fafb] p-4 text-xs', className)}>
      {/* ------------------------------------------------------------------ */}
      {/* Section 1: Active Agents                                            */}
      {/* ------------------------------------------------------------------ */}
      <p className="text-gray-400 text-[9px] tracking-widest font-bold mb-2.5">
        ACTIVE AGENTS
      </p>

      <div className="flex flex-col gap-2">
        {agentConfig.map(({ key, icon, gradient }) => {
          const status = t(`productDemo.agents.${key}.status`);
          const statusMeta = getStatusMeta(status);
          const isQueued =
            status === 'Queued' || status === 'En cola';

          return (
            <div
              key={key}
              className={cn(
                'bg-white rounded-xl p-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
                isQueued && 'opacity-50',
              )}
            >
              {/* Row 1: avatar + name + status */}
              <div className="flex items-center gap-2">
                {/* Avatar */}
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0',
                    gradient,
                  )}
                  aria-hidden
                >
                  <span className="text-sm leading-none">{icon}</span>
                </div>

                {/* Name */}
                <span className="flex-1 font-bold text-[12px] text-[#0D1B2A] truncate">
                  {t(`productDemo.agents.${key}.name`)}
                </span>

                {/* Status indicator */}
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={cn('w-[5px] h-[5px] rounded-full', statusMeta.dotClass)}
                  />
                  <span className={cn('text-[10px] font-medium', statusMeta.textClass)}>
                    {statusMeta.label}
                  </span>
                </div>
              </div>

              {/* Row 2: description */}
              <p className="text-[10px] text-gray-500 mt-1.5 leading-relaxed">
                {t(`productDemo.agents.${key}.description`)}
              </p>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2: Activity Log                                             */}
      {/* ------------------------------------------------------------------ */}
      <p className="text-gray-400 text-[9px] tracking-widest font-bold mt-4 mb-2">
        ACTIVITY LOG
      </p>

      <div className="flex flex-col gap-1.5">
        {activityEntries.map(({ key, dotClass }) => (
          <div key={key} className="flex gap-2 items-start">
            {/* Colored dot */}
            <span className={cn('w-[5px] h-[5px] rounded-full mt-1 shrink-0', dotClass)} />

            {/* Text */}
            <div>
              <p className="text-[10px] leading-snug">
                <span className="text-[#0D1B2A] font-semibold">
                  {t(`productDemo.activityLog.${key}.agent`)}
                </span>{' '}
                <span className="text-gray-500">
                  {t(`productDemo.activityLog.${key}.action`)}
                </span>
              </p>
              <p className="text-gray-300 text-[9px]">
                {t(`productDemo.activityLog.${key}.time`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentActivityPanel;
