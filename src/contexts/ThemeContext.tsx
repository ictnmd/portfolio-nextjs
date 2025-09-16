'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, defaultTheme, darkTheme, lightTheme, greenTheme } from '@/config/theme';

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  themeName: string;
  setThemeName: (name: string) => void;
  availableThemes: { name: string; theme: ThemeConfig }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const availableThemes = [
  { name: 'default', theme: defaultTheme },
  { name: 'dark', theme: darkTheme },
  { name: 'light', theme: lightTheme },
  { name: 'green', theme: greenTheme },
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState('default');
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      const foundTheme = availableThemes.find(t => t.name === savedTheme);
      if (foundTheme) {
        setThemeName(savedTheme);
        setTheme(foundTheme.theme);
      }
    }
  }, []);

  const handleSetTheme = (newTheme: ThemeConfig) => {
    setTheme(newTheme);
  };

  const handleSetThemeName = (name: string) => {
    setThemeName(name);
    const foundTheme = availableThemes.find(t => t.name === name);
    if (foundTheme) {
      setTheme(foundTheme.theme);
      localStorage.setItem('portfolio-theme', name);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        themeName,
        setThemeName: handleSetThemeName,
        availableThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
