// src/components/HeroFramed.tsx
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { useConversation } from '@elevenlabs/react';
import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import AccumulatingTypingEffect, { PhraseWithEmoji } from './AccumulatingTypingEffect';
import { trackAiWidgetOpen, trackAiWidgetClose } from '@/utils/dataLayer';
import OptimizedImage from './OptimizedImage';

const BACKGROUND_IMAGE_URL = 'https://res.cloudinary.com/dntco2fcz/image/upload/v1766404546/fondo_principal-arkadia_q1soo6.webp';

const HeroFramed = () => {
  const { t, i18n } = useTranslation();
  const { startSession, endSession, status } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const aiAgentPhrases: PhraseWithEmoji[] = useMemo(() => [
    { emoji: "📈", text: t('hero.phrases.p1') },
    { emoji: "⚙️", text: t('hero.phrases.p2') },
    { emoji: "💁‍♀️", text: t('hero.phrases.p3') },
    { emoji: "💼", text: t('hero.phrases.p4') },
    { emoji: "💬", text: t('hero.phrases.p5') },
    { emoji: "📊", text: t('hero.phrases.p6') }
  ], [t]);

  const handleToggleConversation = useCallback(async () => {
    setIsLoading(true);
    try {
      if (status === 'disconnected') {
        trackAiWidgetOpen('hero', 'elevenlabs_voice_agent');
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await startSession({ agentId: 'agent_01jynm32kjf7rvq5857ggj51ew' });
      } else if (status === 'connected') {
        trackAiWidgetClose('hero', 'elevenlabs_voice_agent');
        await endSession();
      }
    } catch (error) {
      console.error("Error managing conversation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [status, startSession, endSession]);

  const isSessionActive = status === 'connected';

  return (
    <>
      {/* ========== MOBILE VERSION (Original Hero style) ========== */}
      <section
        id="hero-mobile"
        className="md:hidden min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-20 sm:pt-36 bg-[#F1F3F5]"
      >
        <div className="container mx-auto mt-10 flex flex-col items-center">
          {/* Title and Terminal Row */}
          <div className="w-full flex flex-col gap-8">
            <div className="text-center">
              <motion.h1
                className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-500">
                  {t('hero.title_part1')}
                </span>
                {' '}{t('hero.title_part2')}
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-[#0D1B2A]/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {t('hero.subtitle')}
              </motion.p>
            </div>

            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="w-full max-w-md bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-200 h-48 sm:h-56 flex flex-col justify-end overflow-hidden">
                <AccumulatingTypingEffect
                  phrases={aiAgentPhrases}
                  lineClassName="text-lg sm:text-xl text-[#0D1B2A] mb-1.5 font-mono"
                  typingSpeed={80}
                  pauseBetweenLines={1500}
                  maxVisibleLines={3}
                  cursorClassName="inline-block w-[2px] h-[1.2em] ml-1 bg-[#0D1B2A] animate-blink align-middle"
                />
              </div>
            </motion.div>
          </div>

          {/* Voice Button Section */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button
              onClick={handleToggleConversation}
              disabled={isLoading}
              className={`relative group w-24 h-24 rounded-full p-1 transition-all duration-300
                ${isSessionActive ? 'bg-gradient-to-r from-sky-500 to-teal-500' : 'bg-gray-700'}`}
              aria-label={t('hero.voice.ariaLabel')}
            >
              {isSessionActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 opacity-60 blur-lg animate-pulse-slow -z-10"></div>
              )}
              <div className="w-full h-full bg-[#0D1B2A] rounded-full flex items-center justify-center">
                <OptimizedImage
                  src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1752395276/IMG_5938_bo87kh.png"
                  alt={t('hero.voice.altMascot')}
                  width={64}
                  height={64}
                  priority={true}
                  className={`w-16 h-16 object-cover rounded-full transition-transform duration-300 ${isSessionActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
                />
              </div>
            </button>

            <div className="flex items-center gap-2 bg-gray-800 text-white py-1.5 px-3 rounded-full text-sm">
              {t('hero.voice.caption')}
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSessionActive ? 'bg-teal-400' : 'bg-gray-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isSessionActive ? 'bg-teal-500' : 'bg-gray-500'}`}></span>
              </span>
            </div>

            <div className="text-justify text-xs text-gray-500 max-w-sm mt-2">
              <Trans
                i18nKey="hero.disclaimer"
                components={{
                  terms: <Link to={`/${i18n.language}/terms-and-conditions`} className="underline hover:text-gray-700" />,
                  privacy: <Link to={`/${i18n.language}/privacy-policy`} className="underline hover:text-gray-700" />
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== DESKTOP VERSION (New framed design) ========== */}
      <section
        id="hero-desktop"
        className="hidden md:flex min-h-screen relative items-center pt-32 pb-20 overflow-hidden"
      >
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/30" />

        {/* Organic flowing contour lines */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Cpath d='M0 60 C 30 40, 50 80, 80 60 S 110 40, 120 60' stroke='%2314b8a6' stroke-width='1' fill='none'/%3E%3Cpath d='M0 80 C 25 60, 45 100, 70 80 S 105 60, 120 80' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Ccircle cx='95' cy='25' r='8' stroke='%2314b8a6' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='95' cy='25' r='14' stroke='%230ea5e9' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")
            `,
            backgroundSize: '240px 240px',
          }}
        />

        {/* Floating organic blobs */}
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] opacity-40 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[700px] opacity-35 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 80%, rgba(20, 184, 166, 0.18) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)',
          }}
        />

        {/* Scattered organic shapes */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='150' rx='25' ry='15' stroke='%230ea5e9' stroke-width='0.8' fill='none' transform='rotate(-15 30 150)'/%3E%3Cellipse cx='170' cy='40' rx='20' ry='12' stroke='%2314b8a6' stroke-width='0.8' fill='none' transform='rotate(20 170 40)'/%3E%3Cpath d='M80 100 Q 100 70, 120 100 T 160 100' stroke='%230ea5e9' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")
            `,
            backgroundSize: '400px 400px',
          }}
        />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto relative">
            {/* Framed content area */}
            {/* Floating badge - positioned above the frame */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-20 lg:mb-24"
            >
              <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-100">
                <Sparkles className="h-4 w-4 text-sky-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {t('hero.badge', 'AI-Powered Automation')}
                </span>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Background image frame */}
              <div
                className="absolute -inset-12 lg:-inset-16 rounded-[3rem] bg-cover bg-center bg-no-repeat opacity-90"
                style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')` }}
              />

              {/* Outer decorative frame */}
              <div className="absolute -inset-6 lg:-inset-10 border border-slate-200/40 rounded-[2.5rem] pointer-events-none" />

              {/* Main content */}
              <div className="relative rounded-[2rem] p-12 py-14 lg:p-16 lg:py-16 bg-white/75 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-900/15 ring-1 ring-white/20">

                {/* Top row: Title + Terminal side by side */}
                <div className="grid grid-cols-2 gap-12 mt-4 items-center">
                  {/* Left column: Title and subtitle */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-500">
                        {t('hero.title_part1')}
                      </span>
                      {' '}{t('hero.title_part2')}
                    </h1>

                    <p className="text-lg text-slate-600 mb-3">
                      {t('hero.subtitle')}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {t('hero.definition')}
                    </p>
                  </motion.div>

                  {/* Right column: AI Terminal Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start justify-center"
                  >
                    <div className="w-full bg-white rounded-2xl p-6 shadow-lg border border-slate-100 h-56 flex flex-col justify-end overflow-hidden">
                      <AccumulatingTypingEffect
                        phrases={aiAgentPhrases}
                        lineClassName="text-lg lg:text-xl text-slate-800 mb-1 font-mono"
                        typingSpeed={80}
                        pauseBetweenLines={1500}
                        maxVisibleLines={3}
                        cursorClassName="inline-block w-[2px] h-[1.1em] ml-1 bg-slate-800 animate-blink align-middle"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Bottom row: Voice Agent CTA centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col items-center gap-3 mt-10 pt-8 border-t border-slate-200/50"
                >
                  <button
                    onClick={handleToggleConversation}
                    disabled={isLoading}
                    className="relative group flex items-center gap-4 transition-all duration-300"
                    aria-label={t('hero.voice.ariaLabel')}
                  >
                    <div className={`relative w-14 h-14 rounded-full p-0.5 transition-all duration-300
                      ${isSessionActive ? 'bg-gradient-to-r from-sky-500 to-teal-500' : 'bg-gray-700 group-hover:bg-gray-600'}`}
                    >
                      {isSessionActive && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 opacity-60 blur-lg animate-pulse -z-10" />
                      )}
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                        <OptimizedImage
                          src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1752395276/IMG_5938_bo87kh.png"
                          alt={t('hero.voice.altMascot')}
                          width={40}
                          height={40}
                          priority={true}
                          className={`w-10 h-10 object-cover rounded-full transition-transform duration-300 ${isSessionActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        {t('hero.voice.caption')}
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSessionActive ? 'bg-teal-400' : 'bg-gray-400'}`} />
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${isSessionActive ? 'bg-teal-500' : 'bg-gray-500'}`} />
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">{t('hero.voice.clickToStart', 'Click to start')}</span>
                    </div>
                  </button>

                  <div className="text-xs text-slate-500 text-center max-w-2xl leading-relaxed">
                    <Trans
                      i18nKey="hero.disclaimer"
                      components={{
                        terms: <Link to={`/${i18n.language}/terms-and-conditions`} className="underline hover:text-slate-700" />,
                        privacy: <Link to={`/${i18n.language}/privacy-policy`} className="underline hover:text-slate-700" />
                      }}
                    />
                  </div>
                </motion.div>

              </div>

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-sky-300/50 rounded-tl-xl" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-teal-300/50 rounded-tr-xl" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-sky-300/50 rounded-bl-xl" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-teal-300/50 rounded-br-xl" />

            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroFramed;
