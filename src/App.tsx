// src/App.tsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ElevenLabsWidgetProvider } from "./components/ElevenLabsWidgetContext";

// --- Componentes de estructura y lógica ---
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// --- Páginas Públicas ---
import MainPage from "./pages/MainPage";
import PricingPage from "./pages/PricingPage";
import GetStarted from "./pages/GetStarted";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";


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
  return (
    <ElevenLabsWidgetProvider>
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* --- GRUPO DE RUTAS PÚBLICAS --- */}
            {/* Todas las rutas dentro de este grupo usarán el PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/legal-notice" element={<LegalNoticePage />} />
            </Route>
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