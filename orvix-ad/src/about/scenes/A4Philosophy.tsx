import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { CUES, FONT, W, ci, easeInOut, easeOut, local } from "../theme";
import { Mono } from "../ui";

// Escena 4 · Filosofía: menos elementos, líneas precisas. PENSAR · CREAR · TRANSFORMAR.
const WORDS = [
  { t: "PENSAR", cue: () => CUES.pensar, label: "EVOLUCIÓN" },
  { t: "CREAR", cue: () => CUES.crear, label: "CONEXIÓN" },
  { t: "TRANSFORMAR", cue: () => CUES.transformar, label: "TRANSFORMACIÓN" },
];

export const A4Philosophy: React.FC = () => {
  const f = useCurrentFrame();
  const L = (abs: number) => local(abs, 3);
  const at = WORDS.map((w) => L(w.cue()));
  const lineY = 520;
  const nodes = [1020, 1360, 1700];
  const draw = ci(f, [2, 40], [0, 1], easeInOut);
  const think = ci(f, [at[0], at[0] + 30], [0, 1], easeOut);
  const create = ci(f, [at[1], at[1] + 20], [0, 1], easeOut);
  const newForms = Math.floor(ci(f, [L(CUES.encontrar), L(CUES.encontrar) + 60], [0, 4]));
  const simplify = ci(f, [L(CUES.simplificar) - 4, L(CUES.simplificar) + 26], [0, 1], easeInOut);
  const morph = ci(f, [at[2], at[2] + 30], [0, 1], easeInOut);
  const lock = ci(f, [at[2] + 34, at[2] + 46], [0, 1], easeOut);
  // Trazo irregular que se simplifica en una línea recta
  const zig = Array.from({ length: 9 }).map((_, i) => [920 + i * 105, 300 + (i % 2 ? -50 : 50) * (1 - simplify) * ci(f, [L(CUES.encontrar), L(CUES.encontrar) + 20], [0, 1])]);
  const formRadius = ["50%", "16%", "50% 50% 0 0", "16% 50%"][newForms % 4];
  return (
    <AbsoluteFill>
      <BlueBg grid={0.5} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <line x1={900} y1={lineY} x2={900 + 900 * draw} y2={lineY} stroke={W.white} strokeWidth={2.5} />
        <polyline points={zig.map(([x, y]) => `${x},${y}`).join(" ")} fill="none" stroke={W.white} strokeWidth={2} strokeOpacity={ci(f, [L(CUES.encontrar) - 6, L(CUES.encontrar) + 6], [0, 0.85])} />
        {/* Conexión entre nodos */}
        <path d={`M ${nodes[0]} ${lineY} Q ${(nodes[0] + nodes[1]) / 2} ${lineY - 160} ${nodes[1]} ${lineY}`} fill="none" stroke={W.white} strokeWidth={2} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - create} />
        <path d={`M ${nodes[1]} ${lineY} Q ${(nodes[1] + nodes[2]) / 2} ${lineY + 160} ${nodes[2]} ${lineY}`} fill="none" stroke={W.white} strokeWidth={2} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - morph} />
        {/* PENSAR: un punto que se expande en anillos */}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={nodes[0]} cy={lineY} r={18 + think * (40 + i * 34)} fill="none" stroke={W.white} strokeOpacity={0.9 - i * 0.25} strokeWidth={2} />
        ))}
        <circle cx={nodes[0]} cy={lineY} r={12} fill={W.white} opacity={ci(f, [at[0] - 4, at[0]], [0, 1])} />
        {[0, 1, 2].map((i) => {
          const a = f / 18 + (i * Math.PI * 2) / 3;
          return <circle key={`o${i}`} cx={nodes[0] + Math.cos(a) * 74 * think} cy={lineY + Math.sin(a) * 74 * think} r={6} fill={W.white} opacity={think} />;
        })}
      </svg>
      {/* CREAR: un módulo se construye y explora nuevas formas */}
      <div style={{ position: "absolute", left: nodes[1] - 70, top: lineY - 70, width: 140, height: 140, background: W.white, borderRadius: newForms > 0 ? formRadius : "16%", transform: `scale(${create}) rotate(${newForms * 90}deg)` }} />
      {/* TRANSFORMAR: el cuadrado se convierte en círculo y encaja en su sitio (utilidad) */}
      <div style={{ position: "absolute", left: nodes[2] - 70, top: lineY - 70, width: 140, height: 140, boxSizing: "border-box", border: `3px solid ${W.white}`, background: lock > 0.5 ? W.white : "transparent", borderRadius: `${16 + morph * 34}%`, transform: `rotate(${(1 - morph) * 45}deg) scale(${ci(f, [at[2] - 6, at[2] + 4], [0, 1], easeOut)})`, display: "flex", alignItems: "center", justifyContent: "center", color: W.blue, fontFamily: FONT, fontWeight: 700, fontSize: 64 }}>
        {lock > 0.5 ? "✓" : ""}
      </div>
      {nodes.map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x - 140, width: 280, top: lineY + 120, display: "flex", justifyContent: "center" }}>
          <Mono size={22} o={ci(f, [at[i] + 10, at[i] + 22], [0, 1])}>{WORDS[i].label}</Mono>
        </div>
      ))}

      {/* Palabras progresivas */}
      <div style={{ position: "absolute", left: 130, top: 250, display: "flex", flexDirection: "column", gap: 18 }}>
        <Mono o={ci(f, [4, 14], [0, 1])}>NUESTRA FILOSOFÍA</Mono>
        {WORDS.map((w, i) => {
          const a = at[i];
          const next = at[i + 1] ?? 1e9;
          return (
            <div key={w.t} style={{ overflow: "hidden", paddingBottom: 10 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 104, lineHeight: 1, letterSpacing: "-0.02em", color: W.white, opacity: f >= next ? 0.4 : 1, transform: `translateY(${ci(f, [a - 2, a + 12], [110, 0], easeOut)}%)` }}>{w.t}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
