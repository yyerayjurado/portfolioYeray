import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { MaskTitle } from "../../about/ui";
import { BEAT, HITS, W, ci, easeInOut, easeOut } from "../theme";
import { WORD_Y } from "./R2Who";

// Escena 3 · Nuestra esencia: las palabras se fragmentan en formas y se reorganizan en un sistema modular.
const COLS = 3;
const ROWS = 4;
const CELL = 200;
const GAP = 26;
const GX = (1080 - (COLS * CELL + (COLS - 1) * GAP)) / 2;
const GY = 330;
const FRAG = 54; // fragmentos de las palabras

const Shape: React.FC<{ kind: number; s: number }> = ({ kind, s }) => {
  const b: React.CSSProperties = { width: s, height: s, boxSizing: "border-box" };
  const line = `4px solid ${W.white}`;
  switch (kind % 6) {
    case 0: return <div style={{ ...b, borderRadius: "50%", background: W.white }} />;
    case 1: return <div style={{ ...b, borderRadius: "50%", border: line }} />;
    case 2: return <div style={{ ...b, borderRadius: s * 0.16, background: W.white }} />;
    case 3: return <div style={{ ...b, height: s / 2, marginTop: s / 2, borderRadius: `${s}px ${s}px 0 0`, background: W.white }} />;
    case 4: return <div style={{ ...b, borderTopLeftRadius: s, background: W.white }} />;
    default: return <div style={{ ...b, borderRadius: s * 0.16, border: line }} />;
  }
};

export const R3Essence: React.FC = () => {
  const f = useCurrentFrame();
  const beat = Math.floor(f / BEAT);
  const settle = ci(f, [20, 60], [0, 1], easeInOut);
  const unify = ci(f, [HITS.realidad - 10, HITS.realidad + 20], [0, 1], easeInOut);
  return (
    <AbsoluteFill>
      <BlueBg />
      {/* Fragmentos de las palabras que salen despedidos */}
      {Array.from({ length: FRAG }).map((_, i) => {
        const row = i % 3;
        const x0 = 150 + random(`fx${i}`) * 780;
        const y0 = WORD_Y[row] + 50 + (random(`fy${i}`) - 0.5) * 70;
        const ang = random(`fa${i}`) * Math.PI * 2;
        const d = ci(f, [0, 34], [0, 1], easeOut);
        const x = x0 + Math.cos(ang) * 520 * d;
        const y = y0 + Math.sin(ang) * 520 * d - 300 * d;
        const s = 14 + random(`fs${i}`) * 20;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, background: W.white, borderRadius: i % 2 ? "50%" : 3, opacity: 1 - ci(f, [16, 40], [0, 1]), transform: `rotate(${d * 200 * (i % 2 ? 1 : -1)}deg)` }} />;
      })}
      {/* Líneas que unen creatividad y tecnología en el sistema */}
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {Array.from({ length: ROWS }).map((_, r) => (
          <line key={`h${r}`} x1={GX - 40} x2={GX - 40 + (COLS * CELL + (COLS - 1) * GAP + 80) * settle} y1={GY + r * (CELL + GAP) + CELL / 2} y2={GY + r * (CELL + GAP) + CELL / 2} stroke={W.white} strokeOpacity={0.35} strokeWidth={2} />
        ))}
        {Array.from({ length: COLS }).map((_, c) => (
          <line key={`v${c}`} y1={GY - 40} y2={GY - 40 + (ROWS * CELL + (ROWS - 1) * GAP + 80) * settle} x1={GX + c * (CELL + GAP) + CELL / 2} x2={GX + c * (CELL + GAP) + CELL / 2} stroke={W.white} strokeOpacity={0.35} strokeWidth={2} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: GX - 24, top: GY - 24, width: COLS * CELL + (COLS - 1) * GAP + 48, height: ROWS * CELL + (ROWS - 1) * GAP + 48, borderRadius: 30, border: `3px solid ${W.white}`, opacity: unify, transform: `scale(${1.06 - unify * 0.06})` }} />
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        const k = unify > 0.5 ? (i * 5) % 6 : Math.floor(random(`k${i}-${beat}`) * 6);
        const sc = unify > 0.5 ? 0.92 : 0.5 + random(`s${i}-${beat}`) * 0.5;
        const pulse = ci((f % BEAT) / BEAT, [0, 0.3], [0.86, 1], easeOut);
        const s = CELL * sc * (unify > 0.5 ? 1 : pulse);
        const appear = ci(f, [16 + i * 2, 30 + i * 2], [0, 1], easeOut);
        const spread = (1 - settle) * 60;
        return (
          <div key={i} style={{ position: "absolute", left: GX + c * (CELL + GAP) + (CELL - s) / 2 + (c - 1) * spread, top: GY + r * (CELL + GAP) + (CELL - s) / 2 + (r - 1.5) * spread, opacity: appear, transform: `scale(${appear})` }}>
            <Shape kind={k} s={s} />
          </div>
        );
      })}
      <div style={{ position: "absolute", top: 1290, left: 90, width: 900, display: "flex", justifyContent: "center" }}>
        <MaskTitle text="IDEAS QUE SE CONVIERTEN EN REALIDAD" at={HITS.realidad} size={78} step={4} align="center" maxWidth={900} out={226} />
      </div>
    </AbsoluteFill>
  );
};
