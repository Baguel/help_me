"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "epitech-c-theme";
const THEME_EVENT = "epitech-theme-change";

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY || event.key === null) {
      applyTheme(event.newValue === "dark" ? "dark" : "light");
    }
  }

  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemePicker({ compact = false }: { compact?: boolean }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "light",
  );
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        applyTheme(saved);
      }
    } catch (error) {
      console.warn("Could not read the saved color theme.", error);
    }
  }, []);

  function chooseTheme(nextTheme: Theme) {
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
      setSaveError(false);
    } catch (error) {
      console.error("Could not save the selected color theme.", error);
      setSaveError(true);
    }
  }

  return (
    <section className={`theme-picker ${compact ? "theme-picker-compact" : ""}`}>
      {!compact && (
        <div className="theme-picker-copy">
          <p className="kicker">TON ESPACE, TON CONFORT</p>
          <h2>Tu préfères quel fond ?</h2>
          <p>
            Clair pour étudier en journée, sombre pour les longues sessions
            devant l’écran. Choisis celui qui te convient.
          </p>
          <span>Notre conseil : le sombre en faible luminosité, le clair en plein jour.</span>
        </div>
      )}
      <div className="theme-picker-controls" aria-label="Choisir le thème">
        <button
          type="button"
          aria-pressed={theme === "light"}
          onClick={() => chooseTheme("light")}
        >
          <span aria-hidden="true">☀</span>
          Clair
          {theme === "light" && <span className="theme-selected">ACTIF</span>}
        </button>
        <button
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => chooseTheme("dark")}
        >
          <span aria-hidden="true">☾</span>
          Sombre
          {theme === "dark" && <span className="theme-selected">ACTIF</span>}
        </button>
      </div>
      {saveError && (
        <p className="theme-save-error" role="status">
          Le thème est appliqué, mais ce navigateur ne peut pas mémoriser ton choix.
        </p>
      )}
    </section>
  );
}
