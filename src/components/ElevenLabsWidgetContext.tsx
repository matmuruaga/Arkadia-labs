// src/components/ElevenLabsWidgetContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

declare global {
  interface Window {
    elevenlabs: any;
  }
}

// Añadimos el estado 'isReady' al contexto y función para precargar
interface WidgetContextType {
  isReady: boolean;
  isLoading: boolean;
  toggleConversation: () => void;
  preloadScript: () => void;
}

const ElevenLabsWidgetContext = createContext<WidgetContextType | undefined>(undefined);

export const useElevenLabsWidget = () => {
  const context = useContext(ElevenLabsWidgetContext);
  if (context === undefined) {
    throw new Error('useElevenLabsWidget must be used within a ElevenLabsWidgetProvider');
  }
  return context;
};

export const ElevenLabsWidgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Función para cargar el script dinámicamente (lazy loading)
  const loadElevenLabsScript = () => {
    // Si ya está cargado o cargando, no hacer nada
    if (scriptLoaded || isLoading) return;

    setIsLoading(true);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
      setIsLoading(false);

      // Esperar a que el widget esté listo
      const intervalId = setInterval(() => {
        if (window.elevenlabs?.convai?.toggle) {
          setIsReady(true);
          clearInterval(intervalId);
        }
      }, 100);

      // Timeout de seguridad (10 segundos)
      setTimeout(() => clearInterval(intervalId), 10000);
    };

    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget');
      setIsLoading(false);
    };

    document.body.appendChild(script);
  };

  // Función para precargar el script (llamada en hover)
  const preloadScript = () => {
    loadElevenLabsScript();
  };

  const toggleConversation = () => {
    // Si el script no está cargado, cargarlo primero
    if (!scriptLoaded) {
      loadElevenLabsScript();
      console.log('Loading ElevenLabs widget... Please try again in a moment.');
      return;
    }

    if (isReady) {
      window.elevenlabs.convai.toggle();
    } else if (isLoading) {
      console.log('ElevenLabs widget is loading, please wait...');
    } else {
      console.error('ElevenLabs Convai widget API not ready yet.');
    }
  };

  const value = { isReady, isLoading, toggleConversation, preloadScript };

  return (
    <ElevenLabsWidgetContext.Provider value={value}>
      {children}
    </ElevenLabsWidgetContext.Provider>
  );
};