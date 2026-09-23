import { ArrowUpRight } from "lucide-react";
import MkLogo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { Reveal, goWalkthrough, route } from "../lib/ui";

const COLS = [
  {
    h: "Platform",
    links: [
      ["The OS", "/platform"],
      ["Signal Intelligence", "/platform"],
      ["Closing & Notary", "/platform"],
      ["Integrations", "/platform"],
    ],
  },
  {
    h: "Solutions",
    links: [
      ["Solo", "/solutions"],
      ["Boutique", "/solutions"],
      ["Enterprise", "/solutions"],
    ],
  },
  {
    h: "Resources",
    links: [
      ["Market Insights", "/resources"],
      ["Trust & Security", "/resources"],
      ["API Docs", "/resources"],
    ],
  },
  {
    h: "Company",
    links: [
      ["About Mulklick", "/company"],
      ["Investors & Partners", "/company"],
      ["Careers", "/company"],
      ["Press", "/company"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/[0.08] bg-ink">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[720px] -translate-x-1/2 rounded-full bg-bronze/[0.07] blur-[120px]" />

      <div className="mx-auto max-w-[1560px] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <Reveal>
            <div>
              <MkLogo size={44} />
              <p className="font-display mt-6 text-2xl font-light leading-snug text-ivory">
                The operating infrastructure for Swiss real estate.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-bronze">
                Built in Zug, Switzerland
              </p>
              <button
                onClick={goWalkthrough}
                className="btn-lux mt-8 inline-flex items-center gap-2 border border-bronze/50 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bronze hover:text-ink"
              >
                <span className="relative z-10">Request a Private Walkthrough</span>
                <ArrowUpRight size={12} className="relative z-10" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLS.map((c, ci) => (
              <Reveal key={c.h} delay={ci * 80}>
                <div>
                  <p className="eyebrow text-ivory/35">{c.h}</p>
                  <ul className="mt-5 space-y-3">
                    {c.links.map(([label, href]) => (
                      <li key={label}>
                        <a
                          href={route(href)}
                          className="group inline-flex items-center gap-1.5 text-[13px] text-ivory/55 transition-colors duration-300 hover:text-bronze"
                        >
                          {label}
                          <ArrowUpRight
                            size={10}
                            className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <i className="shimmer-line rv-line mx-auto mt-16 block h-px max-w-4xl" />

        {/* Monumental wordmark */}
        <Reveal className="mt-16 lg:mt-24">
          <div
            className="relative select-none text-center font-display leading-[0.85] tracking-[0.08em]"
            aria-hidden="true"
          >
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/10 blur-[110px]" />
            <span className="outline-text relative block text-[clamp(4rem,14.5vw,15rem)]">
              MAKLOR
            </span>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/[0.08] pt-7 sm:flex-row">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/35">
            © 2026 Mulklick GmbH · Zug, Switzerland · Built for the Swiss market
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/35">
            Data hosted in the EU · Subject to the nFADP
          </p>
          <div className="flex items-center gap-6">
            <ThemeSwitcher compact />
            <div className="flex gap-5 font-mono text-[9px] uppercase tracking-[0.18em]">
              {["Impressum", "Privacy", "Terms"].map((l) => (
                <a key={l} href="#/" className="text-ivory/40 transition-colors hover:text-bronze">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
