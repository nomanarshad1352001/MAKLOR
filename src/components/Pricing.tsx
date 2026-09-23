import { Fragment, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Eyebrow, Reveal, SectionHead, goWalkthrough } from "../lib/ui";
import { cn } from "../utils/cn";

const PLANS = [
  {
    name: "Starter",
    price: "CHF 149",
    per: "/mo",
    tag: null as string | null,
    line: "Core workflow, field capture, and IDX / CSV import. Everything a solo agent needs to run clean.",
    head: "What's included",
    feats: [
      "The Command Workspace",
      "Offline field capture & auto-dossier",
      "IDX / CSV import",
      "Notary checklist (standard)",
      "1 seat · EU-hosted · nFADP",
    ],
  },
  {
    name: "Pro",
    price: "CHF 349",
    per: "/mo",
    tag: "Most Chosen",
    line: "Signal Intelligence, the AIREA assistant, and the full Closing & Notary engine. The complete operational system.",
    head: "Everything in Starter, plus",
    feats: [
      "Signal Intelligence — live online listings",
      "AIREA layer · prepares, you approve",
      "Closing & Notary Cockpit — cantonal items sourced",
      "Buyer financing in the notary dossier",
      "Provenance-backed valuations · priority support",
    ],
  },
  {
    name: "Agency",
    price: "CHF 249",
    per: "/seat/mo",
    tag: null as string | null,
    line: "Team invitations, director and agent roles, and a firm-wide operational standard. Built for brokerages that scale.",
    head: "Everything in Pro, plus",
    feats: [
      "Team Command workspace",
      "Agent invitations & access suspension",
      "Cross-canton oversight & reporting",
      "Director / agent roles · logo & colours on documents",
      "Success & security contact on request",
    ],
  },
];

