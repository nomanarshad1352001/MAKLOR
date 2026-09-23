import { useId } from "react";

/**
 * The MAKlOR monogram — an architectural M:
 * twin hairline stems, diagonals meeting at a Swiss cross,
 * framed in a bronze square. Style of the institution.
 */
export default function MkLogo({
  size = 36,
  className,
  spin = false,
}: {
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  const id = useId().replace(/[:]/g, "");
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        role="img"
        aria-label="Maklor monogram"
        style={spin ? { animation: "spin-slow-m 5s linear infinite" } : undefined}
      >
        <defs>
          <linearGradient id={`mg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--gold-a, #e8d3ab)" />
            <stop offset="55%" stopColor="var(--t-bronze, #c9a05b)" />
            <stop offset="100%" stopColor="var(--gold-c, #96763c)" />
          </linearGradient>
        </defs>
        {/* frame */}
        <rect x="3" y="3" width="58" height="58" fill="none" stroke={`url(#mg-${id})`} strokeWidth="1.4" />
        <rect x="8.5" y="8.5" width="47" height="47" fill="none" stroke={`url(#mg-${id})`} strokeWidth="0.55" opacity="0.45" />
        {/* the M — twin stems, diagonals to the cross */}
        <path
          d="M17 47V17l15 21 15-21v30"
          fill="none"
          stroke={`url(#mg-${id})`}
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        {/* Swiss cross at the vertex */}
        <path
          d="M32 33.5V42.5M27.5 38h9"
          stroke={`url(#mg-${id})`}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        {/* base ticks */}
        <path d="M13.5 47h7M43.5 47h7" stroke={`url(#mg-${id})`} strokeWidth="1.2" opacity="0.8" />
      </svg>
    </span>
  );
}
