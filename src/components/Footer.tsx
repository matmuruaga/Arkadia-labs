// src/components/Footer.tsx
import { BrainCircuit, Linkedin, Twitter, Youtube, Instagram, Send } from 'lucide-react';
// AnimatedLines fue diseñado para fondos oscuros, considera si quieres una versión clara o quitarlo del footer claro.
// import AnimatedLines from '../components/AnimatedLines'; 

const Footer = () => {
  const socialLinkClasses = "text-gray-500 hover:text-[#1C7ED6] transition-colors";
  const navLinkClasses = "text-gray-600 hover:text-[#1C7ED6] transition-colors";

  return (
    // Fondo blanco o un gris muy claro como #F8F9FA (ligeramente diferente al body #F1F3F5)
    // con un borde superior para separarlo del contenido.
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6">
      {/* <AnimatedLines />  Considera si esto se ve bien en un fondo claro */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Columna Logo & Descripción */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 cursor-pointer">
              {/* Asumiendo que el logo del Header también funciona aquí o usar uno específico */}
              <img 
                src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1749155603/Recurso_14_wwxduv.svg" 
                alt="ElevAIte Labs Logo" 
                className="h-8 w-auto mr-2"
              />
              {/* Si quieres el nombre en texto, usa el color oscuro */}
              {/* <BrainCircuit size={32} className="text-[#1C7ED6]" />
              <span className="ml-2 text-xl font-bold text-[#0D1B2A]">ElevAIte Labs</span> */}
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Transforming businesses with intelligent AI automation solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={socialLinkClasses} aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" className={socialLinkClasses} aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className={socialLinkClasses} aria-label="YouTube"><Youtube size={20} /></a>
              <a href="#" className={socialLinkClasses} aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Columna Quick Links */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className={navLinkClasses}>AI Solutions</a></li>
              <li><a href="/pricing" className={navLinkClasses}>Pricing</a></li>
              <li><a href="#" className={navLinkClasses}>Case Studies</a></li>
              <li><a href="#" className={navLinkClasses}>About Us</a></li>
            </ul>
          </div>

          {/* Columna Legal */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className={navLinkClasses}>Privacy Policy</a></li>
              <li><a href="#" className={navLinkClasses}>Terms & Conditions</a></li>
              <li><a href="#" className={navLinkClasses}>Cookie Policy</a></li>
              <li><a href="#" className={navLinkClasses}>Legal Notice</a></li>
            </ul>
          </div>

          {/* Columna Stay Updated */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">Stay Updated</h3>
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white text-[#0D1B2A] rounded-full py-2.5 pl-4 pr-12 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1C7ED6] focus:border-[#1C7ED6]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C7ED6] hover:text-[#1565C0] transition-colors" aria-label="Subscribe">
                <Send size={20} />
              </button>
            </div>
            <p className="text-gray-600 text-xs">
              🚀 Stay ahead with AI automation – Subscribe to our newsletter!
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 text-center md:text-left">
          <p className="text-gray-500 text-sm mb-2 md:mb-0">
            © {new Date().getFullYear()} ElevAIte Labs. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">
            ElevAIte Labs AG | Bahnhofstrasse 1, 8001 Zürich, Switzerland | VAT: CHE-123.456.789
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;