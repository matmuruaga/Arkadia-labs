// src/pages/ThankYouPage.tsx
import { useState, useRef } from 'react'; // 1. Importamos useRef
import { Link, useParams } from 'react-router-dom';
import { PopupModal } from 'react-calendly';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Calendar, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThankYouPage = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const homeUrl = `/${lang || 'es'}`;
  const [isOpen, setIsOpen] = useState(false);
  const calendlyUrl = "https://calendly.com/karel-elevaitelabs";

  // 2. Creamos una referencia para la sección de agendamiento
  const scheduleSectionRef = useRef<HTMLElement>(null);

  // 3. Creamos una función para manejar el scroll suave
  const handleScrollToSchedule = () => {
    scheduleSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="bg-slate-50">
      <header className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white text-center p-4">
        {/* ... (código del fondo y del título se mantiene igual) ... */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('https://res.cloudinary.com/dwhidn4z1/image/upload/v1750796289/Gradient__42_klhn8c.jpg')` }}
        />
        <div className="absolute inset-0 w-full h-full bg-black/50" />
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
          >
            <CheckCircle className="h-20 w-20 text-green-400 mb-6" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            {t('thankYouPage.header.title')}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
          >
            {t('thankYouPage.header.subtitle')}
          </motion.p>
        </div>

        {/* 4. Modificamos la flecha: es un botón, está más arriba y tiene el onClick */}
        <motion.button
          onClick={handleScrollToSchedule}
          aria-label="Scroll to schedule section"
          className="absolute bottom-60 z-20 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
        >
          <ArrowDown className="h-8 w-8 text-gray-200" />
        </motion.button>
      </header>

      {/* 5. Asignamos la referencia a la sección de destino */}
      <section ref={scheduleSectionRef} className="w-full bg-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img 
                src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1750796873/u5837542839_A_modern_3D_digital_illustration_of_a_friendly_bu_79ca793c-fdbb-4e32-a733-24151c99cf1c_3_uyatpj.png"
                alt={t('thankYouPage.cta.altImage')}
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('thankYouPage.cta.title')}</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('thankYouPage.cta.description')}
              </p>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white font-bold text-lg rounded-lg px-8 py-4 flex items-center gap-3 transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                <Calendar className="h-6 w-6" />
                {t('thankYouPage.cta.button')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <PopupModal
        url={calendlyUrl}
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.getElementById("root") || document.body}
        pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '00a2ff',
            textColor: '4d5055'
        }}
        onEventScheduled={(e) => {
            console.log('Reunión Agendada:', e.data.payload);
            setIsOpen(false);
        }}
      />

      <footer className="text-center py-12 bg-white">
        <Link to={homeUrl} className="text-base text-gray-500 hover:text-blue-600 hover:underline transition-colors">
          {t('thankYouPage.footer.backToHome')}
        </Link>
      </footer>
    </div>
  );
};