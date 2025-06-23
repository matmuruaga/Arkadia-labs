import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollHandler = () => {
  // Obtenemos la ruta y el anclaje (#) de la ubicación actual
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Primero, verificamos si hay un anclaje en la URL
    if (hash) {
      // Limpiamos el '#' para obtener solo el id
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Si encontramos el elemento, nos desplazamos suavemente hacia él.
        // Se añade un pequeño retraso para dar tiempo a que la página se renderice completamente.
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        return () => clearTimeout(timer); // Limpiamos el temporizador
      }
    } else {
      // Si no hay anclaje, simplemente nos desplazamos al principio de la página.
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Este efecto se ejecuta cada vez que la ruta o el anclaje cambian

  // Este componente no renderiza nada visualmente
  return null;
};

// Si renombraste el archivo, asegúrate de cambiar el nombre aquí también.
export default ScrollHandler;