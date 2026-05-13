import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CONNECTION_IMAGE_URL =
  'https://res.cloudinary.com/dntco2fcz/image/upload/q_auto/f_auto/v1775569390/nueva_seccion-conexion_q8hcsh.webp';

const CABLES_IMAGE_URL =
  'https://res.cloudinary.com/dntco2fcz/image/upload/q_auto/f_auto/v1775570102/cableado_wpyn0b.webp';

const AgentConnectionHero: React.FC = () => {
  const { t } = useTranslation('home');
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.section
      className="relative w-full overflow-hidden bg-white"
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Full-width robot + cables composite with top/bottom fade */}
      <div className="relative w-full mt-12">
        {/* z-0: Base robot connection image */}
        <img
          src={CONNECTION_IMAGE_URL}
          alt={t('agentWorkforce.connectionAlt', 'Two AI agents collaborating and sharing knowledge')}
          className="relative z-0 w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* z-[1]: Edge fades — sit ABOVE robots but BELOW cables */}
        {/* Top fade: same strength as bottom */}
        <div
          className="absolute inset-x-0 top-0 h-[35%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, white 0%, rgb(241 243 245 / 0.85) 30%, rgb(241 243 245 / 0.3) 70%, transparent 100%)',
          }}
        />
        {/* Bottom fade: strong transition so text below is clean */}
        <div
          className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to top, white 0%, rgb(241 243 245 / 0.85) 30%, rgb(241 243 245 / 0.3) 70%, transparent 100%)',
          }}
        />
        {/* Left fade: soft edge blend */}
        <div
          className="absolute inset-y-0 left-0 w-[8%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to right, white, transparent)',
          }}
        />
        {/* Right fade: soft edge blend */}
        <div
          className="absolute inset-y-0 right-0 w-[8%] pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to left, white, transparent)',
          }}
        />

        {/* z-[2]: Cables on top of everything */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <img
            src={CABLES_IMAGE_URL}
            alt=""
            className="w-full h-full object-cover mix-blend-multiply"
            aria-hidden="true"
          />
        </div>

        {/* z-[3]: Animated lights — masked by cable shapes */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{
              maskImage: `url(${CABLES_IMAGE_URL})`,
              WebkitMaskImage: `url(${CABLES_IMAGE_URL})`,
              maskSize: 'cover',
              WebkitMaskSize: 'cover',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, transparent 20%, rgba(28, 126, 214, 0.25) 40%, rgba(56, 189, 248, 0.35) 50%, rgba(28, 126, 214, 0.25) 60%, transparent 80%)',
                backgroundSize: '300% 300%',
                animation: 'cable-glow-blue 6s ease-in-out infinite',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(225deg, transparent 20%, rgba(168, 85, 247, 0.25) 40%, rgba(208, 191, 255, 0.35) 50%, rgba(168, 85, 247, 0.25) 60%, transparent 80%)',
                backgroundSize: '300% 300%',
                animation: 'cable-glow-purple 6s ease-in-out infinite 0.5s',
              }}
            />
          </div>
        )}
      </div>

      {/* Text below robot image */}
      <div className="relative max-w-3xl mx-auto px-4 -mt-40 pb-20 text-center z-[4]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] leading-tight mb-4">
          {t('agentWorkforce.connectionTitle')}
        </h2>
        <p className="text-base md:text-lg text-[#0D1B2A]/70 leading-relaxed">
          {t('agentWorkforce.connectionSubtitle')}
        </p>
      </div>

    </motion.section>
  );
};

export default AgentConnectionHero;
