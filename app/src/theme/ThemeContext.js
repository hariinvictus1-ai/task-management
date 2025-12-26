import { createContext, useContext, useState } from 'react';
import { darkColors, lightColors } from './colors';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState('dark'); 

  const colors = scheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        colors,
        scheme,
        setScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }
  return context;
};
