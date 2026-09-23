import { Cloud, KeyRound, LineChart, MapPin } from "lucide-react";
import { IMG } from "../lib/assets";
import { Btn, Eyebrow, Parallax, Reveal, SectionHead, goWalkthrough, route } from "../lib/ui";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";

/* ————————————— Origin ————————————— */

function Origin() {
  return (
    <section className="bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow>The Origin · The Mandate</Eyebrow>
            </Reveal>
            <Reveal delay={110}>
              <h2 className="font-display display-md mt-7 text-ivory">
                We didn't start in real estate.{" "}
                <em className="gold-text not-italic">We started in enterprise infrastructure.</em>
              </h2>
            </Reveal>
          </div>
          <div className="space-y-6 lg:pt-20">
            <Reveal delay={200}>
              <p className="text-[14.5px] leading-relaxed text-ivory/55">
                For thirty years, our founders have architected digital
                transformation and applied data analytics for high-stakes,
                regulated industries. When we looked at the Swiss real-estate
                market, we saw top-tier professionals running
                institutional-level businesses on consumer-grade, fragmented
                software — the mandate managed in spreadsheets, WhatsApp
                threads, and generic sales CRMs.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <p className="border-l border-bronze/40 pl-5 font-display text-lg italic leading-relaxed text-ivory/80">
                We don't build toys. We build the infrastructure that protects
                your margin, secures your data, and scales your firm.
              </p>
            </Reveal>
          </div>
        </div>
        <Reveal delay={150} className="mt-16">
          <div className="rv-img img-zoom relative overflow-hidden rounded-xl border border-ivory/10">
            <Parallax strength={50} className="absolute inset-[-8%]">
              <img
                src={IMG.blueHour}
                alt="Swiss countryside at blue hour — winding roads and twilight"
                loading="lazy"
                className="h-full w-full object-cover saturate-[0.7]"
              />
            </Parallax>
            <div className="relative aspect-[16/9] sm:aspect-[21/9]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between sm:bottom-8 sm:left-8 sm:right-8">
              <span className="rounded-sm bg-ink/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/80 backdrop-blur-md">
                Uitikon · Canton Zürich · 47.35° N, 8.45° E
              </span>
              <span className="hidden rounded-sm bg-ink/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bronze backdrop-blur-md sm:block">
                The market we serve
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ————————————— Principles ————————————— */

const PRINCIPLES = [
  {
    n: "01",
    t: "The agent leads, always.",
    d: "Maklor never speaks to your client. It prepares, remembers, and watches the deal. You decide, speak, and sign — the intelligence disappears into the work.",
  },
  {
    n: "02",
    t: "Independence is the point.",
    d: "Maklor is not owned by a portal. We have no incentive to route your owners or buyers anywhere but to you. We are the operating system, not the marketplace.",
  },
  {
    n: "03",
    t: "Swiss by construction.",
    d: "The nFADP and the cantonal realities of property work shape the system from day one — not a label added later. Your data is hosted in the European Union.",
  },
  {
    n: "04",
    t: "Earned, not assumed.",
    d: "Every number, valuation, and signal shows its provenance. You see exactly why — so you can stand behind it in front of any owner.",
  },
];

function Principles() {
  return (
    <section className="on-inverse bg-paper py-24 text-ink lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          light
          eyebrow="Core Principles"
          title={
            <>
              The principles that govern{" "}
              <em className="font-normal not-italic text-bronze-3">our architecture.</em>
            </>
          }
        />
        <div className="mt-16 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <div className="group flex h-full min-h-[300px] flex-col bg-paper p-8 transition-colors duration-500 hover:bg-ink">
                <p className="font-mono text-[10px] tracking-[0.3em] text-bronze-3 transition-colors duration-500 group-hover:text-bronze">
                  {p.n}
                </p>
                <h3 className="font-display mt-5 text-xl leading-snug text-ink transition-colors duration-500 group-hover:text-ivory">
                  {p.t}
                </h3>
                <p className="mt-4 text-[12.5px] leading-relaxed text-ink/55 transition-colors duration-500 group-hover:text-ivory/55">
                  {p.d}
                </p>
                <i className="mt-auto block h-px w-8 bg-bronze-3 pt-0 transition-all duration-700 group-hover:w-full group-hover:bg-bronze" style={{ marginTop: "auto" }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————— Leadership ————————————— */

const LEADERS = [
  {
    mono: "JL",
    role: "Founder & CEO",
    name: "Joseph Laraichi",
    bio: "30 years in enterprise digital transformation and applied data analytics. Joseph has architected and shipped enterprise software at scale for highly regulated industries.",
  },
  {
    mono: "CTO",
    role: "Chief Technology Officer",
    name: "To be announced",
    bio: "Deep expertise in applied data analytics, data residency, and secure infrastructure. Architect of the Maklor Signal engine and the data vault subject to the nFADP.",
  },
  {
    mono: "CPO",
    role: "Chief Product Officer",
    name: "To be announced",
    bio: "Real estate, known from the inside. Translates the complex, cantonal realities of the Swiss mandate into intuitive, operational workflows for the agent.",
  },
];

function Leadership() {
  return (
    <section className="bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Leadership"
          title={
            <>
              The{" "}
              <em className="gold-text not-italic">architects.</em>
            </>
          }
          copy="Three decades of digital transformation, deep applied data analytics, and the kind of enterprise-software discipline that does not break under real stakes."
        />
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {LEADERS.map((l, i) => (
            <Reveal key={l.role} delay={i * 100}>
              <div className="panel-dark group h-full rounded-xl p-8">
                <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-ivory/10 bg-gradient-to-br from-ink-3 to-ink transition-all duration-700 group-hover:border-bronze/30">
                  <span className="font-display text-6xl font-light text-bronze/70 transition-all duration-700 group-hover:scale-110 group-hover:text-bronze">
                    {l.mono}
                  </span>
                </div>
                <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.24em] text-bronze">
                  {l.role}
                </p>
                <h3 className="font-display mt-2 text-2xl text-ivory">{l.name}</h3>
                <p className="mt-4 text-[13px] leading-relaxed text-ivory/50">{l.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————— Advisory ————————————— */

function Advisory() {
  return (
    <section className="border-t border-ivory/[0.07] bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="The Advisory Board"
          title={
            <>
              Guided by decades of{" "}
              <em className="gold-text not-italic">Swiss market mastery.</em>
            </>
          }
          copy="Technology without market context is a liability. Our advisory board comprises former managing partners of top-tier Swiss brokerages — ensuring Maklor is built for the reality of the mandate, not the theory of software."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {[
            {
              tag: "Senior Advisor · Operational Workflow",
              t: "The Operational Veteran",
              d: "25+ years as a Swiss real-estate professional and former managing partner of a national agency. Architect of the Maklor notary coordination and closing workflows — ensuring the platform solves the actual operational chaos of the Swiss agent.",
            },
            {
              tag: "Advisor · Legal & Compliance",
              t: "The Legal & Compliance Expert",
              d: "Expert in Swiss property law, nFADP (revDSG), and cantonal notary frameworks. Reviews Maklor's data handling and document workflows against federal and cantonal rules.",
            },
          ].map((a, i) => (
            <Reveal key={a.t} delay={i * 110}>
              <div className="group h-full border-l-2 border-bronze/50 bg-ink p-8 transition-colors duration-500 hover:bg-ink-3 sm:p-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bronze">{a.tag}</p>
                <h3 className="font-display mt-3 text-2xl text-ivory">{a.t}</h3>
                <p className="mt-4 max-w-lg text-[13.5px] leading-relaxed text-ivory/55">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————— Investors ————————————— */

const PARTNERS = [
  { icon: Cloud, t: "EU Cloud Infrastructure", d: "EU-hosted · Stockholm", },
  { icon: KeyRound, t: "Identity & E-Signature", d: "Qualified Swiss signatures", },
  { icon: LineChart, t: "Market Data", d: "Institutional valuations", },
];

function Investors() {
  return (
    <section className="bg-ink py-24 lg:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Investors & Strategic Partners"
          title={
            <>
              Backed by{" "}
              <em className="gold-text not-italic">deep expertise.</em>
            </>
          }
          copy="Maklor is supported by a network of industry veterans, technology leaders, and strategic partners who understand the stakes of the Swiss real-estate market."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.t} delay={i * 100}>
              <div className="group flex items-center gap-5 rounded-xl border border-ivory/10 p-7 transition-all duration-500 hover:border-bronze/40 hover:bg-ink-2">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bronze/30 bg-bronze/[0.07] transition-colors duration-500 group-hover:bg-bronze/15">
                  <p.icon size={18} strokeWidth={1.25} className="text-bronze" />
                </span>
                <div>
                  <p className="text-[14px] font-medium text-ivory">{p.t}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ivory/40">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ————————————— HQ ————————————— */

function Headquarters() {
  return (
    <section className="border-t border-ivory/[0.07] bg-ink-2 py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1560px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <div>
          <Reveal>
            <Eyebrow>The Headquarters</Eyebrow>
          </Reveal>
          <Reveal delay={110}>
            <h2 className="font-display display-md mt-7 text-ivory">
              Built in Zug.{" "}
              <em className="gold-text not-italic">Engineered for Switzerland.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-ivory/55">
              Mulklick GmbH is headquartered in Zug — the epicenter of Swiss
              business innovation. Our infrastructure is hosted in the European
              Union: database and files in Stockholm, Sweden; application
              server in the Netherlands.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-ivory/10 bg-ivory/10 sm:grid-cols-3">
            {[
              ["Headquarters", "Baarerstrasse 43", "6300 Zug · Canton Zug"],
              ["Jurisdiction", "Swiss company", "Mulklick GmbH"],
              ["Data residency", "EU · Stockholm", "subject to the nFADP"],
            ].map(([k, v, d], i) => (
              <Reveal key={k} delay={250 + i * 90}>
                <div className="h-full bg-ink p-6">
                  <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-ivory/35">{k}</p>
                  <p className="mt-3 font-display text-lg leading-snug text-ivory">{v}</p>
                  <p className="mt-1 text-[10.5px] text-ivory/45">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={200}>
          <div className="rv-img img-zoom relative overflow-hidden rounded-xl border border-ivory/10">
            <img
              src={IMG.zurichAerial}
              alt="Aerial view over the lake and city — Zug, Switzerland"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover saturate-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="radar-ring absolute inset-0 rounded-full border border-bronze/60" />
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bronze bg-ink">
                  <MapPin size={14} className="text-bronze" />
                </span>
              </span>
            </div>
            <div className="absolute bottom-5 left-5 rounded-sm bg-ink/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ivory/80 backdrop-blur-md">
              Zug · 47.16° N, 8.51° E
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Company() {
  return (
    <>
      <PageHero
        eyebrow="The Institution · Mulklick GmbH"
        title={
          <>
            Enterprise infrastructure, built for{" "}
            <em className="gold-text not-italic">the Swiss mandate.</em>
          </>
        }
        copy="Mulklick GmbH is building the intelligent operating layer for Swiss real estate — three decades of enterprise digital transformation and applied data analytics, applied to a market that has relied on fragmented tools for too long."
        image={IMG.enterprise}
        imageAlt="Partners in conversation by a glass facade"
      >
        <Btn onClick={goWalkthrough}>Request a Private Walkthrough</Btn>
        <Btn variant="ghost" href={route("/platform")}>
          View the Platform
        </Btn>
      </PageHero>
      <Origin />
      <Principles />
      <Leadership />
      <Advisory />
      <Investors />
      <Headquarters />
      <CtaBand
        eyebrow="The Invitation"
        title="See the infrastructure in action."
        copy="A private walkthrough is the best way to understand how Maklor would sit inside your firm — our enterprise architecture mapped to your operational reality."
      />
    </>
  );
}
