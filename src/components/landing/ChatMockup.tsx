import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMockupProps {
  variant: 'compact' | 'full';
  showSidebar?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const bubbleVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ChatMockup: React.FC<ChatMockupProps> = ({
  variant,
  showSidebar = true,
  className,
}) => {
  const { t } = useTranslation('landingV3');

  const isCompact = variant === 'compact';

  // Sidebar dimensions
  const sidebarWidth = isCompact ? 'w-[150px]' : 'w-[180px]';

  // Chat area min-height
  const chatMinHeight = isCompact ? 'min-h-[260px]' : 'min-h-[340px]';

  // Padding
  const chatPadding = isCompact ? 'p-5' : 'p-6';

  // Number of conversations shown in sidebar
  const conversations = isCompact
    ? [
        t('productDemo.chat.sidebarConv1'),
        t('productDemo.chat.sidebarConv2'),
      ]
    : [
        t('productDemo.chat.sidebarConv1'),
        t('productDemo.chat.sidebarConv2'),
        t('productDemo.chat.sidebarConv3'),
      ];

  // Workspace items
  const workspaceItems = isCompact
    ? [
        t('productDemo.chat.sidebarWorkspaceItem1'),
        t('productDemo.chat.sidebarWorkspaceItem3'),
      ]
    : [
        t('productDemo.chat.sidebarWorkspaceItem1'),
        t('productDemo.chat.sidebarWorkspaceItem2'),
        t('productDemo.chat.sidebarWorkspaceItem3'),
      ];

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-sky-500/10 shadow-[0_8px_40px_rgba(12,15,63,0.08)] overflow-hidden',
        className,
      )}
    >
      <div className="flex h-full">
        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                          */}
        {/* ---------------------------------------------------------------- */}
        {showSidebar && (
          <aside
            className={cn(
              'flex flex-col shrink-0 border-r',
              sidebarWidth,
            )}
            style={{ backgroundColor: '#f8fafb', borderColor: '#eef2f5' }}
          >
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
                        ? 'bg-sky-50 text-sky-700 font-medium'
                        : 'text-[#0D1B2A]/60 hover:bg-[#eef2f5]',
                    )}
                  >
                    {conv}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Workspace section */}
            <div className="px-3 py-3 border-t" style={{ borderColor: '#eef2f5' }}>
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
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Main chat area                                                   */}
        {/* ---------------------------------------------------------------- */}
        <div className={cn('flex flex-col flex-1 min-w-0', chatPadding, chatMinHeight)}>
          {/* Messages */}
          <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            {/* User bubble */}
            <motion.div
              className="flex justify-end"
              variants={bubbleVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%] leading-relaxed shadow-sm">
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
              <div
                className="text-[#0D1B2A] text-xs rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%] leading-relaxed border"
                style={{ backgroundColor: '#f8fafb', borderColor: '#eef2f5' }}
              >
                {/* Intro line */}
                <p className="font-medium mb-2">{t('productDemo.chat.agentIntro')}</p>

                {/* Task decomposition */}
                <ul className="flex flex-col gap-1.5">
                  {(
                    [
                      { key: 'task1', done: true },
                      { key: 'task2', done: true },
                      { key: 'task3', done: false },
                      { key: 'task4', done: false },
                    ] as const
                  ).map(({ key, done }) => (
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
          <div
            className="flex items-center gap-2 mt-4 rounded-xl px-3 py-2.5 border"
            style={{ backgroundColor: '#f8fafb', borderColor: '#eef2f5' }}
          >
            <span className="flex-1 text-xs text-[#0D1B2A]/30 truncate">
              {t('productDemo.chat.inputPlaceholder')}
            </span>
            <Send className="w-4 h-4 text-sky-500 shrink-0" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMockup;
