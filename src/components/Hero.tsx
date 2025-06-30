// src/components/Hero.tsx
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { useConversation } from '@elevenlabs/react';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AccumulatingTypingEffect, { PhraseWithEmoji } from './AccumulatingTypingEffect';

const Hero = () => {
  const { t, i18n } = useTranslation();
  
  const { startSession, endSession, status } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const aiAgentPhrases: PhraseWithEmoji[] = [
    { emoji: "📈", text: t('hero.phrases.p1') },
    { emoji: "⚙️", text: t('hero.phrases.p2') },
    { emoji: "💁‍♀️", text: t('hero.phrases.p3') },
    { emoji: "💼", text: t('hero.phrases.p4') },
    { emoji: "💬", text: t('hero.phrases.p5') },
    { emoji: "📊", text: t('hero.phrases.p6') }
  ];

  const handleToggleConversation = useCallback(async () => {
    setIsLoading(true);
    try {
      if (status === 'disconnected') {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await startSession({ agentId: 'agent_01jynm32kjf7rvq5857ggj51ew' });
      } else if (status === 'connected') {
        await endSession();
      }
    } catch (error) {
      console.error("Error al gestionar la conversación:", error);
    } finally {
      setIsLoading(false);
    }
  }, [status, startSession, endSession]);

  const isSessionActive = status === 'connected';

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-20 sm:pt-24 bg-[#F1F3F5]"
    >
      <div className="container mx-auto mt-10 md:mt-0 flex flex-col items-center">
        
        {/* --- SECCIÓN SUPERIOR: DOS COLUMNAS --- */}
        <div className="w-full flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left pt-0 md:pt-2 lg:pt-4">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4 text-[#0D1B2A] leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF]">
                {t('hero.title_part1')}
              </span>
              {' '}{t('hero.title_part2')}
            </motion.h1>

            <motion.h2
              className="text-lg sm:text-xl text-[#0D1B2A]/80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {t('hero.subtitle')}
            </motion.h2>
          </div>

          <motion.div 
            className="md:w-1/2 lg:w-2/5 w-full mt-6 md:mt-0 flex justify-center md:justify-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* 1. Aumentada la altura en desktop (md:h-64) */}
            <div className="w-full max-w-md xl:max-w-lg bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-200 h-48 sm:h-56 md:h-80 flex flex-col justify-end overflow-hidden">
              <AccumulatingTypingEffect
                phrases={aiAgentPhrases}
                lineClassName="text-lg sm:text-xl md:text-2xl text-[#0D1B2A] mb-1.5 font-mono"
                typingSpeed={80}
                pauseBetweenLines={1500}
                maxVisibleLines={3}
                cursorClassName="inline-block w-[2px] h-[1.2em] ml-1 bg-[#0D1B2A] animate-blink align-middle"
              />
            </div>
          </motion.div>
        </div>

        {/* --- SECCIÓN INFERIOR: BOTÓN CENTRADO --- */}
        {/* 2. Margen superior responsivo: pequeño en móvil (mt-8), grande en desktop (md:mt-24) */}
        <div className="flex flex-col items-center gap-4 mt-8 md:mt-48">
          <button
              onClick={handleToggleConversation}
              disabled={isLoading}
              className={`relative group w-24 h-24 rounded-full p-1 transition-all duration-300
                          ${isSessionActive ? 'bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF]' : 'bg-gray-700'}`}
              aria-label={t('hero.voice.ariaLabel')}
          >
            {isSessionActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF] opacity-60 blur-lg animate-pulse-slow -z-10"></div>
            )}
            <div className="w-full h-full bg-[#0D1B2A] rounded-full flex items-center justify-center">
                <img 
                    src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1750970201/u5837542839_Create_an_icon_of_a_robots_head_and_upper_torso_w_523f113d-4c43-4b45-ab0b-b1c5c47b834e_3_ysyfcr.png"
                    alt={t('hero.voice.altMascot')}
                    className={`w-16 h-16 object-cover rounded-full transition-transform duration-300 ${isSessionActive ? 'scale-110' : 'scale-100 group-hover:scale-105'}`}
                />
            </div>
          </button>

          <div className="flex items-center gap-2 bg-gray-800 text-white py-1.5 px-3 rounded-full text-sm">
              {t('hero.voice.caption')}
              <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSessionActive ? 'bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF]' : 'bg-gray-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isSessionActive ? 'bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF]' : 'bg-gray-500'}`}></span>
              </span>
          </div>
          
          {/* 3. Ancho responsivo y texto justificado */}
          <div className="text-justify text-xs text-gray-500 max-w-sm md:max-w-2xl mt-2">
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
  );
};

export default Hero;
