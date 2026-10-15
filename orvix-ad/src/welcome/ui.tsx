import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO, TL, W, ci, easeInOut, easeOut, sec } from "./theme";

export const useV = () => {
  const { width, height } = useVideoConfig();
  return { V: height > width, Wd: width, Ht: height };
};

// Fondo azul eléctrico con un degradado sutil dentro de la gama y una retícula blanca muy suave.
export const BlueBg: React.FC<{ grid?: number }> = ({ grid = 1 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: W.blue }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${50 + Math.sin(f / 90) * 8}% 35%, ${W.blueLight} 0%, ${W.blue} 45%, ${W.blueDeep} 100%)`, opacity: 0.55 }} />
      <AbsoluteFill
        style={{
          opacity: 0.6 * grid,
          backgroundImage: `linear-gradient(${W.white08} 1px, transparent 1px), linear-gradient(90deg, ${W.white08} 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          backgroundPosition: `${(f * 0.25) % 96}px ${(f * 0.12) % 96}px`,
          maskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 80%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Formas geométricas flotantes (anillos y cuadrados de contorno) para dar profundidad.
export const Shapes: React.FC<{ o?: number }> = ({ o = 1 }) => {
  const f = useCurrentFrame();
  const { Wd, Ht } = useV();
  const items = [
    { x: 0.12, y: 0.22, s: 160, r: true, sp: 0.6 },
    { x: 0.86, y: 0.18, s: 90, r: false, sp: -0.5 },
    { x: 0.9, y: 0.78, s: 220, r: true, sp: 0.4 },
    { x: 0.08, y: 0.8, s: 70, r: false, sp: 0.7 },
  ];
  return (
    <AbsoluteFill style={{ opacity: o, pointerEvents: "none" }}>
      {items.map((it, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: it.x * Wd - it.s / 2,
            top: it.y * Ht - it.s / 2 + Math.sin((f + i * 40) / 50) * 14,
            width: it.s,
            height: it.s,
            borderRadius: it.r ? "50%" : 14,
            border: `2px solid ${W.white15}`,
            transform: `rotate(${f * it.sp * 0.3}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const LOGO_RATIO = 855 / 173;
export const Logo: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <Img src={staticFile("orvix-logo.png")} style={{ width, height: width / LOGO_RATIO, display: "block", ...style }} />
);

// Etiqueta tipo «chip» blanca.
export const Chip: React.FC<{ children: React.ReactNode; at?: number; out?: number; size?: number }> = ({ children, at = 0, out, size = 24 }) => {
  const f = useCurrentFrame();
  const o = ci(f, [at, at + 10], [0, 1]) * (out === undefined ? 1 : ci(f, [out, out + 8], [1, 0]));
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: `${size * 0.5}px ${size * 0.9}px`,
        borderRadius: 999,
        background: W.white,
        color: W.blue,
        fontFamily: MONO,
        fontWeight: 500,
        fontSize: size,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: o,
        transform: `translateY(${ci(f, [at, at + 12], [16, 0], easeOut)}px)`,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: W.blue }} />
      {children}
    </div>
  );
};

// Titular blanco con entrada por máscara palabra a palabra.
export const Title: React.FC<{ text: string; at: number; size: number; step?: number; align?: "left" | "center"; maxWidth?: number; out?: number; weight?: number }> = ({
  text,
  at,
  size,
  step = 3,
  align = "left",
  maxWidth,
  out,
  weight = 700,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: size * 0.25, justifyContent: align === "center" ? "center" : "flex-start", maxWidth }}>
      {text.split(" ").map((w, i) => {
        const s = at + i * step;
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: size * 0.08 }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: weight,
                fontSize: size,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: W.white,
                whiteSpace: "nowrap",
                transform: `translateY(${ci(f, [s, s + 14], [110, 0], easeOut) + (out === undefined ? 0 : ci(f, [out, out + 10], [0, -110], easeInOut))}%)`,
              }}
            >
              {w}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Subtítulos sincronizados con la locución (tiempos de src/welcome/timeline.json).
type Chunk = { text: string; start: number; end: number };
export const Subtitles: React.FC<{ chunks?: Chunk[]; size?: number }> = ({ chunks = TL.chunks, size }) => {
  const f = useCurrentFrame();
  const { V, Wd, Ht } = useV();
  const t = f / 30;
  const cur = chunks.find((c) => t >= c.start - 0.08 && t < c.end + 0.02);
  if (!cur) return null;
  const a = sec(cur.start - 0.08);
  const b = sec(cur.end + 0.02);
  const o = Math.min(ci(f, [a, a + 4], [0, 1]), ci(f, [b - 4, b], [1, 0]));
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        width: Wd,
        bottom: V ? Ht - 1560 : 56,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: V ? 900 : 1320,
          padding: V ? "16px 30px" : "14px 34px",
          borderRadius: 16,
          background: "rgba(6,6,74,0.78)",
          color: W.white,
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: size ?? (V ? 44 : 42),
          lineHeight: 1.3,
          textAlign: "center",
          textShadow: "0 2px 6px rgba(0,0,0,0.35)",
          textWrap: "balance",
          opacity: o,
          transform: `translateY(${(1 - o) * 8}px)`,
        }}
      >
        {cur.text}
      </div>
    </div>
  );
};
