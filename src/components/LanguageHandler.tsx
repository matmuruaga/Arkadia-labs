// src/components/LanguageHandler.tsx
import { useEffect, Suspense } from 'react'; // <-- 1. Importa Suspense
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './Layout'; 

const supportedLngs = ['en', 'es'];

const LanguageHandler = () => {
  const { lang } = useParams<{ lang: string }>(); 
  const { i18n } = useTranslation();
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