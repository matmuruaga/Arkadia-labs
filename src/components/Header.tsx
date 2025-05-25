import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BrainCircuit } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const scrollToPlans = () => {
    const target = document.getElementById("subscription-plans");
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all ${
      scrolling ? "bg-[#0C0F3F]/80 backdrop-blur border-b border-white/10" : ""
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
            <img
             src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1748199184/Recurso_1_ryyyrz.svg"
             alt="Elevaite Labs Logo"
             className="h-8 w-auto"
             />
        </a>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-[var(--accent)] transition">Features</a>
          <a href="#subscription-plans" className="text-white hover:text-[var(--accent)] transition">Plans</a>
          <a href="#testimonials" className="text-white hover:text-[var(--accent)] transition">Testimonials</a>
          <a href="#contact" className="text-white hover:text-[var(--accent)] transition">Contact</a>
          <button
                onClick={() => window.location.href = "/get-started"}
                className="w-full bg-[var(--accent)] text-[var(--primary)] px-4 py-2 rounded-full font-semibold hover:bg-[var(--secondary)] hover:text-white transition-all duration-300"
            >
                Get Started
            </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#0C0F3F] border-t border-white/10 px-4 py-6 space-y-4 text-white"
          >
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block">Features</a>
            <a href="#subscription-plans" onClick={() => setIsMenuOpen(false)} className="block">Plans</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block">Testimonials</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block">Contact</a>

            <button
                onClick={() => window.location.href = "/get-started"}
                className="w-full bg-[var(--accent)] text-[var(--primary)] px-4 py-2 rounded-full font-semibold hover:bg-[var(--secondary)] hover:text-white transition-all duration-300"
            >
                Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
