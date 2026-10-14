import React from "react";
import { random, useCurrentFrame } from "remotion";
import { FONT, MONO, W, ci, easeInOut, easeOut } from "./theme";

// Tipografía cinética: tres entradas distintas que comparten tipografía, color y ritmo.
type KProps = { text: string; at: number; size: number; color?: string };

// 1 · Letras que caen y se asientan una a una
export const DropWord: React.FC<KProps> = ({ text, at, size, color = W.white }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", fontFamily: FONT, fontWeight: 700, fontSize: size, letterSpacing: "0.02em", color, lineHeight: 1 }}>
      {text.split("").map((ch, i) => {
        const s = at + i * 1.5;
        return (
          <span key={i} style={{ display: "inline-block", opacity: ci(f, [s, s + 6], [0, 1]), transform: `translateY(${ci(f, [s, s + 12], [-0.9 * size, 0], easeOut)}px) rotate(${ci(f, [s, s + 12], [i % 2 ? 18 : -18, 0], easeOut)}deg)` }}>
            {ch}
          </span>
        );
      })}
    </div>
  );
};

// 2 · Revelado por un bloque blanco que barre el texto
export const WipeWord: React.FC<KProps> = ({ text, at, size, color = W.white }) => {
  const f = useCurrentFrame();
  const a = ci(f, [at, at + 9], [0, 100], easeInOut);
  const b = ci(f, [at + 9, at + 18], [0, 100], easeInOut);
  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 1 }}>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, letterSpacing: "0.02em", color, opacity: f >= at + 9 ? 1 : 0 }}>{text}</div>
      <div style={{ position: "absolute", inset: `-${size * 0.06}px 0`, background: W.white, clipPath: `inset(0 ${100 - a}% 0 ${b}%)` }} />
    </div>
  );
};

// 3 · Decodificación: los caracteres pasan por glifos aleatorios hasta fijarse
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const DecodeWord: React.FC<KProps> = ({ text, at, size, color = W.white }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", fontFamily: FONT, fontWeight: 700, fontSize: size, letterSpacing: "0.02em", color, lineHeight: 1, opacity: ci(f, [at, at + 3], [0, 1]) }}>
      {text.split("").map((ch, i) => {
        const lock = at + 4 + i * 1.6;
        const c = f >= lock ? ch : GLYPHS[Math.floor(random(`${text}-${i}-${Math.floor(f / 2)}`) * GLYPHS.length)];
        return (
          <span key={i} style={{ display: "inline-block", width: f >= lock ? undefined : size * 0.62, textAlign: "center", opacity: f >= lock ? 1 : 0.55 }}>
            {c}
          </span>
        );
      })}
    </div>
  );
};

// Titular con máscara palabra a palabra (mismo lenguaje que el resto)
export const MaskTitle: React.FC<{ text: string; at: number; size: number; step?: number; align?: "left" | "center"; maxWidth?: number; out?: number }> = ({ text, at, size, step = 3, align = "left", maxWidth, out }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: size * 0.26, justifyContent: align === "center" ? "center" : "flex-start", maxWidth }}>
      {text.split(" ").map((w, i) => {
        const s = at + i * step;
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: size * 0.08 }}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size, lineHeight: 1, letterSpacing: "-0.02em", color: W.white, whiteSpace: "nowrap", transform: `translateY(${ci(f, [s, s + 14], [110, 0], easeOut) + (out === undefined ? 0 : ci(f, [out + i, out + i + 10], [0, -110], easeInOut))}%)` }}>
              {w}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Mono: React.FC<{ children: React.ReactNode; o?: number; size?: number }> = ({ children, o = 1, size = 20 }) => (
  <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.16em", color: W.white70, opacity: o, whiteSpace: "nowrap" }}>{children}</div>
);

// Elemento geométrico del sistema gráfico: punto, cuadrado, anillo o trazo.
export type Kind = 0 | 1 | 2 | 3;
export const Glyph: React.FC<{ kind: Kind; size: number; fill?: boolean; rot?: number; radius?: number }> = ({ kind, size, fill = true, rot = 0, radius }) => {
  const common: React.CSSProperties = { width: size, height: kind === 3 ? size * 0.18 : size, transform: `rotate(${rot}deg)` };
  if (kind === 0) return <div style={{ ...common, borderRadius: "50%", background: W.white }} />;
  if (kind === 1) return <div style={{ ...common, borderRadius: radius ?? size * 0.18, background: fill ? W.white : "transparent", border: fill ? "none" : `3px solid ${W.white}`, boxSizing: "border-box" }} />;
  if (kind === 2) return <div style={{ ...common, borderRadius: "50%", border: `3px solid ${W.white}`, boxSizing: "border-box" }} />;
  return <div style={{ ...common, borderRadius: size, background: W.white }} />;
};
