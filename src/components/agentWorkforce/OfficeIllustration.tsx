import { useTranslation } from 'react-i18next';
import ActivityPill from './ActivityPill';
import type { PillConfig } from './agentWorkforce.data';

interface OfficeIllustrationProps {
  pills: PillConfig[];
}

const OFFICE_IMAGE_URL =
  'https://res.cloudinary.com/dntco2fcz/image/upload/q_auto/f_auto/v1775559703/oficina-completa_hrsmvu.webp';

const OfficeIllustration: React.FC<OfficeIllustrationProps> = ({ pills }) => {
  const { t } = useTranslation('home');

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-lg"
      style={{ aspectRatio: '2752 / 1536' }}
    >
      <img
        src={OFFICE_IMAGE_URL}
        alt={t('agentWorkforce.officeAlt')}
        className="w-full h-full"
        loading="lazy"
        decoding="async"
        width={2752}
        height={1536}
      />

      {pills.map((pill) => (
        <ActivityPill key={pill.id} pill={pill} />
      ))}
    </div>
  );
};

export default OfficeIllustration;
