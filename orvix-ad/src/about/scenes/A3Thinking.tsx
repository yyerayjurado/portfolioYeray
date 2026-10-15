import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { CUES, W, ci, easeInOut, easeOut, local } from "../theme";
import { MaskTitle, Mono } from "../ui";

// Escena 3 · Nuestra forma de pensar: módulos que se separan, cambian de escala y se integran en un sistema.
const COLS = 4;
const ROWS = 3;
const CELL = 170;
const GROUPS = [
  { name: "PENSAMIENTO CREATIVO", cells: [0, 1, 4, 5], cue: () => CUES.pensamiento },
  { name: "INNOVACIÓN", cells: [2, 3, 6, 7], cue: () => CUES.innovacion },
  { name: "DESARROLLO", cells: [8, 9, 10, 11], cue: () => CUES.desarrollo },
];

const Shape: React.FC<{ kind: number; s: number; on: boolean }> = ({ kind, s, on }) => {
  const fill = on ? W.white : "transparent";
  const line = `3px solid ${W.white}`;
  const base: React.CSSProperties = { width: s, height: s, boxSizing: "border-box" };
  switch (kind % 6) {
    case 0:
      return <div style={{ ...base, borderRadius: "50%", background: W.white }} />;
    case 1:
      return <div style={{ ...base, borderRadius: "50%", border: line, background: fill === W.white ? "rgba(255,255,255,0.15)" : "transparent" }} />;
    case 2:
      return <div style={{ ...base, borderRadius: s * 0.16, background: W.white }} />;
    case 3:
      return <div style={{ ...base, height: s / 2, marginTop: s / 2, borderRadius: `${s}px ${s}px 0 0`, background: W.white }} />;
    case 4:
      return <div style={{ ...base, borderTopLeftRadius: s, background: fill === W.white ? W.white : "transparent", border: line }} />;
    default:
      return <div style={{ ...base, borderRadius: s * 0.16, border: line }} />;
  }
};

export const A3Thinking: React.FC = () => {
  const f = useCurrentFrame();
  const merge = ci(f, [local(CUES.desarrollo, 2) + 18, local(CUES.desarrollo, 2) + 44], [0, 1], easeInOut);
  const gap = 34 - merge * 26;
  const gw = COLS * CELL + (COLS - 1) * gap;
  const ox = 1380 - gw / 2;
  const oy = 450 - (ROWS * CELL + (ROWS - 1) * gap) / 2;
  const beat = Math.floor(f / 30);
  const unique = 5; // el módulo «único» de la primera frase
  const firstEnd = local(CUES.pensamiento, 2) - 30;
  return (
    <AbsoluteFill>
      <BlueBg />
      {/* Marco del sistema que aparece al integrarse */}
      <div style={{ position: "absolute", left: ox - 24, top: oy - 24, width: gw + 48, height: ROWS * CELL + (ROWS - 1) * gap + 48, border: `2px solid ${W.white}`, borderRadius: 28, opacity: merge, transform: `scale(${1.05 - 0.05 * merge})` }} />
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        // Cada beat los módulos cambian de forma y escala; tras la integración se estabilizan
        const k = merge > 0.5 ? i * 7 : Math.floor(random(`k${i}-${beat}`) * 6);
        const sc = merge > 0.5 ? 1 : 0.55 + random(`s${i}-${beat}`) * 0.45;
        const t = (f % 30) / 30;
        const pulse = ci(t, [0, 0.25], [0.85, 1], easeOut);
        const g = GROUPS.findIndex((G) => G.cells.includes(i));
        const lit = f >= local(GROUPS[g].cue(), 2) - 2;
        const spread = (1 - merge) * (lit ? 0 : 18);
        const isUnique = i === unique && f < firstEnd;
        const appear = ci(f, [i * 2, i * 2 + 14], [0, 1], easeOut);
        const s = CELL * sc * pulse;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ox + c * (CELL + gap) + (CELL - s) / 2 + (c - 1.5) * spread,
              top: oy + r * (CELL + gap) + (CELL - s) / 2 + (r - 1) * spread,
              opacity: appear * (f < firstEnd ? (isUnique ? 1 : 0.35) : lit || merge > 0 ? 1 : 0.4),
              transform: `scale(${appear})`,
            }}
          >
            <Shape kind={isUnique ? 0 : k} s={isUnique ? CELL : s} on={lit} />
          </div>
        );
      })}
      {/* Etiquetas de los tres pilares */}
      {GROUPS.map((G, gi) => {
        const at = local(G.cue(), 2);
        const first = G.cells[0];
        const c = first % COLS;
        const r = Math.floor(first / COLS);
        return (
          <div key={G.name} style={{ position: "absolute", left: ox + c * (CELL + gap), top: oy + r * (CELL + gap) - 40 + (gi === 2 ? ROWS * (CELL + gap) + 10 : 0), opacity: ci(f, [at, at + 8], [0, 1]) * (1 - merge) }}>
            <Mono size={22}>{G.name}</Mono>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 130, top: 300, width: 640 }}>
        <Mono o={ci(f, [6, 18], [0, 1])}>NUESTRA FORMA DE PENSAR</Mono>
        <div style={{ marginTop: 30 }}>
          <MaskTitle text="IDEAS QUE SE CONVIERTEN EN REALIDAD" at={local(CUES.realidadText, 2)} size={82} step={3} maxWidth={640} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
