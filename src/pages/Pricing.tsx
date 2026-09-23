import { IMG } from "../lib/assets";
import { Eyebrow, Reveal, SectionHead } from "../lib/ui";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import {
  CompareTable,
  Faq,
  PricingCards,
  PricingTrust,
  RealMaths,
} from "../components/Pricing";

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing · The Economics"
        title={
          <>
            Pricing that matches{" "}
            <em className="gold-text not-italic">the stakes.</em>
          </>
        }
        copy="You don't pay for software. You pay for mandates won, deals saved, and hours returned. One closing covers a year."
        image={IMG.villaMountains}
        imageAlt="Swiss villa estate above the mountains at dusk"
      />

      {/* Plans */}
      <section className="bg-ink pb-24 pt-4 lg:pb-32">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <PricingCards />
          <PricingTrust />
        </div>
      </section>

      {/* Compare */}
      <section className="border-t border-ivory/[0.07] bg-ink-2 py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <SectionHead
            eyebrow="Compare"
            title={
              <>
                Every plan, <em className="gold-text not-italic">side by side.</em>
              </>
            }
          />
          <Reveal delay={200} className="mt-14">
            <CompareTable />
          </Reveal>
        </div>
      </section>

      <RealMaths />

      {/* FAQ */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display display-md mt-6 text-ivory">
              The economics, <em className="gold-text not-italic">answered.</em>
            </h2>
          </Reveal>
          <div className="mt-12">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Not Sure Which Plan?"
        title="One closing covers a year. Let's find your fit."
        copy="Tell us about your firm in a private walkthrough, and we'll map the right plan to your operational reality — no pressure, no calendar links."
      />
    </>
  );
}
