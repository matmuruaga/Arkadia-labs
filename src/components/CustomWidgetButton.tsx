// src/components/CustomWidgetButton.tsx
import { Bot } from 'lucide-react';
import { useElevenLabsWidget } from './ElevenLabsWidgetContext';

export const CustomWidgetButton = () => {
  // Obtenemos estado y función para precargar
  const { toggleConversation, isReady, isLoading, preloadScript } = useElevenLabsWidget();

  return (
    <button
      onClick={toggleConversation}
      onMouseEnter={preloadScript} // Precargar script en hover para UX instantánea
      onTouchStart={preloadScript} // Precargar en touch para móviles
      aria-label="Toggle AI agent conversation"
      className="group fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex h-16 w-16 items-center justify-center transition-opacity duration-300"
      style={{
        opacity: isLoading ? 0.7 : isReady ? 1 : 0.9,
        cursor: 'pointer'
      }}
    >
      {/* El efecto de pulso solo se muestra cuando el botón está listo */}
      {isReady && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
      )}
      
      <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
        <Bot size={28} />
      </div>
    </button>
  );
};