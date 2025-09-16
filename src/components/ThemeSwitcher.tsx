'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, X } from 'lucide-react';

const FONT_FAMILIES: { name: string; css: string }[] = [
  { name: 'Poppins', css: "'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'" },
  { name: 'Inter', css: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" },
  { name: 'Roboto', css: "Roboto, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial" },
  { name: 'Merriweather', css: "Merriweather, Georgia, 'Times New Roman', Times, serif" },
];

const FONT_SIZES: { label: string; px: number }[] = [
  { label: 'S', px: 17 },
  { label: 'M', px: 18 },
  { label: 'L', px: 19 },
  { label: 'XL', px: 20 },
];

export function ThemeSwitcher() {
  const { themeName, setThemeName, availableThemes } = useTheme();
  const [fontFamily, setFontFamily] = useState<string>('Poppins');
  const [fontSizePx, setFontSizePx] = useState<number>(16);

  useEffect(() => {
    const savedFamily = localStorage.getItem('portfolio-font-family');
    const savedSize = localStorage.getItem('portfolio-font-size');
    if (savedFamily) {
      const found = FONT_FAMILIES.find(f => f.name === savedFamily);
      if (found) {
        setFontFamily(found.name);
        document.documentElement.style.setProperty('--font-primary', found.css);
      }
    }
    if (savedSize) {
      const sizeNum = parseInt(savedSize, 10);
      if (!Number.isNaN(sizeNum)) {
        setFontSizePx(sizeNum);
        document.documentElement.style.setProperty('--base-font-size', `${sizeNum}px`);
      }
    }
  }, []);

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

  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative group">
      <button onClick={() => setToggle(!toggle)} 
      className="p-2 rounded-lg bg-background-secondary border border-border hover:bg-background-tertiary transition-colors">
        
        {toggle ? <X  size={24} className='w-5 h-5 text-primary transition-all duration-500' /> : <Palette className="w-5 h-5 text-primary transition-all duration-500"  />}
        
      </button>
      
      <div className={`absolute right-0 bottom-full mt-2 w-64 ${themeName=== "light"? 'bg-white/90':'bg-black/90'} border border-border rounded-lg shadow-xl invisible ${toggle?'visible':'invisible'} transition-all duration-200 z-50`}>
        <div className="p-3">
          <h3 className="text-sm font-medium text-text-primary mb-2 border-b border-border pb-2">Appearance</h3>
          
          <div className="mb-3">
            <p className="text-xs text-text-muted mb-1">Theme</p>
            <div className="space-y-1">
              {availableThemes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setThemeName(theme.name)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    themeName === theme.name
                      ? 'bg-primary text-background-primary'
                      : 'text-text-secondary hover:bg-background-tertiary'
                  }`}
                >
                  {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs text-text-muted mb-1">Font</p>
            <div className="grid grid-cols-2 gap-2">
              {FONT_FAMILIES.map((f) => (
                <button
                  key={f.name}
                  onClick={() => applyFontFamily(f.name)}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    fontFamily === f.name
                      ? 'bg-primary text-background-primary'
                      : 'text-text-secondary hover:bg-background-tertiary'
                  }`}
                  style={{ fontFamily: f.css as React.CSSProperties['fontFamily'] }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-text-muted mb-1">Font size</p>
            <div className="flex items-center gap-2">
              {FONT_SIZES.map(s => (
                <button
                  key={s.label}
                  onClick={() => applyFontSize(s.px)}
                  className={`w-10 py-1 rounded-md text-sm text-center transition-colors ${
                    fontSizePx === s.px
                      ? 'bg-primary text-background-primary'
                      : 'text-text-secondary hover:bg-background-tertiary'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
