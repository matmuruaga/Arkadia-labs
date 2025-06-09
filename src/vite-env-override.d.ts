// src/vite-env-override.d.ts

// Esto le dice a TypeScript que reconozca la etiqueta del widget de ElevenLabs en tu JSX.
declare namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id"?: string;
        "visibility"?: string; // Añadimos los atributos que usamos para que también los reconozca
      };
    }
  }