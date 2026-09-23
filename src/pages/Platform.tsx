import { ReactNode } from "react";
import { Check, FileBadge2 } from "lucide-react";
import { IMG, VIDEO } from "../lib/assets";
import {
  Btn,
  Eyebrow,
  Parallax,
  Reveal,
  RevealWords,
  Tilt3D,
  goWalkthrough,
  route,
} from "../lib/ui";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import {
  CommandCard,
  CommandWorkspace,
  DossierCard,
  FieldCapture,
  ImportCard,
  NotaryCockpit,
  SignalTable,
} from "../components/Mockups";
import { cn } from "../utils/cn";

/* ————— Editorial feature row ————— */

function Feature({
  n,
  kicker,
  head,
  copy,
  extra,
  reverse = false,
  children,
}: {
  n: string;
  kicker: string;
  head: ReactNode;
  copy: ReactNode;
  extra?: ReactNode;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-24 lg:py-28">
      <div className={cn(reverse && "lg:order-2")}>
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] text-bronze">
            {n} · {kicker}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display display-md mt-5 text-ivory">{head}</h2>
        </Reveal>
        <Reveal delay={190}>
          <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-ivory/55">{copy}</p>
        </Reveal>
        {extra && <Reveal delay={280}>{extra}</Reveal>}
      </div>
      <Reveal delay={180} className={cn(reverse && "lg:order-1")}>
        <Parallax strength={18}>
          <Tilt3D max={4}>{children}</Tilt3D>
        </Parallax>
      </Reveal>
    </div>
  );
}

const VAULT = [
  { t: "Seller identity & land registry extract", ok: true },
  { t: "Building insurance & energy certificate", ok: true },
  { t: "Buyer financing — notary dossier", ok: false, note: "Not yet recorded — the dossier cannot be generated without it." },
  { t: "Debt register extract (Betreibungsregisterauszug)", ok: false },
];

