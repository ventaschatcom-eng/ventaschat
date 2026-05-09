"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "ventaschat-theme";
const LEGACY_THEME_KEY = "ventaflow-theme";
const THEME_EVENT = "ventaschat-theme-change";
const LEGACY_THEME_EVENT = "ventaflow-theme-change";

function applyTheme(nextTheme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", nextTheme === "dark");
  root.dataset.theme = nextTheme;
  window.localStorage.setItem(THEME_KEY, nextTheme);
  window.localStorage.setItem(LEGACY_THEME_KEY, nextTheme);
  window.dispatchEvent(new Event(THEME_EVENT));
  window.dispatchEvent(new Event(LEGACY_THEME_EVENT));
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener(LEGACY_THEME_EVENT, onStoreChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener(LEGACY_THEME_EVENT, onStoreChange);
  };
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot() {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = `Cambiar a modo ${nextTheme}`;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        applyTheme(nextTheme);
      }}
      aria-label={label}
      title={label}
    >
      <Sun className={`theme-icon ${theme === "light" ? "theme-icon-active" : ""}`} size={16} />
      <Moon className={`theme-icon ${theme === "dark" ? "theme-icon-active" : ""}`} size={16} />
    </button>
  );
}