export function PricingCards({ light = false }: { light?: boolean }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {PLANS.map((p, i) => (
        <Reveal key={p.name} delay={i * 110}>
          <div
            className={cn(
              "group relative flex h-full flex-col rounded-xl border p-8 transition-all duration-700",
              p.tag
                ? "border-bronze/50 bg-gradient-to-b from-bronze/[0.1] to-bronze/[0.03] shadow-[0_40px_90px_-40px_rgba(201,168,118,0.35)]"
                : light
                  ? "border-ink/12 bg-paper hover:border-ink/25"
                  : "border-ivory/12 bg-ink-2/60 hover:border-ivory/25"
            )}
          >
            {p.tag && (
              <span className="absolute -top-3 left-8 bg-bronze px-3 py-1 font-mono text-[8.5px] uppercase tracking-[0.22em] text-onb">
                {p.tag}
              </span>
            )}
            <p className={cn("font-mono text-[10px] uppercase tracking-[0.28em]", p.tag ? "text-bronze" : light ? "text-ink/50" : "text-ivory/45")}>
              {p.name}
            </p>
            <p className="mt-5 flex items-baseline gap-2">
              <span className={cn("font-display text-[2.6rem] leading-none", light ? "text-ink" : "text-ivory")}>
                {p.price}
              </span>
              <span className={cn("font-mono text-[11px]", light ? "text-ink/45" : "text-ivory/40")}>
                {p.per}
              </span>
            </p>
            <p className={cn("mt-4 min-h-[60px] text-[13px] leading-relaxed", light ? "text-ink/60" : "text-ivory/55")}>
              {p.line}
            </p>
            <div className={cn("my-6 h-px", light ? "bg-ink/10" : "bg-ivory/10")} />
            <p className={cn("mb-4 font-mono text-[8.5px] uppercase tracking-[0.22em]", light ? "text-ink/40" : "text-ivory/35")}>
              {p.head}
            </p>
            <ul className="flex-1 space-y-3">
              {p.feats.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={13} strokeWidth={1.5} className={cn("mt-0.5 shrink-0", p.tag ? "text-bronze" : light ? "text-bronze-3" : "text-bronze/80")} />
                  <span className={cn("text-[13px] leading-snug", light ? "text-ink/75" : "text-ivory/70")}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={goWalkthrough}
              className={cn(
                "btn-lux mt-8 flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em]",
                p.tag
                  ? "bg-bronze text-onb"
                  : light
                    ? "border border-ink/25 text-ink hover:text-ink"
                    : "border border-ivory/20 text-ivory hover:border-bronze hover:text-ink"
              )}
            >
              <span className="relative z-10">
                {p.name === "Agency" ? "Request Access" : `Start with ${p.name}`}
              </span>
            </button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ————————————— Compare table ————————————— */

const COMPARE: { section: string; rows: [string, string, string, string][] }[] = [
  {
    section: "Operations",
    rows: [
      ["Command Workspace", "yes", "yes", "yes"],
      ["Offline field capture & dossier", "yes", "yes", "yes"],
      ["IDX / CSV import", "yes", "yes", "yes"],
    ],
  },
  {
    section: "Intelligence",
    rows: [
      ["Signal Intelligence", "no", "yes", "yes"],
      ["AIREA layer", "no", "yes", "yes"],
      ["Provenance-backed valuations", "no", "yes", "yes"],
    ],
  },
  {
    section: "Closing & Risk",
    rows: [
      ["Closing & Notary Cockpit", "basic", "yes", "yes"],
      ["Buyer financing in the notary dossier", "no", "yes", "yes"],
    ],
  },
  {
    section: "Team & Enterprise",
    rows: [
      ["Direction space · invitations & access", "no", "no", "yes"],
      ["Team accounts · roles · logo & colours", "no", "no", "yes"],
      ["Success contact on request", "no", "no", "yes"],
    ],
  },
];

function Cell({ v }: { v: string }) {
  if (v === "yes")
    return <Check size={14} strokeWidth={1.5} className="mx-auto text-bronze" />;
  if (v === "basic")
    return <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/55">Basic</span>;
  return <Minus size={13} className="mx-auto text-ivory/20" />;
}

export function CompareTable() {
  return (
    <div className="panel-dark overflow-x-auto rounded-xl">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-ivory/10">
            <th className="px-6 py-5 font-mono text-[9px] uppercase tracking-[0.24em] text-ivory/40">
              Compare
            </th>
            {["Starter · CHF 149", "Pro · CHF 349", "Agency · CHF 249/seat"].map((h, i) => (
              <th key={h} className={cn("px-6 py-5 text-center font-mono text-[9.5px] uppercase tracking-[0.2em]", i === 1 ? "text-bronze" : "text-ivory/60")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE.map((sec) => (
            <Fragment key={sec.section}>
              <tr className="border-b border-ivory/[0.07] bg-ivory/[0.03]">
                <td colSpan={4} className="px-6 py-3 font-mono text-[9px] uppercase tracking-[0.26em] text-bronze">
                  {sec.section}
                </td>
              </tr>
              {sec.rows.map((r) => (
                <tr key={r[0]} className="border-b border-ivory/[0.05] last:border-0 transition-colors hover:bg-ivory/[0.02]">
                  <td className="px-6 py-4 text-[13px] text-ivory/75">{r[0]}</td>
                  <td className="px-6 py-4 text-center"><Cell v={r[1]} /></td>
                  <td className="px-6 py-4 text-center"><Cell v={r[2]} /></td>
                  <td className="px-6 py-4 text-center"><Cell v={r[3]} /></td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ————————————— FAQ ————————————— */

const FAQS = [
  {
    q: "Is there a setup or onboarding fee?",
    a: "No. Onboarding, data migration, and setting up your logo and colours on documents are included. You pay the monthly plan, nothing else.",
  },
  {
    q: "How does per-seat pricing work for Agency?",
    a: "Agency is CHF 249 per active agent, per month, billed to the firm. Add or remove seats as your team changes; you're only billed for active producers.",
  },
  {
    q: "Can I move between plans?",
    a: "Yes — upgrade or downgrade at any time. Your data, dossiers, and history stay in place. There is no self-service full export yet; a copy of your data can be requested under the nFADP.",
  },
  {
    q: "Where is my data hosted?",
    a: "In the EU, in data centres in Stockholm, Sweden, with the application server in the Netherlands — subject to the nFADP. The EEA is recognised as adequate under the nFADP.",
  },
  {
    q: "Is there a contract or can I cancel?",
    a: "Monthly plans are cancel-anytime. Annual billing is available at a discount for firms that prefer it. No multi-year lock-in is ever required.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {FAQS.map((f, i) => (
        <Reveal key={f.q} delay={i * 60}>
          <div className="border-b border-ivory/[0.08]">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={open === i}
            >
              <span className={cn("font-display text-lg transition-colors duration-300 sm:text-xl", open === i ? "text-bronze" : "text-ivory hover:text-bronze")}>
                {f.q}
              </span>
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500", open === i ? "rotate-45 border-bronze text-bronze" : "border-ivory/20 text-ivory/50")}>
                <Plus size={13} />
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 text-[14px] leading-relaxed text-ivory/55">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ————————————— Real maths ————————————— */

export function RealMaths() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto grid max-w-[1560px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div>
          <Reveal>
            <Eyebrow light>The Real Maths</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display display-md mt-6">
              You don't pay for software. You pay for{" "}
              <em className="font-normal not-italic text-bronze-3">one closing more.</em>
            </h2>
          </Reveal>
          <Reveal delay={190}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/60">
              A single Swiss mandate carries a commission in the tens of
              thousands. The question was never the price. It was the margin.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10">
          {[
            ["CHF 4,188", "Pro plan — one full year"],
            ["1 mandate", "Won early — covers the platform"],
            ["1 closing file", "Kept complete — margin protected"],
            ["1 season", "Of admin returned to selling"],
          ].map(([v, k], i) => (
            <Reveal key={k} delay={i * 90}>
              <div className="flex h-full flex-col justify-between bg-paper-2 p-6 sm:p-8">
                <p className="font-display text-2xl text-ink sm:text-3xl">{v}</p>
                <p className="mt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-ink/45">
                  {k}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————— Pricing trust line ————————————— */

export function PricingTrust() {
  return (
    <Reveal>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
        {["EU-hosted", "Subject to the nFADP", "No setup fee", "Cancel anytime"].map((t) => (
          <span key={t} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40">
            <i className="h-1 w-1 rounded-full bg-bronze" />
            {t}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export function PricingFaqHead() {
  return (
    <SectionHead
      eyebrow="Questions"
      title={
        <>
          The economics, <em className="gold-text not-italic">answered.</em>
        </>
      }
    />
  );
}
