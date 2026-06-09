"use client";

import { useEffect } from "react";

/**
 * Fuerza el tema claro mientras este componente está montado.
 * Útil en rutas como /lovechat donde el tema rosa luce mejor en light.
 * Al desmontarse (navegar a otra ruta), restaura la preferencia guardada.
 */
export function ForceLightTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.dataset.theme = "light";

    return () => {
      try {
        const saved = localStorage.getItem("ventaschat-theme-v2");
        const dark = saved === "dark";
        root.classList.toggle("dark", dark);
        root.dataset.theme = dark ? "dark" : "light";
      } catch {}
    };
  }, []);

  return null;
}
