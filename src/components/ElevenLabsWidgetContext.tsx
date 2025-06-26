// src/components/ElevenLabsWidgetContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

declare global {
  interface Window {
    elevenlabs: any;
  }
}

// Añadimos el estado 'isReady' al contexto
interface WidgetContextType {
  isReady: boolean;
  toggleConversation: () => void;
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
  // Nuevo estado para saber si el widget está listo
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Usamos un intervalo para comprobar si la API del widget ya se ha cargado
    const intervalId = setInterval(() => {
      if (window.elevenlabs?.convai?.toggle) {
        setIsReady(true);
        // Una vez que lo encontramos, limpiamos el intervalo
        clearInterval(intervalId);
      }
    }, 100); // Comprueba cada 100ms

    // Limpiamos el intervalo si el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // Este efecto se ejecuta solo una vez

  const toggleConversation = () => {
    if (isReady) {
      window.elevenlabs.convai.toggle();
    } else {
      console.error("ElevenLabs Convai widget API not ready yet.");
    }
  };

  const value = { isReady, toggleConversation };

  return (
    <ElevenLabsWidgetContext.Provider value={value}>
      {children}
    </ElevenLabsWidgetContext.Provider>
  );
};