import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { Glyph, Kind } from "../../about/ui";
import { FONT, HITS, W, ci, easeIn, easeInOut, easeOut } from "../theme";

// Escena 1 · El comienzo: formas que aparecen, se mueven, se conectan y forman una composición.
const N = 16;
const ITEMS = Array.from({ length: N }).map((_, i) => ({
  x: 140 + random(`rx${i}`) * 800,
  y: 330 + random(`ry${i}`) * 860,
  kind: (i % 4) as Kind,
  size: 26 + random(`rs${i}`) * 30,
  at: 4 + Math.floor(random(`ra${i}`) * 50),
  ph: random(`rp${i}`) * 6.28,
}));
export const R1_CENTER = { x: 540, y: 760 };

// Posición de cada forma (compartida con la escena 2 para que la continuidad sea exacta)
export const r1Point = (i: number, f: number) => {
  const it = ITEMS[i];
  const org = ci(f, [64, 120], [0, 1], easeInOut);
  const conv = ci(f, [128, 150], [0, 1], easeIn);
  const fx = it.x + Math.cos(f / 36 + it.ph) * 24;
  const fy = it.y + Math.sin(f / 42 + it.ph) * 20;
  const a = (i / N) * Math.PI * 2 - Math.PI / 2 + f / 160;
  const r = i % 2 ? 300 : 190; // dos anillos: composición geométrica
  const gx = R1_CENTER.x + Math.cos(a) * r;
  const gy = R1_CENTER.y + Math.sin(a) * r;
  let x = fx + (gx - fx) * org;
  let y = fy + (gy - fy) * org;
  x += (R1_CENTER.x - x) * conv;
  y += (R1_CENTER.y - y) * conv;
  return { x, y };
};
export const R1_ITEMS = ITEMS;

const WORDS = ["TODO", "EMPIEZA", "CON", "UNA", "IDEA"];

export const R1Start: React.FC = () => {
  const f = useCurrentFrame();
  const pts = ITEMS.map((_, i) => r1Point(i, f));
  const link = ci(f, [84, 124], [0, 1], easeInOut);
  const textOut = ci(f, [132, 146], [0, 1], easeIn);
  return (
    <AbsoluteFill>
      <BlueBg grid={ci(f, [0, 60], [0, 0.8])} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {pts.map((p, i) => {
          const q = pts[(i + 2) % N]; // conecta cada anillo consigo mismo
          const k = ci(link, [i / N * 0.5, i / N * 0.5 + 0.5], [0, 1]);
          return <line key={i} x1={p.x} y1={p.y} x2={p.x + (q.x - p.x) * k} y2={p.y + (q.y - p.y) * k} stroke={W.white} strokeOpacity={0.6} strokeWidth={2} />;
        })}
        {pts.map((p, i) => (i % 2 ? null : <line key={`s${i}`} x1={p.x} y1={p.y} x2={p.x + (pts[i + 1].x - p.x) * link} y2={p.y + (pts[i + 1].y - p.y) * link} stroke={W.white} strokeOpacity={0.3} strokeWidth={1.5} />))}
      </svg>
      {ITEMS.map((it, i) => {
        const pop = ci(f, [it.at, it.at + 14], [0, 1], easeOut);
        return (
          <div key={i} style={{ position: "absolute", left: pts[i].x - it.size / 2, top: pts[i].y - it.size / 2, opacity: pop, transform: `scale(${pop}) rotate(${f * (i % 2 ? 0.5 : -0.5)}deg)` }}>
            <Glyph kind={it.kind} size={it.size} fill={i % 3 !== 0} />
          </div>
        );
      })}
      {/* Texto: cada palabra en un pulso de la música */}
      <div style={{ position: "absolute", top: 1240, left: 90, width: 900, display: "flex", flexWrap: "wrap", justifyContent: "center", columnGap: 26, opacity: 1 - textOut }}>
        {WORDS.map((w, i) => {
          const at = HITS.idea + i * 7.5;
          const isIdea = w === "IDEA";
          return (
            <div key={w} style={{ overflow: "hidden", paddingBottom: 10 }}>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 92,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: isIdea ? W.blue : W.white,
                  background: isIdea ? W.white : "transparent",
                  padding: isIdea ? "0 18px" : 0,
                  borderRadius: 14,
                  transform: `translateY(${ci(f, [at, at + 12], [110, 0], easeOut)}%)`,
                }}
              >
                {w}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
