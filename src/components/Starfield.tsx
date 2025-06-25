// src/components/Starfield.tsx

import { useEffect, useMemo, useState } from "react";
// CAMBIO 1: Las importaciones ahora vienen de los nuevos paquetes con @tsparticles
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export const Starfield = () => {
  const [init, setInit] = useState(false);

  // CAMBIO 2: La lógica de inicialización se mantiene, pero ahora usará los paquetes correctos.
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container: any): Promise<void> => {
    // Esta función se puede dejar vacía o usar para logging.
  };

  // La configuración de las partículas no necesita cambios.
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0D1B2A",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 50,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 400,
        },
        opacity: {
          value: { min: 0.1, max: 0.7 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  // Mientras se inicializa, no renderizamos nada para evitar errores.
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};