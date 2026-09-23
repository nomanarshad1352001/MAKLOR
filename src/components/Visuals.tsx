import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Cpu,
  FileText,
  Hand,
  MessageSquare,
  FileStack,
  Gauge,
  Radar,
  Landmark,
} from "lucide-react";
import { Counter, Eyebrow, Reveal } from "../lib/ui";
import { CommandCard, NotaryCockpit, SignalTable } from "./Mockups";
import { cn } from "../utils/cn";

/* —————————————————————————————————————————
   useProgress — scroll progress (0..1) of a tall
   wrapper that hosts a sticky full-screen stage
————————————————————————————————————————— */

export function useProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const loop = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const raw = total > 0 ? -r.top / total : 0;
      const v = Math.max(0, Math.min(1, raw));
      setP((prev) => (Math.abs(prev - v) > 0.004 ? v : prev));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return { ref, p };
}

/* —————————————————————————————————————————
   SplitBoard — before/after workflow story
   WhatsApp chaos morphs into Maklor order on scroll
————————————————————————————————————————— */

const CHAOS = [
  { t: "Seller sent 3rd price change…", right: false, y: -34, x: -4, rot: -3.5 },
  { t: "Notary still needs the extract?", right: true, y: 16, x: 5, rot: 2.2 },
  { t: "Where is the buyer financing??", right: false, y: -8, x: -7, rot: 1.8 },
  { t: "Dossier_v4_FINAL_final.pdf", right: true, y: 30, x: -2, rot: -2.6 },
];

const ORDER_ROWS = [
  { t: "Price change firmed — comparables attached", d: "08:12" },
  { t: "Land registry extract — ordered 09 MAR", d: "09:05" },
  { t: "Buyer financing — recorded in dossier", d: "10:41" },
  { t: "Owner report — generated, on brand", d: "11:02" },
];

