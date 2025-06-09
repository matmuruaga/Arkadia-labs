// src/components/Footer.tsx
import { Link } from 'react-router-dom'; // <-- 1. AÑADE ESTA LÍNEA DE IMPORTACIÓN
import { BrainCircuit, Linkedin, Twitter, Youtube, Instagram, Send } from 'lucide-react';
// Si no usas AnimatedLines en el Footer de tema claro, puedes quitar esta línea:
import AnimatedLines from '../components/AnimatedLines'; 

const Footer = () => {
  const socialLinkClasses = "text-gray-500 hover:text-[#1C7ED6] transition-colors";
  const navLinkClasses = "text-gray-600 hover:text-[#1C7ED6] transition-colors";

  return (
    // He asumido que quieres un Footer de tema claro para que coincida con el nuevo diseño.
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Columna Logo & Descripción */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4 cursor-pointer">
              <img 
                src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1749155603/Recurso_14_wwxduv.svg" 
                alt="ElevAIte Labs Logo" 
                className="h-8 w-auto mr-2"
              />
              <span className="text-xl font-bold text-[#0D1B2A]">ElevAIte Labs</span>
            </Link>
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
              <li><Link to="/#before-after" className={navLinkClasses}>Features</Link></li>
              <li><Link to="/pricing" className={navLinkClasses}>Pricing</Link></li>
              <li><Link to="/#testimonials" className={navLinkClasses}>Case Studies</Link></li>
            </ul>
          </div>

          {/* Columna Legal con <Link> */}
          <div>
            <h3 className="text-[#0D1B2A] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className={navLinkClasses}>Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className={navLinkClasses}>Terms & Conditions</Link></li>
              <li><Link to="/cookie-policy" className={navLinkClasses}>Cookie Policy</Link></li>
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
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C7ED6] hover:text-[#155CB0] transition-colors" aria-label="Subscribe">
                <Send size={20} />
              </button>
            </div>
            <p className="text-gray-600 text-xs">
              🚀 Stay ahead with AI automation – Subscribe to our newsletter!
            </p>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ElevAIte Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;