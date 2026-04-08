import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import AgentActivityPanel from '@/components/landing/AgentActivityPanel';
import { trackCtaClick } from '@/utils/dataLayer';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const bubbleVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// ---------------------------------------------------------------------------
// Step card sub-component
// ---------------------------------------------------------------------------

interface StepProps {
  number: string;
  title: string;
  description: string;
  delay: number;
}

const StepCard: React.FC<StepProps> = ({ number, title, description, delay }) => (
  <motion.div
    className="text-center"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
  >
    <p className="text-3xl font-black text-sky-500">{number}</p>
    <p className="text-base font-bold text-[#0D1B2A] mt-1">{title}</p>
    <p className="text-sm text-[#0D1B2A]/55 mt-1 leading-relaxed">{description}</p>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Sidebar sub-component (standalone, mirrors ChatMockup sidebar)
// ---------------------------------------------------------------------------

const DemoSidebar: React.FC = () => {
  const { t } = useTranslation('landingV3');

  const conversations = [
    t('productDemo.chat.sidebarConv1'),
    t('productDemo.chat.sidebarConv2'),
    t('productDemo.chat.sidebarConv3'),
  ];

  const workspaceItems = [
    t('productDemo.chat.sidebarWorkspaceItem1'),
    t('productDemo.chat.sidebarWorkspaceItem2'),
    t('productDemo.chat.sidebarWorkspaceItem3'),
  ];

  return (
    <aside className="flex flex-col shrink-0 bg-[#f8fafb] border-r border-[#eef2f5] w-[180px]">
      {/* Logo block */}
      <div className="px-3 pt-4 pb-2">
        <p className="text-[11px] font-bold text-[#0D1B2A] leading-tight">
          {t('productDemo.chat.sidebarLogoText')}
        </p>
        <p className="text-[10px] text-[#0D1B2A]/50 mt-0.5">
          {t('productDemo.chat.sidebarClientSubtitle')}
        </p>
      </div>

      {/* New conversation button */}
      <div className="px-3 pb-3">
        <button
          type="button"
          className="w-full bg-gradient-to-r from-sky-500 to-teal-500 text-white text-[10px] font-semibold rounded-md py-1.5 px-2 text-left leading-tight"
          onClick={() => trackCtaClick('new_conversation', 'product_demo_sidebar', 'New conversation')}
        >
          + {t('productDemo.chat.sidebarNewConversation')}
        </button>
      </div>

      {/* Conversation list */}
      <nav className="flex-1 px-2 overflow-hidden">
        <ul className="flex flex-col gap-0.5">
          {conversations.map((conv, idx) => (
            <li
              key={idx}
              className={cn(
                'text-[10px] px-2 py-1.5 rounded-md leading-tight truncate',
                idx === 0
                  ? 'bg-white shadow-sm text-sky-700 font-medium'
                  : 'text-[#0D1B2A]/60 hover:bg-[#eef2f5]',
              )}
            >
              {conv}
            </li>
          ))}
        </ul>
      </nav>

      {/* Workspace section */}
      <div className="px-3 py-3 border-t border-[#eef2f5]">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#0D1B2A]/40 mb-1.5">
          {t('productDemo.chat.sidebarWorkspaceLabel')}
        </p>
        <ul className="flex flex-col gap-0.5">
          {workspaceItems.map((item, idx) => (
            <li
              key={idx}
              className="text-[10px] text-[#0D1B2A]/60 px-2 py-1 rounded-md hover:bg-[#eef2f5] truncate"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

// ---------------------------------------------------------------------------
// Chat area sub-component
// ---------------------------------------------------------------------------

const DemoChatArea: React.FC = () => {
  const { t } = useTranslation('landingV3');

  const tasks = [
    { key: 'task1', done: true },
    { key: 'task2', done: true },
    { key: 'task3', done: false },
    { key: 'task4', done: false },
  ] as const;

  return (
    <div className="flex flex-col flex-1 min-w-0 border-r border-[#eef2f5] p-6 min-h-[340px]">
      {/* Messages */}
      <div className="flex-1 flex flex-col gap-3 overflow-hidden justify-between">
        <div className="flex flex-col gap-3">
          {/* User bubble */}
          <motion.div
            className="flex justify-end"
            variants={bubbleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs rounded-[14px] rounded-br-[4px] px-4 py-2.5 ml-auto max-w-[78%] leading-relaxed shadow-sm">
              {t('productDemo.chat.userMessage')}
            </div>
          </motion.div>

          {/* Agent bubble */}
          <motion.div
            className="flex justify-start"
            variants={bubbleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
          >
            <div className="bg-[#f8fafb] border border-[#eef2f5] text-[#0D1B2A] text-xs rounded-[14px] rounded-bl-[4px] px-4 py-3 max-w-[85%] leading-relaxed">
              {/* Intro line */}
              <p className="font-medium mb-2">{t('productDemo.chat.agentIntro')}</p>

              {/* Task decomposition */}
              <ul className="flex flex-col gap-1.5">
                {tasks.map(({ key, done }) => (
                  <li key={key} className="flex items-start gap-1.5">
                    <span
                      className={cn(
                        'text-sm leading-none mt-[1px]',
                        done ? 'text-teal-500' : 'text-gray-300',
                      )}
                    >
                      {done ? '☑' : '☐'}
                    </span>
                    <span className={done ? 'line-through text-[#0D1B2A]/40' : ''}>
                      {t(`productDemo.chat.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Status line */}
              <p className="mt-2.5 text-[#0D1B2A]/50 text-[11px] italic">
                {t('productDemo.chat.agentStatus')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 mt-4 rounded-xl px-3 py-2.5 border bg-[#f8fafb] border-[#eef2f5]">
          <span className="flex-1 text-xs text-[#0D1B2A]/30 truncate">
            {t('productDemo.chat.inputPlaceholder')}
          </span>
          <Send className="w-4 h-4 text-sky-500 shrink-0" aria-hidden />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const ProductDemo: React.FC = () => {
  const { t } = useTranslation('landingV3');

  const steps = [
    {
      key: 'step1',
      number: t('productDemo.steps.step1.number'),
      title: t('productDemo.steps.step1.title'),
      description: t('productDemo.steps.step1.description'),
    },
    {
      key: 'step2',
      number: t('productDemo.steps.step2.number'),
      title: t('productDemo.steps.step2.title'),
      description: t('productDemo.steps.step2.description'),
    },
    {
      key: 'step3',
      number: t('productDemo.steps.step3.number'),
      title: t('productDemo.steps.step3.title'),
      description: t('productDemo.steps.step3.description'),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8fafb] to-[#F1F3F5]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered headline */}
        <motion.div
          className="text-center mb-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="text-sky-500 text-xs font-bold tracking-[2px] uppercase mb-3">
            {t('productDemo.label')}
          </p>
          <h2 className="text-[#0D1B2A] text-2xl md:text-[32px] font-black leading-tight">
            {t('productDemo.title')}
          </h2>
          <p className="text-[#0D1B2A]/55 text-base mt-2">
            {t('productDemo.subtitle')}
          </p>
        </motion.div>

        {/* Product mockup card */}
        <motion.div
          className="max-w-[1050px] mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="bg-white rounded-2xl border border-sky-500/10 shadow-[0_12px_50px_rgba(12,15,63,0.08)] overflow-hidden">
            {/* 3-column grid on lg, 2-col on md, 1-col on mobile */}
            <div className="flex">
              {/* Col 1: Sidebar — hidden below lg */}
              <div className="hidden lg:flex">
                <DemoSidebar />
              </div>

              {/* Col 2: Chat area — always visible */}
              <DemoChatArea />

              {/* Col 3: Agent activity panel — hidden below md */}
              <div className="hidden md:flex md:w-[280px] shrink-0">
                <AgentActivityPanel className="w-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 steps below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 max-w-[750px] mx-auto mt-10 text-center">
          {steps.map(({ key, number, title, description }, idx) => (
            <StepCard
              key={key}
              number={number}
              title={title}
              description={description}
              delay={0.4 + idx * 0.15}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductDemo;
