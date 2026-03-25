// src/components/LanguageHandler.tsx
import { useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const supportedLngs = ['en', 'es', 'cs'];

const LanguageHandler = () => {
  const { lang } = useParams<{ lang: string }>(); 
  const { i18n } = useTranslation('common');
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && supportedLngs.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    } 
    else if (!lang || !supportedLngs.includes(lang)) {
      navigate('/en', { replace: true });
    }
  }, [lang, i18n, navigate]);

  if (!lang || !supportedLngs.includes(lang)) {
    return null;
  }

 // El componente SOLO debe renderizar el Outlet.
  // El Layout ya es aplicado por el componente PublicLayout en App.tsx.
  // No añadas <Layout>, <Header> o <Footer> aquí.
  return <Outlet />;
};

export default LanguageHandler;