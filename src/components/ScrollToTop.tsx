// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Obtenemos la información de la ruta actual, específicamente el 'pathname' (ej. "/", "/pricing")
  const { pathname } = useLocation();

  // Usamos un 'useEffect' que se ejecutará cada vez que el 'pathname' cambie
  useEffect(() => {
    // Hacemos scroll al principio de la página (coordenadas 0, 0)
    // 'instant' hace que el salto sea inmediato, como se espera al cargar una nueva página.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [pathname]); // El efecto se dispara cada vez que cambia el pathname

  // Este componente no renderiza nada visualmente, solo contiene lógica.
  return null;
};

export default ScrollToTop;