import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { AgentDef, DeptDef, OrchestratorDef } from './agentWorkforce.data';

// ── Director Node ────────────────────────────────────────────────

interface DirectorNodeProps {
  orchestrator: OrchestratorDef;
}

export const DirectorNode: React.FC<DirectorNodeProps> = ({ orchestrator }) => {
  const { t } = useTranslation('home');
  const Icon = orchestrator.icon;

  return (
    <div className="flex flex-col items-center animate-fade-in-up">
      <div className="relative">
        {orchestrator.avatarSrc ? (
          <img
            src={orchestrator.avatarSrc}
            alt={t(orchestrator.tKey)}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-800 shadow-lg"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-2 border-slate-700 shadow-lg">
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white" />
      </div>
      <p className="mt-2 text-sm font-bold text-slate-900">{t(orchestrator.tKey)}</p>
      <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
        {t(orchestrator.badgeKey)}
      </span>
    </div>
  );
};

// ── Department Node ──────────────────────────────────────────────

interface DeptNodeProps {
  dept: DeptDef;
  index: number;
}

export const DeptNode: React.FC<DeptNodeProps> = ({ dept, index }) => {
  const { t } = useTranslation('home');
  const DeptIcon = dept.agents[0]?.icon;

  return (
    <div
      className="flex flex-col items-center animate-fade-in-up"
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div
        className={cn('w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border', dept.bg)}
        style={{ borderColor: `${dept.hex}30` }}
      >
        {DeptIcon && <DeptIcon className={cn('w-5 h-5', dept.color)} />}
      </div>
      <span
        className={cn(
          'mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border text-center',
          dept.bg,
          dept.color,
        )}
        style={{ borderColor: `${dept.hex}20` }}
      >
        {t(dept.tKey)}
      </span>
      <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-md bg-slate-800 text-white text-[9px] font-bold">
        {dept.agents.length}
      </span>
    </div>
  );
};

// ── Agent Node ───────────────────────────────────────────────────

interface AgentNodeProps {
  agent: AgentDef;
  dept: DeptDef;
  index: number;
  deptIndex: number;
  onClick: () => void;
}

export const AgentNode: React.FC<AgentNodeProps> = ({ agent, dept, index, deptIndex, onClick }) => {
  const { t } = useTranslation('home');
  const Icon = agent.icon;

  return (
    <div
      className="animate-fade-in-up cursor-pointer group"
      style={{ animationDelay: `${400 + deptIndex * 100 + index * 80}ms` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
    >
      <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-150 max-w-[140px]">
        <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center shrink-0', dept.bg)}>
          <Icon className={cn('w-3.5 h-3.5', dept.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-slate-900 leading-tight truncate">
            {t(`solutions.${agent.id}.hero.badge`, agent.id.replace(/-/g, ' '))}
          </p>
          <div className="flex items-center gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-semibold text-emerald-600 uppercase">
              {t('agentWorkforce.liveLabel', 'Active')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
