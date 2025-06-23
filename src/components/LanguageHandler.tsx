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

  // 2. Envuelve el Outlet con Suspense y un fallback
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export default LanguageHandler;