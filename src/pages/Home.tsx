import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Ban,
  PenLine,
  Send,
  Check,
  X,
  Scale,
  Radio,
  FileCheck2,
  Globe2,
  Sparkles,
} from "lucide-react";
import { IMG, VIDEO, CANTONS } from "../lib/assets";
import {
  Btn,
  Counter,
  Eyebrow,
  Marquee,
  Parallax,
  Reveal,
  RevealWords,
  SectionHead,
  Tilt3D,
  goWalkthrough,
  route,
} from "../lib/ui";
import {
  CommandCurve,
  FlowDiagram,
  MetricViz,
  ProductTabs,
  SignalMap,
  SplitBoard,
} from "../components/Visuals";
import {
  CommandCard,
  FieldCapture,
  NotaryCockpit,
  SignalBand,
  SignalScoreCards,
  AireaNote,
  TrustStrip,
} from "../components/Mockups";
import { PricingCards, PricingTrust } from "../components/Pricing";
import Walkthrough from "../components/Walkthrough";
import { cn } from "../utils/cn";

/* ————————————————————— HERO ————————————————————— */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Cinematic canvas — the interior showcase film */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover saturate-[0.95]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={IMG.livingBright}
          aria-label="Cinematic walkthrough of a modern Swiss property interior"
        >
          <source src={VIDEO.interiorShowcase} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1560px] items-center gap-16 px-5 pb-36 pt-36 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:pb-28 lg:pt-40">
        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>Enterprise Operating System · Swiss Real Estate</Eyebrow>
          </Reveal>
          <p className="rv font-display mt-7 text-lg italic text-ivory/65" style={{ transitionDelay: "80ms" }}>
            MAKlOR — the operating infrastructure for Swiss real estate.
          </p>
          <h1 className="font-display display-xl mt-4 text-ivory">
            <RevealWords text="Capture the moment." className="block" step={110} />
            <span className="rv-words block italic">
              <RevealWords text="Defend the price." className="gold-text pr-2" step={130} />
            </span>
          </h1>
          <Reveal delay={430}>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/65">
              Field capture, live listing signals and the notary cockpit — one
              system that turns every visit into a mandate defended with
              evidence, and every commission secured at the deed.
            </p>
          </Reveal>
          <Reveal delay={520}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Btn onClick={goWalkthrough}>Request a Private Walkthrough</Btn>
              <Btn variant="ghost" href={route("/platform")}>
                Explore the live workspace
              </Btn>
            </div>
          </Reveal>
          <Reveal delay={620}>
            <div className="mt-10 flex flex-wrap items-center gap-2.5">
              {["Field capture", "Dossier · 4 min", "Live signals", "Notary cockpit"].map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-[#f4f0e4]/90 backdrop-blur-md"
                >
                  <i className="h-1 w-1 rounded-full bg-bronze" />
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Live product glimpse — subtle 3D */}
        <Reveal delay={420} className="lg:justify-self-end">
          <Parallax strength={26}>
            <div className="floaty mx-auto w-full max-w-[460px]">
              <Tilt3D max={6}>
                <CommandCard />
              </Tilt3D>
            </div>
          </Parallax>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-[4.5rem] right-6 z-20 hidden items-center gap-3 sm:flex lg:right-12">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-ivory/50">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/25">
          <i className="cue-drop absolute inset-x-0 top-0 h-5 bg-bronze" />
        </span>
      </div>

      {/* Canton ticker */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/55 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1560px] items-center gap-6 px-0">
          <div className="hidden shrink-0 items-center gap-2 border-r border-white/10 py-4 pl-5 pr-6 sm:flex lg:pl-12">
            <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-sage" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
              Signals live · 37 across CH
            </span>
          </div>
          <Marquee className="py-4">
            {CANTONS.map((c) => (
              <span key={c} className="mx-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
                <i className="h-1 w-1 rounded-full bg-bronze/80" />
                {c}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— SWISS CORE ————————————————————— */

function SwissCore() {
  return (
    <section className="border-b border-ivory/[0.07] bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <SectionHead
            eyebrow="Intelligence Built for Switzerland"
            title={
              <>
                Engineered for the Swiss market.{" "}
                <em className="gold-text not-italic">Independent by design.</em>
              </>
            }
          />
          <Reveal delay={200}>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-ivory/50 lg:justify-self-end">
              Subject to the nFADP. Hosted in the European Union. Independent
              of all property portals — owners and buyers route to no one but you.
            </p>
          </Reveal>
        </div>
        <Reveal delay={150} className="mt-14">
          <TrustStrip />
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— STATEMENT ————————————————————— */

function Statement() {
  return (
    <section className="border-b border-ivory/10 bg-ink py-28 lg:py-40">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow>The Position</Eyebrow>
        </Reveal>
        <h2 className="font-display mt-8 max-w-5xl text-[clamp(1.7rem,3.6vw,3.4rem)] font-light leading-[1.15] text-ivory">
          <RevealWords text="Software was built for pipelines." step={55} />{" "}
          <span className="gold-text">
            <RevealWords text="Swiss real estate is built on trust." step={55} />
          </span>
        </h2>
        <Reveal delay={350} className="mt-14">
          <MetricViz />
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— THREE LAYERS · sticky cinema ————————————————————— */

const LAYERS = [
  {
    n: "01",
    key: "Signal Intelligence",
    head: "Spot the listings losing momentum.",
    copy: "Price drops, long time online, repeated changes — every live listing scored as a possible mandate.",
    chip: { v: "37", k: "live signals across Switzerland" },
  },
  {
    n: "02",
    key: "The Operational Core",
    head: "Capture the property. Defend the price.",
    copy: "Offline field capture to a branded dossier in minutes — seven hours of admin, returned to selling.",
    chip: { v: "−7h", k: "of admin per mandate" },
  },
  {
    n: "03",
    key: "Closing & Notary",
    head: "Know which commission is secured.",
    copy: "The closing checklist follows every document of the notary phase — secured when complete, at risk while missing.",
    chip: { v: "4/6", k: "documents complete · Erlenbach" },
  },
];

function StickyLayers() {
  const active = useSticky();
  const visuals = [
    <div key="v0" className="space-y-5">
      <SignalBand />
      <SignalScoreCards />
    </div>,
    <div key="v1" className="relative">
      <FieldCapture />
      <div className="panel-dark absolute -bottom-8 -right-2 hidden w-56 rounded-lg p-4 sm:block lg:-right-6">
        <p className="font-display text-3xl text-bronze-2">−7h</p>
        <p className="mt-1 font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.18em] text-ivory/45">
          admin eliminated per mandate
        </p>
      </div>
    </div>,
    <div key="v2">
      <NotaryCockpit stepper />
    </div>,
  ];

  return (
    <section className="relative bg-ink-2 pb-24 pt-24 lg:pb-0 lg:pt-0">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12 lg:py-24">
        <SectionHead
          eyebrow="The Platform · Three operational layers"
          title={
            <>
              Institutional-grade operations.{" "}
              <em className="gold-text not-italic">Built for the Swiss mandate.</em>
            </>
          }
          className="lg:max-w-4xl"
        />

        {/* Desktop: sticky split */}
        <div className="mt-10 hidden gap-20 lg:grid lg:grid-cols-12">
          <div className="relative col-span-5">
            <i className="absolute -left-6 top-0 h-full w-px bg-ivory/10" aria-hidden />
            <i
              className="absolute -left-6 top-0 w-px bg-bronze transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{ height: `${((active + 1) / LAYERS.length) * 100}%` }}
              aria-hidden
            />
            {LAYERS.map((l, i) => (
              <div key={l.n} data-i={i} className="sticky-fallback flex min-h-[92vh] flex-col justify-center">
                <p className={cn("font-mono text-[11px] tracking-[0.3em] transition-colors duration-500", active === i ? "text-bronze" : "text-ivory/25")}>
                  {l.n} · {l.key}
                </p>
                <h3 className={cn("font-display display-md mt-5 max-w-md transition-colors duration-500", active === i ? "text-ivory" : "text-ivory/35")}>
                  {l.head}
                </h3>
                <p className={cn("mt-6 max-w-md text-[14.5px] leading-relaxed transition-colors duration-500", active === i ? "text-ivory/60" : "text-ivory/30")}>
                  {l.copy}
                </p>
                <div className={cn("mt-8 flex items-baseline gap-4 transition-all duration-700", active === i ? "opacity-100" : "opacity-20")}>
                  <span className="font-display text-5xl text-bronze-2">{l.chip.v}</span>
                  <span className="max-w-[200px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ivory/45">
                    {l.chip.k}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-7">
            <div className="sticky top-24 flex h-[84vh] items-center">
              <div className="relative min-h-[560px] w-full">
                {visuals.map((v, i) => (
                  <div
                    key={i}
                    className={cn(
                      "transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                      i === 0 ? "relative" : "absolute inset-0 flex flex-col justify-center",
                      active === i
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-8 scale-[0.97] opacity-0"
                    )}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: stacked */}
        <div className="mt-16 space-y-20 lg:hidden">
          {LAYERS.map((l, i) => (
            <div key={l.n}>
              <Reveal>
                <p className="font-mono text-[11px] tracking-[0.3em] text-bronze">
                  {l.n} · {l.key}
                </p>
                <h3 className="font-display display-md mt-4 text-ivory">{l.head}</h3>
                <p className="mt-5 text-[14px] leading-relaxed text-ivory/55">{l.copy}</p>
              </Reveal>
              <Reveal delay={150} className="mt-8">
                {visuals[i]}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function useSticky() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: "-42% 0px -42% 0px" }
    );
    const t = setTimeout(() => {
      document
        .querySelectorAll("[data-i].sticky-fallback")
        .forEach((n) => io.observe(n));
    }, 50);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);
  return active;
}

/* ————————————————————— AIREA ————————————————————— */

const NEVER = [
  { icon: Ban, t: "It never talks to your clients." },
  { icon: Send, t: "It never sends without your approval." },
  { icon: PenLine, t: "It prepares the work; you execute the trust." },
];

function Airea() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 lg:py-40">
      <div className="pointer-events-none absolute left-[-15%] top-1/3 h-[560px] w-[560px] rounded-full bg-bronze/[0.05] blur-[160px]" />
      <div className="mx-auto grid max-w-[1560px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <div>
          <Reveal>
            <Eyebrow>Airea · Maklor's Assistant</Eyebrow>
          </Reveal>
          <h2 className="font-display mt-8 text-ivory">
            {["It prepares.", "It watches.", "It drafts."].map((l, i) => (
              <Reveal as="span" key={l} className="display-lg block" delay={100 + i * 160}>
                {l}
              </Reveal>
            ))}
            <Reveal as="span" className="display-lg block italic" delay={640}>
              <span className="gold-text">But it never decides.</span>
            </Reveal>
          </h2>
          <Reveal delay={750}>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ivory/55">
              Financing is recorded before you ask. The buyer waiting for
              exactly this property is surfaced. Follow-ups and owner reports
              are drafted — for your review.{" "}
              <span className="text-ivory/85">
                Technology behind the agent. Never in its place.
              </span>
            </p>
          </Reveal>
          <div className="mt-10 space-y-4">
            {NEVER.map((nv, i) => (
              <Reveal key={nv.t} delay={830 + i * 90}>
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bronze/30 bg-bronze/[0.07]">
                    <nv.icon size={13} className="text-bronze-2" strokeWidth={1.5} />
                  </span>
                  <p className="text-[14px] text-ivory/75">{nv.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={1100}>
            <p className="mt-10 border-l border-bronze/40 pl-5 font-display text-lg italic text-ivory/70">
              That line is not a feature — it is the shape of the whole product.
            </p>
          </Reveal>
        </div>
        <Reveal delay={300}>
          <Parallax strength={22}>
            <div className="mx-auto max-w-[480px] -rotate-[0.8deg]">
              <AireaNote />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— PARADIGM ————————————————————— */

const SHIFT: [string, string][] = [
  ["Pushes leads down a sales funnel", "Manages trust, timing, and complex coordination"],
  ["Ignores the post-offer chaos", "Tracks the notary phase, document by document"],
  ["Relies on fragile portal APIs", "Imports your portfolio from IDX, CSV or Excel"],
  ["Hosted globally, generic privacy", "Data hosted in the European Union"],
  ["An assistant that contacts your clients", "AIREA prepares — but never acts without you"],
];

function Paradigm() {
  return (
    <section className="on-inverse bg-paper py-24 text-ink lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          light
          eyebrow="The Paradigm Shift"
          title={
            <>
              Software was built for pipelines.{" "}
              <em className="font-normal not-italic text-bronze-3">Swiss real estate is built on trust.</em>
            </>
          }
          copy="Generic CRMs flatten the Swiss mandate into a sales funnel. Maklor is built for 60 days of notary coordination, live listing signals, and kitchen-table negotiations."
          className="max-w-4xl"
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {/* Generic */}
          <Reveal>
            <div className="h-full rounded-xl border border-black/12 bg-black/[0.04] p-8 sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
                Generic CRM / PropTech
              </p>
              <ul className="mt-8 space-y-6">
                {SHIFT.map(([g]) => (
                  <li key={g} className="flex items-start gap-4 border-b border-black/[0.07] pb-6 last:border-0">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-clay/40 text-clay/80">
                      <X size={11} />
                    </span>
                    <span className="text-[14.5px] leading-snug text-ink/50">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* Maklor */}
          <Reveal delay={140}>
            <div className="fb-card rounded-xl bg-ink p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] sm:p-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-bronze-3">
                  Maklor OS
                </p>
                <i className="pulse-bronze h-1.5 w-1.5 rounded-full bg-bronze" />
              </div>
              <ul className="mt-8 space-y-6">
                {SHIFT.map(([, m]) => (
                  <li key={m} className="flex items-start gap-4 border-b border-ivory/[0.08] pb-6 last:border-0">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sage/40 text-sage">
                      <Check size={11} />
                    </span>
                    <span className="text-[14.5px] leading-snug text-ivory/85">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— SOLUTIONS INDEX ————————————————————— */

const SOLS = [
  {
    n: "01",
    name: "Solo Professionals",
    tag: "1 Seat",
    line: "One agent. Full operation.",
    copy: "Scale transaction capacity without hiring admin.",
    img: IMG.soloAgent,
  },
  {
    n: "02",
    name: "Boutique Agencies",
    tag: "2–10 Seats",
    line: "Every agent, your best agent.",
    copy: "One operational standard across the firm.",
    img: IMG.teamLounge,
  },
  {
    n: "03",
    name: "Enterprise Brokerages",
    tag: "10+ Seats",
    line: "Oversight across cantons.",
    copy: "Centralized command, local relationships intact.",
    img: IMG.enterprise,
  },
];

function SolutionsIndex() {
  return (
    <section className="border-y border-ivory/[0.07] bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Solutions · Tailored ROI by firm size"
            title={
              <>
                Scaled for your firm's{" "}
                <em className="gold-text not-italic">ambition.</em>
              </>
            }
          />
          <Reveal delay={200}>
            <Btn variant="ghost" href={route("/solutions")}>
              All solutions
            </Btn>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-ivory/[0.08]">
          {SOLS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <a
                href={route("/solutions")}
                className="group relative grid gap-6 border-b border-ivory/[0.08] py-10 transition-colors duration-500 hover:bg-ivory/[0.02] lg:grid-cols-[80px_1.2fr_1fr_140px_60px] lg:items-center lg:gap-10 lg:py-12"
              >
                <span className="font-mono text-[11px] text-bronze/70">{s.n}</span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-ivory/35">{s.tag}</p>
                  <h3 className="font-display mt-2 text-3xl font-light text-ivory transition-colors duration-300 group-hover:text-bronze-2 lg:text-4xl">
                    {s.name}
                  </h3>
                </div>
                <p className="max-w-sm text-[13.5px] leading-relaxed text-ivory/50">
                  <span className="text-ivory/80">{s.line}</span> {s.copy}
                </p>
                <div className="img-zoom hidden h-20 w-32 overflow-hidden rounded-md border border-ivory/10 lg:block">
                  <img src={s.img} alt={s.name} loading="lazy" className="h-full w-full object-cover saturate-[0.7] transition-all duration-700 group-hover:saturate-100" />
                </div>
                <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-ivory/15 transition-all duration-500 group-hover:border-bronze group-hover:bg-bronze lg:flex">
                  <ArrowUpRight size={15} className="text-ivory transition-colors duration-500 group-hover:text-onb" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <i className="shimmer-line rv-line mx-auto mt-16 block h-px max-w-5xl" />
      </div>
    </section>
  );
}

/* ————————————————————— TERRAIN GALLERY ————————————————————— */

const TERRAIN = [
  { img: IMG.heroVilla, place: "Erlenbach", note: "Lakeside mandates", n: "01" },
  { img: IMG.villaTwilight, place: "Küsnacht", note: "The Gold Coast", n: "02" },
  { img: IMG.glassFacade, place: "Zürich Enge", note: "The urban core", n: "03" },
];

function Terrain() {
  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="The Terrain We Read"
            title={
              <>
                Every street, every signal —{" "}
                <em className="gold-text not-italic">read in real time.</em>
              </>
            }
          />
          <Reveal delay={200}>
            <p className="max-w-xs text-[13px] leading-relaxed text-ivory/50">
              Live listings, public registers, hard comparables — observed from
              above, won at the kitchen table.
            </p>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {TERRAIN.map((t, i) => (
            <Reveal key={t.place} delay={i * 120} className={i === 1 ? "sm:mt-14" : ""}>
              <figure className="group cursor-pointer">
                <div className="rv-img img-zoom relative overflow-hidden rounded-xl">
                  <img
                    src={t.img}
                    alt={`${t.place} — ${t.note}`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover saturate-[0.7] transition-all duration-700 group-hover:saturate-100"
                  />
                  <span className="absolute right-4 top-4 rounded-sm bg-black/50 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.24em] text-[#f4f0e4]/90 backdrop-blur-md">
                    {t.n}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="font-display text-2xl text-[#f4f0e4] [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]">
                        {t.place}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#f4f0e4]/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)]">
                        {t.note}
                      </p>
                    </div>
                    <span className="mb-1 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full border border-white/40 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={13} className="text-white" />
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— CLOSING REEL · video ————————————————————— */

function ClosingReel() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={IMG.zurichHistoric}
          aria-label="Zürich old town filmed at dusk"
        >
          <source src={VIDEO.zurichDusk} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
      </div>
      <div className="relative flex min-h-[110svh] flex-col items-center justify-center py-28 text-center">
        <Reveal>
          <p className="eyebrow text-bronze-3">The Ceremony</p>
        </Reveal>
        <h2 className="font-display mt-6 text-[#f4f0e4]">
          <RevealWords text="Sixty days of coordination." className="display-lg block" step={80} />
          <span className="rv-words block italic">
            <RevealWords text="One signature." className="display-lg gold-text inline-block" step={120} />
          </span>
        </h2>
        <Reveal delay={300}>
          <p className="mx-auto mt-6 max-w-md text-[14px] leading-relaxed text-[#f4f0e4]/70">
            The notary phase, orchestrated — every document, every deadline,
            every franc of commission, watched until the deed is signed.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 backdrop-blur-md">
            {[
              ["60", "days orchestrated"],
              ["27", "documents tracked"],
              ["0", "commissions lost"],
            ].map(([v, k]) => (
              <div key={k} className="bg-black/45 px-5 py-5 sm:px-8">
                <p className="font-display text-2xl text-[#f4f0e4] sm:text-3xl">{v}</p>
                <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[#f4f0e4]/55">
                  {k}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— INTELLIGENCE ENGINE ————————————————————— */

const ENGINE = [
  { icon: Scale, t: "Valuations you can defend", d: "Every number carries provenance — comparables, cantonal adjustments, confidence intervals." },
  { icon: Radio, t: "Signals from live listings", d: "Price drops, long time online, repeated changes — scored as possible opportunities." },
  { icon: FileCheck2, t: "Cantonal requirements, sourced", d: "One checklist per canton, items only where an official source exists." },
  { icon: Globe2, t: "European data residency", d: "EU-hosted (Stockholm), application server in the Netherlands, subject to the nFADP." },
];

function IntelligenceEngine() {
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1560px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-12">
        <div>
          <SectionHead
            eyebrow="The Intelligence Engine"
            title={
              <>
                Grounded in public registers.{" "}
                <em className="gold-text not-italic">Sharpened by the market.</em>
              </>
            }
            copy="Swiss public registers — such as the federal building register (RegBL) — market listings, and Maklor's own report engines."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {ENGINE.map((e, i) => (
              <Reveal key={e.t} delay={i * 90}>
                <div className="group border-t border-ivory/10 pt-6">
                  <e.icon size={18} strokeWidth={1.25} className="text-bronze transition-transform duration-500 group-hover:-translate-y-1" />
                  <h3 className="mt-4 text-[15px] font-medium text-ivory">{e.t}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ivory/45">{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Radar visual */}
        <Reveal delay={200}>
          <div className="relative mx-auto aspect-square max-w-[520px]">
            <img
              src={IMG.zurichAerial}
              alt="Aerial view over Lake Zürich and the city"
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-full object-cover opacity-25 saturate-[0.4]"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-ink via-ink/40 to-transparent" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="absolute rounded-full border border-bronze/20" style={{ inset: `${i * 13}%` }} aria-hidden />
            ))}
            <span className="slow-spin absolute inset-[6%] rounded-full border border-dashed border-bronze/25" aria-hidden />
            <span className="slow-spin-rev absolute inset-[19%] rounded-full border border-dotted border-bronze/15" aria-hidden />
            <span className="absolute inset-0 rounded-full" aria-hidden>
              <span className="radar-ring absolute left-1/2 top-1/2 -ml-20 -mt-20 h-40 w-40 rounded-full border border-bronze/50" />
            </span>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="font-display text-5xl text-ivory">
                <Counter end={37} />
              </p>
              <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.24em] text-bronze">
                Live signals
              </p>
            </div>
            <span className="absolute left-[16%] top-[24%] rounded-sm border border-ivory/15 bg-ink/80 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ivory/70 backdrop-blur-sm">
              RegBL · registers
            </span>
            <span className="absolute bottom-[22%] right-[12%] rounded-sm border border-ivory/15 bg-ink/80 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ivory/70 backdrop-blur-sm">
              Market listings
            </span>
            <span className="absolute bottom-[34%] left-[8%] rounded-sm border border-bronze/40 bg-bronze/10 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-bronze-2 backdrop-blur-sm">
              Küsnacht · 8.6
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— SIGNAL ATLAS · map ————————————————————— */

function SignalAtlas() {
  return (
    <section className="bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:px-4">
          <SectionHead
            eyebrow="The Signal Atlas"
            title={
              <>
                Switzerland, <em className="gold-text not-italic">listened.</em>
              </>
            }
          />
          <Reveal delay={180}>
            <p className="max-w-sm text-[14px] leading-relaxed text-ivory/50 lg:justify-self-end">
              Tap a canton. Every dot is a listing losing momentum — price
              drops, time online, repeated changes — scored for your agents.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200} className="mt-14 lg:px-4">
          <SignalMap />
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— INTERLUDE ————————————————————— */

function Interlude() {
  return (
    <section className="relative h-[64vh] overflow-hidden">
      <Parallax strength={70} className="absolute inset-[-10%]">
        <img
          src={IMG.zurichAlps}
          alt="Zürich, its lake and the Swiss Alps beyond"
          loading="lazy"
          className="h-full w-full object-cover saturate-[0.7]"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="eyebrow text-bronze-3">The Promise</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="font-display display-md mt-6 max-w-4xl text-[#f4f0e4]">
            From the first discreet signal —{" "}
            <em className="gold-text not-italic">to the signed deed at the notary.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— ORCHESTRATION ————————————————————— */

function Orchestration() {
  return (
    <section className="bg-ink-2 py-24 lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="The Orchestration"
          title={
            <>
              One mandate. Two very different{" "}
              <em className="gold-text not-italic">journeys.</em>
            </>
          }
          align="center"
        />
        <Reveal delay={200} className="mt-16">
          <FlowDiagram />
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————————————— PRICING PREVIEW ————————————————————— */

function PricingPreview() {
  return (
    <section className="bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="The Economics"
            title={
              <>
                Pricing that matches{" "}
                <em className="gold-text not-italic">the stakes.</em>
              </>
            }
            copy="You don't pay for software. You pay for mandates won, deals saved, and hours returned. One closing covers a year."
          />
          <Reveal delay={200}>
            <Btn variant="ghost" href={route("/pricing")}>
              View pricing
            </Btn>
          </Reveal>
        </div>
        <div className="mt-16">
          <PricingCards />
          <PricingTrust />
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— PAGE ————————————————————— */

export default function Home() {
  return (
    <>
      <Hero />
      <SwissCore />
      <Statement />
      <StickyLayers />
      <SplitBoard />
      <section className="bg-ink py-24 lg:py-36">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <ProductTabs />
        </div>
      </section>
      <Airea />
      <Paradigm />
      <CommandCurve />
      <SolutionsIndex />
      <Terrain />
      <ClosingReel />
      <IntelligenceEngine />
      <SignalAtlas />
      <Interlude />
      <Orchestration />
      <PricingPreview />
      <Walkthrough />
      <span className="sr-only">
        <Sparkles size={1} />
      </span>
    </>
  );
}
