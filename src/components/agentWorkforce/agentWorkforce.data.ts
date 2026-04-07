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
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────

export interface AgentDef {
  id: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DeptDef {
  id: string;
  tKey: string;
  color: string;
  bg: string;
  hex: string;
  agents: AgentDef[];
}

export interface PillConfig {
  id: string;
  left: string;
  top: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}

export interface OrchestratorDef {
  tKey: string;
  badgeKey: string;
  icon: React.ComponentType<{ className?: string }>;
  avatarSrc?: string;
}

// ── Data ─────────────────────────────────────────────────────────

export const departments: DeptDef[] = [
  {
    id: 'outbound',
    tKey: 'agentWorkforce.departments.outbound',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hex: '#2563eb',
    agents: [
      { id: 'lead-validator', slug: 'lead-validator', icon: UserCheck },
      { id: 'sales-qualifier', slug: 'sales-qualifier', icon: Phone },
      { id: 'sales-agent', slug: 'sales-agent', icon: ShoppingCart },
    ],
  },
  {
    id: 'inbound',
    tKey: 'agentWorkforce.departments.inbound',
    color: 'text-green-600',
    bg: 'bg-green-50',
    hex: '#16a34a',
    agents: [
      { id: 'virtual-receptionist', slug: 'virtual-receptionist', icon: PhoneIncoming },
      { id: 'booking-agent', slug: 'booking-agent', icon: CalendarCheck },
    ],
  },
  {
    id: 'marketing',
    tKey: 'agentWorkforce.departments.marketing',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    hex: '#0d9488',
    agents: [
      { id: 'content-creator', slug: 'content-creator', icon: Image },
      { id: 'social-manager', slug: 'social-manager', icon: Share2 },
    ],
  },
  {
    id: 'operations',
    tKey: 'agentWorkforce.departments.operations',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    hex: '#ea580c',
    agents: [
      { id: 'operations-agent', slug: 'operations-agent', icon: Cog },
    ],
  },
];

export const orchestrator: OrchestratorDef = {
  tKey: 'agentWorkforce.orchestrator.title',
  badgeKey: 'agentWorkforce.orchestrator.badge',
  icon: Building2,
  avatarSrc: undefined,
};

export const pillConfigs: PillConfig[] = [
  { id: 'ops',       left: '25%', top: '40%', labelKey: 'agentWorkforce.pills.analyzingData',   icon: Cog,           delay: 0.2 },
  { id: 'sales',     left: '22%', top: '60%', labelKey: 'agentWorkforce.pills.processingLeads', icon: UserCheck,     delay: 0.6 },
  { id: 'marketing', left: '72%', top: '40%', labelKey: 'agentWorkforce.pills.creatingContent', icon: Image,         delay: 1.0 },
  { id: 'support',   left: '75%', top: '55%', labelKey: 'agentWorkforce.pills.answeringCalls',  icon: PhoneIncoming, delay: 1.4 },
];
