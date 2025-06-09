// src/components/LegalPageLayout.tsx
import { useState, useEffect } from 'react';

// Definimos los tipos para el contenido que pasaremos
interface ContentSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  content: ContentSection[];
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, content }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Lógica para resaltar el enlace de la sección que se está viendo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -75% 0px' } // Se activa cuando la sección está en el 25% superior de la pantalla
    );

    content.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [content]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90; // Ajusta según la altura de tu header fijo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="bg-white py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Título de la Página */}
        <div className="text-center md:text-left mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1B2A]">{title}</h1>
          <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Columna Izquierda: Contenido Principal */}
          <div className="lg:w-3/4 prose max-w-none text-[#0D1B2A]/80">
            {content.map(({ id, heading, body }) => (
              <section key={id} id={id} className="mb-8 scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-semibold text-[#0D1B2A] mt-8 mb-4">
                  {heading}
                </h2>
                <div>{body}</div>
              </section>
            ))}
          </div>

          {/* Columna Derecha: Navegación Lateral (Filtro) */}
          <aside className="lg:w-1/4 mt-12 lg:mt-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">On this page</h3>
              <nav>
                <ul className="space-y-2">
                  {content.map(({ id, heading }) => (
                    <li key={`nav-${id}`}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => handleNavLinkClick(e, id)}
                        className={`block text-sm transition-colors duration-200 ${
                          activeId === id
                            ? 'text-[#1C7ED6] font-semibold'
                            : 'text-gray-600 hover:text-[#1C7ED6]'
                        }`}
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default LegalPageLayout;