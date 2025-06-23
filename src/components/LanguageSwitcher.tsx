// src/components/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const currentPath = location.pathname.substring(3) || '/';

  return (
    <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-full">
      <Link 
        to={`/en${currentPath === '/' ? '' : currentPath}`}
        className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors ${i18n.language.startsWith('en') ? 'bg-white text-[#1C7ED6] shadow' : 'text-slate-600'}`}
      >
        EN
      </Link>
      <Link 
        to={`/es${currentPath === '/' ? '' : currentPath}`}
        className={`px-3 py-1 text-sm rounded-full font-semibold transition-colors ${i18n.language.startsWith('es') ? 'bg-white text-[#1C7ED6] shadow' : 'text-slate-600'}`}
      >
        ES
      </Link>
    </div>
  );
};

export default LanguageSwitcher;