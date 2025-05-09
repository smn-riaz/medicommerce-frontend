"use client"; 

import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  

  return (
    <button
      onClick={toggleTheme}
      className="p-1 border-gray-200 border-[0.5px] rounded-full bg-[#ffffffd2] cursor-pointer dark:bg-gray-800 text-black dark:text-white"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
};
