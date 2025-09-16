'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS variables
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-bg-primary', theme.colors.background.primary);
    root.style.setProperty('--color-bg-secondary', theme.colors.background.secondary);
    root.style.setProperty('--color-bg-tertiary', theme.colors.background.tertiary);
    root.style.setProperty('--color-text-primary', theme.colors.text.primary);
    root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--color-text-muted', theme.colors.text.muted);
    root.style.setProperty('--color-border', theme.colors.border);
    
    // Set gradients
    root.style.setProperty('--gradient-primary', theme.colors.gradient.primary);
    root.style.setProperty('--gradient-secondary', theme.colors.gradient.secondary);
    root.style.setProperty('--gradient-accent', theme.colors.gradient.accent);
    
    // Set font
    root.style.setProperty('--font-primary', theme.fonts.primary);
    root.style.setProperty('--font-weight-light', theme.fonts.weights.light.toString());
    root.style.setProperty('--font-weight-normal', theme.fonts.weights.normal.toString());
    root.style.setProperty('--font-weight-medium', theme.fonts.weights.medium.toString());
    root.style.setProperty('--font-weight-semibold', theme.fonts.weights.semibold.toString());
    root.style.setProperty('--font-weight-bold', theme.fonts.weights.bold.toString());
    
    // Set spacing
    root.style.setProperty('--spacing-xs', theme.spacing.xs);
    root.style.setProperty('--spacing-sm', theme.spacing.sm);
    root.style.setProperty('--spacing-md', theme.spacing.md);
    root.style.setProperty('--spacing-lg', theme.spacing.lg);
    root.style.setProperty('--spacing-xl', theme.spacing.xl);
    root.style.setProperty('--spacing-2xl', theme.spacing['2xl']);
    
    // Set border radius
    root.style.setProperty('--border-radius-sm', theme.borderRadius.sm);
    root.style.setProperty('--border-radius-md', theme.borderRadius.md);
    root.style.setProperty('--border-radius-lg', theme.borderRadius.lg);
    root.style.setProperty('--border-radius-xl', theme.borderRadius.xl);
    
    // Set shadows
    root.style.setProperty('--shadow-sm', theme.shadows.sm);
    root.style.setProperty('--shadow-md', theme.shadows.md);
    root.style.setProperty('--shadow-lg', theme.shadows.lg);
    root.style.setProperty('--shadow-xl', theme.shadows.xl);
  }, [theme]);

  return <>{children}</>;
}
