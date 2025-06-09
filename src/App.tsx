// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PricingPage from "./pages/PricingPage";
import GetStarted from "./pages/GetStarted";
import { ElevenLabsWidgetProvider } from "./components/ElevenLabsWidgetContext"; // <-- 1. Importa el Provider

function App() {
  return (
    // --- 2. Envuelve todo con el Provider ---
    <ElevenLabsWidgetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/get-started" element={<GetStarted />} />
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