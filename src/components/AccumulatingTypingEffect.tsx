// src/components/AccumulatingTypingEffect.tsx
import { useState, useEffect, useRef } from 'react';

export interface PhraseWithEmoji {
  emoji: string;
  text: string;
  id?: string; // Para una key más robusta en el map
}

interface AccumulatingTypingEffectProps {
  phrases: PhraseWithEmoji[];
  typingSpeed?: number;
  pauseBetweenLines?: number;
  maxVisibleLines?: number;
  containerClassName?: string;
  lineClassName?: string;
  cursorClassName?: string;
}

const AccumulatingTypingEffect: React.FC<AccumulatingTypingEffectProps> = ({
  phrases,
  typingSpeed = 100,
  pauseBetweenLines = 1200,
  maxVisibleLines = 4,
  containerClassName = "",
  lineClassName = "",
  cursorClassName = "inline-block w-[2px] h-[1.1em] ml-1 bg-[#0D1B2A] animate-blink align-middle"
}) => {
  const [visibleLines, setVisibleLines] = useState<PhraseWithEmoji[]>([]); // Almacena objetos PhraseWithEmoji completos
  const [currentTypingText, setCurrentTypingText] = useState(''); // Solo el texto, sin emoji
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0); // Para iterar sobre `phrases`
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMountedRef.current || phrases.length === 0) return;

    const phraseObjectToType = phrases[currentPhraseIndex % phrases.length];
    const textToType = phraseObjectToType.text;

    if (currentTypingText.length < textToType.length) {
      // Sigue tipeando la línea actual
      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        setCurrentTypingText(prev => textToType.substring(0, prev.length + 1));
      }, typingSpeed);
    } else {
      // Línea completada. Añadirla a visibleLines y prepararse para la siguiente.
      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        
        const completedPhrase = { 
          ...phraseObjectToType, 
          id: `${phraseObjectToType.text}-${Date.now()}` // Key única
        };

        setVisibleLines(prevLines => {
          const newLines = [...prevLines, completedPhrase];
          return newLines.length > maxVisibleLines 
                 ? newLines.slice(newLines.length - maxVisibleLines) 
                 : newLines;
        });
        
        setCurrentTypingText(''); // Resetea para la nueva línea
        setCurrentPhraseIndex(prevIndex => prevIndex + 1); 
      }, pauseBetweenLines);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentTypingText, currentPhraseIndex, phrases, typingSpeed, pauseBetweenLines, maxVisibleLines]);

  // Determina la frase actual que se está tipeando para mostrar su emoji
  const phraseBeingTyped = phrases[currentPhraseIndex % phrases.length];

  return (
    <div className={containerClassName}>
      {visibleLines.map((phrase) => (
        <p key={phrase.id} className={lineClassName}>
          {phrase.emoji} {phrase.text}
        </p>
      ))}
      {/* Línea que se está tipeando actualmente */}
      {phraseBeingTyped && ( // Asegura que phraseBeingTyped exista
        <p className={lineClassName}>
          {phraseBeingTyped.emoji}{" "}
          {currentTypingText}
          {/* Mostrar cursor solo si no se ha completado la frase actual */}
          {currentTypingText.length < phraseBeingTyped.text.length && (
            <span className={cursorClassName}></span>
          )}
        </p>
      )}
    </div>
  );
};

export default AccumulatingTypingEffect;