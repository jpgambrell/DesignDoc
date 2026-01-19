"use client";

import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, setTheme, toggleTheme };
}




