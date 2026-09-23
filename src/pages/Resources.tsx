import { FormEvent, useState } from "react";
import { ArrowRight, Check, Download, FileText, Search } from "lucide-react";
import { IMG } from "../lib/assets";
import { Btn, Eyebrow, Reveal, SectionHead } from "../lib/ui";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";

/* ————————————— Featured report ————————————— */

function Featured() {
  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="panel-dark grid overflow-hidden rounded-xl lg:grid-cols-[1fr_1.1fr]">
            {/* Report cover */}
            <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden p-8 sm:p-12">
              <img
                src={IMG.glassTwilight}
                alt="Glass architecture reflecting the water at twilight"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-40 saturate-[0.5]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/50 to-transparent" />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bronze">Maklor</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/50">Research · Q3 2026</span>
              </div>
              <div className="relative">
                <p className="font-display text-[7rem] leading-none text-bronze lg:text-[8.5rem]">
                  14<span className="text-5xl align-top">%</span>
                </p>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ivory/70">
                  of signed mandates suffer critical delays from fragmented workflows.
                </p>
              </div>
            </div>
            {/* Copy */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <Eyebrow>Featured Research · Q3 2026</Eyebrow>
              <h2 className="font-display display-md mt-6 text-ivory">
                The 2026 Swiss Mandate Report: operational inefficiencies and
                margin leakage.
              </h2>
              <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-ivory/55">
                We analyzed over 1,200 mandates across the DACH region to
                identify exactly where time, data, and commissions are lost
                between the first visit and the notary signing.
              </p>
              <div className="mt-10">
                <Btn>
                  <span className="inline-flex items-center gap-2">
                    <Download size={12} /> Download the Full Report (PDF)
                  </span>
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————— Library ————————————— */

const LIBRARY = [
  {
    cat: "Market Insights & Briefings",
    desc: "Macro and micro-economic analysis of Swiss cantonal markets — transaction volumes, pricing dynamics, liquidity shifts.",
    links: [
      "Q3 2026 Zürich Luxury Market: Pricing Defenses in a Shifting Rate Environment",
      "The Impact of Lex Koller Amendments on Cross-Border Buyer Activity",
      "Vaud vs. Genève: Navigating Pre-emption Rights in 2026",
    ],
  },
  {
    cat: "Operational Playbooks",
    desc: "Tactical guides for the daily execution of the Swiss mandate — from kitchen-table pricing defense to the 60-day notary phase.",
    links: [
      "The 60-Day Notary Checklist: A Cantonal Guide to Document Collection",
      "Defending the Price: Evidence-Based Valuation in the Owner Meeting",
      "Offline Field Operations: Capturing the Property Without Signal",
    ],
  },
  {
    cat: "Trust, Security & Compliance",
    desc: "Deep dives into EU data residency, nFADP (revDSG) compliance, and the security measures Maklor actually applies.",
    links: [
      "nFADP Compliance in Real Estate: A Practical Guide for Brokerages",
      "Data Residency: Hosting in the European Union",
      "The Maklor Security Whitepaper: Encryption, Access Controls, Activity Journal",
    ],
  },
  {
    cat: "Technical Documentation",
    desc: "Integration specifications, API documentation, and accepted import formats for enterprise IT and operations teams.",
    links: [
      "Import Guide: IDX 3.01, CSV and Excel Files Accepted",
      "Maklor API v2.0: Authentication and Webhook Integration",
      "Team Accounts and Director Access Setup",
    ],
  },
];

function Library() {
  return (
    <section className="on-inverse bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          light
          eyebrow="The Library"
          title={
            <>
              Explore by{" "}
              <em className="font-normal not-italic text-bronze-3">category.</em>
            </>
          }
        />
        <div className="mt-16 grid gap-px border border-ink/10 bg-ink/10 lg:grid-cols-2">
          {LIBRARY.map((lib, i) => (
            <Reveal key={lib.cat} delay={i * 80}>
              <div className="group h-full bg-paper p-8 transition-colors duration-500 hover:bg-paper-2/70 sm:p-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-bronze-3">
                  0{i + 1}
                </p>
                <h3 className="font-display mt-3 text-2xl text-ink">{lib.cat}</h3>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink/55">{lib.desc}</p>
                <div className="mt-7 space-y-1">
                  {lib.links.map((l) => (
                    <a
                      key={l}
                      href="#/resources"
                      onClick={(e) => e.preventDefault()}
                      className="group/l flex items-center justify-between gap-4 border-b border-ink/[0.08] py-4"
                    >
                      <span className="text-[13.5px] leading-snug text-ink/75 transition-colors duration-300 group-hover/l:text-ink">
                        {l}
                      </span>
                      <ArrowRight size={14} className="shrink-0 text-bronze-3 transition-transform duration-500 group-hover/l:translate-x-1.5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————— Newsletter ————————————— */

function Briefing() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section className="border-y border-ivory/[0.07] bg-ink-2 py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1560px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div>
          <Reveal>
            <Eyebrow>The Newsletter</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display display-md mt-6 text-ivory">
              The Maklor Briefing.
            </h2>
          </Reveal>
          <Reveal delay={190}>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-ivory/55">
              Five minutes. The movers, transactions, and cantonal context that
              matter — delivered on the first Tuesday of every month. No fluff,
              no sales pitches. Just the market.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200}>
          {sent ? (
            <div className="flex items-center gap-4 border border-sage/30 bg-sage/[0.06] p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage/40 text-sage">
                <Check size={15} />
              </span>
              <p className="text-[13.5px] text-ivory/75">
                Subscribed. The next Briefing arrives on the first Tuesday of the month.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Work email address"
                className="w-full border border-ivory/15 bg-ink px-5 py-4 text-[14px] text-ivory placeholder:text-ivory/30 focus:border-bronze transition-colors"
              />
              <button
                type="submit"
                className="btn-lux shrink-0 bg-bronze px-7 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-onb"
              >
                <span className="relative z-10">Subscribe to the Briefing</span>
              </button>
            </form>
          )}
          <p className="mt-4 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ivory/30">
            Read by 4,000+ Swiss real estate professionals · Unsubscribe anytime
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————— Feed ————————————— */

const FEED = [
  {
    cat: "The Boundary",
    t: "Why the most effective technology in Swiss real estate never talks to your clients.",
    d: "The philosophy behind AIREA — it prepares the dossier, lists what is missing, and drafts the follow-up. But it never sends, never signs, and never speaks for the agent.",
    read: "7 min read",
    img: IMG.glassFacade,
  },
  {
    cat: "Market Dynamics",
    t: "Why the “time on market” metric is failing Swiss luxury agents.",
    d: "The traditional days-on-market metric obscures the real bottleneck in high-end transactions: the financing verification phase.",
    read: "6 min read",
    img: IMG.infinitySunset,
  },
  {
    cat: "Operational Playbook",
    t: "The anatomy of a lost commission: post-offer risks in Canton Zürich.",
    d: "A look at the documents a Zürich sale needs before the notary — and the closing checklist that keeps them in order.",
    read: "8 min read",
    img: IMG.zurichHistoric,
  },
  {
    cat: "Product & Technology",
    t: "The case for invisible intelligence in real-estate technology.",
    d: "The most effective technology isn't the one talking to your clients — it's the one silently preparing your pricing evidence.",
    read: "5 min read",
    img: IMG.villaPoolDusk,
  },
];

function Feed() {
  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="The Feed"
            title={
              <>
                Latest <em className="gold-text not-italic">insights.</em>
              </>
            }
          />
          <Reveal delay={180}>
            <Btn variant="ghost" arrow>
              View all insights
            </Btn>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {FEED.map((f, i) => (
            <Reveal key={f.t} delay={i * 90}>
              <a
                href="#/resources"
                onClick={(e) => e.preventDefault()}
                className="group block"
              >
                <div className="img-zoom rv-img overflow-hidden rounded-lg border border-ivory/10">
                  <img
                    src={f.img}
                    alt={f.t}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover saturate-[0.75] transition-all duration-700 group-hover:saturate-100"
                  />
                </div>
                <p className="mt-6 flex items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.22em] text-bronze">
                  {f.cat}
                </p>
                <h3 className="font-display mt-3 text-lg leading-snug text-ivory transition-colors duration-300 group-hover:text-bronze">
                  {f.t}
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-ivory/45">{f.d}</p>
                <p className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/35">
                  <FileText size={10} /> {f.read}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources & Intelligence"
        title={
          <>
            Market intelligence for the{" "}
            <em className="gold-text not-italic">Swiss real-estate professional.</em>
          </>
        }
        copy="Deep analysis of the Swiss property market, cantonal regulatory shifts, and the operational mechanics of the modern mandate. Built for agents who treat real estate as an institutional discipline."
        image={IMG.zurichAlps}
        imageAlt="Zürich and its lake with the Swiss Alps beyond"
      >
        <label className="flex w-full max-w-md items-center gap-3 border border-ivory/20 bg-black/60 px-5 py-4 backdrop-blur-md transition-colors focus-within:border-bronze">
          <Search size={15} className="shrink-0 text-bronze" />
          <input
            type="search"
            placeholder="Search insights, playbooks, and technical docs…"
            className="w-full bg-transparent text-[13.5px] text-ivory placeholder:text-ivory/35"
            aria-label="Search resources"
          />
        </label>
      </PageHero>

      <Featured />
      <Library />
      <Briefing />
      <Feed />
      <CtaBand
        eyebrow="From Insight to Execution"
        title="See the infrastructure behind the insights."
        copy="The research is free. The operational engine that executes on these insights is Maklor. See how it maps to your firm."
      />
    </>
  );
}
