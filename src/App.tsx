// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";

// Componentes críticos (no lazy - necesarios para render inicial)
import ScrollToTop from "./components/ScrollToTop";
import LanguageHandler from "./components/LanguageHandler";
import Layout from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";

// Lazy loading de páginas para code splitting y mejor performance
// MainPage se carga de forma normal porque es la ruta principal
import MainPage from "./pages/MainPage";

// Todas las demás páginas se cargan bajo demanda (lazy)
const PricingPage = lazy(() => import("./pages/PricingPage"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const CookiePolicyPage = lazy(() => import("./pages/CookiePolicyPage"));
const LegalNoticePage = lazy(() => import("./pages/LegalNoticePage"));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage').then(m => ({ default: m.IntegrationsPage })));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const CaseStudiesIndexPage = lazy(() => import('./pages/CaseStudiesIndexPage'));
const SolutionDetailPage = lazy(() => import('./pages/solutions/SolutionDetailPage'));
const SolutionsIndexPage = lazy(() => import('./pages/solutions/SolutionsIndexPage'));


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
      <Suspense fallback={<LoadingScreen />}>
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
                <Route path="case-studies" element={<CaseStudiesIndexPage />} />
                <Route path="case-studies/:slug" element={<CaseStudyPage />} />
                <Route path="solutions" element={<SolutionsIndexPage />} />
                <Route path="solutions/:slug" element={<SolutionDetailPage />} />
            </Route>

          </Route>

          {/* Redirección: si alguien entra a la raíz, lo enviamos a /en por defecto */}
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
