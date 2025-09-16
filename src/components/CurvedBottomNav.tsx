'use client';

import type React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FileText, Briefcase, Wrench, Mail, Palette, X, Sun, Moon, Monitor } from 'lucide-react';
import NavTransition from './NavTransition';
import { useTheme } from '@/contexts/ThemeContext';
import { usePrefetch } from './PrefetchLink';

type IconType = React.ComponentType<{ size?: number; className?: string }>;

type RouteItem = { label: string; href: string; icon: IconType };
type SectionItem = { label: string; id: string; icon: IconType };

interface SectionProps {
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

function isRouteItem(item: RouteItem | SectionItem): item is RouteItem {
  return (item as RouteItem).href !== undefined;
}

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

export function CurvedBottomNav({ activeSection, onSectionChange }: SectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const { themeName, setThemeName, availableThemes } = useTheme();
  const [fontFamily, setFontFamily] = useState<string>('Poppins');
  const [fontSizePx, setFontSizePx] = useState<number>(16);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const { prefetchRoutes } = usePrefetch();

  const isSectionMode = Boolean(onSectionChange);

  // Intelligent prefetching based on user behavior
  useEffect(() => {
    if (!isSectionMode) {
      // Prefetch all routes when component mounts (for route-based navigation)
      const allRoutes = ['/about', '/portfolio', '/resume', '/technologies', '/contact'];
      prefetchRoutes(allRoutes);
    }
  }, [isSectionMode, prefetchRoutes]);

  // Prefetch routes on hover for better UX
  const handleRouteHover = (href: string) => {
    if (!isSectionMode) {
      router.prefetch(href);
    }
  };

  const leftItems = useMemo<Array<RouteItem | SectionItem>>(
    () =>
      isSectionMode
        ? [
            { label: 'About', id: 'about', icon: User } as SectionItem,
            { label: 'Resume', id: 'resume', icon: FileText } as SectionItem,
          ]
        : [
            { label: 'About', href: '/about', icon: User } as RouteItem,
            { label: 'Resume', href: '/resume', icon: FileText } as RouteItem,
          ],
    [isSectionMode]
  );

  const rightItems = useMemo<Array<RouteItem | SectionItem>>(
    () =>
      isSectionMode
        ? [
            { label: 'Tech', id: 'technologies', icon: Wrench } as SectionItem,
            { label: 'Contact', id: 'contact', icon: Mail } as SectionItem,
          ]
        : [
            { label: 'Tech', href: '/technologies', icon: Wrench } as RouteItem,
            { label: 'Contact', href: '/contact', icon: Mail } as RouteItem,
          ],
    [isSectionMode]
  );

  const activeKey = useMemo(() => {
    if (isSectionMode) return activeSection ?? 'about';
    const all = ([...leftItems, ...rightItems] as RouteItem[]);
    const found = all.find((i) => (pathname === '/' ? i.href === '/' : pathname?.startsWith(i.href) && i.href !== '/'));
    return found?.href ?? '/';
  }, [activeSection, isSectionMode, leftItems, rightItems, pathname]);

  const handleClick = (item: RouteItem | SectionItem) => {
    const itemKey = isRouteItem(item) ? item.href : item.id;
    setClickedItem(itemKey);
    
    if (isSectionMode) {
      onSectionChange?.((item as SectionItem).id);
    } else {
      // Add dramatic transition delay
      setTimeout(() => {
        router.push((item as RouteItem).href);
      }, 200);
    }
  };

  const handleFab = () => {
    if (isSectionMode) onSectionChange?.('portfolio');
    else router.push('/portfolio');
  };

  const isActive = (item: RouteItem | SectionItem) => {
    if (isSectionMode) return activeKey === (item as SectionItem).id;
    return activeKey === (item as RouteItem).href;
  };

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

  const handleThemeToggle = () => {
    setIsRotating(true);
    setIsThemeOpen(!isThemeOpen);
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
    <nav className="fixed bottom-0 inset-x-0 z-[100]">
      <div className="relative mx-auto max-w-3xl">
        <div className="relative h-20 bg-background-secondary/75 backdrop-blur border-t border-border rounded-t-[28px]">
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 overflow-hidden">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-background shadow-[0_-8px_24px_rgba(0,0,0,0.08)]" />
          </div>

          <div className="flex items-end justify-between h-full px-8">
            {leftItems.map((item) => (
              <NavButton 
                key={isRouteItem(item) ? item.href : item.id} 
                item={item} 
                active={isActive(item)} 
                isClicked={clickedItem === (isRouteItem(item) ? item.href : item.id)}
                onClick={() => handleClick(item)}
                onHover={isRouteItem(item) ? () => handleRouteHover(item.href) : undefined}
              />
            ))}
            <div className="w-24" />
            {rightItems.map((item) => (
              <NavButton 
                key={isRouteItem(item) ? item.href : item.id} 
                item={item} 
                active={isActive(item)} 
                isClicked={clickedItem === (isRouteItem(item) ? item.href : item.id)}
                onClick={() => handleClick(item)}
                onHover={isRouteItem(item) ? () => handleRouteHover(item.href) : undefined}
              />
            ))}
          </div>
        </div>

        <button
          aria-label="Open Portfolio"
          onClick={handleFab}
          onMouseEnter={() => !isSectionMode && router.prefetch('/portfolio')}
          className="group absolute -top-7 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary text-white shadow-xl border-4 border-background flex items-center justify-center"
        >
          <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.04 }}>
            <Briefcase size={22} />
          </motion.div>
        </button>
      </div>