export default function Platform() {
  return (
    <>
      <PageHero
        eyebrow="The Platform"
        title={
          <>
            The operational engine behind{" "}
            <em className="gold-text not-italic">every mandate.</em>
          </>
        }
        copy="A single, unified workspace that replaces fragmented tools. From offline field capture to cantonal notary coordination — the infrastructure required to execute the Swiss mandate at an institutional standard."
        image={IMG.heroVilla}
        imageAlt="Modern Swiss villa illuminated at dusk"
      >
        <Btn onClick={goWalkthrough}>Request a Private Walkthrough</Btn>
        <Btn variant="ghost" href={route("/pricing")}>
          View Pricing
        </Btn>
      </PageHero>

      {/* Flagship workspace */}
      <section className="relative z-10 -mt-16 bg-ink px-5 sm:px-8 lg:-mt-24 lg:px-12">
        <Reveal className="mx-auto max-w-[1400px]">
          <CommandWorkspace />
        </Reveal>
      </section>

      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* 01 · Command */}
        <Feature
          n="01"
          kicker="Command Workspace"
          head={
            <>
              Start the day with{" "}
              <em className="gold-text not-italic">absolute clarity.</em>
            </>
          }
          copy={
            <>
              Generic CRMs show you a list of leads. Maklor shows you a list of
              decisions. The Daily Command gathers your active mandates and
              appointments, brings up signals on online listings, and prioritizes
              your day based on commission impact.{" "}
              <span className="text-ivory/85">
                AIREA watches the deal and drafts the reply — but waits for your
                click. The intelligence is proactive; the execution is yours.
              </span>
            </>
          }
        >
          <div className="mx-auto max-w-[500px]">
            <CommandCard />
          </div>
        </Feature>

        <div className="hairline-t" />

        {/* 02 · Field Operations */}
        <Feature
          reverse
          n="02"
          kicker="Field Operations"
          head={
            <>
              Capture the property.{" "}
              <em className="gold-text not-italic">Defend the price.</em>
            </>
          }
          copy="The agent walks the property. Maklor's offline-ready interface captures photos, 360° scans, voice notes and documents, automatically sorted by room. On completion, the system generates a presentation-grade owner report in your agency's logo and colours — the agent defends the pricing in the room, and leaves the house with the mandate secured."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldCapture />
            <div className="sm:translate-y-12">
              <DossierCard />
            </div>
          </div>
        </Feature>

        <div className="hairline-t" />

        {/* 03 · Intelligence */}
        <Feature
          n="03"
          kicker="Maklor Intelligence"
          head={
            <>
              Spot the listings{" "}
              <em className="gold-text not-italic">losing momentum.</em>
            </>
          }
          copy="Listings published online are checked for price drops, long time online and repeated price changes — then scored. Each signal points to a seller who may be open to a new approach, so your agents can start a respectful conversation with the figures in hand."
          extra={
            <p className="mt-8 flex items-start gap-3 border-l border-bronze/40 pl-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-ivory/40">
              Read from public sources only. Lawful, discreet, subject to the
              nFADP. A lead, not a verdict.
            </p>
          }
        >
          <SignalTable />
        </Feature>
      </div>

      {/* Cinematic interstitial */}
      <section className="relative h-[62vh] overflow-hidden">
        <Parallax strength={70} className="absolute inset-[-10%]">
          <img
            src={IMG.signing}
            alt="Partners reviewing closing documents"
            loading="lazy"
            className="h-full w-full object-cover saturate-[0.65]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full items-center justify-center px-6 text-center">
          <Reveal>
            <p className="font-display display-md max-w-3xl italic text-ivory">
              “The work doesn't stop at the offer.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* Video interlude — Zürich old town at dusk */}
      <section className="relative overflow-hidden border-y border-paper/15">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={IMG.zurichHistoric}
            aria-label="Zürich old town and the river at dusk"
          >
            <source src={VIDEO.zurichDusk} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80" />
        </div>
        <div className="on-inverse relative flex min-h-[70svh] items-center justify-center px-6 py-24 text-center">
          <div>
            <h2 className="font-display display-lg text-[#f4f0e4]">
              <RevealWords text="The notary phase," step={95} />{" "}
              <span className="gold-text italic">
                <RevealWords text="orchestrated." step={120} />
              </span>
            </h2>
            <Reveal delay={320}>
              <p className="mx-auto mt-6 max-w-md text-[14px] leading-relaxed text-[#f4f0e4]/75">
                Sixty days of cantonal coordination — every document, every
                deadline, every franc of commission, visible at a glance.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* 04 · Risk Mitigation */}
        <Feature
          n="04"
          kicker="Risk Mitigation"
          head={
            <>
              Know which commission{" "}
              <em className="gold-text not-italic">is secured.</em>
            </>
          }
          copy="The Closing Cockpit follows the notary phase item by item: one list common to every canton, plus canton-specific items only where an official source exists — today the official initial-rent form, listed for 7 cantons. Items carry their legal source; deadlines are set by the agent on the file. You see what is missing, and why it is asked for."
        >
          <div className="space-y-5">
            <NotaryCockpit stepper />
          </div>
        </Feature>

        {/* Document vault */}
        <Reveal className="-mt-6 mb-20 lg:-mt-12">
          <div className="panel-dark mx-auto max-w-3xl rounded-xl p-7 sm:p-9 lg:ml-auto lg:mr-0">
            <p className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-bronze">
              <FileBadge2 size={13} /> Document Vault · Seestrasse 14
            </p>
            <div className="mt-5 space-y-3">
              {VAULT.map((v) => (
                <div key={v.t} className="flex items-start gap-3 border-b border-ivory/[0.07] pb-3 last:border-0">
                  <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", v.ok ? "border-sage/40 bg-sage/10 text-sage" : "border-amber/50 bg-amber/10 text-amber")}>
                    {v.ok ? <Check size={10} /> : <i className="h-1 w-1 rounded-full bg-current" />}
                  </span>
                  <div>
                    <p className={cn("text-[13px]", v.ok ? "text-ivory/75" : "text-amber/90")}>{v.t}</p>
                    {v.note && <p className="mt-1 text-[11px] text-ivory/40">{v.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="hairline-t" />

        {/* 05 · Import & Documents */}
        <Feature
          reverse
          n="05"
          kicker="Import & Documents"
          head={
            <>
              Bring your portfolio in.{" "}
              <em className="gold-text not-italic">Hand over finished PDFs.</em>
            </>
          }
          copy="Maklor imports your existing portfolio from the files your CRM already produces — IDX 3.01, CSV or Excel — and generates client brochures and owner reports ready to hand over, with your logo and colours. Export to the listing portals is not yet available: you keep publishing with your current tools."
        >
          <ImportCard />
        </Feature>
      </div>

      {/* AIREA boundary strip */}
      <section className="border-t border-ivory/[0.07] bg-ink-2 py-20 text-center lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <Eyebrow className="justify-center">Airea · The Boundary</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-display display-md mt-7 italic text-ivory">
              It prepares. It watches. It drafts.{" "}
              <span className="gold-text">But it never decides.</span>
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-ivory/50">
              It never talks to your clients. It never sends without your
              approval. It never makes decisions for you. That line is not a
              feature — it is the shape of the whole product.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 font-mono text-[9.5px] uppercase tracking-[0.26em] text-bronze">
              Technology behind the agent. Never in its place.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="See the platform in action."
        copy="A private walkthrough isn't a sales call. It's an hour with one of our partners, showing you exactly how Maklor would sit inside your firm."
      />
    </>
  );
}
