// src/data/solutions/operations-agent.ts
import { Solution } from './types';

export const operationsAgentSolution: Solution = {
  id: 'operations-agent',
  slug: 'operations-agent',
  category: 'operations',
  translationKey: 'operationsAgent',

  seo: {
    title: 'AI Operations Agent | Automate Business Workflows',
    description: 'AI operations agent that automates internal workflows, aggregates reports, tracks tasks, monitors processes, and syncs data across tools—saving teams 20+ hours weekly.',
    keywords: [
      'AI operations agent',
      'business workflow automation',
      'automated reporting AI',
      'task management automation',
      'process monitoring AI',
      'document processing automation',
      'internal operations AI',
      'cross-platform data sync',
      'compliance monitoring AI',
      'meeting automation AI',
      'operations intelligence',
      'AI process orchestration',
      'business operations automation',
    ],
  },

  hero: {
    badge: 'Operations & Automation',
    title: 'Your AI Operations Agent That Runs the Back Office',
    subtitle: 'Automate. Orchestrate. Monitor. Sync. Escalate.',
    description: 'An AI agent that orchestrates workflows across every tool your team uses, auto-generates reports from multiple data sources, tracks task completion and escalates blockers, monitors processes with intelligent alerts, and keeps your entire operation synchronized—without manual coordination.',
    primaryCta: 'See It in Action',
    secondaryCta: 'Talk to Sales',
    trustBadges: [
      { icon: 'clock', label: 'Hours Saved Weekly', value: '20+' },
      { icon: 'zap', label: 'Workflows Automated', value: '100%' },
      { icon: 'trending-up', label: 'Operational Efficiency', value: '+65%' },
    ],
  },

  problem: {
    headline: 'Your Operations Team Is Buried in Manual Work That AI Can Do',
    description: 'Every growing business hits the same wall: critical workflows scattered across a dozen tools, reports assembled by hand each week, tasks falling through the cracks, and no real-time visibility into operational health—until something breaks.',
    painPoints: [
      {
        title: 'Manual Reporting Steals Hours',
        description: 'Ops teams spend an average of 8 hours per week pulling data from different systems to build reports nobody has time to read. The data is always slightly stale by the time it lands.',
        icon: 'bar-chart',
      },
      {
        title: 'Workflows Break at Handoffs',
        description: 'When tasks move between tools and people, things slip. There is no system that watches every step, flags stalled items, or routes work to the right person automatically.',
        icon: 'git-branch',
      },
      {
        title: 'No Early Warning System',
        description: 'Ops leaders only learn about problems after they have already caused damage—a missed deadline, a compliance gap, an inventory shortfall. By then, the cost of fixing it is much higher.',
        icon: 'alert-triangle',
      },
      {
        title: 'Tools Do Not Talk to Each Other',
        description: 'Your CRM, project management, finance, and communication tools each hold a piece of the picture. Without a layer that connects them, your team wastes time re-entering data and reconciling discrepancies.',
        icon: 'database',
      },
    ],
    statistics: [
      { value: '8hrs', label: 'per week spent by ops teams on manual reporting and data aggregation', source: 'McKinsey & Company, 2023' },
      { value: '40%', label: 'of business process failures originate at workflow handoff points between systems', source: 'Forrester Research, 2023' },
      { value: '$1.3T', label: 'lost annually by US businesses due to ineffective internal communication and coordination', source: 'Salesforce State of Work Report' },
    ],
  },

  howItWorks: {
    title: 'How the Operations Agent Works',
    subtitle: 'From workflow orchestration to automated reporting—fully connected',
    steps: [
      {
        step: 1,
        title: 'Connect Every Tool in Your Stack',
        description: 'Integrates with your project management, CRM, communication, data, and finance tools. Maps your existing workflows and establishes the data flows that power every automation.',
        icon: 'layers',
      },
      {
        step: 2,
        title: 'Orchestrate Tasks and Workflows',
        description: 'Monitors task status across all tools, automatically assigns work based on rules, escalates stalled items to the right person, and sends deadline reminders before things slip.',
        icon: 'git-branch',
      },
      {
        step: 3,
        title: 'Aggregate Data and Generate Reports',
        description: 'Pulls data from every connected source on a defined schedule, builds formatted reports, and delivers them to the right stakeholders via email or Slack—no manual assembly required.',
        icon: 'bar-chart',
      },
      {
        step: 4,
        title: 'Monitor, Alert, and Sync',
        description: 'Continuously watches key operational metrics, fires intelligent alerts when thresholds are breached, and keeps data synchronized across platforms to eliminate discrepancies.',
        icon: 'activity',
      },
    ],
  },

  features: {
    title: 'Your Complete Operations Automation Platform',
    subtitle: 'Every capability needed to run a tighter, faster, more efficient operation',
    features: [
      {
        id: 'workflow-automation',
        icon: 'repeat',
        title: 'Workflow Automation & Orchestration',
        description: 'Automates multi-step workflows across tools without code. Handles task routing, conditional logic, approval chains, and cross-system handoffs that currently require manual coordination.',
      },
      {
        id: 'automated-reporting',
        icon: 'bar-chart',
        title: 'Automated Reporting & Data Aggregation',
        description: 'Connects to all your data sources and auto-generates weekly, daily, or on-demand reports. Delivers them formatted and on schedule so stakeholders always have current numbers.',
      },
      {
        id: 'task-tracking',
        icon: 'clipboard-list',
        title: 'Task Assignment, Tracking & Escalation',
        description: 'Tracks every task across your project management tools. Automatically assigns work, monitors progress, sends reminders, and escalates to managers when items stall beyond defined thresholds.',
      },
      {
        id: 'process-monitoring',
        icon: 'activity',
        title: 'Process Monitoring & Intelligent Alerts',
        description: 'Watches key operational KPIs in real time. When a metric drifts outside acceptable bounds—response times, error rates, inventory levels—it fires context-rich alerts before the issue becomes a crisis.',
      },
      {
        id: 'document-processing',
        icon: 'file-text',
        title: 'Document Processing & Data Extraction',
        description: 'Reads incoming documents, invoices, contracts, and forms. Extracts structured data, routes documents to the right workflow, and updates connected systems without manual data entry.',
      },
      {
        id: 'cross-platform-sync',
        icon: 'refresh-cw',
        title: 'Cross-Platform Data Synchronization',
        description: 'Keeps records consistent across your CRM, project tools, databases, and communication platforms. Eliminates duplicate entries, outdated records, and the reconciliation work that eats ops team hours.',
      },
    ],
  },

  metrics: {
    title: 'Operations Results That Show Up on the P&L',
    subtitle: 'Measured outcomes from teams running the Operations Agent',
    metrics: [
      { value: '20+ hrs', label: 'Saved Per Week', description: 'Per operations team member, on average', trend: 'up' },
      { value: '65%', label: 'Faster Report Delivery', description: 'Automated vs manual reporting cycles', trend: 'up' },
      { value: '89%', label: 'Task Completion Rate', description: 'With automated tracking and escalation', trend: 'up' },
      { value: '3x', label: 'Faster Issue Detection', description: 'vs reactive manual monitoring', trend: 'up' },
    ],
    comparisonTitle: 'Before vs After Operations Agent',
    before: [
      'Reports assembled manually every week',
      'Workflow handoffs miss tasks constantly',
      'Issues discovered after the damage is done',
      'Data out of sync across multiple tools',
      'Ops team buried in coordination work',
    ],
    after: [
      'Reports generated and delivered automatically',
      'Every task tracked, routed, and escalated',
      'Alerts fire before problems become crises',
      'All systems synchronized in real time',
      'Ops team focused on strategy, not busywork',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Operations Command Center',
    title: 'Full Visibility Into Your Operations',
    subtitle: 'Monitor workflows, track KPIs, and stay ahead of issues from a single connected dashboard.',
    kpis: [
      { icon: 'check-circle', label: 'Tasks Completed', value: '347', trend: 'This week', trendUp: true },
      { icon: 'clock', label: 'Avg. Cycle Time', value: '1.4 days', trend: 'Down from 3.2 days', trendUp: true },
      { icon: 'bar-chart', label: 'Reports Generated', value: '28', trend: 'This month', trendUp: true },
      { icon: 'bell', label: 'Alerts Resolved', value: '12', trend: '100% within SLA', trendUp: true },
    ],
    mainChart: {
      title: 'Workflow Throughput & Cycle Time',
      subtitle: 'Tasks completed and average resolution time over the last 30 days',
    },
    scoreCard: {
      title: 'Operational Health Score',
      score: 91,
      description: 'Top quartile performance',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Weekly ops report generated and sent to 4 stakeholders automatically', time: '8 min ago', status: 'success' },
      { icon: 'alert-triangle', text: 'Invoice processing queue: 23 items pending—escalated to finance team', time: '32 min ago', status: 'pending' },
      { icon: 'refresh-cw', text: 'CRM-to-project sync completed: 94 records updated across 3 tools', time: '1 hr ago', status: 'success' },
      { icon: 'clipboard-list', text: 'Onboarding workflow triggered for 2 new clients—tasks assigned automatically', time: '2 hr ago', status: 'success' },
    ],
    floatingBadge1: { title: 'Workflow Automated', subtitle: '347 tasks this week' },
    floatingBadge2: { title: '+41% Efficiency', subtitle: 'Avg. cycle time reduced' },
    secondaryTable: {
      title: 'Active Workflows',
      subtitle: 'Running now',
      rows: [
        { id: '1', name: 'Invoice Processing', detail: 'Finance · 23 tasks', value: 'Running', status: 'success' },
        { id: '2', name: 'Client Onboarding', detail: 'Operations · 8 tasks', value: 'Review', status: 'warning' },
        { id: '3', name: 'HR Data Sync', detail: 'People · 5 tasks', value: 'Running', status: 'success' },
        { id: '4', name: 'Weekly Reporting', detail: 'Analytics · 12 tasks', value: 'Scheduled', status: 'info' },
      ],
    },
    secondaryChartTitle: 'Efficiency Trend',
  },

  useCases: {
    title: 'Operations Automation Built for Growing Teams',
    subtitle: 'See how different businesses eliminate manual work and run tighter operations with AI',
    useCases: [
      {
        id: 'professional-services',
        industry: 'Professional Services',
        title: 'Client Onboarding & Project Coordination',
        description: 'Automate every step of client onboarding across CRM, project management, and communication tools. New contracts trigger task creation, document requests, kickoff scheduling, and progress tracking without ops team involvement.',
        results: [
          '70% reduction in onboarding coordination time',
          'Zero missed onboarding steps for new clients',
          '2-day faster time-to-first-deliverable',
        ],
        icon: 'briefcase',
      },
      {
        id: 'ecommerce-operations',
        industry: 'E-commerce & Retail',
        title: 'Inventory Monitoring & Supplier Triggers',
        description: 'Monitor inventory levels across warehouses and channels in real time. When stock dips below thresholds, the agent triggers reorder workflows, notifies the right supplier contact, and updates the ops dashboard automatically.',
        results: [
          '98% reduction in stockout incidents',
          'Procurement cycle time cut by 40%',
          'Eliminated 15 hours/week of manual stock checking',
        ],
        icon: 'package',
      },
      {
        id: 'finance-operations',
        industry: 'Finance & Accounting',
        title: 'Automated Reporting & Compliance Monitoring',
        description: 'Aggregate financial data from multiple sources, auto-generate weekly and monthly reports for leadership, and monitor compliance checkpoints continuously. Audit trails are maintained automatically with every action logged.',
        results: [
          'Monthly close process reduced from 5 days to 2',
          '100% audit trail coverage with zero manual logging',
          'Zero late regulatory reports in 12 months',
        ],
        icon: 'shield',
      },
    ],
  },

  integrations: {
    title: 'Connects to Every Tool Your Team Uses',
    subtitle: 'Deep integrations with the tools that power your operations stack',
    integrationIds: ['slack', 'notion', 'google_sheets', 'hubspot', 'mondaycom', 'gmail', 'zapier'],
  },

  testimonial: {
    quote: "The Operations Agent completely changed how our team works. We used to spend every Monday morning pulling data from five different tools to build the weekly ops report—now it just arrives in everyone's inbox at 8 AM. Task escalations that used to fall through the cracks now happen automatically. We have recovered at least 20 hours per week across the team, and our operational visibility has never been better.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'ELSA Consulting',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Unlimited workflow automations',
      'Automated reporting from all connected tools',
      'Task tracking and escalation rules',
      'Real-time process monitoring and alerting',
      'Cross-platform data synchronization',
      'Dedicated operations success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Operations Agent',
    faqs: [
      {
        question: 'Which tools does the Operations Agent connect to?',
        answer: 'It integrates with over 200 tools including Slack, Notion, Google Sheets, HubSpot, Monday.com, Gmail, Zapier, ClickUp, Salesforce, Airtable, and most major project management, CRM, and data platforms. We can connect to custom internal systems via API as well.',
      },
      {
        question: 'How long does it take to set up?',
        answer: 'Initial setup typically takes 1 to 2 weeks. We map your existing workflows, configure integrations, set escalation rules, and test automations before going live. You do not need technical expertise—our team handles all configuration.',
      },
      {
        question: 'Can it handle complex multi-step workflows with conditional logic?',
        answer: 'Yes. The Operations Agent supports conditional branches, approval chains, role-based routing, time-based triggers, and multi-system handoffs. If a task in one tool is marked complete, it can trigger a specific action in a completely different tool based on conditions you define.',
      },
      {
        question: 'What happens when an automated action fails?',
        answer: 'Failed actions are logged immediately, the responsible team member is notified, and the item is placed in a manual review queue. Nothing is silently dropped. You always have full visibility into what ran, what failed, and why.',
      },
      {
        question: 'How does the compliance monitoring work?',
        answer: 'You define the compliance checkpoints and acceptable windows for your business. The agent continuously monitors those parameters and generates an immutable audit log of every action. If a checkpoint is missed or a deadline approaches, alerts go to the designated owner automatically.',
      },
      {
        question: 'Is it possible to keep humans in the loop for sensitive decisions?',
        answer: 'Absolutely. You decide which workflow steps require human approval before proceeding. The agent handles all preparation, routing, and follow-up—but the decision itself stays with your team. Most clients run high-value or sensitive actions in approval mode and routine tasks in fully automated mode.',
      },
    ],
  },

  cta: {
    title: 'Ready to Run a Leaner, Faster Operation?',
    subtitle: 'See how the Operations Agent eliminates manual coordination and keeps your entire business synchronized—automatically.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
