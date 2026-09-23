import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Menu, X, ArrowUpRight } from "lucide-react";
import MkLogo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { NAV_I18N } from "../lib/assets";
import { goWalkthrough, route } from "../lib/ui";
import { cn } from "../utils/cn";

const LANGS = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
];

const LINKS = [
  { key: "platform", path: "/platform" },
  { key: "solutions", path: "/solutions" },
  { key: "pricing", path: "/pricing" },
  { key: "resources", path: "/resources" },
  { key: "company", path: "/company" },
];

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="#/"
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label="Maklor — home"
    >
      <span className="transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[90deg]">
        <MkLogo size={30} />
      </span>
      <span className="font-mono text-[13px] uppercase tracking-[0.42em] text-ivory">
        Maklor
      </span>
    </a>
  );
}

export default function Navbar({ current }: { current: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem("mk-lang") || "EN");
  const [progress, setProgress] = useState(0);
  const langRef = useRef<HTMLDivElement>(null);
  const t = NAV_I18N[lang] || NAV_I18N.EN;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (code: string) => {
    setLang(code);
    localStorage.setItem("mk-lang", code);
    setLangOpen(false);
  };

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[90] h-[2px]">
        <i
          className="block h-full origin-left bg-gradient-to-r from-bronze-3 via-bronze to-bronze-2"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-700",
          scrolled
            ? "border-b border-ivory/[0.08] bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1560px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Wordmark />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={route(l.path)}
                className={cn(
                  "nav-link font-mono text-[10.5px] uppercase tracking-[0.22em] transition-colors duration-300",
                  current === l.path ? "active text-bronze" : "text-ivory/60 hover:text-ivory"
                )}
              >
                {t[l.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeSwitcher />
            {/* Language switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 border border-ivory/15 px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:border-bronze/50 hover:text-bronze"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Select language"
              >
                <Globe size={12} strokeWidth={1.5} />
                {lang}
                <ChevronDown
                  size={11}
                  className={cn("transition-transform duration-300", langOpen && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "absolute right-0 top-[calc(100%+8px)] w-40 origin-top-right border border-ivory/12 bg-ink-2/95 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-300",
                  langOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                )}
                role="listbox"
              >
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => pick(l.code)}
                    role="option"
                    aria-selected={lang === l.code}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                      lang === l.code
                        ? "bg-bronze/10 text-bronze"
                        : "text-ivory/55 hover:bg-ivory/5 hover:text-ivory"
                    )}
                  >
                    {l.label}
                    {lang === l.code && <i className="h-1 w-1 rounded-full bg-bronze" />}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#/"
              className="hidden font-mono text-[10.5px] uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-ivory xl:block"
            >
              {t.login}
            </a>

            <button
              onClick={goWalkthrough}
              className="btn-lux hidden items-center gap-2 bg-bronze px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-onb sm:inline-flex"
            >
              <span className="relative z-10 hidden xl:inline">{t.cta}</span>
              <span className="relative z-10 xl:hidden">Demo</span>
              <ArrowUpRight size={12} className="relative z-10" />
            </button>

            <button
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-ivory/15 text-ivory lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ————— Mobile / overlay menu ————— */}
      <div
        className={cn(
          "fixed inset-0 z-[100] flex flex-col bg-ink transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="flex h-[68px] items-center justify-between px-5 sm:px-8">
          <Wordmark onClick={() => setOpen(false)} />
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center border border-ivory/15 text-ivory"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Mobile">
          {[{ key: "home", path: "/", label: "Home" }].concat(
            LINKS.map((l) => ({ ...l, label: t[l.key] }))
          ).map((l, i) => (
            <a
              key={l.key}
              href={route(l.path)}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-baseline gap-4 border-b border-ivory/[0.07] py-4 transition-all duration-700",
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <span className="font-mono text-[10px] text-bronze/60">
                0{i + 1}
              </span>
              <span
                className={cn(
                  "font-display text-4xl font-light transition-colors duration-300 group-hover:text-bronze",
                  current === l.path ? "text-bronze" : "text-ivory"
                )}
              >
                {l.label}
              </span>
              <ArrowUpRight
                size={18}
                className="ml-auto text-ivory/25 transition-all duration-300 group-hover:text-bronze"
              />
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap items-center gap-3 px-8 pb-10">
          <button
            onClick={() => {
              setOpen(false);
              goWalkthrough();
            }}
            className="btn-lux inline-flex items-center gap-2 bg-bronze px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-onb"
          >
            <span className="relative z-10">{t.cta}</span>
          </button>
          <span className="border border-ivory/15 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/60">
            {t.signup}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <ThemeSwitcher compact />
          </div>
          <div className="flex gap-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => pick(l.code)}
                className={cn(
                  "px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em]",
                  lang === l.code ? "text-bronze" : "text-ivory/40"
                )}
              >
                {l.code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
