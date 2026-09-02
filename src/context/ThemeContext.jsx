import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

const ACCENT_MAP = {
  blue: '#2563eb',
  green: '#059669',
  purple: '#7c3aed',
  red: '#e11d48',

  '#2563eb': 'blue',
  '#059669': 'green',
  '#7c3aed': 'purple',
  '#e11d48': 'red',
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeModeState] = useState(() => {
    return localStorage.getItem('taskflow-theme') || 'system';
  });

  const [accentKey, setAccentKeyState] = useState(() => {
    const saved = localStorage.getItem('taskflow-accent') || 'blue';
    return ACCENT_MAP[saved] || 'blue';
  });

  // Calculate actual applied theme ('light' or 'dark')
  const getSystemTheme = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    const initialMode = localStorage.getItem('taskflow-theme') || 'system';
    if (initialMode === 'system') {
      return getSystemTheme();
    }
    return initialMode;
  });

  // Apply theme & accent to HTML document element
  const applyThemeAndAccent = useCallback((mode, accent) => {
    const effectiveTheme = mode === 'system' ? getSystemTheme() : mode;
    setResolvedTheme(effectiveTheme);

    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.setAttribute('data-accent', accent);
  }, [getSystemTheme]);

  // Handle theme mode change
  const setThemeMode = useCallback((mode) => {
    setThemeModeState(mode);
    localStorage.setItem('taskflow-theme', mode);
  }, []);

  // Handle accent color change (accepts key e.g. 'blue' or hex e.g. '#2563eb')
  const setAccentColor = useCallback((colorOrKey) => {
    let key = colorOrKey;
    if (colorOrKey.startsWith('#')) {
      key = ACCENT_MAP[colorOrKey] || 'blue';
    }
    setAccentKeyState(key);
    localStorage.setItem('taskflow-accent', key);
  }, []);

  // Effect to update DOM attributes and system media listener
  useEffect(() => {
    applyThemeAndAccent(themeMode, accentKey);

    if (themeMode === 'system' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = (e) => {
        applyThemeAndAccent('system', accentKey);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemChange);
      } else {
        mediaQuery.addListener(handleSystemChange);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleSystemChange);
        } else {
          mediaQuery.removeListener(handleSystemChange);
        }
      };
    }
  }, [themeMode, accentKey, applyThemeAndAccent]);

  // Derived hex value for Settings component or components needing hex
  const accentHex = ACCENT_MAP[accentKey] || '#2563eb';

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        accentKey,
        accentColor: accentHex,
        setAccentColor,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
