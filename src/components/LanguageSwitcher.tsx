// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { trackLanguageSwitch } from '@/utils/dataLayer';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const currentPath = location.pathname.substring(3) || '/';

  const handleLanguageSwitch = (newLang: string) => {
    const currentLang = i18n.language;
    if (currentLang !== newLang) {
      trackLanguageSwitch(currentLang, newLang);
    }
  };

  return (
    <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-full">
      <Link
        to={`/en${currentPath === '/' ? '' : currentPath}`}
        className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors ${i18n.language.startsWith('en') ? 'bg-white text-[#1C7ED6] shadow' : 'text-slate-600'}`}
        onClick={() => handleLanguageSwitch('en')}
      >
        EN
      </Link>
      <Link
        to={`/es${currentPath === '/' ? '' : currentPath}`}
        className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors ${i18n.language.startsWith('es') ? 'bg-white text-[#1C7ED6] shadow' : 'text-slate-600'}`}
        onClick={() => handleLanguageSwitch('es')}
      >
        ES
      </Link>
      <Link
        to={`/cs${currentPath === '/' ? '' : currentPath}`}
        className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors ${i18n.language.startsWith('cs') ? 'bg-white text-[#1C7ED6] shadow' : 'text-slate-600'}`}
        onClick={() => handleLanguageSwitch('cs')}
      >
        CS
      </Link>
    </div>
  );
};

export default LanguageSwitcher;