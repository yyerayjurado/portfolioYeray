import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { CUES, W, ci, easeInOut, easeOut, local } from "../theme";
import { Glyph, Kind } from "../ui";

// Escena 1 · Las ideas nacen: elementos dispersos que se organizan, se conectan y se transforman.
const N = 22;
const ITEMS = Array.from({ length: N }).map((_, i) => ({
  x: 0.08 + random(`x${i}`) * 0.84,
  y: 0.1 + random(`y${i}`) * 0.62,
  kind: (i % 4) as Kind,
  size: 22 + random(`s${i}`) * 34,
  at: 10 + Math.floor(random(`a${i}`) * 90),
  drift: random(`d${i}`) * Math.PI * 2,
}));

export const A1Ideas: React.FC = () => {
  const f = useCurrentFrame();
  const W0 = 1920;
  const H0 = 1080;
  const organize = ci(f, [local(CUES.evolves, 0) + 50, local(CUES.vision, 0) - 6], [0, 1], easeInOut);
  const connect = ci(f, [local(CUES.vision, 0) - 4, local(CUES.vision, 0) + 26], [0, 1], easeInOut);
  const transform = ci(f, [local(CUES.creativity, 0) - 2, local(CUES.creativity, 0) + 20], [0, 1], easeOut);
  const ring = ci(f, [local(CUES.reality, 0), local(CUES.reality, 0) + 36], [0, 1], easeInOut);
  const end = ci(f, [400, 422], [0, 1], easeInOut);
  // Posiciones: dispersas → retícula ordenada → anillo (la idea toma forma) → centro
  const pts = ITEMS.map((it, i) => {
    const fx = it.x * W0 + Math.cos(f / 40 + it.drift) * 18;
    const fy = it.y * H0 + Math.sin(f / 46 + it.drift) * 14;
    const col = i % 11;
    const row = Math.floor(i / 11);
    const gx = 460 + col * 100;
    const gy = 400 + row * 120;
    const ang = (i / N) * Math.PI * 2 + f / 120;
    const rx = 960 + Math.cos(ang) * 230;
    const ry = 440 + Math.sin(ang) * 230;
    let x = fx + (gx - fx) * organize;
    let y = fy + (gy - fy) * organize;
    x = x + (rx - x) * ring;
    y = y + (ry - y) * ring;
    x = x + (960 - x) * end;
    y = y + (440 - y) * end;
    return { x, y };
  });
  return (
    <AbsoluteFill>
      <BlueBg grid={ci(f, [0, 60], [0, 1])} />
      <svg width={W0} height={H0} style={{ position: "absolute" }}>
        {/* Conexiones entre elementos vecinos */}
        {pts.slice(0, -1).map((p, i) => {
          const q = pts[i + 1];
          const sameRow = i % 11 !== 10 || ring > 0.5;
          if (!sameRow) return null;
          const k = ci(connect, [i / N * 0.6, i / N * 0.6 + 0.4], [0, 1]);
          return <line key={i} x1={p.x} y1={p.y} x2={p.x + (q.x - p.x) * k} y2={p.y + (q.y - p.y) * k} stroke={W.white} strokeOpacity={0.55 * (1 - end)} strokeWidth={2} />;
        })}
        {pts.slice(0, 11).map((p, i) => {
          const q = pts[i + 11];
          if (!q || ring > 0.5) return null;
          const k = ci(connect, [0.3 + i / 30, 0.7 + i / 30], [0, 1]);
          return <line key={`v${i}`} x1={p.x} y1={p.y} x2={p.x + (q.x - p.x) * k} y2={p.y + (q.y - p.y) * k} stroke={W.white} strokeOpacity={0.35} strokeWidth={1.5} />;
        })}
        {/* El anillo que se cierra: la idea toma forma */}
        <circle cx={960} cy={440} r={230} fill="none" stroke={W.white} strokeWidth={3} strokeDasharray={1445} strokeDashoffset={1445 * (1 - ci(f, [local(CUES.reality, 0) + 20, local(CUES.reality, 0) + 56], [0, 1], easeInOut))} opacity={1 - end} />
      </svg>
      {ITEMS.map((it, i) => {
        const pop = ci(f, [it.at, it.at + 12], [0, 1], easeOut);
        const size = it.size * (1 - transform * 0.35) + 4;
        const kind: Kind = transform > 0.5 ? (i % 2 ? 0 : 2) : it.kind;
        return (
          <div key={i} style={{ position: "absolute", left: pts[i].x - size / 2, top: pts[i].y - size / 2, opacity: pop * (1 - end * 0.6), transform: `scale(${pop * (1 + 0.4 * Math.sin(transform * Math.PI))})` }}>
            <Glyph kind={kind} size={size} rot={f * (i % 2 ? 0.6 : -0.6) * (1 - organize)} fill={i % 3 !== 0} />
          </div>
        );
      })}
      {/* Núcleo que concentra la energía antes de la marca */}
      <div style={{ position: "absolute", left: 960 - 40, top: 440 - 40, width: 80, height: 80, borderRadius: "50%", background: W.white, transform: `scale(${ci(f, [404, 420], [0, 1], easeOut)})`, boxShadow: "0 0 80px 30px rgba(255,255,255,0.35)" }} />
    </AbsoluteFill>
  );
};
