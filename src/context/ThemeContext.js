import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to false
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Apply body classes for global dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Save preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Define theme colors with better contrast
  const theme = {
    colors: {
      primary: '#ff6b35',
      primaryDark: '#e64a19',
      secondary: '#ff8a65',
      background: isDarkMode ? '#121212' : '#ffffff',
      surface: isDarkMode ? '#1e1e1e' : '#ffffff',
      surfaceSecondary: isDarkMode ? '#2d2d2d' : '#f5f5f5',
      surfaceLight: isDarkMode ? '#2a2a2a' : '#fafafa',
      text: isDarkMode ? '#ffffff' : '#1a1a1a',
      textSecondary: isDarkMode ? '#e0e0e0' : '#616161',
      textMuted: isDarkMode ? '#bdbdbd' : '#757575',
      border: isDarkMode ? '#424242' : '#e0e0e0',
      borderLight: isDarkMode ? '#2d2d2d' : '#f0f0f0',
      accent: isDarkMode ? '#ff8a65' : '#ff6b35',
      success: isDarkMode ? '#4caf50' : '#4caf50',
      successDark: isDarkMode ? '#388e3c' : '#388e3c',
      warning: isDarkMode ? '#ff9800' : '#ff9800',
      error: isDarkMode ? '#f44336' : '#f44336',
      errorDark: isDarkMode ? '#d32f2f' : '#d32f2f',
    },
    shadows: {
      sm: isDarkMode ? '0 1px 2px 0 rgba(255, 255, 255, 0.05)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: isDarkMode ? '0 4px 6px -1px rgba(255, 255, 255, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: isDarkMode ? '0 10px 15px -3px rgba(255, 255, 255, 0.1)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: isDarkMode ? '0 20px 25px -5px rgba(255, 255, 255, 0.1)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    }
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
