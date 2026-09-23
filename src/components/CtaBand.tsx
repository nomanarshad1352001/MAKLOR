import { ArrowUpRight } from "lucide-react";
import { IMG } from "../lib/assets";
import { Eyebrow, Reveal, goWalkthrough } from "../lib/ui";

export default function CtaBand({
  eyebrow = "Private Walkthrough",
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-ivory/[0.07] bg-ink py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src={IMG.villaTwilight}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.16] saturate-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={110}>
          <h2 className="font-display display-md mt-6 text-ivory">{title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-[14.5px] leading-relaxed text-ivory/55">
            {copy}
          </p>
        </Reveal>
        <Reveal delay={290}>
          <button
            onClick={goWalkthrough}
            className="btn-lux mt-10 inline-flex items-center gap-3 bg-bronze px-9 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-onb"
          >
            <span className="relative z-10">Request a Private Walkthrough</span>
            <ArrowUpRight size={14} className="relative z-10" />
          </button>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-6 font-mono text-[8.5px] uppercase tracking-[0.2em] text-ivory/30">
            Not a demo · A walk through your firm, with Maklor inside it
          </p>
        </Reveal>
      </div>
    </section>
  );
}
