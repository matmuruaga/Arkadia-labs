import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { trackCtaClick } from '@/utils/dataLayer';
import { DirectorNode, DeptNode, AgentNode } from './OrgChartNode';
import type { DeptDef, OrchestratorDef } from './agentWorkforce.data';

interface OrgChartProps {
  orchestrator: OrchestratorDef;
  departments: DeptDef[];
}

const OrgChart: React.FC<OrgChartProps> = ({ orchestrator, departments }) => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const goToAgent = (slug: string, name: string) => {
    trackCtaClick(`agent_${slug}`, 'agent_workforce', name);
    navigate(`/${lang || 'en'}/solutions/${slug}`);
  };

  const goToSolutions = () => {
    trackCtaClick('explore_solutions', 'agent_workforce', t('agentWorkforce.cta'));
    navigate(`/${lang || 'en'}/solutions`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <h2 className="text-xl font-bold text-slate-900 mb-1 text-center animate-fade-in-up">
        {t('agentWorkforce.title')}
      </h2>
      <p className="text-xs text-slate-500 mb-6 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {t('agentWorkforce.centralNode')} &middot; {t('agentWorkforce.centralBadge')}
      </p>

      {/* Director */}
      <DirectorNode orchestrator={orchestrator} />

      {/* Vertical stem from director */}
      <div className="w-px h-5 bg-slate-300" />

      {/* Horizontal bar + department columns */}
      <div className="relative w-full">
        {/* Horizontal connector bar */}
        <div className="absolute top-0 left-[12.5%] right-[12.5%] h-px bg-slate-300" />

        <div className="flex justify-around">
          {departments.map((dept, di) => (
            <div key={dept.id} className="flex flex-col items-center">
              {/* Vertical drop from bar to dept */}
              <div className="w-px h-5 bg-slate-300" />

              <DeptNode dept={dept} index={di} />

              {/* Vertical connector to agents */}
              <div className="w-px h-3 bg-slate-200" />

              {/* Agent nodes */}
              <div className="flex flex-col items-center gap-1.5">
                {dept.agents.map((agent, ai) => (
                  <React.Fragment key={agent.id}>
                    {ai > 0 && <div className="w-px h-2 bg-slate-200" />}
                    <AgentNode
                      agent={agent}
                      dept={dept}
                      index={ai}
                      deptIndex={di}
                      onClick={() =>
                        goToAgent(agent.slug, t(`solutions.${agent.id}.hero.badge`, agent.id))
                      }
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <button
          onClick={goToSolutions}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          {t('agentWorkforce.cta')}
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default OrgChart;
