import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { IMG } from "./lib/assets";
import { ensureGlobalReveal } from "./lib/ui";
import Navbar from "./components/Navbar";
import MkLogo from "./components/Logo";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Company from "./pages/Company";
import { cn } from "./utils/cn";

/* ————————————————————— Preloader ————————————————————— */

function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [fading, setFading] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t0 = performance.now();
    const D = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / D);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.round(ease * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setFading(true);
        setTimeout(onDone, 250);
        setTimeout(() => setLeaving(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (leaving) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink",
        fading && "pre-out"
      )}
      aria-hidden="true"
    >
      {/* Preload the hero frame while counting */}
      <img src={IMG.heroLake} alt="" className="hidden" />
      <div className={cn(fading && "pre-fade")}>
        <div className="flex flex-col items-center">
          <MkLogo size={58} spin />

          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.5em] text-ivory">
            Maklor
          </p>
          <p className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.28em] text-ivory/35">
            Swiss Real Estate Operating System
          </p>
        </div>
      </div>
      <div className={cn("absolute inset-x-0 bottom-0 px-8 pb-10 sm:px-14", fading && "pre-fade")}>
        <div className="flex items-end justify-between">
          <span className="font-display text-7xl font-light text-ivory/90">{n}</span>
          <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-bronze">
            Zug · Switzerland
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-ivory/10">
          <i className="block h-full bg-bronze transition-all duration-150" style={{ width: `${n}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ————————————————————— Cursor ————————————————————— */

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, targetScale = 1;
    let raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      targetScale = t.closest("a,button,[role='button'],input,select,textarea,label") ? 2.1 : 1;
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-1.5 w-1.5 rounded-full bg-bronze lg:block" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[110] hidden h-9 w-9 rounded-full border border-bronze/40 lg:block" />
    </>
  );
}

/* ————————————————————— Router ————————————————————— */

const PAGES: Record<string, { el: React.ComponentType; title: string }> = {
  "/": { el: Home, title: "Maklor — The Operating Infrastructure for Swiss Real Estate" },
  "/platform": { el: Platform, title: "The Platform — Maklor" },
  "/solutions": { el: Solutions, title: "Solutions — Maklor" },
  "/pricing": { el: Pricing, title: "Pricing — Maklor" },
  "/resources": { el: Resources, title: "Resources & Intelligence — Maklor" },
  "/company": { el: Company, title: "The Institution — Maklor" },
};

function getPath() {
  const h = window.location.hash.replace(/^#/, "");
  return PAGES[h] ? h : "/";
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState(getPath);

  /* Smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (window as any).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  /* Reveal engine */
  useEffect(() => {
    ensureGlobalReveal();
  }, []);

  /* Hash routing */
  useEffect(() => {
    const onHash = () => {
      const p = getPath();
      setPath(p);
      document.title = PAGES[p].title;
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    document.title = PAGES[getPath()].title;
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const Page = PAGES[path].el;

  return (
    <div className="grain min-h-screen bg-ink">
      <Preloader onDone={() => setReady(true)} />
      {ready && (
        <>
          <Cursor />
          <Navbar current={path} />
          <main key={path} className="page-in">
            <Page />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