      {/* Floating Theme Switcher */}
      <div className="absolute bottom-24 right-6 z-[110]">
        {/* Floating Button */}
        <motion.button
          onClick={handleThemeToggle}
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
              scale: isThemeOpen ? 0.8 : 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.3
            }}
          >
            {isThemeOpen ? <X size={24} /> : <ThemeIcon size={24} />}
          </motion.div>
        </motion.button>

        {/* Settings Panel */}
        <AnimatePresence>
          {isThemeOpen && (
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
    </nav>
  );
}

function NavButton({ item, active, isClicked, onClick, onHover }: { item: RouteItem | SectionItem; active: boolean; isClicked: boolean; onClick: () => void; onHover?: () => void }) {
  const Icon: IconType = isRouteItem(item) ? item.icon : item.icon;
  
  return (
    <NavTransition isActive={isClicked}>
      <motion.button 
        onClick={onClick}
        onMouseEnter={onHover}
        className="relative flex flex-col items-center justify-center gap-1 px-3 pb-4 pt-2 text-[13px] rounded-lg overflow-hidden"
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
      {/* Background highlight for active state */}
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="nav-active-background"
            className="absolute inset-0 bg-primary/10 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        )}
      </AnimatePresence>

      <div className="relative h-6 flex items-center justify-center z-10">
        <motion.div
          className={active ? 'text-primary' : 'text-text-secondary'}
          animate={{ 
            scale: active ? 1.1 : 1,
            rotate: active ? [0, 360, 0] : 0 // Rotate when becoming active
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            rotate: active ? { 
              duration: 0.6, 
              delay: 0.2, // Delay rotation until dot appears
              ease: "easeInOut" 
            } : { duration: 0.2 }
          }}
        >
          <Icon size={22} />
        </motion.div>
        
        {/* Animated dot that slides between items */}
        <AnimatePresence>
          {active && (
            <motion.span 
              layoutId="nav-active-dot"
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary"
              initial={{ width: 6, height: 6, opacity: 1 }}
              animate={{ 
                width: 8, 
                height: 8, 
                opacity: [1, 1, 1, 0], // Visible during entire slide, then fade out
                scale: 1.2
              }}
              exit={{ 
                width: 6, 
                height: 6, 
                opacity: 0,
                scale: 0.8
              }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                duration: 0.4,
                opacity: { duration: 0.3, delay: 0.3 } // Longer delay to see the slide
              }}
            />
          )}
        </AnimatePresence>
      </div>
      
      <motion.span 
        className={`z-10 ${active ? 'text-primary font-semibold' : 'text-text-secondary font-normal'}`}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {isRouteItem(item) ? item.label : item.label}
      </motion.span>
    </motion.button>
    </NavTransition>
  );
}

export default CurvedBottomNav;


