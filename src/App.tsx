// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Componentes y Páginas
import ScrollToTop from "./components/ScrollToTop";
import LanguageHandler from "./components/LanguageHandler";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import PricingPage from "./pages/PricingPage";
import GetStarted from "./pages/GetStarted";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import { ContactPage } from './pages/ContactPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { IntegrationsPage } from './pages/IntegrationsPage';


/**
 * Componente que agrupa todas las rutas que usan el Layout principal (Header/Footer).
 * El componente <Outlet /> renderizará la ruta hija que corresponda.
 */
const PublicLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
); 

function App() {
  // Ya no se necesita el ElevenLabsContextProvider. 
  // El hook useConversation funciona de forma independiente.
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Ruta Padre: Captura el idioma y renderiza el LanguageHandler */}
        <Route path="/:lang" element={<LanguageHandler />}>
          
          {/* Rutas Hijas: Se renderizarán dentro del <Outlet/> del LanguageHandler */}
          <Route element={<PublicLayout />}>
              <Route index element={<MainPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="get-started" element={<GetStarted />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="terms-and-conditions" element={<TermsPage />} />
              <Route path="cookie-policy" element={<CookiePolicyPage />} />
              <Route path="legal-notice" element={<LegalNoticePage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="thank-you" element={<ThankYouPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
          </Route>

        </Route>
        
        {/* Redirección: si alguien entra a la raíz, lo enviamos a /en por defecto */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
