import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PillProps {
  text: string;
  dotColor: string;
  textColor: string;
  position: string;
}

interface BulletProps {
  text: string;
  dotColor: string;
  textColor: string;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const FloatingPill: React.FC<PillProps> = ({ text, dotColor, textColor, position }) => (
  <div
    className={`absolute ${position} inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] text-[11px] font-semibold animate-float`}
  >
    <span className={`w-[7px] h-[7px] rounded-full shrink-0 ${dotColor}`} />
    <span className={textColor}>{text}</span>
  </div>
);

const BulletPoint: React.FC<BulletProps> = ({ text, dotColor, textColor }) => (
  <li className="flex items-start gap-2.5">
    <span className={`w-1.5 h-1.5 rounded-full mt-[7px] shrink-0 ${dotColor}`} />
    <span className={`text-sm leading-relaxed ${textColor}`}>{text}</span>
  </li>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const TheShiftSection: React.FC = () => {
  const { t } = useTranslation('landingV3');

  // Split title on \n for two-line rendering
  const titleLines = t('theShift.title').split('\n');

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ---------------------------------------------------------------- */}
        {/* Centered headline                                                 */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sky-500 text-xs font-bold tracking-[2px] uppercase mb-3">
            {t('theShift.label')}
          </p>
          <h2 className="text-[#0D1B2A] text-3xl md:text-4xl font-black leading-tight">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Three-column split                                                */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_50px_1fr] gap-0">

          {/* -------------------------------------------------------------- */}
          {/* LEFT — Before                                                   */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            className="bg-gradient-to-b from-red-50 to-rose-50 rounded-2xl md:rounded-l-2xl md:rounded-r-none p-6 md:p-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Before</span>
            </div>

            {/* Illustration with floating pills */}
            <div className="relative border-2 border-dashed border-red-200/40 bg-red-500/[0.04] rounded-xl min-h-[200px] flex items-center justify-center">
              <span className="text-[10px] font-semibold text-red-300/60 tracking-widest uppercase select-none">
                ILUSTRACION 3D — Escritorio caotico
              </span>

              {/* Pill: top-left */}
              <FloatingPill
                text={t('theShift.before.pill1')}
                dotColor="bg-red-500"
                textColor="text-red-500"
                position="top-3 left-3"
              />
              {/* Pill: top-right */}
              <FloatingPill
                text={t('theShift.before.pill2')}
                dotColor="bg-amber-500"
                textColor="text-amber-600"
                position="top-3 right-3"
              />
              {/* Pill: bottom-left */}
              <FloatingPill
                text={t('theShift.before.pill3')}
                dotColor="bg-amber-500"
                textColor="text-amber-600"
                position="bottom-3 left-3"
              />
              {/* Pill: bottom-right */}
              <FloatingPill
                text={t('theShift.before.pill4')}
                dotColor="bg-red-500"
                textColor="text-red-500"
                position="bottom-3 right-3"
              />
            </div>

            {/* Bullet points */}
            <ul className="flex flex-col gap-3">
              {(['point1', 'point2', 'point3', 'point4'] as const).map((key) => (
                <BulletPoint
                  key={key}
                  text={t(`theShift.before.${key}`)}
                  dotColor="bg-red-500"
                  textColor="text-red-950"
                />
              ))}
            </ul>
          </motion.div>

          {/* -------------------------------------------------------------- */}
          {/* CENTER — Divider                                                */}
          {/* -------------------------------------------------------------- */}
          <div className="bg-gradient-to-b from-red-50 to-green-50 flex items-center justify-center py-4 md:py-0">
            <div className="w-11 h-11 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-teal-500" aria-hidden />
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* RIGHT — After                                                   */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-2xl md:rounded-r-2xl md:rounded-l-none p-6 md:p-8 flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Section label */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">After</span>
            </div>

            {/* Illustration with floating pills */}
            <div className="relative border-2 border-dashed border-teal-200/40 bg-teal-500/[0.04] rounded-xl min-h-[200px] flex items-center justify-center">
              <span className="text-[10px] font-semibold text-teal-300/60 tracking-widest uppercase select-none">
                ILUSTRACION 3D — Oficina AI organizada
              </span>

              {/* Pill: top-left */}
              <FloatingPill
                text={t('theShift.after.pill1')}
                dotColor="bg-teal-500"
                textColor="text-teal-700"
                position="top-3 left-3"
              />
              {/* Pill: top-right */}
              <FloatingPill
                text={t('theShift.after.pill2')}
                dotColor="bg-teal-500"
                textColor="text-teal-700"
                position="top-3 right-3"
              />
              {/* Pill: bottom-left */}
              <FloatingPill
                text={t('theShift.after.pill3')}
                dotColor="bg-sky-500"
                textColor="text-sky-500"
                position="bottom-3 left-3"
              />
              {/* Pill: bottom-right */}
              <FloatingPill
                text={t('theShift.after.pill4')}
                dotColor="bg-teal-500"
                textColor="text-teal-700"
                position="bottom-3 right-3"
              />
            </div>

            {/* Bullet points */}
            <ul className="flex flex-col gap-3">
              {(['point1', 'point2', 'point3', 'point4'] as const).map((key) => (
                <BulletPoint
                  key={key}
                  text={t(`theShift.after.${key}`)}
                  dotColor="bg-teal-500"
                  textColor="text-green-950"
                />
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TheShiftSection;
