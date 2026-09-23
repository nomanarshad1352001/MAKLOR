import { ReactNode } from "react";
import { Eyebrow, Reveal } from "../lib/ui";

export default function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={imageAlt}
          className="kenburns h-full w-full object-cover opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/50" />
      </div>
      <div className="relative mx-auto flex min-h-[82svh] max-w-[1560px] flex-col justify-end px-5 pb-24 pt-40 sm:px-8 lg:px-12">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-display display-lg mt-7 max-w-4xl text-ivory">{title}</h1>
        </Reveal>
        {copy && (
          <Reveal delay={240}>
            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ivory/60">{copy}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
