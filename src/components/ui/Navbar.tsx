import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sun, Moon, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  coordinates: { x: number; y: number; z: number };
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

interface Sector {
  id: string;
  label: string;
  code: string;
}

export default function Navbar({ activeSection, onNavigate, coordinates, theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const sectors: Sector[] = [
    { id: 'hero', label: 'Core', code: 'CORTEX_INIT' },
    { id: 'about', label: 'About', code: 'BIO_NUCLEUS' },
    { id: 'experience', label: 'Experience', code: 'SYNAPSE_TL' },
    { id: 'certificates', label: 'Credentials', code: 'CERT_VERIFY' },
    { id: 'skills', label: 'Skills', code: 'LOBE_MAP' },
    { id: 'projects', label: 'Projects', code: 'NEURAL_FP' },
    { id: 'services', label: 'Services', code: 'DENDRITE_TREE' },
    { id: 'testimonials', label: 'Reviews', code: 'ORBIT_NET' },
    { id: 'contact', label: 'Contact', code: 'CORE_GATE' },
  ];

  const handleMobileClick = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      onNavigate(id);
    }, 250);
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-6xl flex items-center justify-between px-5 py-3.5 rounded-2xl glass-panel font-sans transition-all duration-300">
        
        {/* Brand & Telemetry */}
        <div className="flex items-center space-x-4 shrink-0 pr-2">
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-2 text-foreground font-heading font-bold tracking-wider magnetic-btn focus:outline-none cursor-pointer"
          >
            <Cpu className="w-5 h-5 text-[var(--color-glow,#00E5FF)] animate-pulse" />
            <span className="text-xs sm:text-sm font-black">Mahfouz</span>
          </button>

          {/* Real-time telemetry coordinates */}
          <div className="hidden xl:flex items-center space-x-3 border-l border-border-custom pl-4 font-mono text-[9px] text-muted">
            <div>X: <span className="text-[var(--color-glow,#00E5FF)] font-bold">{coordinates.x.toFixed(1)}</span></div>
            <div>Y: <span className="text-[var(--color-glow,#00E5FF)] font-bold">{coordinates.y.toFixed(1)}</span></div>
            <div>Z: <span className="text-[var(--color-glow,#00E5FF)] font-bold">{coordinates.z.toFixed(1)}</span></div>
          </div>
        </div>

        {/* Desktop Nav Sectors List */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 px-2">
          {sectors.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className="relative px-2.5 py-1.5 font-mono text-[10px] xl:text-[11px] transition-all duration-300 magnetic-btn whitespace-nowrap focus:outline-none cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[var(--color-glow,#00E5FF)] shadow-[0_0_8px_var(--color-glow)] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <span className={`relative z-10 transition-all duration-300 ${
                  isActive 
                    ? 'text-[var(--color-glow,#00E5FF)] font-bold drop-shadow-[0_0_3px_var(--color-glow)]' 
                    : 'text-muted hover:text-foreground'
                }`}>
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: CV, Theme & Mobile Trigger */}
        <div className="flex items-center space-x-2 shrink-0 pl-2">
          
          {/* CV Button */}
          <a
            href="https://drive.google.com/file/d/1JiMziwJhlYbWm-lN8dZ2zD8ld9XcY3Xr/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex px-3.5 py-1.5 rounded-xl border border-border-custom bg-[var(--color-glow)]/10 text-foreground hover:bg-[var(--color-glow)] hover:border-[var(--color-glow)] hover:text-white dark:hover:text-[#050816] transition-all duration-300 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase items-center gap-1.5 magnetic-btn focus:outline-none cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View CV</span>
          </a>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-xl border border-border-custom flex items-center justify-center text-muted hover:text-[var(--color-glow)] hover:border-[var(--color-glow)]/30 transition-all duration-300 magnetic-btn focus:outline-none cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 animate-[spin_12s_linear_infinite]" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex lg:hidden w-9 h-9 rounded-xl border border-border-custom items-center justify-center text-foreground hover:text-[var(--color-glow)] hover:border-[var(--color-glow)]/30 transition-all duration-300 magnetic-btn focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Glassmorphic Overlay Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[94%] z-30 rounded-2xl glass-panel p-6 flex flex-col space-y-4 lg:hidden border border-border-custom shadow-2xl backdrop-blur-2xl"
          >
            {/* Coordinate Stats in Mobile Drawer */}
            <div className="flex xl:hidden justify-between items-center border-b border-border-custom pb-3 font-mono text-[9px] text-muted">
              <span>X: <span className="text-accent font-bold">{coordinates.x.toFixed(1)}</span></span>
              <span>Y: <span className="text-accent font-bold">{coordinates.y.toFixed(1)}</span></span>
              <span>Z: <span className="text-accent font-bold">{coordinates.z.toFixed(1)}</span></span>
            </div>

            {/* Vertically stacked menu items */}
            <div className="flex flex-col space-y-1">
              {sectors.map((sec, idx) => {
                const isActive = activeSection === sec.id;
                return (
                  <motion.button
                    key={sec.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => handleMobileClick(sec.id)}
                    className={`w-full py-2.5 px-3 rounded-lg text-left font-mono text-xs flex justify-between items-center transition-all ${
                      isActive 
                        ? 'bg-[var(--color-glow)]/10 text-[var(--color-glow)] font-bold border-l-2 border-[var(--color-glow)]' 
                        : 'text-muted hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-900/5'
                    }`}
                  >
                    <span>{sec.label}</span>
                    <span className="text-[8px] opacity-40 font-semibold">{sec.code}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile CV Button */}
            <a
              href="https://drive.google.com/file/d/1JiMziwJhlYbWm-lN8dZ2zD8ld9XcY3Xr/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 rounded-xl border border-border-custom bg-[var(--color-glow)]/10 text-foreground hover:bg-[var(--color-glow)] hover:border-[var(--color-glow)] hover:text-white dark:hover:text-[#050816] transition-all duration-300 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV Document</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
