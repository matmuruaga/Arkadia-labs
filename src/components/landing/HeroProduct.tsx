import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, Check } from 'lucide-react';
import { trackCtaClick } from '@/utils/dataLayer';
import ChatMockup from '@/components/landing/ChatMockup';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const HeroProduct: React.FC = () => {
  const { t } = useTranslation('landingV3');

  const handlePrimaryCtaClick = () => {
    trackCtaClick('cta_primary', 'hero_v3', t('hero.ctaPrimary'));
  };

  const handleSecondaryCtaClick = () => {
    trackCtaClick('cta_secondary', 'hero_v3', t('hero.ctaSecondary'));
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Background layers                                                   */}
      {/* ------------------------------------------------------------------ */}

      {/* 1. Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/30" />

      {/* 2. Organic contour lines */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Cpath d='M0 60 C 30 40, 50 80, 80 60 S 110 40, 120 60' stroke='%2314b8a6' stroke-width='1' fill='none'/%3E%3Cpath d='M0 80 C 25 60, 45 100, 70 80 S 105 60, 120 80' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Ccircle cx='95' cy='25' r='8' stroke='%2314b8a6' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='95' cy='25' r='14' stroke='%230ea5e9' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '240px 240px',
        }}
      />

      {/* 3. Floating organic blobs */}
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

      {/* 4. Scattered organic shapes */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='150' rx='25' ry='15' stroke='%230ea5e9' stroke-width='0.8' fill='none' transform='rotate(-15 30 150)'/%3E%3Cellipse cx='170' cy='40' rx='20' ry='12' stroke='%2314b8a6' stroke-width='0.8' fill='none' transform='rotate(20 170 40)'/%3E%3Cpath d='M80 100 Q 100 70, 120 100 T 160 100' stroke='%230ea5e9' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10 w-full">
        {/* Glassmorphism frame */}
        <div className="bg-[rgba(241,243,245,0.55)] backdrop-blur-[20px] rounded-[2rem] border border-white/50 px-8 py-12 lg:px-14 lg:py-16">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* -------------------------------------------------------------- */}
            {/* Left column — copy                                              */}
            {/* -------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-100">
                  <Sparkles className="h-4 w-4 text-sky-500" aria-hidden />
                  <span className="text-sm font-semibold text-slate-700">
                    {t('hero.badge')}
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <div>
                <h1 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
                  <span className="text-sky-500">{t('hero.title1')}</span>{' '}
                  <span className="text-[#0D1B2A]">{t('hero.title2')}</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-slate-500 text-base lg:text-lg leading-relaxed max-w-md">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePrimaryCtaClick}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 shadow-[0_4px_15px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.4)] hover:scale-[1.02] transition-all duration-200"
                >
                  {t('hero.ctaPrimary')}
                </button>
                <button
                  type="button"
                  onClick={handleSecondaryCtaClick}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-[#0D1B2A] bg-white/70 border border-sky-500/30 hover:bg-white hover:border-sky-500/60 hover:scale-[1.02] transition-all duration-200"
                >
                  {t('hero.ctaSecondary')}
                </button>
              </div>

              {/* Checkmarks */}
              <ul className="flex flex-col gap-1.5">
                {(['check1', 'check2', 'check3'] as const).map((key) => (
                  <li key={key} className="flex items-center gap-2 text-sm text-slate-500">
                    <Check className="h-4 w-4 text-teal-500 shrink-0" aria-hidden />
                    <span>{t(`hero.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* -------------------------------------------------------------- */}
            {/* Right column — ChatMockup                                       */}
            {/* -------------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Desktop: show sidebar. Mobile: hide sidebar */}
              <ChatMockup
                variant="compact"
                showSidebar={true}
                className="hidden md:block"
              />
              <ChatMockup
                variant="compact"
                showSidebar={false}
                className="md:hidden"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProduct;
