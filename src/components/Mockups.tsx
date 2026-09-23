import { ReactNode } from "react";
import {
  Sparkles,
  Mic,
  Check,
  RefreshCw,
  Trash2,
  FileText,
  FileSpreadsheet,
  ShieldCheck,
  CalendarDays,
  Landmark,
  ArrowUpRight,
  Download,
  Building2,
  Vault,
  LayoutGrid,
} from "lucide-react";
import { IMG, CANTONS } from "../lib/assets";
import { LiveClock, StatusPill } from "../lib/ui";
import { cn } from "../utils/cn";

/* ————————————————— Shared chrome ————————————————— */

function MockShell({
  children,
  className,
  title,
  right,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className={cn("panel-dark overflow-hidden rounded-xl", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-ivory/10 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            <i className="h-1.5 w-1.5 rounded-full bg-ivory/25" />
            <i className="h-1.5 w-1.5 rounded-full bg-ivory/25" />
            <i className="h-1.5 w-1.5 rounded-full bg-bronze" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ivory/45">
            {title}
          </span>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function FootNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-t border-ivory/10 px-5 py-3">
      <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/35">
        {children}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-sage/80">
        <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-sage" />
        Live
      </span>
    </div>
  );
}

/* ————————————————— 1 · Daily Command card ————————————————— */

const MANDATES = [
  {
    place: "Erlenbach · Seestrasse 12",
    note: "Buyer financing not yet recorded",
    tag: "NOTARY",
    tone: "amber" as const,
  },
  {
    place: "Küsnacht · Listing signal",
    note: "Price drop −9% · score 8.6",
    tag: "SIGNAL",
    tone: "bronze" as const,
  },
  {
    place: "Zürich · Villa Tribschen",
    note: "Valuation report ready for the owner",
    tag: "DEFEND",
    tone: "green" as const,
  },
  {
    place: "Zug · Dammstrasse 4",
    note: "Dossier sent · awaiting notary slot",
    tag: "NOTARY",
    tone: "mute" as const,
  },
];

export function CommandCard({ compact = false }: { compact?: boolean }) {
  return (
    <MockShell
      title="Maklor · Daily Command"
      right={<LiveClock className="text-bronze/80" />}
    >
      <div className="px-5 pt-5">
        <p className="font-display text-xl italic text-ivory">
          Good morning, Emil.
        </p>
        <p className="mt-1 text-[12px] text-ivory/50">
          3 deals require intervention today.
        </p>

        {/* AIREA nudge */}
        <div className="mt-4 rounded-lg border border-bronze/25 bg-bronze/[0.06] p-3.5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-bronze/15">
              <Sparkles size={12} className="text-bronze" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-bronze">
                Airea
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-ivory/75">
                Notary dossier · Erlenbach. Buyer financing still to record —
                reply drafted for your review.
              </p>
              <div className="mt-2.5 flex gap-2">
                <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-bronze px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-bronze-2">
                  Review &amp; Send <ArrowUpRight size={10} />
                </span>
                <span className="inline-flex cursor-pointer items-center rounded-sm border border-ivory/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/50 transition-colors hover:border-ivory/30">
                  Dismiss
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-4 gap-px overflow-hidden rounded-lg border border-ivory/10 bg-ivory/10">
          {[
            ["Mandates", "14"],
            ["Pipeline", "2.84M"],
            ["Notary", "5"],
            ["Signals", "31"],
          ].map(([k, v]) => (
            <div key={k} className="bg-ink-2 px-3 py-2.5 text-center">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ivory/40">
                {k}
              </p>
              <p className="mt-1 font-display text-lg text-ivory">{v}</p>
            </div>
          ))}
        </div>

        {!compact && (
          <div className="mt-4 space-y-px overflow-hidden rounded-lg border border-ivory/10">
            {MANDATES.map((m) => (
              <div
                key={m.place}
                className="flex items-center justify-between gap-3 bg-ink-2/60 px-3.5 py-2.5 transition-colors hover:bg-ink-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px] text-ivory/85">{m.place}</p>
                  <p className="truncate text-[10.5px] text-ivory/40">{m.note}</p>
                </div>
                <StatusPill tone={m.tone} className="shrink-0">
                  {m.tag}
                </StatusPill>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-4" />
      <FootNote>Intelligence by Maklor · EU Data Hosting</FootNote>
    </MockShell>
  );
}

/* ————————————————— 2 · Live signals band ————————————————— */

const HOT: Record<string, number> = {
  Zürich: 2,
  Genève: 2,
  Lausanne: 1,
  Lugano: 1,
  Bern: 1,
};

export function SignalBand() {
  return (
    <MockShell
      title="Live · Listing Signals"
      right={
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-sage">
          37 active across CH
        </span>
      }
    >
      <div className="relative px-5 py-6">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background:radial-gradient(circle_at_70%_40%,rgba(201,168,118,0.14),transparent_60%)]" />
        <div className="relative flex flex-wrap gap-2">
          {CANTONS.map((c) => {
            const hot = HOT[c];
            return (
              <span
                key={c}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-[10px] tracking-[0.14em] transition-all duration-500",
                  hot
                    ? "border-bronze/40 bg-bronze/10 text-bronze"
                    : "border-ivory/12 text-ivory/40 hover:border-ivory/25 hover:text-ivory/60"
                )}
              >
                {c === "Zürich" && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-bronze/60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-ink bg-bronze" />
                  </span>
                )}
                {hot ? (
                  <i className="pulse-bronze h-1.5 w-1.5 rounded-full bg-bronze" />
                ) : (
                  <i className="h-1.5 w-1.5 rounded-full bg-ivory/20" />
                )}
                {c}
                {hot && (
                  <span className="text-[9px] text-bronze/70">+{hot}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
      <FootNote>Public sources only · Lawful, discreet, nFADP</FootNote>
    </MockShell>
  );
}

/* ————————————————— 3 · Signal score cards / table ————————————————— */

const SIGNALS = [
  { city: "Küsnacht", trigger: "Price drop −9%", ctx: "Villa · second reduction in 11 weeks", score: 8.6, act: "Call first", hot: true },
  { city: "Zürich Enge", trigger: "142 days online", ctx: "Apartment · no price change yet", score: 7.9, act: "Call first", hot: true },
  { city: "Erlenbach", trigger: "3 price changes", ctx: "Townhouse · asking price down 12%", score: 7.1, act: "Watch", hot: false },
  { city: "Thalwil", trigger: "Price drop −4%", ctx: "Plot · first reduction", score: 6.4, act: "Watch", hot: false },
];

export function SignalTable() {
  return (
    <MockShell
      title="Maklor Intelligence · Signals"
      right={
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-sage">
          <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-sage" /> Live
        </span>
      }
    >
      <div className="hidden grid-cols-[1.1fr_1fr_1.4fr_0.6fr_0.8fr] gap-4 border-b border-ivory/10 px-5 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/35 sm:grid">
        <span>Location</span>
        <span>Signal trigger</span>
        <span>Context</span>
        <span>Score</span>
        <span>Action</span>
      </div>
      <div>
        {SIGNALS.map((s) => (
          <div
            key={s.city}
            className="grid grid-cols-2 items-center gap-3 border-b border-ivory/[0.06] px-5 py-3.5 transition-colors last:border-0 hover:bg-ivory/[0.03] sm:grid-cols-[1.1fr_1fr_1.4fr_0.6fr_0.8fr] sm:gap-4"
          >
            <span className="text-[12.5px] font-medium uppercase tracking-[0.06em] text-ivory">
              {s.city}
            </span>
            <span className="text-right text-[11.5px] text-bronze sm:text-left">
              {s.trigger}
            </span>
            <span className="col-span-2 order-last text-[11px] text-ivory/40 sm:order-none sm:col-span-1">
              {s.ctx}
            </span>
            <span className="flex items-center gap-2">
              <span className="font-display text-lg text-ivory">{s.score}</span>
              <span className="h-1 w-10 overflow-hidden rounded-full bg-ivory/10">
                <i
                  className="block h-full rounded-full bg-gradient-to-r from-bronze-3 to-bronze-2"
                  style={{ width: `${s.score * 10}%` }}
                />
              </span>
            </span>
            <span>
              <StatusPill tone={s.hot ? "bronze" : "mute"}>{s.act}</StatusPill>
            </span>
          </div>
        ))}
      </div>
      <FootNote>A lead, not a verdict · Read from public listings</FootNote>
    </MockShell>
  );
}

export function SignalScoreCards() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-ivory/10 bg-ivory/10">
      {SIGNALS.slice(0, 3).map((s) => (
        <div
          key={s.city}
          className="flex items-center justify-between gap-4 bg-ink-2 px-5 py-4"
        >
          <div>
            <p className="text-[13px] text-ivory">{s.city}</p>
            <p className="mt-0.5 text-[10.5px] text-ivory/40">
              {s.trigger} · online listing
            </p>
          </div>
          <span className="font-display text-2xl text-bronze">{s.score}</span>
        </div>
      ))}
    </div>
  );
}

/* ————————————————— 4 · Field capture ————————————————— */

const ROOMS = [
  { name: "Living", img: IMG.living },
  { name: "Kitchen", img: IMG.kitchen },
  { name: "Terrace", img: IMG.terrace },
];

function RoomThumb({ name, img }: { name: string; img: string }) {
  return (
    <figure className="img-zoom group relative overflow-hidden rounded-lg border border-ivory/10">
      <img
        src={img}
        alt={`${name} — captured room`}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <figcaption className="absolute left-2 top-2 rounded-sm bg-ink/70 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ivory/85 backdrop-blur-sm">
        {name}
      </figcaption>
      <div className="absolute inset-x-2 bottom-2 flex translate-y-2 gap-1.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="flex cursor-pointer items-center gap-1 rounded-sm bg-ink/75 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/85 backdrop-blur-md hover:text-bronze">
          <RefreshCw size={9} /> Replace
        </span>
        <span className="flex cursor-pointer items-center gap-1 rounded-sm bg-ink/75 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-ivory/85 backdrop-blur-md hover:text-clay">
          <Trash2 size={9} /> Remove
        </span>
      </div>
    </figure>
  );
}

export function FieldCapture() {
  return (
    <MockShell
      title="Field Capture · Seestrasse 14"
      right={
        <StatusPill tone="green">
          <i className="h-1 w-1 rounded-full bg-sage" /> Offline ready
        </StatusPill>
      }
    >
      <div className="px-5 pt-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/40">
          6 rooms · 184 m² · Lakeside
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {ROOMS.map((r) => (
            <RoomThumb key={r.name} {...r} />
          ))}
        </div>
        {/* Voice note */}
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-ivory/10 bg-ink-2/70 px-3.5 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze/30 bg-bronze/10">
            <Mic size={12} className="text-bronze" />
          </span>
          <div className="flex h-5 items-end gap-[3px]" aria-hidden="true">
            {[0.5, 1, 0.7, 0.9, 0.4, 0.8, 0.6].map((d, i) => (
              <i
                key={i}
                className="eq-bar w-[2.5px] rounded-full bg-bronze/80"
                style={{ height: "100%", animationDelay: `${i * 0.12}s`, animationDuration: `${0.8 + d * 0.5}s` }}
              />
            ))}
          </div>
          <p className="min-w-0 truncate text-[11.5px] italic text-ivory/60">
            Transcribing — “South-facing, lake glimpse”
          </p>
        </div>
      </div>
      <div className="h-4" />
      <FootNote>Sorted by room · Syncs when back online</FootNote>
    </MockShell>
  );
}

/* ————————————————— 5 · Owner dossier ————————————————— */

const COMPS = [
  { at: "Comparable · Erlenbach", v: "CHF 4.6M" },
  { at: "Comparable · Küsnacht", v: "CHF 5.1M" },
  { at: "Comparable · Meilen", v: "CHF 4.2M" },
];

export function DossierCard() {
  return (
    <div className="panel-light overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-3.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-black/50">
          Maklor · Owner Dossier · 2026
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bronze-3">
          PDF ready
        </span>
      </div>
      <div className="px-5 pt-4">
        <p className="font-display text-xl text-black">Seestrasse 14, Erlenbach</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-black/45">
          6 rooms · 184 m² · Lakeside
        </p>
        <div className="mt-4 grid grid-cols-4 grid-rows-2 gap-2">
          <img src={IMG.livingBright} alt="Dossier interior — living space" loading="lazy" className="col-span-2 row-span-2 h-full w-full rounded-md object-cover" />
          <img src={IMG.kitchen} alt="Dossier interior — kitchen" loading="lazy" className="col-span-2 aspect-[2/1] w-full rounded-md object-cover" />
          <img src={IMG.master} alt="Dossier interior — suite" loading="lazy" className="col-span-2 aspect-[2/1] w-full rounded-md object-cover" />
        </div>
        <div className="mt-4 space-y-2">
          {COMPS.map((c) => (
            <div key={c.at} className="flex items-center justify-between border-b border-black/10 pb-2">
              <span className="text-[11.5px] text-black/55">{c.at}</span>
              <span className="font-display text-[15px] text-black">{c.v}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="btn-lux inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-black px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper hover:text-black">
            <FileText size={10} /> Client brochure · PDF
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-black/60">
            <Download size={10} /> Owner report · PDF
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-black/10 bg-black/[0.04] px-5 py-3">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-black/40">
          Powered by Maklor
        </span>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-black/60">
          Emil Marchand Immobilien
        </span>
      </div>
    </div>
  );
}

/* ————————————————— 6 · Notary cockpit ————————————————— */

const CHECKLIST = [
  { item: "Reservation contract signed", meta: "07 MAR", done: true },
  { item: "Land registry extract ordered", meta: "09 MAR", done: true },
  { item: "Buyer financing to record", meta: "AMBER", done: false, amber: true },
  { item: "Notary appointment confirmed", meta: "14:30", done: false },
];

const STAGES = ["Mandate Signed", "Marketing", "Offer Accepted", "Notary Phase", "Handover"];

export function NotaryCockpit({ stepper = false }: { stepper?: boolean }) {
  return (
    <MockShell
      title="Notary Cockpit · Canton Zürich"
      right={
        <span className="flex items-center gap-2 font-mono text-[10px] text-bronze">
          <span className="font-display text-base">4/6</span> complete
        </span>
      }
    >
      <div className="px-5 pt-4">
        <div className="h-1 w-full overflow-hidden rounded-full bg-ivory/10">
          <i className="block h-full w-[66%] rounded-full bg-gradient-to-r from-bronze-3 via-bronze to-bronze-2" />
        </div>

        {stepper && (
          <div className="mt-5 hidden items-center sm:flex">
            {STAGES.map((s, i) => (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border",
                      i < 3 && "border-sage/40 bg-sage/15 text-sage",
                      i === 3 && "border-bronze bg-bronze/20 text-bronze",
                      i > 3 && "border-ivory/20 text-ivory/30"
                    )}
                  >
                    {i < 3 ? <Check size={10} /> : <i className="h-1 w-1 rounded-full bg-current" />}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap font-mono text-[7.5px] uppercase tracking-[0.14em]",
                      i === 3 ? "text-bronze" : i < 3 ? "text-ivory/55" : "text-ivory/30"
                    )}
                  >
                    {s}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <i className={cn("mx-2 mb-4 h-px flex-1", i < 3 ? "bg-sage/30" : "bg-ivory/15")} />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-px overflow-hidden rounded-lg border border-ivory/10">
          {CHECKLIST.map((c) => (
            <div
              key={c.item}
              className={cn(
                "flex items-center justify-between gap-3 px-3.5 py-3",
                c.amber ? "bg-amber/[0.07]" : "bg-ink-2/60"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border",
                    c.done
                      ? "border-sage/40 bg-sage/15 text-sage"
                      : c.amber
                        ? "border-amber/50 bg-amber/15 text-amber"
                        : "border-ivory/20 text-ivory/40"
                  )}
                >
                  {c.done ? <Check size={10} /> : <i className="h-1 w-1 rounded-full bg-current" />}
                </span>
                <p className={cn("text-[12px]", c.amber ? "text-amber" : "text-ivory/80")}>
                  {c.item}
                </p>
              </div>
              <span
                className={cn(
                  "font-mono text-[9px] uppercase tracking-[0.16em]",
                  c.done ? "text-sage/80" : c.amber ? "text-amber" : "text-ivory/40"
                )}
              >
                {c.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="h-4" />
      <FootNote>Commission shown secured when file complete</FootNote>
    </MockShell>
  );
}

/* ————————————————— 7 · Import & documents ————————————————— */

export function ImportCard() {
  return (
    <MockShell title="Import &amp; Documents" right={<FileSpreadsheet size={13} className="text-bronze" />}>
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-sage/25 bg-sage/[0.06] px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-ivory/15 bg-ink-2">
              <FileSpreadsheet size={14} className="text-sage" />
            </span>
            <div>
              <p className="font-mono text-[11px] text-ivory">crm_portfolio.idx</p>
              <p className="mt-0.5 text-[10px] text-ivory/40">IDX 3.01 · 183 fields</p>
            </div>
          </div>
          <StatusPill tone="green">
            <Check size={9} /> Recognised
          </StatusPill>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["CSV · contacts", "Excel · mandates"].map((t) => (
            <span key={t} className="rounded-sm border border-ivory/15 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/55">
              {t}
            </span>
          ))}
        </div>
        <div className="my-4 h-px bg-ivory/10" />
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-bronze px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
            <FileText size={10} /> Client brochure · PDF
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-bronze px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
            <FileText size={10} /> Owner report · PDF
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-ivory/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/35">
            Portal export · not yet available
          </span>
        </div>
      </div>
      <div className="h-4" />
      <FootNote>Keep publishing with your current tools</FootNote>
    </MockShell>
  );
}

/* ————————————————— 8 · AIREA note ————————————————— */

export function AireaNote() {
  return (
    <MockShell title="Maklor · Daily Command">
      <div className="px-5 pt-5">
        <p className="font-display text-2xl italic text-ivory">Good morning, Emil.</p>
        <p className="mt-1 text-[12.5px] text-ivory/50">
          Three items prepared for your review.
        </p>
        <div className="mt-4 rounded-lg border border-bronze/25 bg-bronze/[0.06] p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze/40 bg-bronze/15">
              <Sparkles size={13} className="text-bronze" />
            </span>
            <div>
              <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-bronze">Airea</p>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory/75">
                3 notary dossiers still missing the buyer's financing. Complete
                them before generation — replies drafted where possible.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-sm bg-bronze px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-bronze-2">
                  Review &amp; Send <ArrowUpRight size={10} />
                </span>
                <span className="inline-flex cursor-pointer items-center rounded-sm border border-ivory/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ivory/50">
                  Dismiss
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-5" />
      <FootNote>It prepares · You decide</FootNote>
    </MockShell>
  );
}

/* ————————————————— 9 · Command workspace (wide) ————————————————— */

const WORK_ROWS = [
  { p: "Seestrasse 14", loc: "Erlenbach · ZH", stage: "Notary Phase", days: "12", risk: "amber" as const },
  { p: "Villa Tribschen", loc: "Luzern · LU", stage: "Marketing", days: "5", risk: "green" as const },
  { p: "Seeweg 8", loc: "Küsnacht · ZH", stage: "Offer Accepted", days: "3", risk: "green" as const },
  { p: "Bühlstrasse 21", loc: "Zug · ZG", stage: "Notary Phase", days: "28", risk: "red" as const },
  { p: "Dammweg 4", loc: "Thalwil · ZH", stage: "Mandate Signed", days: "1", risk: "green" as const },
];

const RISK_DOT = { green: "bg-sage", amber: "bg-amber", red: "bg-clay" };

const INTERVENTIONS = [
  { t: "Approve drafted dossier — Seestrasse 14", m: "Ready · Review", tone: "bronze" as const },
  { t: "Record buyer financing — Erlenbach", m: "Notary dossier", tone: "amber" as const },
  { t: "Call first — Küsnacht signal", m: "8.6 · Price drop", tone: "green" as const },
  { t: "Confirm notary slot — Dammstrasse 4", m: "14:30 · Today", tone: "mute" as const },
];

export function CommandWorkspace() {
  return (
    <MockShell
      title="Maklor · Command Workspace"
      right={<LiveClock className="text-bronze/80" />}
    >
      <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr_260px]">
        {/* Sidebar */}
        <div className="hidden border-r border-ivory/10 px-4 py-5 md:block">
          {[
            { icon: LayoutGrid, label: "Mandates", active: true },
            { icon: CalendarDays, label: "Calendar", active: false },
            { icon: Vault, label: "Vault", active: false },
          ].map((n) => (
            <div
              key={n.label}
              className={cn(
                "mb-1 flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[12px]",
                n.active
                  ? "border border-bronze/25 bg-bronze/10 text-bronze"
                  : "text-ivory/45 hover:text-ivory/70"
              )}
            >
              <n.icon size={13} /> {n.label}
            </div>
          ))}
          <div className="mt-6 rounded-md border border-ivory/10 bg-ink-2/60 p-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ivory/35">
              Active mandates
            </p>
            <p className="mt-1 font-display text-2xl text-ivory">
              14 <span className="text-xs text-ivory/40">open</span>
            </p>
          </div>
        </div>

        {/* Main table */}
        <div className="px-5 py-5">
          <div className="grid grid-cols-[1.3fr_1fr_0.5fr_0.5fr] gap-3 border-b border-ivory/10 pb-2.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/35">
            <span>Property</span>
            <span>Stage</span>
            <span className="text-center">Days</span>
            <span className="text-right">Risk</span>
          </div>
          {WORK_ROWS.map((r) => (
            <div
              key={r.p}
              className="grid grid-cols-[1.3fr_1fr_0.5fr_0.5fr] items-center gap-3 border-b border-ivory/[0.06] py-3 transition-colors last:border-0 hover:bg-ivory/[0.02]"
            >
              <div>
                <p className="text-[12.5px] text-ivory/90">{r.p}</p>
                <p className="text-[10px] text-ivory/40">{r.loc}</p>
              </div>
              <span className="text-[11px] text-ivory/55">{r.stage}</span>
              <span className="text-center font-mono text-[11px] text-ivory/50">{r.days}</span>
              <span className="flex justify-end">
                <i className={cn("h-2 w-2 rounded-full", RISK_DOT[r.risk])} />
              </span>
            </div>
          ))}
        </div>

        {/* Interventions rail */}
        <div className="border-t border-ivory/10 px-5 py-5 md:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bronze">
            Today's interventions
          </p>
          <div className="mt-3 space-y-2">
            {INTERVENTIONS.map((i) => (
              <div key={i.t} className="rounded-md border border-ivory/10 bg-ink-2/60 p-3">
                <p className="text-[11.5px] leading-snug text-ivory/80">{i.t}</p>
                <div className="mt-2">
                  <StatusPill tone={i.tone}>{i.m}</StatusPill>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockShell>
  );
}

/* ————————————————— 10 · Team pipeline ————————————————— */

const TEAM_ROWS = [
  { p: "Seestrasse 14 · Erlenbach", a: "E. Marchand", s: "Notary Phase", r: "amber" as const },
  { p: "Villa Tribschen · Luzern", a: "L. Brunner", s: "Marketing", r: "green" as const },
  { p: "Seeweg 8 · Küsnacht", a: "A. Keller", s: "Offer Accepted", r: "green" as const },
  { p: "Bühlstrasse 21 · Zug", a: "M. Roth", s: "Notary Phase", r: "red" as const },
  { p: "Rämistrasse 9 · Zürich", a: "S. Frei", s: "Marketing", r: "green" as const },
  { p: "Hofweg 3 · Zug", a: "N. Vogel", s: "Offer Accepted", r: "amber" as const },
];

export function TeamPipeline() {
  return (
    <MockShell
      title="Maklor · Team Command"
      right={<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/45">Firm pipeline · 6 agents</span>}
    >
      <div className="px-5 py-4">
        <div className="grid grid-cols-[1.4fr_0.9fr_1fr_0.4fr] gap-3 border-b border-ivory/10 pb-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ivory/35">
          <span>Property</span>
          <span>Agent</span>
          <span>Stage</span>
          <span className="text-right">Risk</span>
        </div>
        {TEAM_ROWS.map((r) => (
          <div key={r.p} className="grid grid-cols-[1.4fr_0.9fr_1fr_0.4fr] items-center gap-3 border-b border-ivory/[0.06] py-2.5 last:border-0 hover:bg-ivory/[0.02]">
            <span className="truncate text-[12px] text-ivory/85">{r.p}</span>
            <span className="truncate text-[11px] text-ivory/50">{r.a}</span>
            <span className="truncate text-[11px] text-ivory/50">{r.s}</span>
            <span className="flex justify-end">
              <i className={cn("h-2 w-2 rounded-full", RISK_DOT[r.r])} />
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-px border-t border-ivory/10 bg-ivory/10">
        {[
          ["6", "Agents on standard"],
          ["41d", "Avg. days to close"],
          ["100%", "Checklist compliance"],
        ].map(([v, k]) => (
          <div key={k} className="bg-ink-2 px-4 py-3.5 text-center">
            <p className="font-display text-xl text-bronze">{v}</p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ivory/40">{k}</p>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/* ————————————————— 11 · Enterprise dashboard ————————————————— */

const CANTON_BARS = [
  { c: "Zürich", v: "CHF 284M", w: "100%" },
  { c: "Zug", v: "CHF 168M", w: "59%" },
  { c: "Luzern", v: "CHF 104M", w: "37%" },
  { c: "St. Gallen", v: "CHF 61M", w: "22%" },
  { c: "Vaud", v: "CHF 25M", w: "10%" },
];

export function EnterpriseDash() {
  return (
    <MockShell
      title="Maklor · Enterprise Command"
      right={<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/45">4 offices · 5 cantons · EU-hosted</span>}
    >
      <div className="grid gap-px border-b border-ivory/10 bg-ivory/10 sm:grid-cols-4">
        {[
          ["Offices", "4", "Zürich · Zug · Luzern · SG"],
          ["Active agents", "52", "▲ 6 this quarter"],
          ["Mandates", "318", "▲ 11% vs last quarter"],
          ["Pipeline", "CHF 642M", "▲ 18% vs last quarter"],
        ].map(([k, v, d]) => (
          <div key={k} className="bg-ink-2 px-5 py-5">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/40">{k}</p>
            <p className="mt-1.5 font-display text-2xl text-ivory">{v}</p>
            <p className="mt-1 text-[10px] text-sage/80">{d}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2">
        <div className="border-b border-ivory/10 px-5 py-5 md:border-b-0 md:border-r">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bronze">Pipeline by canton</p>
          <div className="mt-4 space-y-3">
            {CANTON_BARS.map((b) => (
              <div key={b.c}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[11.5px] text-ivory/75">{b.c}</span>
                  <span className="font-mono text-[10px] text-ivory/45">{b.v}</span>
                </div>
                <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-ivory/10">
                  <i className="block h-full rounded-full bg-gradient-to-r from-bronze-3 to-bronze-2" style={{ width: b.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 py-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bronze">Top producers</p>
          <div className="mt-4 space-y-2.5">
            {[
              ["E. Marchand", "Zürich", "CHF 38M"],
              ["A. Keller", "Zug", "CHF 31M"],
              ["L. Brunner", "Luzern", "CHF 27M"],
              ["M. Roth", "St. Gallen", "CHF 22M"],
            ].map(([n, c, v]) => (
              <div key={n} className="flex items-center justify-between border-b border-ivory/[0.06] pb-2.5">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ivory/15 bg-ink-2 font-mono text-[8px] uppercase text-bronze">
                    {n.split(" ").map((x) => x[0]).join("")}
                  </span>
                  <div>
                    <p className="text-[12px] text-ivory/85">{n}</p>
                    <p className="text-[9.5px] text-ivory/40">{c}</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-ivory/60">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FootNote>Risk monitor · 3 dossiers missing buyer financing · Journal up to date</FootNote>
    </MockShell>
  );
}

/* ————————————————— 12 · Trust chips strip ————————————————— */

export function TrustStrip({ light = false }: { light?: boolean }) {
  const items = [
    { icon: Landmark, t: "Built on Swiss public registers" },
    { icon: Building2, t: "EU Data Hosting · Stockholm" },
    { icon: ShieldCheck, t: "Subject to the nFADP" },
    { icon: FileSpreadsheet, t: "No portal integration needed" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
      {items.map((it, i) => (
        <div
          key={it.t}
          className={cn(
            "flex items-center gap-3 border px-5 py-4",
            light ? "border-ink/10 text-ink/70" : "border-ivory/10 text-ivory/60",
            i === 0 && "lg:rounded-l-xl rounded-tl-xl",
            i === 1 && "rounded-tr-xl lg:rounded-none",
            i === 2 && "rounded-bl-xl lg:rounded-none",
            i === 3 && "rounded-br-xl lg:rounded-r-xl"
          )}
        >
          <it.icon size={14} className={light ? "text-bronze-3" : "text-bronze"} strokeWidth={1.5} />
          <span className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em]">
            {it.t}
          </span>
        </div>
      ))}
    </div>
  );
}
