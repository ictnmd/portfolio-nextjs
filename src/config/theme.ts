export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
    gradient: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  fonts: {
    primary: string;
    weights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#f4d03f', // Orange Yellow Crayola
    secondary: '#d4af37', // Vegas Gold
    accent: '#ff6b6b', // Bittersweet Shimmer
    background: {
      primary: '#0a0a0a', // Smoky Black
      secondary: '#1a1a1a', // Eerie Black 1
      tertiary: '#1f1f1f', // Eerie Black 2
    },
    text: {
      primary: '#ffffff', // White 1
      secondary: '#fafafa', // White 2
      muted: '#d6d6d6', // Light Gray
    },
    border: '#383838', // Jet
    gradient: {
      primary: 'linear-gradient(135deg, #f4d03f 0%, #ff9a56 100%)',
      secondary: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      accent: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
    },
  },
  fonts: {
    primary: 'Poppins, sans-serif',
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

// Alternative themes
export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#8b5cf6', // Purple
    secondary: '#a78bfa',
    accent: '#f59e0b',
  },
};

export const lightTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    primary: '#3b82f6', // Blue
    secondary: '#60a5fa',
    accent: '#ef4444',
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      muted: '#64748b',
    },
    border: '#e2e8f0',
    gradient: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      secondary: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      accent: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    },
  },
};

export const greenTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#10b981', // Emerald
    secondary: '#34d399',
    accent: '#f59e0b',
  },
};
