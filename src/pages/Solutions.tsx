import { useState } from "react";
import { ArrowRight, Cpu, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { IMG } from "../lib/assets";
import { Btn, Eyebrow, Reveal, SectionHead, scrollToId, route } from "../lib/ui";
import PageHero from "../components/PageHero";
import Walkthrough from "../components/Walkthrough";
import {
  CommandCard,
  EnterpriseDash,
  SignalScoreCards,
  TeamPipeline,
} from "../components/Mockups";
import { cn } from "../utils/cn";

/* ————————————— Scale data ————————————— */

const TIERS = [
  {
    n: "01",
    seat: "1 Seat",
    name: "Solo Professionals",
    head: "One agent, the full operating system.",
    lead: "You don't need an assistant; you need an operating system. You focus entirely on the client and the close — Maklor holds the operational weight.",
    feats: [
      ["Signal Intelligence", "Spot listings losing momentum — price drops, time online — and offer your services to the owner."],
      ["Field Capture & Automated Dossiers", "From the kitchen table to a presentation-grade PDF in 4 minutes."],
      ["Notary & Closing Cockpit", "See the commission at stake — secured and at risk across every file in the notary phase."],
      ["Portfolio Import", "Bring in mandates and contacts from IDX, CSV or Excel. Portal export is not yet available."],
    ],
    roi: "Handle 30% more mandates without compromising the white-glove service your clients expect. One saved deal covers the platform for a decade.",
    airea: "AIREA drafts the follow-ups and assembles the bank dossiers while you are at the notary — the capacity of a 3-person team.",
    visual: "solo" as const,
  },
  {
    n: "02",
    seat: "2–10 Seats",
    name: "Boutique Agencies",
    head: "Every agent, your best agent.",
    lead: "Your firm's reputation rests on every agent's performance. Maklor gives managing partners total operational visibility — without micromanaging the agent's desk.",
    feats: [
      ["The Maklor Standard", "Uniform closing checklists with sourced cantonal items — one notary dossier per deal, across the firm."],
      ["Team Command Workspace", "The health of the firm's pipeline, active mandates and closing risks at a glance."],
      ["Your Logo & Colours", "Owner reports, client brochures and closing dossiers carry your agency identity."],
      ["Buyer–Mandate Matching", "Match each mandate against your buyer book on five hard criteria: budget, type, area, rooms, sale or rent."],
    ],
    roi: "Elevate the baseline performance of the entire team. Reduce onboarding time for new agents and ensure no commission slips through the cracks.",
    airea: "AIREA ensures your junior agents operate with the exact same cantonal compliance checks and pricing evidence as your top producers. The intelligence doesn't take days off.",
    visual: "boutique" as const,
  },
  {
    n: "03",
    seat: "10+ Seats",
    name: "Enterprise Brokerages",
    head: "Centralized oversight. Cantonal scale.",
    lead: "For regional leaders, operational consistency and EU data residency are non-negotiable. Maklor spans offices and cantons without sacrificing the discretion of the individual agent.",
    feats: [
      ["Enterprise Command", "Cross-canton reporting, agent performance metrics, and firm-wide risk monitoring."],
      ["European Data Residency", "EU-hosted (Stockholm), subject to the nFADP — director and agent roles, a mandate activity journal, zero portal conflict of interest."],
      ["Institutional Security", "AES-256-GCM encryption of closing files, with team accounts managed by the director."],
      ["Seamless Ecosystem Fit", "Imports mandates and contacts from the IDX, CSV or Excel files your current CRM already exports."],
    ],
    roi: "Scale your footprint across Switzerland with the confidence that your data, your brand, and your commissions are institutionally protected.",
    airea: "One intelligence layer across every office — the firm learns from every mandate it runs.",
    visual: "enterprise" as const,
  },
];

function Visual({ kind }: { kind: "solo" | "boutique" | "enterprise" }) {
  if (kind === "solo")
    return (
      <div className="space-y-5">
        <CommandCard compact />
        <SignalScoreCards />
      </div>
    );
  if (kind === "boutique")
    return (
      <div className="space-y-5">
        <div className="img-zoom overflow-hidden rounded-xl border border-ivory/10">
          <img src={IMG.teamLounge} alt="The Maklor team working in a lakeside Swiss brokerage office" loading="lazy" className="aspect-[16/8] w-full object-cover saturate-[0.7]" />
        </div>
        <TeamPipeline />
      </div>
    );
  return <EnterpriseDash />;
}

/* ————————————— Page ————————————— */

export default function Solutions() {
  const [tab, setTab] = useState(0);
  const tier = TIERS[tab];

  return (
    <>
      <PageHero
        eyebrow="Solutions · Operational Infrastructure"
        title={
          <>
            The operating infrastructure for{" "}
            <em className="gold-text not-italic">every scale of Swiss brokerage.</em>
          </>
        }
        copy="Whether you are a solo producer protecting your margin, or a managing partner standardizing excellence across three cantons — Maklor provides the operational layer that scales with your ambition."
        image={IMG.meeting}
        imageAlt="Two partners in a minimal Swiss brokerage office"
      >
        <Btn onClick={() => scrollToId("walkthrough")}>Request a Tailored Walkthrough</Btn>
        <Btn variant="ghost" href={route("/platform")}>
          View the Platform
        </Btn>
      </PageHero>

      {/* Chaos statement */}
      <section className="on-inverse bg-paper py-24 text-ink lg:py-32">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <Eyebrow light>The Multiplication Problem</Eyebrow>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="font-display display-lg mt-7 max-w-5xl">
              As agencies grow, the chaos doesn't disappear.{" "}
              <em className="font-normal not-italic text-bronze-3">It multiplies.</em>
            </h2>
          </Reveal>
          <Reveal delay={210}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/60">
              Notes in WhatsApp, pricing defended by memory, the 60-day notary
              phase left to chance. Across a team, those small misses don't just
              cost time — they cost commissions. Maklor replaces fragile
              workarounds with institutional-grade infrastructure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Scale selector */}
      <section className="bg-ink py-24 lg:py-36">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <SectionHead
            eyebrow="Tailored ROI by firm size"
            title={
              <>
                One engine.{" "}
                <em className="gold-text not-italic">Three scales.</em>
              </>
            }
          />

          {/* Tabs */}
          <Reveal delay={150} className="mt-14">
            <div className="grid gap-px overflow-hidden rounded-xl border border-ivory/10 bg-ivory/10 sm:grid-cols-3" role="tablist">
              {TIERS.map((t, i) => (
                <button
                  key={t.n}
                  role="tab"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={cn(
                    "group relative px-6 py-6 text-left transition-colors duration-500",
                    tab === i ? "bg-ink-3" : "bg-ink-2 hover:bg-ink-3/60"
                  )}
                >
                  <i className={cn("absolute inset-x-0 top-0 h-[2px] bg-bronze transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]", tab === i ? "scale-x-100" : "scale-x-0")} />
                  <div className="flex items-baseline justify-between">
                    <span className={cn("font-mono text-[10px] tracking-[0.28em]", tab === i ? "text-bronze" : "text-ivory/30")}>
                      {t.n}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/35">
                      {t.seat}
                    </span>
                  </div>
                  <p className={cn("font-display mt-3 text-xl transition-colors duration-300 sm:text-2xl", tab === i ? "text-ivory" : "text-ivory/45 group-hover:text-ivory/70")}>
                    {t.name}
                  </p>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Panel */}
          <div key={tab} className="tab-in mt-14 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h3 className="font-display display-md text-ivory">{tier.head}</h3>
              <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-ivory/55">
                {tier.lead}
              </p>
              <div className="mt-9 space-y-1">
                {tier.feats.map(([t, d]) => (
                  <div key={t} className="group flex gap-4 border-b border-ivory/[0.07] py-5">
                    <ArrowRight size={14} className="mt-1 shrink-0 text-bronze transition-transform duration-500 group-hover:translate-x-1" />
                    <div>
                      <p className="text-[14.5px] font-medium text-ivory">{t}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ivory/45">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl border border-bronze/25 bg-bronze/[0.05] p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-bronze">The ROI</p>
                <p className="font-display mt-3 text-lg leading-snug text-ivory/85">{tier.roi}</p>
              </div>
              <div className="mt-4 flex items-start gap-4 rounded-xl border border-ivory/10 bg-ink-2/60 p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze/30 bg-bronze/10">
                  <Sparkles size={14} className="text-bronze" />
                </span>
                <div>
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-bronze">Your operational assistant</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory/60">{tier.airea}</p>
                </div>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <Visual kind={tier.visual} />
            </div>
          </div>
        </div>
      </section>

      {/* One engine triptych */}
      <section className="border-t border-ivory/[0.07] bg-ink-2 py-24 lg:py-36">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <SectionHead
            align="center"
            eyebrow="One Engine"
            title={
              <>
                Whether one agent or one hundred —{" "}
                <em className="gold-text not-italic">the same institutional-grade engine.</em>
              </>
            }
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {[
              { icon: Cpu, tag: "The Intelligence", t: "Signal & Market Memory", d: "Maklor's analysis of Swiss public registers and market listings, applied to every mandate you run." },
              { icon: Layers3, tag: "The Operations", t: "Capture & Command", d: "Offline-ready field operations, automated dossier generation, and the Daily Command workspace that prioritizes your day." },
              { icon: ShieldCheck, tag: "The Protection", t: "The Closing Cockpit", d: "Closing checklists with sourced cantonal items, land registry steps to tick off, and every commission shown as secured or at risk." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 110}>
                <div className="group panel-dark h-full rounded-xl p-8 transition-all duration-700 hover:-translate-y-1.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-bronze/30 bg-bronze/[0.08] transition-colors duration-500 group-hover:bg-bronze/20">
                    <c.icon size={17} strokeWidth={1.25} className="text-bronze" />
                  </span>
                  <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.26em] text-bronze">{c.tag}</p>
                  <h3 className="font-display mt-3 text-2xl text-ivory">{c.t}</h3>
                  <p className="mt-4 text-[13px] leading-relaxed text-ivory/50">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Walkthrough compact />
    </>
  );
}
