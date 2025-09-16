'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, X, Sun, Moon, Monitor } from 'lucide-react';

const FONT_FAMILIES: { name: string; css: string }[] = [
  { name: 'Poppins', css: "'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'" },
  { name: 'Inter', css: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" },
  { name: 'Roboto', css: "Roboto, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial" },
  { name: 'Merriweather', css: "Merriweather, Georgia, 'Times New Roman', Times, serif" },
];

const FONT_SIZES: { label: string; px: number }[] = [
  { label: 'S', px: 15 },
  { label: 'M', px: 16 },
  { label: 'L', px: 17 },
  { label: 'XL', px: 18 },
];

export function FloatingThemeSwitcher() {
  const { themeName, setThemeName, availableThemes } = useTheme();
  const [fontFamily, setFontFamily] = useState<string>('Poppins');
  const [fontSizePx, setFontSizePx] = useState<number>(16);
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const applyFontFamily = (name: string) => {
    const found = FONT_FAMILIES.find(f => f.name === name);
    if (!found) return;
    setFontFamily(name);
    document.documentElement.style.setProperty('--font-primary', found.css);
    localStorage.setItem('portfolio-font-family', name);
  };

  const applyFontSize = (px: number) => {
    setFontSizePx(px);
    document.documentElement.style.setProperty('--base-font-size', `${px}px`);
    localStorage.setItem('portfolio-font-size', String(px));
  };

  const handleToggle = () => {
    setIsRotating(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsRotating(false), 300);
  };

  const getThemeIcon = () => {
    switch (themeName) {
      case 'light': return Sun;
      case 'dark': return Moon;
      default: return Monitor;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        onClick={handleToggle}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-xl border-4 border-background flex items-center justify-center hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.2 }}
      >
        <motion.div
          animate={{ 
            rotate: isRotating ? 360 : 0,
            scale: isOpen ? 0.8 : 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.3
          }}
        >
          {isOpen ? <X size={24} /> : <ThemeIcon size={24} />}
        </motion.div>
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 bg-background-secondary/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Palette size={20} />
                Appearance Settings
              </h3>
              
              {/* Theme Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium text-text-secondary mb-3">Theme</p>
                <div className="grid grid-cols-3 gap-2">
                  {availableThemes.map((theme) => {
                    const Icon = theme.name === 'light' ? Sun : theme.name === 'dark' ? Moon : Monitor;
                    return (
                      <motion.button
                        key={theme.name}
                        onClick={() => setThemeName(theme.name)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                          themeName === theme.name
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-background-tertiary text-text-secondary hover:bg-background hover:text-text-primary'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon size={20} />
                        <span className="text-xs font-medium capitalize">{theme.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Font Family */}
              <div className="mb-6">
                <p className="text-sm font-medium text-text-secondary mb-3">Font Family</p>
                <div className="grid grid-cols-2 gap-2">
                  {FONT_FAMILIES.map((f) => (
                    <motion.button
                      key={f.name}
                      onClick={() => applyFontFamily(f.name)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        fontFamily === f.name
                          ? 'bg-primary text-white'
                          : 'bg-background-tertiary text-text-secondary hover:bg-background hover:text-text-primary'
                      }`}
                      style={{ fontFamily: f.css as React.CSSProperties['fontFamily'] }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {f.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <p className="text-sm font-medium text-text-secondary mb-3">Font Size</p>
                <div className="flex items-center gap-2">
                  {FONT_SIZES.map(s => (
                    <motion.button
                      key={s.label}
                      onClick={() => applyFontSize(s.px)}
                      className={`w-12 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        fontSizePx === s.px
                          ? 'bg-primary text-white'
                          : 'bg-background-tertiary text-text-secondary hover:bg-background hover:text-text-primary'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FloatingThemeSwitcher;
