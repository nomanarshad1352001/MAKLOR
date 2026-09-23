import { FormEvent, ReactNode, useState } from "react";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { Eyebrow, Reveal } from "../lib/ui";
import { cn } from "../utils/cn";

/* ————————————— Input atoms ————————————— */

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("group block", className)}>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/40 transition-colors group-focus-within:text-bronze">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "mt-2 w-full border-b border-ivory/15 bg-transparent pb-2.5 text-[14px] text-ivory placeholder:text-ivory/25 focus:border-bronze transition-colors duration-300";

function TextInput({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  return <input type={type} placeholder={placeholder} className={inputCls} />;
}

function Select({ options }: { options: string[] }) {
  return (
    <select className={cn(inputCls, "cursor-pointer appearance-none bg-ink [&>option]:bg-ink-2")}>
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

/* ————————————— Promises ————————————— */

const PROMISES = [
  "We read every application personally. No automated sorting. No calendar links.",
  "We respond within two working days if we're a fit — with a time that works for your week.",
  "The walkthrough is built around your firm — not a slide deck. Bring questions; bring partners; bring scepticism.",
  "Everything stays between us. What you share stays with the partner you speak to.",
];

export default function Walkthrough({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="walkthrough" className="relative overflow-hidden bg-ink py-24 lg:py-36">
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-bronze/[0.05] blur-[140px]" />
      <div className="mx-auto grid max-w-[1560px] gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* Pitch */}
        <div>
          <Reveal>
            <Eyebrow>A Private Walkthrough</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="font-display display-md mt-6 text-ivory">
              Not a demo. A walk through your firm,{" "}
              <em className="gold-text not-italic">with Maklor inside it.</em>
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ivory/55">
              An hour with one of our partners, showing you exactly how Maklor
              would sit inside your firm — your mandate flow, your team shape,
              your goals. We come prepared because you've told us what matters.
            </p>
          </Reveal>
          <div className="mt-10 space-y-5">
            {PROMISES.map((p, i) => (
              <Reveal key={p} delay={220 + i * 80}>
                <div className="flex items-start gap-4 border-b border-ivory/[0.07] pb-5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-bronze/40 text-bronze">
                    <Check size={10} />
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-ivory/65">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Form */}
        <Reveal delay={150}>
          <div className="panel-dark rounded-xl p-7 sm:p-9">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-sage/40 bg-sage/10">
                  <ShieldCheck size={22} className="text-sage" strokeWidth={1.5} />
                </span>
                <p className="font-display mt-6 text-2xl text-ivory">
                  Application received.
                </p>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ivory/55">
                  We read every word personally. If we're a fit, you'll hear
                  from us within two working days — with a time that works for
                  your week, not a calendar link.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bronze">
                  Tell us about your firm
                </p>
                <p className="mt-2 text-[12.5px] text-ivory/45">
                  {compact
                    ? "Four questions. Two minutes. A partner will respond."
                    : "Ten questions. Five minutes. We'll read every word."}
                </p>

                <div className="mt-8">
                  <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/35">
                    <span className="text-bronze">01</span> Who you are
                  </p>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    <Field label="Full name">
                      <TextInput placeholder="Emil Marchand" />
                    </Field>
                    <Field label="Work email">
                      <TextInput placeholder="emil@firm.ch" type="email" />
                    </Field>
                    <Field label={compact ? "Firm name" : "Your role"}>
                      {compact ? (
                        <TextInput placeholder="Marchand Immobilien AG" />
                      ) : (
                        <Select options={["Owner / Partner", "Managing Agent", "Agent", "Operations"]} />
                      )}
                    </Field>
                    <Field label={compact ? "Firm size" : "Firm name"}>
                      {compact ? (
                        <Select options={["Solo — 1 seat", "Boutique — 2–10 seats", "Enterprise — 10+ seats"]} />
                      ) : (
                        <TextInput placeholder="Marchand Immobilien AG" />
                      )}
                    </Field>
                  </div>
                  {!compact && (
                    <Field label="Cantons you work in" className="mt-6 block">
                      <TextInput placeholder="ZH, ZG, SZ" />
                    </Field>
                  )}
                </div>

                {!compact && (
                  <>
                    <div className="mt-9">
                      <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/35">
                        <span className="text-bronze">02</span> Your firm today
                      </p>
                      <div className="mt-5 grid gap-6 sm:grid-cols-2">
                        <Field label="Agents in your firm">
                          <Select options={["Just me", "2–5", "6–10", "11–25", "25+"]} />
                        </Field>
                        <Field label="Annual transaction volume">
                          <Select options={["Under CHF 20M", "CHF 20–60M", "CHF 60–150M", "CHF 150M+"]} />
                        </Field>
                        <Field label="Typical mandate range">
                          <Select options={["CHF 0.5–1.5M", "CHF 1.5–4M", "CHF 4–10M", "CHF 10M+"]} />
                        </Field>
                        <Field label="Tools you use today">
                          <TextInput placeholder="e.g. CRM, Excel, WhatsApp…" />
                        </Field>
                      </div>
                    </div>

                    <div className="mt-9">
                      <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/35">
                        <span className="text-bronze">03</span> What you'd want to change
                      </p>
                      <Field label="If Maklor solved one thing, what would justify the price?" className="mt-5 block">
                        <TextInput placeholder="One sentence. Be specific." />
                      </Field>
                      <Field label="Where should your firm be in twelve months?" className="mt-6 block">
                        <TextInput placeholder="More mandates? Higher average deal? Faster ramp?" />
                      </Field>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn-lux mt-10 flex w-full items-center justify-center gap-3 bg-bronze px-8 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-onb"
                >
                  <span className="relative z-10">
                    {compact ? "Request a Tailored Walkthrough" : "Request a Private Walkthrough"}
                  </span>
                  <ArrowUpRight size={14} className="relative z-10" />
                </button>
                <p className="mt-4 text-center font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.16em] text-ivory/30">
                  No automated sorting · Response within two working days
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
