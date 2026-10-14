import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, MONO, ci, easeOut } from "./theme";

// Fondo oscuro con halos azules que respiran y una retícula en perspectiva.
export const Backdrop: React.FC<{ grid?: number; glow?: number; speed?: number }> = ({
  grid = 1,
  glow = 1,
  speed = 1,
}) => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 40) * 60;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: glow,
          background: `radial-gradient(900px 700px at ${540 + drift}px 520px, rgba(4,10,222,0.55), transparent 70%),
            radial-gradient(800px 900px at ${300 - drift}px 1500px, rgba(59,70,255,0.28), transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -1080,
          right: -1080,
          top: 1180,
          height: 1400,
          opacity: 0.5 * grid,
          transform: "perspective(700px) rotateX(72deg)",
          transformOrigin: "50% 0%",
          backgroundImage: `linear-gradient(${C.line} 2px, transparent 2px), linear-gradient(90deg, ${C.line} 2px, transparent 2px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: `0px ${(f * 4 * speed) % 120}px`,
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Grano de película y viñeta para el acabado cinematográfico.
export const Grain: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width="1080" height="1920" style={{ position: "absolute", opacity: 0.09, mixBlendMode: "screen" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </AbsoluteFill>
  );
};

// Titular con revelado por máscara, línea a línea.
export const RevealLines: React.FC<{
  lines: { t: string; color?: string; outline?: boolean }[];
  start: number;
  size: number;
  stagger?: number;
  align?: "left" | "center";
  weight?: number;
  lineHeight?: number;
}> = ({ lines, start, size, stagger = 6, align = "left", weight = 700, lineHeight = 0.98 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      {lines.map((l, i) => {
        const s = start + i * stagger;
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: size * 0.08, marginBottom: -size * 0.04 }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: weight,
                fontSize: size,
                lineHeight,
                letterSpacing: "-0.035em",
                color: l.outline ? "transparent" : (l.color ?? C.white),
                WebkitTextStroke: l.outline ? `3px ${l.color ?? C.white}` : undefined,
                whiteSpace: "nowrap",
                transform: `translateY(${ci(f, [s, s + 16], [110, 0])}%) rotate(${ci(f, [s, s + 16], [4, 0])}deg)`,
                transformOrigin: "0% 100%",
              }}
            >
              {l.t}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number }> = ({
  children,
  color = C.blueSoft,
  size = 26,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: size,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color,
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}
  >
    <span style={{ width: 10, height: 10, borderRadius: 5, background: color }} />
    {children}
  </div>
);

// Panel de vidrio reutilizable para mockups.
export const Glass: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div
    style={{
      background: "linear-gradient(160deg, rgba(40,46,140,0.55), rgba(10,12,46,0.75))",
      border: `1.5px solid rgba(160,168,255,0.25)`,
      borderRadius: 28,
      boxShadow: "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Bar: React.FC<{ w: number | string; h?: number; o?: number; color?: string; style?: React.CSSProperties }> = ({
  w,
  h = 14,
  o = 0.25,
  color = C.white,
  style,
}) => <div style={{ width: w, height: h, borderRadius: h, background: color, opacity: o, ...style }} />;

// Aparición con desplazamiento y desenfoque.
export const Pop: React.FC<{ at: number; children: React.ReactNode; dy?: number; style?: React.CSSProperties; dur?: number }> = ({
  at,
  children,
  dy = 40,
  style,
  dur = 14,
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        opacity: ci(f, [at, at + dur * 0.7], [0, 1]),
        transform: `translateY(${ci(f, [at, at + dur], [dy, 0], easeOut)}px) scale(${ci(f, [at, at + dur], [0.96, 1])})`,
        filter: `blur(${ci(f, [at, at + dur], [10, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
