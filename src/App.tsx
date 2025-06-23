// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LanguageHandler from "./components/LanguageHandler";
import { ElevenLabsWidgetProvider } from "./components/ElevenLabsWidgetContext";

// Importa tus páginas
import MainPage from "./pages/MainPage";
import PricingPage from "./pages/PricingPage";
import GetStarted from "./pages/GetStarted";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";

function App() {
  return (
    <ElevenLabsWidgetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Ruta Padre: Captura el idioma y renderiza el LanguageHandler */}
        <Route path="/:lang" element={<LanguageHandler />}>
          
          {/* Rutas Hijas: Se renderizarán dentro del <Outlet/> del LanguageHandler */}
          <Route index element={<MainPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsPage />} />
          <Route path="cookie-policy" element={<CookiePolicyPage />} />
          <Route path="legal-notice" element={<LegalNoticePage />} />

        </Route>
        
        {/* Redirección: si alguien entra a la raíz, lo enviamos a /en por defecto */}
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
    <elevenlabs-convai 
        agent-id="agent_01jx8asf98f8xt7pzzrhvt2rzs"
        launcher-style="none"
      ></elevenlabs-convai>
    </ElevenLabsWidgetProvider>
  );
}

export default App;