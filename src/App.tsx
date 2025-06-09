// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PricingPage from "./pages/PricingPage";
import GetStarted from "./pages/GetStarted";
import ScrollToTop from "./components/ScrollToTop";
import { ElevenLabsWidgetProvider } from "./components/ElevenLabsWidgetContext"; // <-- 1. Importa el Provider
import Layout from "./components/Layout"

// --- 1. Importa las nuevas páginas legales ---
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";

function App() {
  return (
    // --- 2. Envuelve todo con el Provider ---
    <ElevenLabsWidgetProvider>
      <BrowserRouter>
      <Layout>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/get-started" element={<GetStarted />} />
          {/* --- 2. Añade las nuevas rutas --- */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/legal-notice" element={<LegalNoticePage />} />
        </Routes>
        </Layout >
      </BrowserRouter>
      
      <elevenlabs-convai 
        agent-id="agent_01jx8asf98f8xt7pzzrhvt2rzs"
        launcher-style="none"
      ></elevenlabs-convai>
    </ElevenLabsWidgetProvider>
  );
}

export default App;