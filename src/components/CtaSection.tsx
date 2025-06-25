// src/components/CtaSection.tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const backgroundImageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1750854126/45_y1pvj6.jpg';

export const CtaSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGetStartedClick = () => {
    navigate(`/${i18n.language}/contact`);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        container.style.setProperty("--mouse-x", `${x}px`);
        container.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    const currentRef = containerRef.current;
    // Solo añadimos el listener si no es un dispositivo táctil (una forma de detectar móviles)
    if (!("ontouchstart" in window)) {
        currentRef?.addEventListener('mousemove', handleMouseMove);
    }
    return () => currentRef?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-28 md:py-40 text-white text-center overflow-hidden group"
    >
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="absolute inset-0 w-full h-full bg-black/30" />
      
      {/* CAMBIO AQUÍ: Se añade el prefijo 'md:' a la clase de hover */}
      <div 
        className="absolute inset-0 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
         style={{
          background: "radial-gradient(900px circle at var(--mouse-x) var(--mouse-y), rgba(28, 126, 214, 0.8), transparent 50%)"
         }}
    />
      <div className="relative z-20 max-w-4xl mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            {t('ctaSection.title')}
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 text-lg md:text-xl text-gray-200"
          >
            {t('ctaSection.subtitle')}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <button
              onClick={handleGetStartedClick}
              className="bg-[#1C7ED6] text-white font-bold text-lg rounded-lg px-8 py-4 transition-all duration-300 ease-in-out hover:bg-[#155CB0] hover:scale-105 shadow-[0_0_20px_rgba(28,126,214,0.5)] hover:shadow-[0_0_35px_rgba(28,126,214,0.8)]"
            >
              {t('ctaSection.button')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};