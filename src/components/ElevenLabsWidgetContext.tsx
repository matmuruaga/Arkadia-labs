// src/components/ElevenLabsWidgetContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Declaramos que 'elevenlabs' puede existir en el objeto window para que TypeScript no de error.
declare global {
  interface Window {
    elevenlabs: any;
  }
}

interface WidgetContextType {
  toggleConversation: () => void;
  // Podrías añadir más funciones si las necesitas, ej: openConversation, closeConversation
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
  
  const toggleConversation = () => {
    if (window.elevenlabs?.convai) {
      window.elevenlabs.convai.toggle();
    } else {
      console.error("ElevenLabs Convai widget API not found on window object.");
    }
  };

  const value = { toggleConversation };

  return (
    <ElevenLabsWidgetContext.Provider value={value}>
      {children}
    </ElevenLabsWidgetContext.Provider>
  );
};