export function SplitBoard() {
  const { ref, p } = useProgress<HTMLDivElement>();
  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Headline crossfade */}
        <div className="relative z-30 mb-6 px-6 text-center">
          <p className="eyebrow text-bronze-3">Before / After · One Mandate</p>
          <div className="relative mt-4 h-[1.35em] font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-none">
            <span
              className="absolute left-1/2 top-0 w-full -translate-x-1/2 text-ivory"
              style={{ opacity: Math.max(0, 1 - p * 1.7), transform: `translateX(-50%) translateY(${p * -26}px)` }}
            >
              The chaos.
            </span>
            <span
              className="gold-text absolute left-1/2 top-0 w-full -translate-x-1/2 italic"
              style={{
                opacity: Math.max(0, (p - 0.32) * 2),
                transform: `translateX(-50%) translateY(${(1 - Math.min(1, p * 2)) * 26}px)`,
              }}
            >
              The Maklor way.
            </span>
          </div>
        </div>

        {/* Boards */}
        <div className="relative h-[400px] w-[min(92vw,760px)] [perspective:1400px]">
          {/* CHAOS — intentionally literal-dark bubbles on a dark slab */}
          <div
            className="absolute left-0 top-1/2 w-[76%] -translate-y-1/2 rounded-xl border border-white/10 bg-[#1b1712] p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)]"
            style={{
              transform: `translateY(-50%) translateX(${p * -18}%) rotateY(${p * -22}deg) rotateZ(${-1.5 - p * 2}deg)`,
              opacity: 1 - p * 0.55,
              filter: `saturate(${1 - p * 0.6})`,
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/45">
                Tuesday · WhatsApp → Email → Excel
              </span>
              <span className="rounded-full bg-clay/20 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-clay">
                Before
              </span>
            </div>
            <div className="relative mt-4 h-[280px]">
              {CHAOS.map((m, i) => (
                <div
                  key={m.t}
                  className={cn(
                    "absolute max-w-[78%] rounded-lg px-3.5 py-2.5 text-[11.5px] leading-snug shadow-lg",
                    m.right ? "right-0 bg-[#2e3b33] text-white/85" : "left-0 bg-[#272219] text-white/80"
                  )}
                  style={{
                    top: `${8 + i * 23}%`,
                    transform: `translate(${m.x}%, ${m.y + p * (i % 2 ? 24 : -24)}%) rotate(${m.rot + p * (i % 2 ? 4 : -4)}deg)`,
                    opacity: 1 - p * 0.35,
                  }}
                >
                  {m.t}
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.18em] text-clay/90">
              Commission at risk · nobody knows why
            </p>
          </div>

          {/* ORDER */}
          <div
            className="panel-dark absolute right-0 top-1/2 w-[74%] -translate-y-1/2 rounded-xl p-5"
            style={{
              transform: `translateY(-50%) translateX(${(1 - p) * 34}%) rotateY(${(1 - p) * 18}deg) rotateZ(${2 - p * 2.5}deg) scale(${0.92 + p * 0.08})`,
              opacity: 0.25 + p * 0.75,
              zIndex: p > 0.5 ? 20 : 10,
            }}
          >
            <div className="flex items-center justify-between border-b border-ivory/10 pb-3">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-ivory/50">
                Maklor · Closing Cockpit · Seestrasse 14
              </span>
              <span className="rounded-full border border-sage/40 bg-sage/15 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-sage">
                After
              </span>
            </div>
            <div className="mt-3 space-y-2">
              {ORDER_ROWS.map((r, i) => (
                <div
                  key={r.t}
                  className="flex items-center gap-3 rounded-md border border-ivory/[0.08] bg-ink-2/80 px-3 py-2.5"
                  style={{
                    transform: `translateY(${(1 - p) * (18 - i * 4)}px)`,
                    opacity: 0.3 + p * 0.7,
                  }}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sage/50 bg-sage/10 text-sage">
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden>
                      <path
                        d="M1 3.5 3.2 5.7 8 1"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeDasharray="12"
                        strokeDashoffset={p > 0.25 + i * 0.15 ? "0" : "12"}
                        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                      />
                    </svg>
                  </span>
                  <span className="flex-1 text-[12px] text-ivory/85">{r.t}</span>
                  <span className="font-mono text-[9px] text-ivory/35">{r.d}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-md bg-sage/10 px-3 py-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-sage">
                Commission · Secured
              </span>
              <span className="font-display text-lg text-ivory">CHF 71,000</span>
            </div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="mt-8 flex items-center gap-3">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/40">WhatsApp</span>
          <div className="h-px w-40 overflow-hidden bg-ivory/20">
            <i className="block h-full origin-left bg-bronze" style={{ transform: `scaleX(${p})` }} />
          </div>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-bronze">Maklor</span>
        </div>
      </div>
    </div>
  );
}

/* —————————————————————————————————————————
   CommandCurve — scroll-drawn signal chart
————————————————————————————————————————— */

const PTS = [82, 78, 74, 69, 66, 61, 58, 52, 47, 43, 38, 34];

function curvePath(vals: number[], w: number, h: number) {
  const max = 100;
  const step = w / (vals.length - 1);
  return vals
    .map((v, i) => {
      const x = i * step;
      const y = h - (v / max) * h;
      const prevY = i === 0 ? y : h - (vals[i - 1] / max) * h;
      if (i === 0) return `M ${x} ${y}`;
      const cx = x - step / 2;
      return `C ${cx} ${prevY}, ${cx} ${y}, ${x} ${y}`;
    })
    .join(" ");
}

export function CommandCurve() {
  const { ref, p } = useProgress<HTMLDivElement>();
  const W = 640;
  const H = 190;
  const path = curvePath(PTS, W, H);
  const areaPath = `${path} L ${W} ${H} L 0 ${H} Z`;
  const pathLen = 1100;
  const reveal = Math.min(1, p * 1.35);
  const hit = Math.min(1, Math.max(0, (p - 0.62) * 4));

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="grid w-full max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div style={{ opacity: 0.25 + reveal * 0.75, transform: `translateY(${(1 - reveal) * 30}px)` }}>
            <p className="eyebrow text-bronze-3">Dynamic Data · Signal Score</p>
            <h3 className="font-display display-md mt-4 text-ivory">
              Watch a listing lose momentum —{" "}
              <em className="gold-text not-italic">and strike at the right week.</em>
            </h3>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ivory/55">
              Twelve weeks of a Küsnacht villa — asking price, change cadence,
              time online, fused into one score your agent can act on.
            </p>
          </div>

          <div className="panel-dark rounded-xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/45">
                Küsnacht · Villa · Signal score
              </span>
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-sage">
                <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-sage" /> Live source
              </span>
            </div>
            <svg viewBox={`0 0 ${W} ${H + 42}`} className="mt-5 w-full" role="img" aria-label="Signal score over twelve weeks, rising as price momentum drops">
              <defs>
                <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--t-bronze)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--t-bronze)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--t-ivory)" strokeOpacity="0.08" strokeDasharray="3 5" />
              ))}
              <path d={areaPath} fill="url(#curveFill)" opacity={reveal * (hit ? 0.35 : 0.7)} />
              <path
                d={path}
                fill="none"
                stroke="var(--t-bronze)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray={pathLen}
                strokeDashoffset={pathLen * (1 - reveal)}
              />
              {/* Intervention */}
              <line x1={W * 0.68} x2={W * 0.68} y1="6" y2={H} stroke="var(--t-sage)" strokeOpacity="0.55" strokeDasharray="4 4" opacity={hit} />
              <g opacity={hit} style={{ transformOrigin: `${W * 0.68}px ${H - 0.58 * H}px`, transform: `scale(${0.6 + hit * 0.4})` }}>
                <circle cx={W * 0.68} cy={H - 0.58 * H} r="5.5" fill="var(--t-sage)" />
                <circle cx={W * 0.68} cy={H - 0.58 * H} r="11" fill="none" stroke="var(--t-sage)" strokeOpacity="0.4" />
              </g>
              <text x={W * 0.68} y={H + 16} textAnchor="middle" fontSize="10" fill="var(--t-sage)" opacity={hit} fontFamily="JetBrains Mono, monospace" letterSpacing="2">
                MAKlor CALLS HERE
              </text>
              <circle cx={W} cy={H - 0.34 * H} r="5" fill="var(--t-bronze)" opacity={reveal > 0.9 ? 1 : 0} />
              <text x={W} y={H - 0.34 * H - 16} textAnchor="end" fontSize="13" fill="var(--t-ivory)" opacity={reveal > 0.9 ? 1 : 0} fontFamily="Fraunces, serif" fontStyle="italic">
                score 8.6
              </text>
            </svg>
            <div className="mt-2 flex justify-between font-mono text-[8.5px] uppercase tracking-[0.16em] text-ivory/35">
              <span>Week 1 · CHF 4.9M ask</span>
              <span>Week 6 · −4%</span>
              <span>Week 12 · −9% total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* —————————————————————————————————————————
   SignalMap — interactive Switzerland atlas
