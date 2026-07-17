import React, { useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get the actual theme based on preference
  const getActualTheme = (themePreference: Theme): "light" | "dark" => {
    if (themePreference === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return themePreference;
  };

  const applyTheme = (resolvedTheme: "light" | "dark") => {
    // Using only data-bs-theme as per Bootstrap 5.3 recommendations
    document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
  };

  const getPreferredTheme = (): Theme => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme && ["light", "dark", "auto"].includes(storedTheme)) {
      return storedTheme;
    }
    return "auto";
  };

  // Initialize from stored preference on first render (no flash, no
  // setState-in-effect).
  const [theme, setThemeState] = useState<Theme>(getPreferredTheme);
  const [actualTheme, setActualTheme] = useState<"light" | "dark">(() =>
    getActualTheme(getPreferredTheme())
  );

  // Apply the resolved theme to the DOM whenever it changes (incl. mount)
  useEffect(() => {
    applyTheme(actualTheme);
  }, [actualTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "auto") {
        const newActualTheme = e.matches ? "dark" : "light";
        setActualTheme(newActualTheme);
        applyTheme(newActualTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    const resolvedTheme = getActualTheme(newTheme);
    setActualTheme(resolvedTheme);
    applyTheme(resolvedTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "auto"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme, actualTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
