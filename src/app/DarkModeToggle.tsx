"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
    type="button"
      onClick={toggleTheme}
      className="
        fixed top-14 right-4 
        md:top-4 md:right-4 
        p-2 
        bg-gray-300 
        dark:bg-gray-700 
        rounded-full 
        shadow-md 
        transition-all 
        duration-300 
        hover:scale-110 
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-400 
        dark:focus:ring-gray-500
      "
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-gray-900" />
      )}
    </button>
  );
}