————————————————————————————————————————— */

const HOTSPOTS = [
  { x: 55, y: 36, name: "Zürich", score: "8.6", t: "Price drop −9% · second reduction", active: true },
  { x: 33.5, y: 17, name: "Bern", score: "6.8", t: "112 days online · no change", active: false },
  { x: 42, y: 51, name: "Zug", score: "8.1", t: "3 price changes in 11 weeks", active: true },
  { x: 18, y: 63, name: "Genève", score: "7.4", t: "96 days online · first reduction", active: false },
  { x: 68, y: 19, name: "St. Gallen", score: "6.9", t: "First reduction · plot", active: false },
  { x: 71, y: 48, name: "Lugano", score: "7.7", t: "Price drop −6% · lake view", active: true },
];

export function SignalMap() {
  const [sel, setSel] = useState(0);
  const spot = HOTSPOTS[sel];
  return (
    <div className="panel-dark relative overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-ivory/10 px-5 py-3.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ivory/45">
          Maklor Intelligence · Signal Atlas · CH
        </span>
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-sage">
          <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-sage" /> 37 live
        </span>
      </div>
      <div className="relative">
        <svg viewBox="0 0 100 72" className="block w-full" role="img" aria-label="Interactive signal map of Switzerland">
          {/* Simplified federal boundary of Switzerland */}
          <path
            d="M14 44 20 34 26 30 33 19 42 14 52 12 62 10 71 14 77 21 84 25 88 32 85 40 79 44 84 50 76 54 66 52 58 57 48 55 40 58 32 52 24 54 18 49 Z"
            fill="var(--t-ink-3)"
            stroke="var(--t-bronze)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
          <path
            d="M14 44 20 34 26 30 33 19 42 14 52 12 62 10 71 14 77 21 84 25 88 32 85 40 79 44 84 50 76 54 66 52 58 57 48 55 40 58 32 52 24 54 18 49 Z"
            fill="none"
            stroke="var(--t-bronze)"
            strokeOpacity="0.8"
            strokeWidth="0.35"
            strokeDasharray="1.4 1.1"
          />
          {/* canton veins */}
          {[
            "M33 19 q 6 14 -1 33",
            "M47 14 q 5 16 -3 41",
            "M62 10 q 8 14 -4 42",
            "M74 18 q 4 16 -8 30",
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--t-bronze)" strokeOpacity="0.2" strokeWidth="0.3" strokeDasharray="1 1.4" />
          ))}
          {/* minor canton dots */}
          {[
            [30, 34], [38, 44], [47, 28], [52, 46], [58, 22], [62, 40], [66, 30], [76, 38], [26, 46],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1" fill="var(--t-bronze)" opacity="0.5" />
          ))}
          {/* geo hotspots — tap to inspect */}
          {HOTSPOTS.map((h, i) => (
            <g key={h.name} onClick={() => setSel(i)} className="cursor-pointer" role="button" aria-label={`${h.name} signal`}>
              <circle cx={h.x} cy={h.y} r="7" fill="transparent" />
              {h.active && (
                <circle cx={h.x} cy={h.y} r="2.6" fill="none" stroke="var(--t-bronze)" strokeWidth="0.5">
                  <animate attributeName="r" values="2.6;7" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="2.6s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={h.x}
                cy={h.y}
                r={sel === i ? 3 : 2.1}
                fill={sel === i ? "var(--t-bronze-2)" : "var(--t-bronze)"}
                stroke="var(--t-panel-a)"
                strokeWidth="0.7"
                style={{ transition: "r 0.4s cubic-bezier(0.16,1,0.3,1), fill 0.4s" }}
              />
            </g>
          ))}
          {/* canton labels */}
          {HOTSPOTS.map((h, i) => (
            <text
              key={h.name}
              x={h.x}
              y={h.y - 4.4}
              textAnchor="middle"
              fontSize="3.2"
              fill={sel === i ? "var(--t-ivory)" : "var(--t-ivory)"}
              fillOpacity={sel === i ? 1 : 0.45}
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.6"
              style={{ transition: "fill-opacity 0.3s", textTransform: "uppercase" }}
            >
              {h.name.toUpperCase()}
            </text>
          ))}
          {/* compass */}
          <g transform="translate(91 10)" opacity="0.7">
            <circle r="3.4" fill="none" stroke="var(--t-bronze)" strokeWidth="0.3" />
            <path d="M0 -2.4 L0.9 1.7 L0 0.9 L-0.9 1.7 Z" fill="var(--t-bronze)" />
          </g>
          <text x="6" y="66" fontSize="3" fill="var(--t-ivory)" fillOpacity="0.4" fontFamily="JetBrains Mono, monospace" letterSpacing="1.4">
            PUBLIC LISTINGS · LIVE WATCH
          </text>
        </svg>

        {/* Floating insight card */}
        <div
          key={spot.name}
          className="tab-in absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-lg border border-ivory/15 bg-ink/85 px-4 py-3 backdrop-blur-md sm:right-auto sm:min-w-[320px]"
        >
          <div>
            <p className="text-[13px] font-medium text-ivory">{spot.name} · listing signal</p>
            <p className="mt-0.5 text-[10.5px] text-ivory/50">{spot.t}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl leading-none text-bronze">{spot.score}</p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-sage">Call first</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* —————————————————————————————————————————
   MetricViz — counters + scroll-drawn sparklines
————————————————————————————————————————— */

const METRICS: {
  v: number;
  dec?: number;
  suffix?: string;
  pre?: string;
  label: string;
  path: string;
  dotY: number;
}[] = [
  {
    v: 37,
    label: "Live listing signals across Switzerland — right now",
    path: "M0 34 C14 30 22 22 36 24 C50 26 58 13 72 16 C86 19 96 8 110 9 C118 10 124 5 130 4",
    dotY: 4,
  },
  {
    v: 7,
    suffix: "h",
    label: "Of admin per mandate, returned to selling",
    path: "M0 10 C16 12 24 22 38 24 C52 26 60 30 74 31 C88 32 98 34 112 33 C120 32 126 33 130 34",
    dotY: 34,
  },
  {
    v: 2.84,
    dec: 2,
    pre: "CHF ",
    suffix: "M",
    label: "Average live pipeline tracked per firm",
    path: "M0 36 C12 34 20 28 34 26 C48 24 56 18 70 15 C84 12 94 16 108 10 C118 6 126 7 130 3",
    dotY: 3,
  },
];

function Spark({ path, dotY, delay }: { path: string; dotY: number; delay: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 130 38" className="mt-5 h-9 w-full" aria-hidden="true">
      <path
        d={`${path} L 130 38 L 0 38 Z`}
        fill="var(--t-bronze)"
        fillOpacity="0.14"
        opacity={on ? 1 : 0}
        style={{ transition: `opacity 1.4s ease ${delay + 0.5}s` }}
      />
      <path
        d={path}
        fill="none"
        stroke="var(--t-bronze)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="240"
        strokeDashoffset={on ? "0" : "240"}
        style={{ transition: `stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}
      />
      <circle cx="130" cy={dotY} r="3" fill="var(--t-bronze)" opacity={on ? 1 : 0} style={{ transition: `opacity 0.4s ease ${delay + 1.4}s` }} />
    </svg>
  );
}

export function MetricViz() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-ivory/10 bg-ivory/10 lg:grid-cols-3">
      {METRICS.map((m, i) => (
        <div key={m.label} className="fb-card bg-ink-3 px-7 py-8 sm:px-10 sm:py-10">
          <div className="flex items-baseline gap-2">
            <Counter
              end={m.v}
              decimals={m.dec ?? 0}
              prefix={m.pre ?? ""}
              suffix={m.suffix ?? ""}
              className="font-display text-6xl font-light text-ivory"
            />
          </div>
          <p className="mt-3 max-w-[250px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ivory/45">
            {m.label}
          </p>
          <Spark path={m.path} dotY={m.dotY} delay={0.18 * i} />
        </div>
      ))}
    </div>
  );
}

/* —————————————————————————————————————————
   ProductTabs — interactive auto-cycling product screens
————————————————————————————————————————— */

const SCREENS = [
  {
    icon: Gauge,
    tag: "01 · Daily Command",
    head: "A list of decisions, not leads.",
    copy: "Signals, interventions and dossier deadlines — weighted by commission impact.",
  },
  {
    icon: Radar,
    tag: "02 · Signal Intelligence",
    head: "The listings losing momentum.",
    copy: "Price drops, time online, repeated changes — scored live across Switzerland.",
  },
  {
    icon: Landmark,
    tag: "03 · Notary Cockpit",
    head: "Which commission is secured.",
    copy: "Every cantonal document tracked, item by item, until the deed is signed.",
  },
];

export function ProductTabs({ cadence = 6000 }: { cadence?: number }) {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced.current) return;
    const id = setInterval(() => setTab((t) => (t + 1) % SCREENS.length), cadence);
    return () => clearInterval(id);
  }, [paused, cadence]);

  return (
    <div
      className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Selector rail */}
      <div>
        <Reveal>
          <Eyebrow>Interactive Screens</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h3 className="font-display display-md mt-5 text-ivory">
            Three instruments.{" "}
            <em className="gold-text not-italic">One movement.</em>
          </h3>
        </Reveal>
        <div className="mt-10" role="tablist" aria-label="Product screens">
          {SCREENS.map((s, i) => (
            <button
              key={s.tag}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className="group w-full border-b border-ivory/10 py-5 text-left first:border-t"
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                    tab === i
                      ? "border-bronze bg-bronze/15 text-bronze"
                      : "border-ivory/15 text-ivory/40 group-hover:border-ivory/35"
                  )}
                >
                  <s.icon size={15} strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("font-mono text-[9px] uppercase tracking-[0.22em] transition-colors", tab === i ? "text-bronze" : "text-ivory/35")}>
                    {s.tag}
                  </p>
                  <p className={cn("mt-1 font-display text-xl transition-colors duration-300", tab === i ? "text-ivory" : "text-ivory/45 group-hover:text-ivory/70")}>
                    {s.head}
                  </p>
                  <p className={cn("mt-1 text-[12px] leading-relaxed transition-colors duration-500", tab === i ? "text-ivory/55" : "text-ivory/30")}>
                    {s.copy}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-px w-full bg-ivory/10">
                <i
                  key={`${tab}-${paused ? "p" : "r"}`}
                  className={cn("sweep block h-full bg-bronze", tab === i && !paused ? "" : "hidden")}
                  style={{ animationDuration: `${cadence}ms` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Screen stage */}
      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-bronze/[0.05] blur-2xl" aria-hidden />
        <div key={tab} className="tab-in relative">
          {tab === 0 && <CommandCard />}
          {tab === 1 && <SignalTable />}
          {tab === 2 && <NotaryCockpit stepper />}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              aria-label={`Show screen ${i + 1}`}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                tab === i ? "w-8 bg-bronze" : "w-3 bg-ivory/20 hover:bg-ivory/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* —————————————————————————————————————————
   FlowDiagram — animated orchestration, one mandate
————————————————————————————————————————— */

const MAK_STEPS = [
  { icon: Camera, label: "Capture in field", note: "Photos, scan, voice — offline", day: "Day 01" },
  { icon: Cpu, label: "Intelligence sorts", note: "Rooms, figures, comparables", day: "Auto" },
  { icon: FileText, label: "Dossier generated", note: "Logo, colours, PDF — 4 min", day: "Auto" },
  { icon: Hand, label: "Owner meeting", note: "Price defended with evidence", day: "Day 02" },
  { icon: Landmark, label: "Closing tracked", note: "Every document, to the deed", day: "→ Deed" },
];

const OLD_STEPS = [
  { icon: Hand, label: "Notebook & phone" },
  { icon: MessageSquare, label: "WhatsApp threads" },
  { icon: FileStack, label: "Excel juggling" },
  { icon: Hand, label: "Owner meeting by memory" },
  { icon: MessageSquare, label: "Email ping-pong to notary" },
];

export function FlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="panel-dark overflow-hidden rounded-xl">
      <div className="grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Maklor flow */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-bronze">With Maklor</span>
            <span className="rounded-full border border-sage/40 bg-sage/15 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-sage">
              Commission secured
            </span>
          </div>
          <div className="mt-6 space-y-0">
            {MAK_STEPS.map((s, i) => (
              <div key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
                {i < MAK_STEPS.length - 1 && (
                  <span
                    className="absolute left-[17px] top-9 h-[calc(100%-2rem)] w-px bg-bronze/50"
                    style={{
                      transformOrigin: "top",
                      transform: on ? "scaleY(1)" : "scaleY(0)",
                      transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.28}s`,
                    }}
                  />
                )}
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze/45 bg-bronze/10 text-bronze"
                  style={{
                    transform: on ? "scale(1)" : "scale(0.4)",
                    opacity: on ? 1 : 0,
                    transition: `all 0.55s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.28}s`,
                  }}
                >
                  <s.icon size={14} strokeWidth={1.5} />
                </span>
                <div
                  style={{
                    transform: on ? "translateX(0)" : "translateX(18px)",
                    opacity: on ? 1 : 0,
                    transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${0.42 + i * 0.28}s`,
                  }}
                >
                  <p className="text-[13.5px] font-medium text-ivory">{s.label}</p>
                  <p className="mt-0.5 text-[11px] text-ivory/45">{s.note}</p>
                </div>
                <span
                  className="ml-auto mt-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-bronze"
                  style={{ opacity: on ? 1 : 0, transition: `opacity 0.6s ease ${0.6 + i * 0.28}s` }}
                >
                  {s.day}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-baseline justify-between rounded-lg bg-sage/10 px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sage">Total</span>
            <span className="font-display text-2xl text-ivory">2 days</span>
          </div>
        </div>

        <div className="hidden w-px bg-ivory/10 lg:block" />

        {/* Old way */}
        <div className="border-t border-ivory/10 p-6 sm:p-8 lg:border-t-0">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ivory/40">The old way</span>
            <span className="rounded-full border border-clay/40 bg-clay/15 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.16em] text-clay">
              At risk
            </span>
          </div>
          <div className="mt-6 space-y-0">
            {OLD_STEPS.map((s, i) => (
              <div key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
                {i < OLD_STEPS.length - 1 && (
                  <span className="absolute left-[17px] top-9 h-[calc(100%-2rem)] w-px border-l border-dashed border-ivory/20" />
                )}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory/40">
                  <s.icon size={14} strokeWidth={1.5} />
                </span>
                <p className="mt-2 text-[13px] text-ivory/45 line-through decoration-ivory/25">{s.label}</p>
                <span className="ml-auto mt-2 font-mono text-[8.5px] uppercase tracking-[0.14em] text-clay/70">+8h</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-baseline justify-between rounded-lg bg-clay/10 px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-clay">Total</span>
            <span className="font-display text-2xl text-ivory/50">14 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
