import { useEffect, useState } from "react";
import { Moon, Sun, Gem } from "lucide-react";
import { cn } from "../utils/cn";

export type ThemeName = "dark" | "light" | "gold";

const THEMES: { key: ThemeName; label: string; icon: typeof Moon }[] = [
  { key: "dark", label: "Onyx", icon: Moon },
  { key: "light", label: "Alabaster", icon: Sun },
  { key: "gold", label: "Aurum", icon: Gem },
];

export function getTheme(): ThemeName {
  const t = localStorage.getItem("mk-theme");
  return t === "light" || t === "dark" || t === "gold" ? t : "gold";
}

export function applyTheme(t: ThemeName) {
  document.documentElement.dataset.theme = t;
  localStorage.setItem("mk-theme", t);
}

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeName>("gold");
  useEffect(() => setTheme(getTheme()), []);

  const idx = THEMES.findIndex((t) => t.key === theme);
  const pick = (t: ThemeName) => {
    setTheme(t);
    applyTheme(t);
    window.dispatchEvent(new CustomEvent("mk-theme", { detail: t }));
  };

  if (compact) {
    return (
      <div className="flex gap-1">
        {THEMES.map((t) => (
          <button
            key={t.key}
            onClick={() => pick(t.key)}
            aria-label={`${t.label} theme`}
            aria-pressed={theme === t.key}
            className={cn(
              "flex items-center gap-1.5 border px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-300",
              theme === t.key
                ? "border-bronze bg-bronze/10 text-bronze"
                : "border-ivory/15 text-ivory/45 hover:border-ivory/35 hover:text-ivory"
            )}
          >
            <t.icon size={11} /> {t.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center border border-ivory/15 p-[3px]"
      role="group"
      aria-label="Theme switcher"
    >
      {/* sliding thumb */}
      <i
        className="absolute bottom-[3px] left-[3px] top-[3px] bg-bronze transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: 30, transform: `translateX(${idx * 30}px)` }}
        aria-hidden
      />
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => pick(t.key)}
          aria-label={`${t.label} theme`}
          title={`${t.label} theme`}
          className={cn(
            "relative z-10 flex h-[24px] w-[30px] items-center justify-center transition-colors duration-300",
            theme === t.key ? "text-onb" : "text-ivory/50 hover:text-ivory"
          )}
        >
          <t.icon size={12} strokeWidth={1.75} />
        </button>
      ))}
    </div>
  );
}
