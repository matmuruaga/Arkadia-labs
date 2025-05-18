import { BrainCircuit, Linkedin, Twitter, Youtube, Instagram, Send } from 'lucide-react';
import AnimatedLines from '../components/AnimatedLines'; // ⚠️ Asegurate que este archivo exista o comenta esta línea

const Footer = () => {
  return (
    <footer className="bg-[#070922] pt-20 pb-8 px-4 relative">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-4 cursor-pointer">
              <BrainCircuit size={32} className="text-[var(--accent)]" />
              <span className="ml-2 text-xl font-bold gradient-text">ElevAIte Labs</span>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming businesses with intelligent AI automation solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">AI Solutions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Legal Notice</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#0C0F3F] text-white rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] border border-[var(--accent)]/20"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--accent)] hover:text-white transition-colors">
                <Send size={20} />
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              🚀 Stay ahead with AI automation – Subscribe to our newsletter!
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 ElevAIte Labs. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm text-center md:text-right">
            ElevAIte Labs AG | Bahnhofstrasse 1, 8001 Zürich, Switzerland
            <br />
            VAT: CHE-123.456.789
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
