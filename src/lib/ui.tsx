import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  HTMLAttributes,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../utils/cn";

/* ————————————————— Scroll reveal ————————————————— */

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    el.querySelectorAll(".rv, .rv-line, .rv-img").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  style,
  ...rest
}: {
  children?: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
  style?: CSSProperties;
} & HTMLAttributes<HTMLElement>) {
  useRevealObserverHack();
  return (
    <Tag
      className={cn("rv", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Lightweight: ensure any mounted Reveal gets observed by nearest useReveal root */
function useRevealObserverHack() {}

/* Global observer — attach once, watches all .rv nodes added to DOM */
let globalIO: IntersectionObserver | null = null;
export function ensureGlobalReveal() {
  if (globalIO || typeof window === "undefined") return;
  globalIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          globalIO?.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
  );
  const mo = new MutationObserver(() => bindAll());
  mo.observe(document.body, { childList: true, subtree: true });
  bindAll();
  function bindAll() {
    document
      .querySelectorAll(
        ".rv:not(.is-in), .rv-line:not(.is-in), .rv-img:not(.is-in), .rv-words:not(.is-in)"
      )
      .forEach((n) => globalIO?.observe(n));
  }
}

/* Word-by-word masked headline — wraps each word in an overflow-hidden cloak */
export function RevealWords({
  text,
  className,
  step = 75,
}: {
  text: string;
  className?: string;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("rv-words", className)}>
      {words.map((w, i) => (
        <span key={i} className="w" style={{ marginRight: "0.26em" }}>
          <span style={{ transitionDelay: `${i * step}ms` }}>{w}</span>
        </span>
      ))}
    </span>
  );
}

/* Subtle 3D tilt that follows the pointer — depth without hurt */
export function Tilt3D({
  children,
  max = 7,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const card = inner.current!;
    let tz = 0, tzT = 0;
    let raf = 0;
    let rx = 0, ry = 0, trx = 0, tryy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tryy = px * max;
      trx = -py * max;
      tzT = 14;
    };
    const onLeave = () => {
      trx = 0;
      tryy = 0;
      tzT = 0;
    };
    const loop = () => {
      rx += (trx - rx) * 0.09;
      ry += (tryy - ry) * 0.09;
      tz += (tzT - tz) * 0.09;
      card.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${tz.toFixed(1)}px)`;
      raf = requestAnimationFrame(loop);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return (
    <div ref={ref} className={cn("[perspective:1100px]", className)}>
      <div ref={inner} className="will-change-transform [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  );
}

/* ————————————————— Parallax ————————————————— */

export function Parallax({
  children,
  strength = 60,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let cur = 0;
    const loop = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      const target = Math.max(-1, Math.min(1, progress)) * strength;
      cur += (target - cur) * 0.08;
      el.style.transform = `translate3d(0, ${cur.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [strength]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/* ————————————————— Type & layout atoms ————————————————— */

export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        light ? "text-bronze-3" : "text-bronze",
        className
      )}
    >
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  light = false,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  light?: boolean;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <Eyebrow light={light} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={cn(
            "font-display display-md mt-6",
            light ? "text-ink" : "text-ivory"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={180}>
          <p
            className={cn(
              "mt-6 max-w-xl text-[15px] leading-relaxed",
              light ? "text-ink/60" : "text-ivory/55",
              align === "center" && "mx-auto"
            )}
          >
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ————————————————— Buttons ————————————————— */

export function Btn({
  children,
  variant = "gold",
  href,
  onClick,
  className,
  arrow = true,
}: {
  children: ReactNode;
  variant?: "gold" | "ghost" | "ink" | "paper";
  href?: string;
  onClick?: () => void;
  className?: string;
  arrow?: boolean;
}) {
  const base = cn(
    "btn-lux group/btn inline-flex items-center gap-3 px-7 py-[15px] font-mono text-[11px] uppercase tracking-[0.22em]",
    variant === "gold" && "bg-bronze text-onb",
    variant === "ghost" &&
      "border border-ivory/25 text-ivory hover:border-bronze hover:text-ink",
    variant === "ink" && "bg-ink text-ivory border border-ink",
    variant === "paper" && "bg-paper text-ink border border-paper",
    className
  );
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.5}
          className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      )}
    </>
  );
  if (href)
    return (
      <a href={href} onClick={onClick} className={base}>
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={base}>
      {inner}
    </button>
  );
}

/* ————————————————— Counter ————————————————— */

export function Counter({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
  className,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(end * ease);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ————————————————— Live clock ————————————————— */

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    <span className={cn("font-mono text-[10px] tracking-[0.2em]", className)}>
      {DAYS[now.getDay()]} · {p(now.getDate())} {MONTHS[now.getMonth()]} ·{" "}
      {p(now.getHours())}:{p(now.getMinutes())}:{p(now.getSeconds())}
    </span>
  );
}

/* ————————————————— Status pill ————————————————— */

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: "green" | "amber" | "red" | "bronze" | "mute";
  children: ReactNode;
  className?: string;
}) {
  const map = {
    green: "text-sage border-sage/30 bg-sage/10",
    amber: "text-amber border-amber/30 bg-amber/10",
    red: "text-clay border-clay/30 bg-clay/10",
    bronze: "text-bronze border-bronze/30 bg-bronze/10",
    mute: "text-ivory/50 border-ivory/15 bg-ivory/5",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em]",
        map[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ————————————————— Marquee ————————————————— */

export function Marquee({
  children,
  className,
  duration = 42,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ————————————————— Navigation helpers ————————————————— */

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.8 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function goWalkthrough() {
  const h = window.location.hash;
  if (h !== "" && h !== "#/" && h !== "#") {
    window.location.hash = "#/";
    setTimeout(() => scrollToId("walkthrough"), 950);
  } else {
    scrollToId("walkthrough");
  }
}

export const route = (path: string) => `#${path}`;
