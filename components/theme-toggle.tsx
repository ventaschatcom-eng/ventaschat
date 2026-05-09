"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(nextTheme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", nextTheme === "dark");
  root.dataset.theme = nextTheme;
  window.localStorage.setItem("ventaschat-theme", nextTheme);
}

export function ThemeToggle() {
  const [, setVersion] = useState(0);

  const theme =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        applyTheme(nextTheme);
        setVersion((current) => current + 1);
      }}
      aria-label={`Cambiar a modo ${nextTheme}`}
      title={`Cambiar a modo ${nextTheme}`}
    >
      <Sun className={`theme-icon ${theme === "light" ? "theme-icon-active" : ""}`} size={16} />
      <Moon className={`theme-icon ${theme === "dark" ? "theme-icon-active" : ""}`} size={16} />
    </button>
  );
}
