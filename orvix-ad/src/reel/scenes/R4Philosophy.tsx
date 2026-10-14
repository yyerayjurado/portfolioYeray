import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { MaskTitle } from "../../about/ui";
import { BEAT, FONT, HITS, W, ci, easeIn, easeInOut, easeOut } from "../theme";

// Escena 4 · Nuestra filosofía: más ritmo. PENSAR · CREAR · TRANSFORMAR y «TECNOLOGÍA CON PROPÓSITO».
const WORDS = ["PENSAR", "CREAR", "TRANSFORMAR"];
const NODES = [
  { x: 540, y: 470 },
  { x: 300, y: 830 },
  { x: 780, y: 830 },
];

export const R4Philosophy: React.FC = () => {
  const f = useCurrentFrame();
  const [h0, h1, h2] = HITS.pillars;
  const kick = (Math.floor(f / BEAT) % 2 ? 1 : 1.04) * ci((f % BEAT) / BEAT, [0, 0.4], [1.03, 1]);
  const think = ci(f, [h0, h0 + 24], [0, 1], easeOut);
  const create = ci(f, [h1, h1 + 16], [0, 1], easeOut);
  const morph = ci(f, [h2, h2 + 26], [0, 1], easeInOut);
  const struct = ci(f, [HITS.proposito - 20, HITS.proposito + 10], [0, 1], easeInOut);
  const out = ci(f, [258, 270], [0, 1], easeIn);
  return (
    <AbsoluteFill>
      <BlueBg />
      <AbsoluteFill style={{ opacity: 1 - out }}>
        {/* Estructura: los tres nodos se conectan en una forma coherente */}
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {[
            [0, 1, create],
            [0, 2, morph],
            [1, 2, struct],
          ].map(([a, b, k], i) => (
            <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[a].x + (NODES[b].x - NODES[a].x) * k} y2={NODES[a].y + (NODES[b].y - NODES[a].y) * k} stroke={W.white} strokeWidth={3} />
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={NODES[0].x} cy={NODES[0].y} r={60 + think * (50 + i * 40)} fill="none" stroke={W.white} strokeOpacity={(0.8 - i * 0.22) * (1 - struct * 0.6)} strokeWidth={2.5} />
          ))}
        </svg>
        {/* PENSAR: núcleo con órbitas */}
        <div style={{ position: "absolute", left: NODES[0].x - 60, top: NODES[0].y - 60, width: 120, height: 120, borderRadius: "50%", background: W.white, transform: `scale(${ci(f, [h0 - 4, h0 + 8], [0, 1], easeOut) * kick})` }} />
        {[0, 1, 2].map((i) => {
          const a = f / 10 + (i * Math.PI * 2) / 3;
          return <div key={i} style={{ position: "absolute", left: NODES[0].x + Math.cos(a) * 130 * think - 10, top: NODES[0].y + Math.sin(a) * 130 * think - 10, width: 20, height: 20, borderRadius: "50%", background: W.white, opacity: think * (1 - struct) }} />;
        })}
        {/* CREAR: un módulo se construye por piezas */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ position: "absolute", left: NODES[1].x - 80 + (i % 2) * 82, top: NODES[1].y - 80 + Math.floor(i / 2) * 82, width: 78, height: 78, borderRadius: 14, background: W.white, transform: `scale(${ci(f, [h1 + i * 3, h1 + i * 3 + 10], [0, 1], easeOut)})` }} />
        ))}
        {/* TRANSFORMAR: el cuadrado se convierte en círculo */}
        <div style={{ position: "absolute", left: NODES[2].x - 85, top: NODES[2].y - 85, width: 170, height: 170, boxSizing: "border-box", border: `5px solid ${W.white}`, background: morph > 0.9 ? W.white : "transparent", borderRadius: `${12 + morph * 38}%`, transform: `rotate(${(1 - morph) * 45}deg) scale(${ci(f, [h2 - 6, h2 + 6], [0, 1], easeOut)})` }} />

        {/* Palabras: cada una en un golpe; la anterior se retira */}
        {WORDS.map((w, i) => {
          const at = HITS.pillars[i];
          const next = HITS.pillars[i + 1] ?? HITS.proposito - 14;
          return (
            <div key={w} style={{ position: "absolute", top: 1060, width: 1080, display: "flex", justifyContent: "center", overflow: "hidden", paddingBottom: 12 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 132, lineHeight: 1, letterSpacing: `${ci(f, [at, at + 20], [0.12, -0.01])}em`, color: W.white, transform: `translateY(${ci(f, [at - 3, at + 7], [110, 0], easeOut) + ci(f, [next - 6, next], [0, -110], easeIn)}%) scale(${ci(f, [at, at + 4, at + 14], [1, 1.06, 1])})` }}>
                {w}
              </div>
            </div>
          );
        })}
        <div style={{ position: "absolute", top: 1060, left: 90, width: 900, display: "flex", justifyContent: "center" }}>
          <MaskTitle text="TECNOLOGÍA CON PROPÓSITO" at={HITS.proposito} size={100} step={5} align="center" maxWidth={900} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
