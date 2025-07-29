import React, { createContext, useContext, useEffect } from 'react';
import { usePreferences } from '../hooks/usePreferences'; // ИЗМЕНЕНИЕ

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = usePreferences('theme', 'light'); // ИЗМЕНЕНИЕ

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);